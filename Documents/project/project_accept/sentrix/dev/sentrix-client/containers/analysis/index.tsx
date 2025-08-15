'use client';
import { Box, Text, Image } from '@mantine/core';
import CategoryMentionChart from './components/category-mention-chart';
import MetricsRow from './components/metrics-row';
import MostInfluentialSitesDataTable from './components/most-influential-sites-data-table';
import NumericalSummaryStat from './components/numerical-summary-stat';
import ReachChart from './components/reach-chart';
import TopPublicProfiles from './components/top-public-profiles';
import { ICCalendar } from '@/assets/icons';

const metrics = {
  mention: {
    total: 15420,
    totalFormatted: '15,420',
    growth: 12.5,
    trend: [
      { date: '2023-01-01', value: 1200 },
      { date: '2023-01-02', value: 1350 },
      { date: '2023-01-03', value: 1180 },
      { date: '2023-01-04', value: 1420 },
      { date: '2023-01-05', value: 1380 },
      { date: '2023-01-06', value: 1520 },
      { date: '2023-01-07', value: 1680 },
    ],
  },
  socialMediaReach: {
    total: 245680,
    totalFormatted: '245.7K',
    growth: 8.3,
    trend: [
      { date: '2023-01-01', value: 32000 },
      { date: '2023-01-02', value: 35500 },
      { date: '2023-01-03', value: 33200 },
      { date: '2023-01-04', value: 38900 },
      { date: '2023-01-05', value: 41200 },
      { date: '2023-01-06', value: 39800 },
      { date: '2023-01-07', value: 43100 },
    ],
  },
  nonSocialReach: {
    total: 89340,
    totalFormatted: '89.3K',
    growth: -2.1,
    trend: [
      { date: '2023-01-01', value: 12800 },
      { date: '2023-01-02', value: 13200 },
      { date: '2023-01-03', value: 11900 },
      { date: '2023-01-04', value: 12400 },
      { date: '2023-01-05', value: 11600 },
      { date: '2023-01-06', value: 12100 },
      { date: '2023-01-07', value: 11300 },
    ],
  },
  positiveMention: {
    total: 11850,
    totalFormatted: '11.9K',
    growth: 15.7,
    trend: [
      { date: '2023-01-01', value: 980 },
      { date: '2023-01-02', value: 1120 },
      { date: '2023-01-03', value: 1050 },
      { date: '2023-01-04', value: 1280 },
      { date: '2023-01-05', value: 1350 },
      { date: '2023-01-06', value: 1420 },
      { date: '2023-01-07', value: 1580 },
    ],
  },
  negativeMention: {
    total: 2340,
    totalFormatted: '2.3K',
    growth: -5.2,
    trend: [
      { date: '2023-01-01', value: 380 },
      { date: '2023-01-02', value: 340 },
      { date: '2023-01-03', value: 320 },
      { date: '2023-01-04', value: 290 },
      { date: '2023-01-05', value: 310 },
      { date: '2023-01-06', value: 280 },
      { date: '2023-01-07', value: 260 },
    ],
  },
  neutralMention: {
    total: 1230,
    totalFormatted: '1.2K',
    growth: 0.0,
    trend: [
      { date: '2023-01-01', value: 180 },
      { date: '2023-01-02', value: 175 },
      { date: '2023-01-03', value: 185 },
      { date: '2023-01-04', value: 170 },
      { date: '2023-01-05', value: 180 },
      { date: '2023-01-06', value: 175 },
      { date: '2023-01-07', value: 180 },
    ],
  },
  ave: {
    total: 1250000,
    totalFormatted: '1.25M',
    growth: 18.9,
    trend: [
      { date: '2023-01-01', value: 165000 },
      { date: '2023-01-02', value: 178000 },
      { date: '2023-01-03', value: 182000 },
      { date: '2023-01-04', value: 195000 },
      { date: '2023-01-05', value: 203000 },
      { date: '2023-01-06', value: 218000 },
      { date: '2023-01-07', value: 225000 },
    ],
  },
  socialMediaMention: {
    total: 12680,
    totalFormatted: '12.7K',
    growth: 9.4,
    trend: [
      { date: '2023-01-01', value: 1100 },
      { date: '2023-01-02', value: 1250 },
      { date: '2023-01-03', value: 1180 },
      { date: '2023-01-04', value: 1380 },
      { date: '2023-01-05', value: 1420 },
      { date: '2023-01-06', value: 1520 },
      { date: '2023-01-07', value: 1650 },
    ],
  },
  nonSocialMediaMention: {
    total: 2740,
    totalFormatted: '2.7K',
    growth: 22.1,
    trend: [
      { date: '2023-01-01', value: 300 },
      { date: '2023-01-02', value: 350 },
      { date: '2023-01-03', value: 380 },
      { date: '2023-01-04', value: 420 },
      { date: '2023-01-05', value: 450 },
      { date: '2023-01-06', value: 480 },
      { date: '2023-01-07', value: 520 },
    ],
  },
  userGeneratedContent: {
    total: 8950,
    totalFormatted: '8.9K',
    growth: 25.3,
    trend: [
      { date: '2023-01-01', value: 850 },
      { date: '2023-01-02', value: 920 },
      { date: '2023-01-03', value: 1050 },
      { date: '2023-01-04', value: 1180 },
      { date: '2023-01-05', value: 1250 },
      { date: '2023-01-06', value: 1380 },
      { date: '2023-01-07', value: 1520 },
    ],
  },
  reach: {
    total: 335020,
    totalFormatted: '335K',
    growth: 6.8,
    trend: [
      { date: '2023-01-01', value: 44800 },
      { date: '2023-01-02', value: 48700 },
      { date: '2023-01-03', value: 45100 },
      { date: '2023-01-04', value: 51300 },
      { date: '2023-01-05', value: 52800 },
      { date: '2023-01-06', value: 51900 },
      { date: '2023-01-07', value: 54400 },
    ],
  },
  interaction: {
    total: 45680,
    totalFormatted: '45.7K',
    growth: 14.2,
    trend: [
      { date: '2023-01-01', value: 5200 },
      { date: '2023-01-02', value: 5800 },
      { date: '2023-01-03', value: 6100 },
      { date: '2023-01-04', value: 6750 },
      { date: '2023-01-05', value: 7200 },
      { date: '2023-01-06', value: 7800 },
      { date: '2023-01-07', value: 8300 },
    ],
  },
  socialMediaLikes: {
    total: 28340,
    totalFormatted: '28.3K',
    growth: 11.7,
    trend: [
      { date: '2023-01-01', value: 3200 },
      { date: '2023-01-02', value: 3650 },
      { date: '2023-01-03', value: 3880 },
      { date: '2023-01-04', value: 4200 },
      { date: '2023-01-05', value: 4500 },
      { date: '2023-01-06', value: 4850 },
      { date: '2023-01-07', value: 5200 },
    ],
  },
  numberOfShares: {
    total: 12450,
    totalFormatted: '12.5K',
    growth: 19.3,
    trend: [
      { date: '2023-01-01', value: 1200 },
      { date: '2023-01-02', value: 1350 },
      { date: '2023-01-03', value: 1480 },
      { date: '2023-01-04', value: 1620 },
      { date: '2023-01-05', value: 1750 },
      { date: '2023-01-06', value: 1880 },
      { date: '2023-01-07', value: 2100 },
    ],
  },
};

