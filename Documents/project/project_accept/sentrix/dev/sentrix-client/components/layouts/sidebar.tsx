'use client';

import { useState, useEffect, useCallback } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useDispatch, useSelector } from 'react-redux';
import { usePathname } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import { IRootState } from '@/store';
import { toggleSidebar } from '@/store/themeConfigSlice';
import { getTranslation } from '@/i18n';
import { MENU_CONFIG } from '@/utils/menu-config';

import SidebarMenu from './sidebar-menu';

import { getCurrentUserPermission } from '@/server/actions/permissions/get-current-user-permission';
import Logo from '../logo';

const Sidebar = () => {
  const dispatch = useDispatch();
  const { t } = getTranslation();
  const pathname = usePathname();

  const [openMenus, setOpenMenus] = useState<string[]>([]);
  const themeConfig = useSelector((state: IRootState) => state.themeConfig);
  const semidark = useSelector((state: IRootState) => state.themeConfig.semidark);

  const toggleMenu = (value: string) => {
    setOpenMenus((oldMenus) => {
      if (value.includes('-')) {
        const [categoryPrefix] = value.split('-');

        if (oldMenus.includes(value)) {
          const categoryName = categoryPrefix === 'admin' ? 'Administrator' : categoryPrefix;
          return oldMenus.filter((menu) => menu !== value);
        }
        return [...oldMenus, value];
      }

      const categoryPrefix = value === 'Administrator' ? 'admin' : value.toLowerCase();

      if (oldMenus.includes(value) || oldMenus.some((menu) => menu.startsWith(`${categoryPrefix}-`))) {
        return oldMenus.filter((menu) => menu !== value && !menu.startsWith(`${categoryPrefix}-`));
      }

      return [...oldMenus, value];
    });
  };

  const { data: currentUserPermission } = useQuery({
    queryKey: ['get-current-user-permission'],
    queryFn: async () => {
      const { data } = await getCurrentUserPermission();
      return data;
    },
  });

  const hasPermission = (permissionName: string, category: string) => {
    if (!currentUserPermission || !currentUserPermission[category]) return false;
    return currentUserPermission[category].some((permission: any) => permission.name === permissionName);
  };

  const hasCategory = useCallback(
    (category: string) => {
      if (!currentUserPermission || !currentUserPermission[category]) return false;
      return currentUserPermission[category].length > 0;
    },
    [currentUserPermission],
  );

  useEffect(() => {
    if (currentUserPermission) {
      const defaultOpenMenus = Object.keys(MENU_CONFIG).filter((category) => hasCategory(category));
      setOpenMenus(defaultOpenMenus);
    }
  }, [currentUserPermission, hasCategory]);

  useEffect(() => {
    const selector = document.querySelector('.sidebar ul a[href="' + window.location.pathname + '"]');
    if (selector) {
      selector.classList.add('active');
      const ul: any = selector.closest('ul.sub-menu');
      if (ul) {
        let ele: any = ul.closest('li.menu').querySelectorAll('.nav-link') || [];
        if (ele.length) {
          ele = ele[0];
          setTimeout(() => {
            ele.click();
          });
        }
      }
    }
  }, []);

  useEffect(() => {
    setActiveRoute();
    if (window.innerWidth < 1024 && themeConfig.sidebar) {
      dispatch(toggleSidebar());
    }
  }, [pathname, themeConfig.sidebar, dispatch]);

  const getCurrentMenu = (category: string) => {
    const categoryPrefix = category === 'Administrator' ? 'admin' : category.toLowerCase();
    const submenu = openMenus.find((menu) => menu.startsWith(`${categoryPrefix}-`));
    if (submenu) return submenu;
    return openMenus.includes(category) ? category : '';
  };

  const setActiveRoute = () => {
    let allLinks = document.querySelectorAll('.sidebar ul a.active');
    for (let i = 0; i < allLinks.length; i++) {
      const element = allLinks[i];
      element?.classList.remove('active');
    }
    const selector = document.querySelector('.sidebar ul a[href="' + window.location.pathname + '"]');
    selector?.classList.add('active');
  };

  return (
    <div className={semidark ? 'dark' : ''}>
      <nav
        className={`sidebar fixed bottom-0 top-0 z-50 h-full min-h-screen w-[260px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] transition-all duration-300 bg-[#0E1726] text-white dark:bg-black ${semidark ? 'text-white-dark' : ''}`}
      >
        <div className="h-full">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex-1 flex justify-center items-center">
              <Logo />
            </div>
          </div>

          <PerfectScrollbar className="relative h-[calc(100vh-80px)]">
            <ul className="relative space-y-0.5 p-4 py-0 font-semibold pb-10">
              {Object.entries(MENU_CONFIG).map(([category, config]) => {
                if (!hasCategory(category)) return null;

                return (
                  <SidebarMenu
                    key={category}
                    category={category}
                    config={config}
                    hasPermission={hasPermission}
                    currentMenu={getCurrentMenu(category)}
                    toggleMenu={toggleMenu}
                    t={t}
                  />
                );
              })}
            </ul>
          </PerfectScrollbar>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
