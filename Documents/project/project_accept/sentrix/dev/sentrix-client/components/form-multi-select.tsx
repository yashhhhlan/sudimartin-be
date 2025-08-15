import { useEffect, useMemo } from 'react';
import { MultiSelect } from '@mantine/core';

interface FormMultiSelectProps {
  label: string;
  placeholder: string;
  data: any[];
  value: string[];
  onChange: (values: string[]) => void;
  className?: string;
  showAllOption?: boolean;
  allOptionLabel?: string;
  disabled?: boolean;
}

const FormMultiSelect = ({
  label,
  placeholder,
  data,
  value,
  onChange,
  className,
  showAllOption = false,
  allOptionLabel = 'All Options',
  disabled = false,
}: FormMultiSelectProps) => {
  const ALL_OPTION_VALUE = '__ALL__';

  const shouldShowAsAll = useMemo(() => {
    if (!data || data.length === 0 || !value || value.length === 0) return false;

    if (value.includes(ALL_OPTION_VALUE)) return true;

    const allIndividualValues = data.map((item) => item.value);
    return allIndividualValues.every((val) => value.includes(val)) && value.length === allIndividualValues.length;
  }, [data, value]);

  useEffect(() => {
    if (shouldShowAsAll && !value.includes(ALL_OPTION_VALUE) && showAllOption) {
      onChange([ALL_OPTION_VALUE, ...value]);
    }
  }, [shouldShowAsAll, value, onChange, showAllOption]);

  const options = useMemo(() => {
    return showAllOption ? [{ label: allOptionLabel, value: ALL_OPTION_VALUE }, ...data] : data;
  }, [showAllOption, allOptionLabel, data]);

  const isAllSelected = value.includes(ALL_OPTION_VALUE);

  const handleChange = (selectedValues: string[]) => {
    const isSelectingAll = selectedValues.includes(ALL_OPTION_VALUE) && !isAllSelected;
    const isDeselectingAll = !selectedValues.includes(ALL_OPTION_VALUE) && isAllSelected;

    if (isSelectingAll) {
      const allValues = data.map((item) => item.value);
      onChange([ALL_OPTION_VALUE, ...allValues]);
    } else if (isDeselectingAll) {
      onChange(selectedValues.filter((val) => val !== ALL_OPTION_VALUE));
    } else {
      const individualValues = selectedValues.filter((val) => val !== ALL_OPTION_VALUE);
      const shouldAddAll = individualValues.length === data.length && data.length > 0;

      onChange(shouldAddAll ? [ALL_OPTION_VALUE, ...individualValues] : selectedValues);
    }
  };

  const handleRemoveValue = (selectedValue: string) => {
    if (selectedValue === ALL_OPTION_VALUE) {
      onChange([]);
    } else {
      onChange(value.filter((item) => item !== selectedValue && item !== ALL_OPTION_VALUE));
    }
  };

  const valueComponent = ({ value: itemValue, label: itemLabel }: any) => {
    if (isAllSelected && itemValue !== ALL_OPTION_VALUE) {
      return null;
    }

    return (
      <span className={`flex items-center gap-2 text-xs h-5 px-2 rounded-md text-white mr-2 my-1 bg-primary`}>
        <span>{itemLabel}</span>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleRemoveValue(itemValue);
          }}
          className="hover:opacity-75"
          aria-label={`Remove ${itemLabel}`}
        >
          ×
        </button>
      </span>
    );
  };

  return (
    <MultiSelect
      label={label}
      placeholder={placeholder}
      data={options}
      value={value}
      onChange={handleChange}
      className={className}
      classNames={{
        input: 'py-.5',
      }}
      valueComponent={valueComponent}
      nothingFound="No options found"
      searchable
      clearable
      disabled={disabled}
    />
  );
};

export default FormMultiSelect;
