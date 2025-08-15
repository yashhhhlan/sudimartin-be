import { Select } from '@mantine/core';

interface YearSelectorProps {
  value?: string | null;
  onChange?: (value: string | null) => void;
  placeholder?: string;
  label?: string;
  withAsterisk?: boolean;
  disabled?: boolean;
  startYear?: number;
  endYear?: number;
}

const FormInputYear: React.FC<YearSelectorProps> = ({
  value,
  onChange,
  placeholder = 'Select year',
  label = 'Year',
  withAsterisk = false,
  disabled = false,
  startYear = 2015,
  endYear = 2045,
}) => {
  const generateYearOptions = () => {
    const years = [];
    for (let year = startYear; year <= endYear; year++) {
      years.push({
        value: year.toString(),
        label: year.toString(),
      });
    }
    return years.reverse();
  };

  const yearOptions = generateYearOptions();

  return (
    <Select
      label={label}
      placeholder={placeholder}
      data={yearOptions}
      value={value}
      onChange={onChange}
      withAsterisk={withAsterisk}
      disabled={disabled}
      searchable
      clearable
    />
  );
};

export default FormInputYear;