const categoryMentionStats = [
  {
    category: 'Berita',
    mention: [
      {
        project: 'Arema FC Malang',
        date: '2025-05-01T00:00:00.000Z',
        time: '9:36',
        title: 'Arema Resmi Lepas Wiliam Marcilio dan Choi Bo Kyung',
        content:
          '[...]com, MALANG Arema FC resmi melepas dua pemain asingnya, yakni Wiliam Marcilio dan Choi Bo Kyung menjelang akhir kompetisi Liga 1 musim 2024/2025 [...] [...]General Manager Arema FC Yusrinal Fitriandi di Kota Malang, Jawa Timur, Kamis, mengucapk',
        source: 'https://infoliputanbaru.com/arema-resmi-lepas-wiliam-marcilio-dan-choi-bo-kyung-15484.html',
        domain: 'infoliputanbaru.com',
        category: 'Berita',
        sentiment: 0,
        tag: 'abc',
        views: 123,
        followers: 123,
        score: 1,
      },
    ],
  },
  {
    category: 'Berita',
    mention: [
      {
        project: 'Arema FC Malang',
        date: '2025-05-01T00:00:00.000Z',
        time: '9:36',
        title: 'Arema Resmi Lepas Wiliam Marcilio dan Choi Bo Kyung',
        content:
          '[...]com, MALANG Arema FC resmi melepas dua pemain asingnya, yakni Wiliam Marcilio dan Choi Bo Kyung menjelang akhir kompetisi Liga 1 musim 2024/2025 [...] [...]General Manager Arema FC Yusrinal Fitriandi di Kota Malang, Jawa Timur, Kamis, mengucapk',
        source: 'https://infoliputanbaru.com/arema-resmi-lepas-wiliam-marcilio-dan-choi-bo-kyung-15484.html',
        domain: 'infoliputanbaru.com',
        category: 'Berita',
        sentiment: 0,
        tag: 'abc',
        views: 123,
        followers: 123,
        score: 1,
      },
    ],
  },
  {
    category: 'Berita',
    mention: [
      {
        project: 'Arema FC Malang',
        date: '2025-05-01T00:00:00.000Z',
        time: '9:36',
        title: 'Arema Resmi Lepas Wiliam Marcilio dan Choi Bo Kyung',
        content:
          '[...]com, MALANG Arema FC resmi melepas dua pemain asingnya, yakni Wiliam Marcilio dan Choi Bo Kyung menjelang akhir kompetisi Liga 1 musim 2024/2025 [...] [...]General Manager Arema FC Yusrinal Fitriandi di Kota Malang, Jawa Timur, Kamis, mengucapk',
        source: 'https://infoliputanbaru.com/arema-resmi-lepas-wiliam-marcilio-dan-choi-bo-kyung-15484.html',
        domain: 'infoliputanbaru.com',
        category: 'Berita',
        sentiment: 0,
        tag: 'abc',
        views: 123,
        followers: 123,
        score: 1,
      },
    ],
  },
  {
    category: 'Berita',
    mention: [
      {
        project: 'Arema FC Malang',
        date: '2025-05-01T00:00:00.000Z',
        time: '9:36',
        title: 'Arema Resmi Lepas Wiliam Marcilio dan Choi Bo Kyung',
        content:
          '[...]com, MALANG Arema FC resmi melepas dua pemain asingnya, yakni Wiliam Marcilio dan Choi Bo Kyung menjelang akhir kompetisi Liga 1 musim 2024/2025 [...] [...]General Manager Arema FC Yusrinal Fitriandi di Kota Malang, Jawa Timur, Kamis, mengucapk',
        source: 'https://infoliputanbaru.com/arema-resmi-lepas-wiliam-marcilio-dan-choi-bo-kyung-15484.html',
        domain: 'infoliputanbaru.com',
        category: 'Berita',
        sentiment: 0,
        tag: 'abc',
        views: 123,
        followers: 123,
        score: 1,
      },
    ],
  },
  {
    category: 'Berita',
    mention: [
      {
        project: 'Arema FC Malang',
        date: '2025-05-01T00:00:00.000Z',
        time: '9:36',
        title: 'Arema Resmi Lepas Wiliam Marcilio dan Choi Bo Kyung',
        content:
          '[...]com, MALANG Arema FC resmi melepas dua pemain asingnya, yakni Wiliam Marcilio dan Choi Bo Kyung menjelang akhir kompetisi Liga 1 musim 2024/2025 [...] [...]General Manager Arema FC Yusrinal Fitriandi di Kota Malang, Jawa Timur, Kamis, mengucapk',
        source: 'https://infoliputanbaru.com/arema-resmi-lepas-wiliam-marcilio-dan-choi-bo-kyung-15484.html',
        domain: 'infoliputanbaru.com',
        category: 'Berita',
        sentiment: 0,
        tag: 'abc',
        views: 123,
        followers: 123,
        score: 1,
      },
    ],
  },
  {
    category: 'Berita',
    mention: [
      {
        project: 'Arema FC Malang',
        date: '2025-05-01T00:00:00.000Z',
        time: '9:36',
        title: 'Arema Resmi Lepas Wiliam Marcilio dan Choi Bo Kyung',
        content:
          '[...]com, MALANG Arema FC resmi melepas dua pemain asingnya, yakni Wiliam Marcilio dan Choi Bo Kyung menjelang akhir kompetisi Liga 1 musim 2024/2025 [...] [...]General Manager Arema FC Yusrinal Fitriandi di Kota Malang, Jawa Timur, Kamis, mengucapk',
        source: 'https://infoliputanbaru.com/arema-resmi-lepas-wiliam-marcilio-dan-choi-bo-kyung-15484.html',
        domain: 'infoliputanbaru.com',
        category: 'Berita',
        sentiment: 0,
        tag: 'abc',
        views: 123,
        followers: 123,
        score: 1,
      },
    ],
  },
];

