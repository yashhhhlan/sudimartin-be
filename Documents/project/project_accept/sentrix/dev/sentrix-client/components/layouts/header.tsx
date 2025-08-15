'use client';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';

import { toggleTheme } from '@/store/themeConfigSlice';

import Dropdown from '@/components/dropdown';
import IconXCircle from '@/components/icon/icon-x-circle';
import IconSun from '@/components/icon/icon-sun';
import IconMoon from '@/components/icon/icon-moon';
import IconLaptop from '@/components/icon/icon-laptop';
import IconInfoCircle from '@/components/icon/icon-info-circle';
import IconBellBing from '@/components/icon/icon-bell-bing';
import IconUser from '@/components/icon/icon-user';
import IconLogout from '@/components/icon/icon-logout';
import ProfileImage from './profile-image';
import Logo from '../logo';

import { IRootState } from '@/store';
import { removeToken } from '@/utils/token';

import { getCurrentUser } from '@/server/actions/users/get-current-user';

const Header = () => {
  const pathname = usePathname();
  const dispatch = useDispatch();

  const { data: currentUser } = useQuery({
    queryKey: ['get-current-user'],
    queryFn: async () => {
      const { data } = await getCurrentUser();

      return data;
    },
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    const selector = document.querySelector('ul.horizontal-menu a[href="' + window.location.pathname + '"]');
    if (selector) {
      const all: any = document.querySelectorAll('ul.horizontal-menu .nav-link.active');
      for (let i = 0; i < all.length; i++) {
        all[0]?.classList.remove('active');
      }

      let allLinks = document.querySelectorAll('ul.horizontal-menu a.active');
      for (let i = 0; i < allLinks.length; i++) {
        const element = allLinks[i];
        element?.classList.remove('active');
      }
      selector?.classList.add('active');

      const ul: any = selector.closest('ul.sub-menu');
      if (ul) {
        let ele: any = ul.closest('li.menu').querySelectorAll('.nav-link');
        if (ele) {
          ele = ele[0];
          setTimeout(() => {
            ele?.classList.add('active');
          });
        }
      }
    }
  }, [pathname]);

  const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl';

  const themeConfig = useSelector((state: IRootState) => state.themeConfig);

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      profile: 'user-profile.jpeg',
      message: '<strong class="text-sm mr-1">John Doe</strong>invite you to <strong>Prototyping</strong>',
      time: '45 min ago',
    },
    {
      id: 2,
      profile: 'profile-34.jpeg',
      message: '<strong class="text-sm mr-1">Adam Nolan</strong>mentioned you to <strong>UX Basics</strong>',
      time: '9h Ago',
    },
    {
      id: 3,
      profile: 'profile-16.jpeg',
      message: '<strong class="text-sm mr-1">Anna Morgan</strong>Upload a file',
      time: '9h Ago',
    },
  ]);

  const removeNotification = (value: number) => {
    setNotifications(notifications.filter((user) => user.id !== value));
  };

  const handleSignOut = () => removeToken();

  return (
    <header
      className={`sticky top-0 z-[70] ${themeConfig.semidark && themeConfig.menu === 'horizontal' ? 'dark' : ''}`}
    >
      <div className="shadow-sm">
        <div className="relative flex w-full items-center bg-white px-5 py-2.5 dark:bg-black">
          <div className="horizontal-logo flex items-center justify-between ltr:mr-2 rtl:ml-2 lg:hidden">
            <Logo />
          </div>

          <div className="flex items-center space-x-1.5 ltr:ml-auto rtl:mr-auto rtl:space-x-reverse dark:text-[#d0d2d6] sm:flex-1 ltr:sm:ml-0 sm:rtl:mr-0 lg:space-x-2">
            <div className="sm:ltr:mr-auto sm:rtl:ml-auto"></div>
            <div>
              {themeConfig.theme === 'light' ? (
                <button
                  className={`${
                    themeConfig.theme === 'light' &&
                    'flex items-center rounded-full bg-white-light/40 p-2 hover:bg-white-light/90 hover:text-primary dark:bg-dark/40 dark:hover:bg-dark/60'
                  }`}
                  onClick={() => dispatch(toggleTheme('dark'))}
                >
                  <IconSun />
                </button>
              ) : (
                ''
              )}
              {themeConfig.theme === 'dark' && (
                <button
                  className={`${
                    themeConfig.theme === 'dark' &&
                    'flex items-center rounded-full bg-white-light/40 p-2 hover:bg-white-light/90 hover:text-primary dark:bg-dark/40 dark:hover:bg-dark/60'
                  }`}
                  onClick={() => dispatch(toggleTheme('system'))}
                >
                  <IconMoon />
                </button>
              )}
              {themeConfig.theme === 'system' && (
                <button
                  className={`${
                    themeConfig.theme === 'system' &&
                    'flex items-center rounded-full bg-white-light/40 p-2 hover:bg-white-light/90 hover:text-primary dark:bg-dark/40 dark:hover:bg-dark/60'
                  }`}
                  onClick={() => dispatch(toggleTheme('light'))}
                >
                  <IconLaptop />
                </button>
              )}
            </div>

            <div className="dropdown shrink-0">
              <Dropdown
                offset={[0, 8]}
                placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                btnClassName="relative block p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
                button={
                  <span>
                    <IconBellBing />
                    <span className="absolute top-0 flex h-3 w-3 ltr:right-0 rtl:left-0">
                      <span className="absolute -top-[3px] inline-flex h-full w-full animate-ping rounded-full bg-success/50 opacity-75 ltr:-left-[3px] rtl:-right-[3px]"></span>
                      <span className="relative inline-flex h-[6px] w-[6px] rounded-full bg-success"></span>
                    </span>
                  </span>
                }
              >
                <ul className="w-[300px] divide-y !py-0 text-dark dark:divide-white/10 dark:text-white-dark sm:w-[350px]">
                  <li onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-between px-4 py-2 font-semibold">
                      <h4 className="text-lg">Notification</h4>
                      {notifications.length ? (
                        <span className="badge bg-primary/80">{notifications.length}New</span>
                      ) : (
                        ''
                      )}
                    </div>
                  </li>
                  {notifications.length > 0 ? (
                    <>
                      {notifications.map((notification) => {
                        return (
                          <li
                            key={notification.id}
                            className="dark:text-white-light/90"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <div className="group flex items-center px-4 py-2">
                              <div className="grid place-content-center rounded">
                                <div className="relative h-12 w-12">
                                  <img
                                    className="h-12 w-12 rounded-full object-cover"
                                    alt="profile"
                                    src={`/assets/images/${notification.profile}`}
                                  />
                                  <span className="absolute bottom-0 right-[6px] block h-2 w-2 rounded-full bg-success"></span>
                                </div>
                              </div>
                              <div className="flex flex-auto ltr:pl-3 rtl:pr-3">
                                <div className="ltr:pr-3 rtl:pl-3">
                                  <h6
                                    dangerouslySetInnerHTML={{
                                      __html: notification.message,
                                    }}
                                  ></h6>
                                  <span className="block text-xs font-normal dark:text-gray-500">
                                    {notification.time}
                                  </span>
                                </div>
                                <button
                                  type="button"
                                  className="text-neutral-300 opacity-0 hover:text-danger group-hover:opacity-100 ltr:ml-auto rtl:mr-auto"
                                  onClick={() => removeNotification(notification.id)}
                                >
                                  <IconXCircle />
                                </button>
                              </div>
                            </div>
                          </li>
                        );
                      })}
                      <li>
                        <div className="p-4">
                          <button className="btn btn-primary btn-small block w-full">Read All Notifications</button>
                        </div>
                      </li>
                    </>
                  ) : (
                    <li onClick={(e) => e.stopPropagation()}>
                      <button
                        type="button"
                        className="!grid min-h-[200px] place-content-center text-lg hover:!bg-transparent"
                      >
                        <div className="mx-auto mb-4 rounded-full ring-4 ring-primary/30">
                          <IconInfoCircle fill={true} className="h-10 w-10 text-primary" />
                        </div>
                        No data available.
                      </button>
                    </li>
                  )}
                </ul>
              </Dropdown>
            </div>
            <div className="dropdown flex shrink-0">
              <Dropdown
                offset={[0, 8]}
                placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                btnClassName="relative group block"
                button={<ProfileImage profileImageUrl={currentUser?.profileImageUrl} />}
              >
                <ul className="w-[230px] !py-0 font-semibold text-dark dark:text-white-dark dark:text-white-light/90">
                  <li>
                    <div className="flex items-center px-4 py-4">
                      {currentUser?.profileImageUrl ? (
                        <Image
                          className="h-10 w-10 rounded-md object-cover"
                          src={process.env.NEXT_PUBLIC_BASE_URL + currentUser?.profileImageUrl}
                          alt="userProfile"
                          width={40}
                          height={40}
                        />
                      ) : (
                        <Image
                          className="h-10 w-10 rounded-md object-cover"
                          src="/assets/images/user-profile-vislog-plus.jpg"
                          alt="profile image default"
                          width={40}
                          height={40}
                        />
                      )}
                      <div className="truncate ltr:pl-4 rtl:pr-4">
                        <h4 className="text-base">
                          {currentUser?.name}
                          <span className="rounded bg-success-light px-1 text-xs text-success ltr:ml-2 rtl:ml-2">
                            Pro
                          </span>
                        </h4>
                        <button
                          type="button"
                          className="text-black/60 hover:text-primary dark:text-dark-light/60 dark:hover:text-white"
                        >
                          {currentUser?.email}
                        </button>
                      </div>
                    </div>
                  </li>
                  <li>
                    <Link href="/dashboard/users/profile" className="dark:hover:text-white">
                      <IconUser className="h-4.5 w-4.5 shrink-0 ltr:mr-2 rtl:ml-2" />
                      Profile
                    </Link>
                  </li>
                  <li className="border-t border-white-light dark:border-white-light/10">
                    <Link href="/auth/signin" className="!py-3 text-danger" onClick={handleSignOut}>
                      <IconLogout className="h-4.5 w-4.5 shrink-0 rotate-90 ltr:mr-2 rtl:ml-2" />
                      Sign Out
                    </Link>
                  </li>
                </ul>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
