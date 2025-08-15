import { useEffect, useState } from 'react';

type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';

const useBreakpoint = (): Breakpoint => {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>('lg');

  useEffect(() => {
    const getBreakpoint = (width: number): Breakpoint => {
      if (width < 640) return 'sm';
      if (width < 768) return 'md';
      if (width < 1024) return 'lg';
      if (width < 1280) return 'xl';
      if (width < 1536) return '2xl';
      return '3xl';
    };

    const updateBreakpoint = () => {
      setBreakpoint(getBreakpoint(window.innerWidth));
    };

    updateBreakpoint();

    window.addEventListener('resize', updateBreakpoint);

    return () => window.removeEventListener('resize', updateBreakpoint);
  }, []);

  return breakpoint;
};

export default useBreakpoint;
