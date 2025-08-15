import IconProjectDate from '@/components/icon/icon-project-date';

interface HeaderDateProps {
  date: string;
  className?: string;
}

const HeaderDate = ({ date, className }: HeaderDateProps) => {
  return (
    <div className={`flex gap-2 items-center ${className}`}>
      <IconProjectDate />
      <div className="font-semibold text-sm">{date}</div>
    </div>
  );
};

export default HeaderDate;
