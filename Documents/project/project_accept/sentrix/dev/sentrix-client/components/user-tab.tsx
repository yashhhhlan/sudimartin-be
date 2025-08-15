import UserTabItems from './user-tab-items';

import { UserTabProps } from '@/types/components';

import { userTabItems } from '@/utils/user-tab-items';

const UserTab = ({ activeTabs, toggleTabs }: UserTabProps) => {
  return (
    <ul className="mb-5 overflow-y-auto whitespace-nowrap border-b border-[#ebedf2] font-semibold dark:border-[#191e3a] sm:flex">
      {userTabItems?.map((item) => (
        <UserTabItems
          key={item.label}
          label={item.label}
          icon={item.icon}
          tabs={item.tabs}
          toggleTabs={toggleTabs}
          activeTabs={activeTabs}
        />
      ))}
    </ul>
  );
};

export default UserTab;
