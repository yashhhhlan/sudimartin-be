// TabsContext.tsx
import { createContext, useContext, useState, ReactNode } from "react";
import { TABS_MENU_ENUM } from "../types/tabs.enum";

interface ITabsContext {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabsContext = createContext<ITabsContext | undefined>(undefined);

export const TabsProvider = ({ children }: { children: ReactNode }) => {
  const [activeTab, setActiveTab] = useState<string>(TABS_MENU_ENUM.MEDIA_CETAK.toLowerCase());

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabsContext.Provider>
  );
};

export const useTabs = () => {
  const context = useContext(TabsContext);
  if (!context) throw new Error("useTabs must be used inside TabsProvider");
  return context;
};
