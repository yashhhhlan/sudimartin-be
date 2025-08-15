type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';

export const getChartSize = (breakpoint: Breakpoint) => {
  const sizes = {
    sm: { height: 100, width: 100 },
    md: { height: 120, width: 120 },
    lg: { height: 140, width: 140 },
    xl: { height: 160, width: 160 },
    '2xl': { height: 180, width: 180 },
    '3xl': { height: 250, width: 250 },
  };
  return sizes[breakpoint];
};

export const getIconSize = (breakpoint: Breakpoint) => {
  const sizes = {
    sm: { width: 16, height: 16 },
    md: { width: 20, height: 20 },
    lg: { width: 24, height: 24 },
    xl: { width: 28, height: 28 },
    '2xl': { width: 32, height: 32 },
    '3xl': { width: 40, height: 40 },
  };
  return sizes[breakpoint];
};

export const getChartFontSize = (breakpoint: Breakpoint) => {
  const sizes = {
    sm: '10px',
    md: '11px',
    lg: '12px',
    xl: '13px',
    '2xl': '14px',
    '3xl': '16px',
  };
  return sizes[breakpoint];
};
