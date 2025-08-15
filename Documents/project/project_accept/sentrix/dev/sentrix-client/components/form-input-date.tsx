import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_green.css';
import { useRef } from 'react';

interface FormInputDateProps {
  label: string;
  value?: Date | string;
  onChange?: (date: Date[]) => void;
  disabled?: boolean;
  required?: boolean;
}

const FormInputDate = ({ label, value, onChange, disabled, required = true }: FormInputDateProps) => {
  const flatpickrRef = useRef<any>(null);

  const handleClickIcon = () => {
    if (flatpickrRef.current) {
      flatpickrRef.current.flatpickr.open();
    }
  };

  return (
    <div className="w-full">
      <label>{label}</label>
      <div className="relative">
        <Flatpickr
          ref={flatpickrRef}
          className={`form-input ${disabled && 'bg-[#EEF1F7] text-[#888EA8]'} disabled:cursor-not-allowed`}
          placeholder="Select date"
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
        />

        <div
          onClick={handleClickIcon}
          aria-label="Open calendar"
          className="absolute cursor-pointer right-2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M14.8333 3.33203H3.16667C2.24619 3.33203 1.5 4.07822 1.5 4.9987V16.6654C1.5 17.5858 2.24619 18.332 3.16667 18.332H14.8333C15.7538 18.332 16.5 17.5858 16.5 16.6654V4.9987C16.5 4.07822 15.7538 3.33203 14.8333 3.33203Z"
              stroke={disabled ? '#6DC7FF' : '#888EA8'}
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M12.332 1.66797V5.0013"
              stroke={disabled ? '#6DC7FF' : '#888EA8'}
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M5.66797 1.66797V5.0013"
              stroke={disabled ? '#6DC7FF' : '#888EA8'}
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M1.5 8.33203H16.5"
              stroke={disabled ? '#6DC7FF' : '#888EA8'}
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default FormInputDate;
