interface TrendData {
  date: string;
  value: number;
}

export interface MetricData {
  total: number;
  totalFormatted: string;
  growth: number;
  trend: TrendData[];
}

export interface MetricStatsData {
  mention?: MetricData;
  socialMediaMention?: MetricData;
  nonSocialMediaMention?: MetricData;
  userGeneratedContent?: MetricData;
  positiveMention?: MetricData;
  negativeMention?: MetricData;
  neutralMention?: MetricData;
  reach?: MetricData;
  ave?: MetricData;
  socialMediaReach?: MetricData;
  nonSocialReach?: MetricData;
  interaction?: MetricData;
  socialMediaLikes?: MetricData;
  numberOfShares?: MetricData;
}

export interface SummaryStatsData {
  reach: MetricData;
  interactions: MetricData;
  ave: MetricData;
  socialMediaLikes: MetricData;
  numberOfShares: MetricData;
  socialMediaReach: MetricData;
  nonSocialMediaReach: MetricData;
  meta: {
    filterPeriod: string;
    growthPeriod: string;
    generatedAt: string;
  };
}

export interface MentionStatsData {
  mentions: MetricData;
  socialMediaMention: MetricData;
  nonSocialMediaMention: MetricData;
  userGeneratedContent: MetricData;
  positiveMention: MetricData;
  negativeMention: MetricData;
  neutralMention: MetricData;
  meta: {
    filterPeriod: string;
    growthPeriod: string;
    generatedAt: string;
  };
}

export interface CategoryMentionDetailItem {
  project: string;
  date: string;
  time: string;
  title: string;
  content: string;
  source: string;
  domain: string;
  category: string;
  sentiment: number;
  tag: string;
  views: number;
  followers: number;
  score: number;
}

export interface CategoryMentionItem {
  category: string;
  mention: CategoryMentionDetailItem[];
}

export type CategoryMentionStatsData = CategoryMentionItem[];

export interface VolumeMentionItem {
  date: string;
  total: number;
}

export type VolumeMentionStatsData = VolumeMentionItem[];

export interface InsightItem {
  id: string;
  content: string;
  startDate: string;
  createdAt: string;
}

export type InsightTimelineData = InsightItem[];

export interface ReachStatsSummaryItem {
  date: string;
  valueA: number;
  valueB: number;
}

export type ReachStatsSummaryData = ReachStatsSummaryItem[];

export interface SentimentMentionStatsItem {
  date: string;
  positiveCount: number;
  negativeCount: number;
}

export type SentimentMentionStatsData = SentimentMentionStatsItem[];

export interface SentimentCategoriesMentionStatsItem {
  category: string;
  positiveCount: number;
  negativeCount: number;
  neutralCount: number;
  totalCount: number;
}

export type SentimentCategoriesMentionStatsData = SentimentCategoriesMentionStatsItem[];

export interface TrendingHashtagDigitalHashtagDLItem {
  hashtag: string;
  totalMention: number;
  totalMentionFormatted: string;
}

export type TrendingHashtagDigitalHashtagDLData = TrendingHashtagDigitalHashtagDLItem[];

export interface TopicAnalysisItem {
  topic: string;
  description: string;
  totalMention: number;
  totalReach: number;
  totalMentionFormatted: string;
  totalReachFormatted: string;
}

export type TopicAnalysisData = TopicAnalysisItem[];

export interface MostActiveSitesItem {
  domain: string;
  category: string;
  totalMention: number;
  totalMentionFormatted: string;
}

export type MostActiveSitesData = MostActiveSitesItem[];

export interface MostActivePublicProfileItem {
  accountName: string;
  domain: string;
  platformName: string;
  totalMention: number;
  totalMentionFormatted: string;
  followers: number;
  followersFormatted: string;
  logo: any;
}

export type MostActivePublicProfileData = MostActivePublicProfileItem[];

export interface MostInfluentialSitesItem {
  sites: string;
  mentions: number;
  visits: number;
  visitFormatted: string;
  score: number;
}

export type MostInfluentialSitesData = MostInfluentialSitesItem[];

export interface TopPublicProfileItem {
  accountName: string;
  domain: string;
  platformName: string;
  totalCoverage: number;
  totalCoverageFormatted: string;
  coveragePercentage: number;
  coveragePercentageFormatted: string;
  logo: any;
}

export type TopPublicProfileData = TopPublicProfileItem[];

export interface MentionItem {
  date: string;
  time: string;
  title: string;
  content: string;
  source: string;
  domain: string;
  totalScore: number;
}

export type MentionData = MentionItem[];

export type MentionStats = {
  positive: MentionData;
  negative: MentionData;
  neutral: MentionData;
};

export interface WordcloudItem {
  text: string;
  value: number;
}

export type WordcloudData = WordcloudItem[];
