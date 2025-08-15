import HeaderDate from '@/components/header-date';
import HeaderTitle from '@/components/header-title';

const HeaderInfo = () => {
  return (
    <div className="space-y-2">
      <HeaderTitle title="Dashboard" />
      <HeaderDate date="17 Jul 2025 - 18 Jul 2025" />
    </div>
  );
};

export default HeaderInfo;
