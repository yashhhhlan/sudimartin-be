import IconMenuDigital from '../components/icon/menu/icon-menu-digital';
import IconMenuDemoRequest from '../components/icon/menu/icon-menu-demo-request';
import IconMenuNotification from '../components/icon/menu/icon-menu-notification';
import IconMenuUserAccount from '../components/icon/menu/icon-menu-user-account';
import IconMenuSupport from '@/components/icon/menu/icon-menu-support';
import IconMenuUserReport from '@/components/icon/menu/icon-menu-user-report';
import IconMenuDashboard from '@/components/icon/menu/icon-menu-dashboard';
import IconMenuHistory from '@/components/icon/menu/icon-menu-history';
import IconMenuAnalysis from '@/components/icon/menu/icon-menu-analysis';
import IconMenuOverview from '@/components/icon/menu/icon-menu-overview';
import IconMenuSentiment from '@/components/icon/menu/icon-menu-sentiment';
import IconMenuTopic from '@/components/icon/menu/icon-menu-topic';
import IconMenuInfluencer from '@/components/icon/menu/icon-menu-influencer';
import IconMenuMapInteraction from '@/components/icon/menu/icon-menu-map-interaction';
import IconMenuMapDistribution from '@/components/icon/menu/icon-menu-map-distribution';
import IconMenuAIAnalysis from '@/components/icon/menu/icon-menu-ai-analysis';
import IconMenuExcel from '@/components/icon/menu/icon-menu-excel';
import IconMenuPDF from '@/components/icon/menu/icon-menu-pdf';
import IconMenuMediaMonitoring from '@/components/icon/menu/icon-menu-media-monitoring';
import IconMenuReport from '@/components/icon/menu/icon-menu-report';
import IconMenuUser from '@/components/icon/menu/icon-menu-user';

import { MenuConfig } from '@/types/components';

export const MENU_CONFIG: MenuConfig = {
  'Media Monitoring': {
    title: 'Media Monitoring',
    icon: IconMenuMediaMonitoring,
    items: [
      { name: 'Overview', path: '/dashboard/media-monitoring/overview', icon: IconMenuOverview },
      { name: 'Dashboard', path: '/dashboard/media-monitoring/dashboard', icon: IconMenuDashboard },
      { name: 'Content', path: '/dashboard/media-monitoring/content', icon: IconMenuOverview },
      { name: 'History', path: '/dashboard/media-monitoring/history', icon: IconMenuHistory },
      { name: 'Analysis', path: '/dashboard/media-monitoring/analysis', icon: IconMenuAnalysis },
      { name: 'Sentiment', path: '/dashboard/media-monitoring/sentiment', icon: IconMenuSentiment },
      { name: 'Topic', path: '/dashboard/media-monitoring/topic', icon: IconMenuTopic },
      { name: 'Influencer', path: '/dashboard/media-monitoring/influencer', icon: IconMenuInfluencer },
      { name: 'Map Interaction', path: '/dashboard/media-monitoring/map-interaction', icon: IconMenuMapInteraction },
      { name: 'Map Distribution', path: '/dashboard/media-monitoring/map-distribution', icon: IconMenuMapDistribution },
    ],
  },
  'AI Analysis': {
    title: 'AI Analisis',
    icon: IconMenuAIAnalysis,
    items: [{ name: 'AI Analysis', path: '/dashboard/ai-analysis/ai-analysis', icon: IconMenuAIAnalysis }],
  },
  Report: {
    title: 'Laporan',
    icon: IconMenuReport,
    items: [
      { name: 'Excel', path: '/dashboard/report/excel', icon: IconMenuExcel },
      { name: 'PDF', path: '/dashboard/report/pdf', icon: IconMenuPDF },
    ],
  },
  Administrator: {
    title: 'administrator',
    icon: IconMenuUser,
    submenus: {
      upload_digital: {
        title: 'upload digital',
        icon: IconMenuDigital,
        items: [
          { name: 'Domain', path: '/dashboard/administrator/upload-digital/domain' },
          { name: 'Mention', path: '/dashboard/administrator/upload-digital/mention' },
          { name: 'Pop Mention', path: '/dashboard/administrator/upload-digital/pop-mention' },
          { name: 'Pop Account DL', path: '/dashboard/administrator/upload-digital/pop-account-dl' },
          { name: 'Hashtag DL', path: '/dashboard/administrator/upload-digital/hashtag-dl' },
          { name: 'Web Visits', path: '/dashboard/administrator/upload-digital/web-visits' },
          { name: 'Metric', path: '/dashboard/administrator/upload-digital/metric' },
          { name: 'Project Name', path: '/dashboard/administrator/upload-digital/project-name' },
          { name: 'Summary', path: '/dashboard/administrator/upload-digital/summary' },
          { name: 'Topic', path: '/dashboard/administrator/upload-digital/topic' },
          { name: 'Emotion', path: '/dashboard/administrator/upload-digital/emotion' },
        ],
      },
    },
    items: [
      { name: 'Demo Request', path: '/dashboard/administrator/demo-request', icon: IconMenuDemoRequest },
      { name: 'Notification', path: '/dashboard/administrator/notification', icon: IconMenuNotification },
      { name: 'Support', path: '/dashboard/administrator/support', icon: IconMenuSupport },
      { name: 'User Account', path: '/dashboard/administrator/user-account', icon: IconMenuUserAccount },
      { name: 'User Report', path: '/dashboard/administrator/user-report', icon: IconMenuUserReport },
    ],
  },
};
