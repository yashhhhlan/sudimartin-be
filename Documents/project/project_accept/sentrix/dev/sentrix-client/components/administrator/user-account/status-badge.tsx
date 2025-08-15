type StatusBadgeProps = {
    status: 'active' | 'suspended' | 'closed';
};

const statusStyles = {
    active: {
        border: 'border-[#4361EE]',
        text: 'text-[#4361EE]',
        label: 'Active',
    },
    suspended: {
        border: 'border-[#E2A03F]',
        text: 'text-[#E2A03F]',
        label: 'Suspended',
    },
    closed: {
        border: 'border-[#E7515A]',
        text: 'text-[#E7515A]',
        label: 'Closed',
    },
};

export const StatusBadge = ({ status }: StatusBadgeProps) => {
    const style = statusStyles[status] || statusStyles.closed;

    return <div className={`border ${style.border} ${style.text} w-fit px-2 py-1 rounded-lg text-xs font-semibold`}>{style.label}</div>;
};
