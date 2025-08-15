import { memo, useRef } from 'react';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.css';

import { showMessage } from '@/components/toast';

interface FormInputDateRangeProps {
  label?: string;
  value?: {
    startDate: Date;
    endDate: Date;
  };
  onChange: (dateRange: { startDate: Date; endDate: Date }) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

const FormInputDateRange = memo(
  ({
    label,
    value,
    onChange,
    placeholder = 'Select date range',
    required = false,
    disabled = false,
    className = '',
  }: FormInputDateRangeProps) => {
    const flatpickrRef = useRef<any>(null);

    const handleClickIcon = () => {
      if (flatpickrRef.current) {
        flatpickrRef.current.flatpickr.open();
      }
    };

    const flatpickrValue = value ? [value.startDate, value.endDate] : [];

    const handleDateChange = (dates: Date[]) => {
      if (dates.length === 2) {
        const [startDate, endDate] = dates;

        if (endDate <= startDate) {
          showMessage('End date must be after start date', 'error');
          return;
        }

        onChange({
          startDate,
          endDate,
        });
      }
    };

    return (
      <div className="w-full">
        {label && <label>{label}</label>}

        <div className="relative">
          <Flatpickr
            ref={flatpickrRef}
            value={flatpickrValue}
            options={{
              mode: 'range',
              dateFormat: 'd-m-Y',
              position: 'auto left',
              allowInput: true,
              clickOpens: !disabled,
            }}
            className={`form-input ${className} ${disabled && 'bg-[#EEF1F7] text-[#888EA8]'} disabled:cursor-not-allowed`}
            placeholder={placeholder}
            onChange={handleDateChange}
            disabled={disabled}
          />

          <div
            onClick={handleClickIcon}
            aria-label="Open calendar"
            className="absolute cursor-pointer right-2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M14.8333 3.33203H3.16667C2.24619 3.33203 1.5 4.07822 1.5 4.9987V16.6654C1.5 17.5858 2.24619 18.332 3.16667 18.332H14.8333C15.7538 18.332 16.5 17.5858 16.5 16.6654V4.9987C16.5 4.07822 15.7538 3.33203 14.8333 3.33203Z"
                stroke="#888EA8"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12.332 1.66797V5.0013"
                stroke="#888EA8"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5.66797 1.66797V5.0013"
                stroke="#888EA8"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M1.5 8.33203H16.5"
                stroke="#888EA8"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    );
  },
);

FormInputDateRange.displayName = 'FormInputDateRange';
export default FormInputDateRange;
