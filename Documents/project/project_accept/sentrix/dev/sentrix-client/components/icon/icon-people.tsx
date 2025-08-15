import { FC } from 'react';

interface IconPeopleProps {
    className?: string;
}

const IconPeople: FC<IconPeopleProps> = ({ className }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={15}
            fill="none"
            className={className}
        >
            <path
            fill="#4361EE"
            d="M8.62 8c1.035 0 1.875.84 1.875 1.875l-.001.935c.128 2.296-1.64 3.441-4.919 3.441-3.268 0-5.075-1.13-5.075-3.408v-.968C.5 8.839 1.34 8 2.375 8H8.62Zm5 0c1.036 0 1.876.84 1.876 1.875l-.002.658c.114 2.06-1.449 3.092-4.304 3.092-.388 0-.753-.019-1.093-.057.671-.62 1.03-1.46 1.029-2.522l-.008-.27.002-.901c0-.747-.328-1.417-.847-1.876L13.62 8ZM5.5.5a3.126 3.126 0 1 1 0 6.251A3.126 3.126 0 0 1 5.5.5Zm6.25 1.25a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z"
            />
        </svg>
    );
};

export default IconPeople;
