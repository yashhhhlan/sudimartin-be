import Image from 'next/image';
import Link from 'next/link';

interface LogoProps {
  variant?: 'white' | 'black';
}

const Logo = ({ variant = 'white' }: LogoProps) => {
  return (
    <Link href="/">
      <Image
        width={96}
        height={96}
        className="inline ltr:-ml-1 rtl:-mr-1"
        src={variant === 'white' ? '/assets/logo.png' : '/assets/logo-black.png'}
        alt="logo"
      />
    </Link>
  );
};

export default Logo;
