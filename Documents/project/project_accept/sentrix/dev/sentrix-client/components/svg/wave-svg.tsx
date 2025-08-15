import React from 'react';

interface WaveSvgProps {
  className?: string;
  color: string;
}

const WaveSvg = ({ className, color }: WaveSvgProps) => {
  const getWaveColor = (colorClass: string): string => {
    const colorMap: Record<string, string> = {
      'bg-blue-100': '#3B82F6',
      'bg-cyan-100': '#06B6D4',
      'bg-purple-100': '#8B5CF6',
      'bg-red-100': '#EF4444',
      'bg-green-100': '#10B981',
      'bg-yellow-100': '#F59E0B',
      'bg-pink-100': '#EC4899',
      'bg-gray-100': '#6B7280',
      'bg-gray-50': '#41464A5E',
    };
    return colorMap[colorClass] || '#3B82F6';
  };

  const waveColor = getWaveColor(color);

  return (
    <svg
      className={className}
      width="100%"
      height="64"
      viewBox="0 0 111 55"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <path
        opacity="0.2"
        d="M22.4129 30.523C13.1275 43.2383 4.37584 44.6512 0 45.2516V55H110.997V0.00621104C111.104 -0.170391 108.414 3.35458 96.8022 18.8673C82.2872 38.2582 67.452 31.2647 59.7676 20.9865C53.6201 12.7639 47.3872 10.4964 45.0392 10.3904C39.4893 9.96656 31.6982 17.8077 22.4129 30.523Z"
        fill={`url(#paint0_linear_${color})`}
      />
      <path
        opacity="0.2"
        d="M23.1161 46.8477C14.0827 47.7794 3.94146 40.2483 0 36.3663V55H111V29.1669C104.076 21.1205 91.3992 10.2155 80.5336 10.0037C69.6679 9.792 61.2524 18.5795 51.5585 29.1669C41.8647 39.7542 34.4079 45.6831 23.1161 46.8477Z"
        fill={`url(#paint1_linear_${color})`}
      />
      <defs>
        <linearGradient id={`paint0_linear_${color}`} x1="55.5" y1="0" x2="55.5" y2="55" gradientUnits="userSpaceOnUse">
          <stop stopColor={waveColor} />
          <stop offset="1" stopColor={waveColor} stopOpacity="0.37" />
        </linearGradient>
        <linearGradient
          id={`paint1_linear_${color}`}
          x1="55.5"
          y1="10"
          x2="55.5"
          y2="55"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={waveColor} />
          <stop offset="1" stopColor={waveColor} stopOpacity="0.37" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default WaveSvg;
