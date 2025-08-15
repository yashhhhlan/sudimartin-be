import { Switch } from '@mantine/core';

interface FormSwitchProps {
  label: string;
  value: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormSwitch = ({ label, value, onChange }: FormSwitchProps) => {
  return (
    <div className="space-y-2 w-full">
      <div className="font-semibold">{label}</div>
      <Switch
        label={
          value ? (
            <div className="text-[#888EA8] text-xs flex items-center">Yes</div>
          ) : (
            <div className="text-[#888EA8] text-xs flex items-center">No</div>
          )
        }
        checked={value}
        onChange={onChange}
        className="cursor-pointer"
      />
    </div>
  );
};

export default FormSwitch;
