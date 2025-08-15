import { FC } from 'react';

interface IconSharedPostProps {
    className?: string;
}

const IconSharedPost: FC<IconSharedPostProps> = ({ className }) => {
    return (
         <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            fill="none"
            className={className}
        >
            <path
                fill="#2196F3"
                fillRule="evenodd"
                d="M4 4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3a1 1 0 0 1 1 1v1.826l3.016-2.585a1 1 0 0 1 .65-.241H20a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H4ZM1 5a3 3 0 0 1 3-3h16a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-7.963L7.65 21.76A1 1 0 0 1 6 21v-3H4a3 3 0 0 1-3-3V5Z"
                clipRule="evenodd"
            />
            <path
                fill="#2196F3"
                fillRule="evenodd"
                d="M4 6a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6Zm2 1v6h5V7H6Zm13.5 0h-5V5h5v2Zm0 8h-5v-2h5v2Zm0-4h-5V9h5v2Z"
                clipRule="evenodd"
            />
        </svg>
    );
};

export default IconSharedPost;
