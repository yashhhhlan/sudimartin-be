import { TABS_MENU_ENUM } from "../types/tabs.enum"
import { ITabs } from "../types/tabs.interfaces"
import MediaCard from "../MediaCard"
import MediaList from "../MediaList"

export const TabStyle = {
    ".mantine-UnstyledButton-root": {
      borderRadius: '20px',
      boxShadow: '0px 10px 20px -10px #0E172633',
      fontSize: '14px',
      padding: '0.6rem 3rem'
    },
    ".mantine-UnstyledButton-root[aria-selected='true'], .mantine-UnstyledButton-root[aria-selected='true']:hover": {
      background: '#4361EE',
      
    },
    ".mantine-UnstyledButton-root[aria-selected='false']": {
      background: '#ffffff'
    },
}

export const TABS_MENU: ITabs[] = [
    {
      label: TABS_MENU_ENUM.MEDIA_CETAK,
      value: TABS_MENU_ENUM.MEDIA_CETAK.toLowerCase(),
      component: MediaCard
    },
    {
      label: TABS_MENU_ENUM.MEDIA_ONLINE,
      value: TABS_MENU_ENUM.MEDIA_ONLINE.toLowerCase(),
      component: MediaList
    },
    {
      label: TABS_MENU_ENUM.TV,
      value: TABS_MENU_ENUM.TV.toLowerCase(),
      component: MediaCard
    },
    {
      label: TABS_MENU_ENUM.MEDIA_SOSIAL,
      value: TABS_MENU_ENUM.MEDIA_SOSIAL.toLowerCase(),
      component: MediaList
    },
]
  