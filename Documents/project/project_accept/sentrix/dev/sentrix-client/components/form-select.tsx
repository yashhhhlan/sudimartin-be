import { Select } from '@mantine/core';
import { ChevronDown } from 'lucide-react';

interface FormSelectProps {
  label: string;
  placeholder: string;
  data: any[];
  value: string;
  onChange: (values: string) => void;
  className?: string;
  required?: boolean;
  disabled?: boolean;
}

const FormSelect = ({ label, placeholder, data, value, onChange, className, required, disabled }: FormSelectProps) => {
  const handleChange = (selectedValues: string) => {
    onChange(selectedValues);
  };

  return (
    <Select
      label={label}
      placeholder={placeholder}
      data={data}
      value={value}
      onChange={handleChange}
      className={className}
      required={required}
      disabled={disabled}
      nothingFound="No options found"
      searchable
      rightSection={<ChevronDown size={20} className="text-gray-500" />}
      styles={{ rightSection: { pointerEvents: 'none' } }}
    />
  );
};

export default FormSelect;
