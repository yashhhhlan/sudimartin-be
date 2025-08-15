import Link from 'next/link';
import AnimateHeight from 'react-animate-height';

import { SubMenuItem } from '@/types/components';

import IconCaretDown from '../icon/icon-caret-down';

const SidebarSubMenu = ({
  submenuKey,
  submenu,
  isOpen,
  onToggle,
  hasPermission,
  t,
}: {
  submenuKey: string;
  submenu: any;
  isOpen: boolean;
  onToggle: () => void;
  hasPermission: (name: string) => boolean;
  t: any;
}) => {
  const Icon = submenu.icon;

  return (
    <li className="menu nav-item">
      <button type="button" className={`${isOpen ? 'active' : ''} nav-link group w-full`} onClick={onToggle}>
        <div className="flex items-center">
          <Icon className="shrink-0 group-hover:!text-primary" />
          <span className="text-white ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark capitalize">
            {t(submenu.title)}
          </span>
        </div>
        <div className={!isOpen ? '-rotate-90 rtl:rotate-90' : ''}>
          <IconCaretDown className="text-white dark:text-white/50 group-hover:text-white group-[.active]:text-white" />
        </div>
      </button>

      <AnimateHeight duration={300} height={isOpen ? 'auto' : 0}>
        <ul className="sub-menu text-gray-500 capitalize">
          {submenu.items.map(
            (item: SubMenuItem) =>
              hasPermission(item.name) && (
                <li key={item.name}>
                  <Link href={item.path}>{t(item.name)}</Link>
                </li>
              ),
          )}
        </ul>
      </AnimateHeight>
    </li>
  );
};

export default SidebarSubMenu;