const reachSummaryStats = [
  {
    date: '2023-01-01',
    valueA: 32000,
    valueB: 12800,
  },
  {
    date: '2023-01-02',
    valueA: 35500,
    valueB: 13200,
  },
  {
    date: '2023-01-03',
    valueA: 33200,
    valueB: 11900,
  },
  {
    date: '2023-01-04',
    valueA: 38900,
    valueB: 12400,
  },
  {
    date: '2023-01-05',
    valueA: 41200,
    valueB: 11600,
  },
  {
    date: '2023-01-06',
    valueA: 39800,
    valueB: 12100,
  },
  {
    date: '2023-01-07',
    valueA: 43100,
    valueB: 11300,
  }
];

const mostInfluentialSitesData = [
  {
    sites: 'techcrunch.com',
    mentions: 45,
    visits: 1250000,
    visitFormatted: '1.25M',
    score: 92.5,
  },
  {
    sites: 'twitter.com',
    mentions: 128,
    visits: 890000,
    visitFormatted: '890K',
    score: 88.7,
  },
  {
    sites: 'reddit.com',
    mentions: 67,
    visits: 650000,
    visitFormatted: '650K',
    score: 75.3,
  },
];

const topPublicProfilesData = [
  {
    accountName: '@elonmusk',
    domain: 'twitter.com',
    platformName: 'Twitter',
    totalCoverage: 2850000,
    totalCoverageFormatted: '2.85M',
    coveragePercentage: 35.2,
    coveragePercentageFormatted: '35.2%',
    logo: '/assets/images/platforms/instagram.png',
  },
  {
    accountName: 'cristiano',
    domain: 'instagram.com',
    platformName: 'Instagram',
    totalCoverage: 1920000,
    totalCoverageFormatted: '1.92M',
    coveragePercentage: 28.7,
    coveragePercentageFormatted: '28.7%',
    logo: '/assets/images/platforms/instagram.png',
  },
  {
    accountName: 'Microsoft',
    domain: 'linkedin.com',
    platformName: 'LinkedIn',
    totalCoverage: 1450000,
    totalCoverageFormatted: '1.45M',
    coveragePercentage: 22.1,
    coveragePercentageFormatted: '22.1%',
    logo: '/assets/images/platforms/instagram.png',
  },
  {
    accountName: 'PewDiePie',
    domain: 'youtube.com',
    platformName: 'YouTube',
    totalCoverage: 980000,
    totalCoverageFormatted: '980K',
    coveragePercentage: 18.5,
    coveragePercentageFormatted: '18.5%',
    logo: '/assets/images/platforms/instagram.png',
  },
  {
    accountName: 'u/technology',
    domain: 'reddit.com',
    platformName: 'Reddit',
    totalCoverage: 750000,
    totalCoverageFormatted: '750K',
    coveragePercentage: 15.8,
    coveragePercentageFormatted: '15.8%',
    logo: '/assets/images/platforms/instagram.png',
  },
  {
    accountName: 'Meta',
    domain: 'facebook.com',
    platformName: 'Facebook',
    totalCoverage: 680000,
    totalCoverageFormatted: '680K',
    coveragePercentage: 12.3,
    coveragePercentageFormatted: '12.3%',
    logo: '/assets/images/platforms/instagram.png',
  },
];

