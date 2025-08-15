import { NumberInput } from '@mantine/core';

interface FormInputNumberProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  placeholder?: string;
}

const FormInputNumber = ({ label, value, onChange, placeholder }: FormInputNumberProps) => {
  return (
    <div className="space-y-2">
      <div className="font-semibold">{label}</div>
      <NumberInput hideControls value={value} onChange={onChange} min={0} placeholder={placeholder} />
    </div>
  );
};

export default FormInputNumber;
