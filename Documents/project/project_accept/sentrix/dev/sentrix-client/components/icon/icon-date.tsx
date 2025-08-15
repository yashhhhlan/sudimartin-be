import React from 'react';

const IconDate = ({ className, onClick }: { className?: string; onClick?: () => void }) => {
    return (
        <svg onClick={onClick} className={className} width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M14.8333 3.33301H3.16667C2.24619 3.33301 1.5 4.0792 1.5 4.99967V16.6663C1.5 17.5868 2.24619 18.333 3.16667 18.333H14.8333C15.7538 18.333 16.5 17.5868 16.5 16.6663V4.99967C16.5 4.0792 15.7538 3.33301 14.8333 3.33301Z"
                stroke="#888EA8"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <path d="M12.332 1.66699V5.00033" stroke="#888EA8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M5.66797 1.66699V5.00033" stroke="#888EA8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M1.5 8.33301H16.5" stroke="#888EA8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    );
};

export default IconDate;
