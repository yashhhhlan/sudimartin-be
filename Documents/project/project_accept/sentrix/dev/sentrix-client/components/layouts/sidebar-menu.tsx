import Link from 'next/link';
import AnimateHeight from 'react-animate-height';

import { MenuCategory } from '@/types/components';

import SidebarSubMenu from './sidebar-sub-menu';
import SidebarMenuItem from './sidebar-menu-item';
import IconCaretDown from '../icon/icon-caret-down';

const SidebarMenu = ({
  category,
  config,
  hasPermission,
  currentMenu,
  toggleMenu,
  t,
}: {
  category: string;
  config: MenuCategory;
  hasPermission: (name: string, category: string) => boolean;
  currentMenu: string;
  toggleMenu: (value: string) => void;
  t: any;
}) => {
  const categoryPrefix = category === 'Administrator' ? 'admin' : category.toLowerCase();
  const isOpen = currentMenu === category || currentMenu.startsWith(`${categoryPrefix}-`);

  const CategoryIcon = config.icon;

  return (
    <div>
      <button type="button" className="nav-link group w-full text-left" onClick={() => toggleMenu(category)}>
        <div className="-mx-4 mb-1 flex justify-between items-center bg-white-light/30 px-6 py-3 font-extrabold uppercase dark:bg-dark dark:bg-opacity-[0.08]">
          <div className="flex gap-2 items-center">
            {CategoryIcon && <CategoryIcon className="size-6" />}
            <span>{t(config.title)}</span>
          </div>
          <IconCaretDown className={!isOpen ? '-rotate-90 rtl:rotate-90' : ''} />
        </div>
      </button>

      <AnimateHeight duration={300} height={isOpen ? 'auto' : 0}>
        <ul className="py-4">
          {category === 'Administrator' ? (
            <>
              {config.submenus &&
                Object.entries(config.submenus).map(([key, submenu]) => (
                  <SidebarSubMenu
                    key={key}
                    submenuKey={key}
                    submenu={submenu}
                    isOpen={currentMenu === `admin-${key}`}
                    onToggle={() => toggleMenu(`admin-${key}`)}
                    hasPermission={(name) => hasPermission(name, category)}
                    t={t}
                  />
                ))}

              {config.items?.map(
                (item) =>
                  hasPermission(item.name, category) && (
                    <li key={item.name} className="menu nav-item hover:bg-gray-700">
                      <Link href={item.path} className="group">
                        <div className="flex items-center">
                          <item.icon className="shrink-0 group-hover:!text-primary" />
                          <span className="text-white ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark capitalize">
                            {t(item.label || item.name)}
                          </span>
                        </div>
                      </Link>
                    </li>
                  ),
              )}
            </>
          ) : (
            config.items?.map(
              (item) => hasPermission(item.name, category) && <SidebarMenuItem key={item.name} item={item} t={t} />,
            )
          )}
        </ul>
      </AnimateHeight>
    </div>
  );
};

export default SidebarMenu;
