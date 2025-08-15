'use client';

import Link from 'next/link';

import { MenuItem } from '@/types/components';

const SidebarMenuItem = ({ item, t }: { item: MenuItem; t: any }) => {
  const Icon = item.icon;
  const label = item.label || item.name;

  return (
    <li className="nav-item hover:bg-gray-700">
      <Link href={item.path} className="group">
        <div className="flex items-center">
          <Icon className="shrink-0 group-hover:!text-primary" />
          <span className="text-white ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark capitalize">
            {t(label)}
          </span>
        </div>
      </Link>
    </li>
  );
};

export default SidebarMenuItem;
