type RoleBadgeProps = {
  role: 'admin' | 'user';
};

const roleStyles = {
  admin: {
    border: 'border-[#E2A03F]',
    text: 'text-[#E2A03F]',
    label: 'Administrator',
  },
  user: {
    border: 'border-[#4361EE]',
    text: 'text-[#4361EE]',
    label: 'User',
  },
};

export const RoleBadge = ({ role }: RoleBadgeProps) => {
  const style = roleStyles[role];

  return (
    <div className={`border ${style?.border} ${style?.text} w-fit px-2 py-1 rounded-lg text-xs font-semibold`}>
      {style?.label}
    </div>
  );
};
