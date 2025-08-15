'use client';
import { useState } from 'react';
import { ICCalendar } from '@/assets/icons';
import { Box, Tabs, Text, Image } from '@mantine/core';
import { TABS_MENU, TabStyle } from './constants/tabs.constants';
import { TABS_MENU_ENUM } from './types/tabs.enum';
import { TabsProvider, useTabs } from './providers/TabsContext';

const HeaderContent = ({ date }: { date: string }) => {
  return (
    <Box mb={30}>
      <Text size={32} fw="bold">Konten</Text>
      <Box className="flex items-center gap-2">
        <Image src={ICCalendar.src} height={16} width={16} alt="Calendar" />
        <Text size={14} fw={600}>{date}</Text>
      </Box>
    </Box>
  );
};

export default function Content() {

  const [tab, setTab] = useState<string>(
    TABS_MENU_ENUM.MEDIA_CETAK.toLowerCase()
  );

  return (
    <Tabs
      variant="pills"
      value={tab}
      onTabChange={ (value: string) => setTab(value)}
    >
      <Tabs.List className="flex justify-center" sx={TabStyle}>
        {TABS_MENU.map((tab) => (
          <Tabs.Tab key={tab.value} value={tab.value}>
            {tab.label}
          </Tabs.Tab>
        ))}
      </Tabs.List>

      <Box>
        <HeaderContent date="17 Jul 2025 - 18 Jul 2025" />
      </Box>

      {TABS_MENU.map((x) => {
          const TabComponent = () => {
            const ctx = useTabs();
            ctx.setActiveTab(tab);
            const DynamicComponent = x.component;
            return <DynamicComponent />;
          };
        return (
          <Tabs.Panel key={x.value} value={x.value}>
            <TabsProvider>
              {TabComponent ? <TabComponent/> : null}
            </TabsProvider>
          </Tabs.Panel>
        );
      })}
    </Tabs>
  );
}
