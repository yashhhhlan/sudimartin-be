import { FC } from 'react';

interface IconVideoProps {
    className?: string;
    color?: string;
}

const IconVideo: FC<IconVideoProps> = ({ className, color }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            fill="none"
            className={className}
        >
            <path
            fill={color||"#4361EE"}
            d="M16.198 2.5H3.804A3.125 3.125 0 0 0 .679 5.625v8.75A3.125 3.125 0 0 0 3.804 17.5h12.394a3.125 3.125 0 0 0 3.125-3.125v-8.75A3.125 3.125 0 0 0 16.198 2.5Zm-2.85 8.325-5.129 2.75a.938.938 0 0 1-1.38-.825v-5.5a.937.937 0 0 1 1.38-.825l5.129 2.75a.938.938 0 0 1 0 1.65Zm-5.26-3.053L12.241 10l-4.153 2.228V7.772Z"
            />
        </svg>
    );
};

export default IconVideo;