const HeaderContent = ({ date }: { date: string }) => {
  return (
    <Box mb={30}>
      <Text size={32} fw="bold">Analysis</Text>
      <Box className="flex items-center gap-2">
        <Image src={ICCalendar.src} height={16} width={16} alt="Calendar" />
        <Text size={14} fw={600}>{date}</Text>
      </Box>
    </Box>
  );
};

const Analysis = () => {
  return (
    <>
    <div>
      <HeaderContent date="17 Jul 2025 - 18 Jul 2025"  />
    </div>
    <div>
      <MetricsRow metrics={metrics} />
      <div className="flex gap-4 w-full h-full mt-4">
        <NumericalSummaryStat metrics={metrics} />
        <CategoryMentionChart data={categoryMentionStats} />
      </div>
      <div className="flex gap-4 w-full h-full mt-4">
        <ReachChart data={reachSummaryStats} seriesAName='Media Sosial' seriesBName='Non-Media sosial' />
        <ReachChart data={reachSummaryStats} seriesAName='Positif' seriesBName='Negatif' title='Sentimen' color={['#2196F3', '#E7515A']} />
      </div>
      <div className="flex gap-4 w-full h-full mt-4">
        <MostInfluentialSitesDataTable data={mostInfluentialSitesData} isPendingMostInfluentialSites={false} />
        <TopPublicProfiles data={topPublicProfilesData} isPendingTopPublicProfile={false} />
      </div>
    </div>
    </>
  );
};

export default Analysis;
