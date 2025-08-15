type StatusBadgeProps = {
  status: 'active' | 'inactive';
};

const statusStyles = {
  active: {
    bg: 'bg-[#00C86E]',
    text: 'text-white',
    label: 'Active',
  },
  inactive: {
    bg: 'bg-[#E7515A]',
    text: 'text-white',
    label: 'Not Active',
  },
};

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const style = statusStyles[status];

  return (
    <div className={`border ${style.bg} ${style.text} w-fit px-2 py-1 rounded-lg text-xs font-semibold`}>
      {style.label}
    </div>
  );
};
