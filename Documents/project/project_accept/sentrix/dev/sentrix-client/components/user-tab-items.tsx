import { UserTabItemsProps } from '@/types/components';

const UserTabItems = ({ icon, tabs, label, toggleTabs, activeTabs }: UserTabItemsProps) => {
  return (
    <li className="flex">
      <button
        onClick={() => toggleTabs(tabs)}
        className={`flex items-center gap-2 py-2 px-4 my-4 border-transparent hover:border-primary hover:text-primary ${tabs === activeTabs && 'py-2 px-4 my-4 rounded-lg bg-[#2673DDBF] text-white hover:text-white'}`}
      >
        {icon}
        {label}
      </button>
    </li>
  );
};

export default UserTabItems;
