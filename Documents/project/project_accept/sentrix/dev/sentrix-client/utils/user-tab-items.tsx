import IconFeature from '@/components/icon/icon-feature';
import IconHome from '@/components/icon/icon-home';
import IconMenuProjectName from '@/components/icon/icon-project-name';
import IconReport from '@/components/icon/icon-report';
import IconSupport from '@/components/icon/icon-support';

export const userTabItems = [
  {
    label: 'Info',
    tabs: 'info',
    icon: <IconHome />,
  },
  {
    label: 'Features',
    tabs: 'features',
    icon: <IconFeature />,
  },
  {
    label: 'Project Name',
    tabs: 'project name',
    icon: <IconMenuProjectName />,
  },
  {
    label: 'Report',
    tabs: 'report',
    icon: <IconReport />,
  },
  {
    label: 'Support',
    tabs: 'support',
    icon: <IconSupport />,
  },
];
