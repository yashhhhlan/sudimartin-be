import { FC } from 'react';

interface IconCompanyProps {
    className?: string;
}

const IconCompany: FC<IconCompanyProps> = ({ className }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={10}
            height={10}
            fill="none"
            className={className}
        >
            <g clipPath="url(#a)">
            <path
                fill="#292D32"
                fillRule="evenodd"
                d="M2.302 2.042v.366h-.37v-.366h.37Zm0 1.002v.366h-.37v-.366h.37Zm0 1.002v.366h-.37v-.366h.37Zm0 1.002v.366h-.37v-.366h.37Zm.887-3.006v.366h-.37v-.366h.37Zm0 1.002v.366h-.37v-.366h.37Zm0 1.002v.366h-.37v-.366h.37Zm0 1.002v.366h-.37v-.366h.37Zm6.13 3.79H.681v.409h8.636v-.41Zm-1.65-.37h1.006v-5.24l-1.006-.51v5.75Zm-2.688 0H7.3V2.601H4.98v5.867Zm-.874 0v-7.6l1.078.546v.818h-.389a.185.185 0 0 0-.185.184v6.052h-.504Zm-3.61 0a.185.185 0 0 0-.184.185v.779c0 .102.082.184.184.184h9.006a.185.185 0 0 0 .184-.184v-.78a.185.185 0 0 0-.184-.184h-.458V3.116a.185.185 0 0 0-.101-.165l-1.37-.696a.184.184 0 0 0-.09-.023h-1.93V1.3a.184.184 0 0 0-.102-.165L4.018.41a.184.184 0 0 0-.096-.026H1.234a.185.185 0 0 0-.185.184v7.901H.497Zm2.327 0h-.492V7.59h.492v.88Zm-.861 0V7.405c0-.102.082-.185.184-.185h.862c.102 0 .185.083.185.185v1.063h.544V.752h-2.32v7.716h.545Zm.339-2.419v.366h-.37V6.05h.37Zm.887 0v.366h-.37V6.05h.37Zm2.715-2.156v.366h-.37v-.366h.37Zm0 1.001v.366h-.37v-.366h.37Zm0 1.002v.366h-.37v-.366h.37Zm.887-2.003v.366h-.37v-.366h.37Zm0 1.001v.366h-.37v-.366h.37Zm0 1.002v.366h-.37v-.366h.37Zm-.887 1.002v.366h-.37v-.366h.37Zm.887 0v.366h-.37v-.366h.37Z"
                clipRule="evenodd"
            />
            </g>
            <defs>
            <clipPath id="a">
                <path fill="#fff" d="M0 0h10v10H0z" />
            </clipPath>
            </defs>
        </svg>
    );
};

export default IconCompany;
