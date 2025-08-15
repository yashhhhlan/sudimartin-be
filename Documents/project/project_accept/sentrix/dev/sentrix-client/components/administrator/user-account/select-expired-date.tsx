import { useState, useRef } from 'react';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.css';
import { Indonesian } from 'flatpickr/dist/l10n/id';
import { useSelector } from 'react-redux';

import { IRootState } from '@/store';
import IconDate from '@/components/icon/icon-date';

interface SelectExpiredDateProps {
  value?: Date;
  onChange?: (date: Date) => void;
}

const SelectExpiredDate = ({ value, onChange }: SelectExpiredDateProps) => {
  const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl';
  const [date, setDate] = useState<Date>(value || new Date());
  const flatpickrRef = useRef<any>(null);

  const handleIconClick = () => {
    flatpickrRef.current?.flatpickr.open();
  };

  const handleDateChange = (selectedDates: Date[]) => {
    const newDate = selectedDates[0];
    setDate(newDate);
    onChange?.(newDate);
  };

  return (
    <div className="relative">
      <Flatpickr
        ref={flatpickrRef}
        value={date}
        onChange={handleDateChange}
        options={{
          dateFormat: 'd F Y',
          locale: Indonesian,
          position: isRtl ? 'auto right' : 'auto left',
        }}
        className="form-input"
      />
      <IconDate
        className="absolute -translate-x-1/2 -translate-y-1/2 right-2 top-1/2 cursor-pointer"
        onClick={handleIconClick}
      />
    </div>
  );
};

export default SelectExpiredDate;
