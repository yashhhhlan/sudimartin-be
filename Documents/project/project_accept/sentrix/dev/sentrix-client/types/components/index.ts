export interface MenuItem {
  name: string;
  path: string;
  icon: React.ComponentType<any>;
  label?: string;
}

export interface SubMenuItem {
  name: string;
  path: string;
}

export interface MenuCategory {
  title: string;
  icon?: React.ComponentType<any>;
  items?: MenuItem[];
  submenus?: {
    [key: string]: {
      title: string;
      icon: React.ComponentType<any>;
      items: SubMenuItem[];
    };
  };
}

export interface MenuConfig {
  [category: string]: MenuCategory;
}

interface BaseUserType {
  roleId: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  status: 'active' | 'suspended' | 'closed';
  expiredDate: Date;
  permissions?: string[];
  assignedProjects?: string[];
  accountLicense?: Date;
  dataPeriod?: {
    startDate: Date;
    endDate: Date;
  };
  targetAudiences?: string[];
  channels?: string[];
  programs?: string[];
  types?: string[];
  subtypes?: string[];
  sectors?: string[];
  categories?: string[];
  advertisers?: string[];
  products?: string[];
  adstypes?: string[];
}

export interface CreateUserType extends BaseUserType {
  password: string;
}

export interface EditUserType extends BaseUserType {
  userId: string;
  roleId: string;
}

export interface Permission {
  _id: string;
  name: string;
  category: string;
}

export interface UserTabProps {
  activeTabs: string;
  toggleTabs: (value: string) => void;
}

export interface UserTabItemsProps {
  icon: React.ReactNode;
  tabs: string;
  label: string;
  toggleTabs: (value: string) => void;
  activeTabs: string;
}

export interface KeywordInputProps {
  title: string;
  description: string;
  placeholder?: string;
  keywords: string[];
  onKeywordsChange: (keywords: string[]) => void;
  showArrow?: boolean;
}

interface ProjectFormData {
  name: string;
  logo?: string;
  status: string;
  mainKeywords: string[];
  optionalKeywords: string[];
  excludedKeywords: string[];
}

export interface MentionItem {
  id: number;
  platform: string;
  date: string;
  title: string;
  content: string;
  source?: string;
  domain?: string;
  borderColor: string;
  color?: string;
}

export interface ProjectFormProps {
  mode: 'create' | 'edit';
  initialData?: ProjectFormData;
  projectId?: string;
  onSubmit: (data: { projectId?: string; formData: FormData }) => Promise<any>;
  title: string;
  description?: React.ReactNode;
  submitButtonText?: string;
  successMessage?: string;
  redirectPath?: string;
}

export interface FormInputFileProps extends React.InputHTMLAttributes<HTMLInputElement> {
  mode?: 'create' | 'edit';
  label: string;
  fileName?: string;
  files?: File[];
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  className?: string;
  error?: string;
}

export interface ButtonActionProps {
  isDisabled: boolean;
  isPending?: boolean;
  mode: 'create' | 'edit';
}

interface Domain {
  domain: string;
  logo: string;
}

export interface DomainFormProps {
  mode: 'create' | 'edit';
  initialData?: Domain;
  domainId?: string;
  onSubmit: (data: { domainId?: string; formData: FormData }) => Promise<any>;
}

interface AIInsight {
  projectId: string;
  platform: string;
  startDate: Date;
  endDate: Date;
  metricId: string;
  content: string;
  file: string;
}

export interface AIInsightFormProps {
  mode: 'create' | 'edit';
  initialData?: AIInsight;
  aiInsightId?: string;
  onSubmit: (data: { aiInsightId?: string; formData: FormData }) => Promise<any>;
}

interface Metric {
  metric: string;
}

export interface DigitalMetricProps {
  mode: 'create' | 'edit';
  initialData?: Metric;
  metricId?: string;
  onSubmit: (data: { metricId?: string; metric: string }) => Promise<any>;
}

interface InfCategory {
  category: string;
  logo: string;
}

export interface InfCategoryFormProps {
  mode: 'create' | 'edit';
  initialData?: InfCategory;
  infCategoryId?: string;
  onSubmit: (data: { infCategoryId?: string; formData: FormData }) => Promise<any>;
}

interface InfStatus {
  influencerStatus: string;
}

export interface InfStatusFormProps {
  mode: 'create' | 'edit';
  initialData?: InfStatus;
  infStatusId?: string;
  onSubmit: (data: { infStatusId?: string; influencerStatus: string }) => Promise<any>;
}

export interface Influencer {
  url: string;
  email: string;
  phone: string;
  categoryIds: string[];
  domainIds: string;
}

export interface InfluencerFormProps {
  mode: 'create' | 'edit';
  initialData?: Influencer;
  influencerId?: string;
  onSubmit: (data: { influencerId?: string; formData: Influencer }) => Promise<any>;
}

export interface InfluencerCampaign {
  userId: string;
  domainId: string;
  influencerId: string;
  startDate: Date;
  endDate: Date;
  file: string;
}

export interface InfluencerCampaignFormProps {
  mode: 'create' | 'edit';
  initialData?: InfluencerCampaign;
  influencerCampaignId?: string;
  onSubmit: (data: { influencerCampaignId?: string; formData: FormData }) => Promise<any>;
}

export interface InfluencerManagement {
  userId: string;
  domainId: string;
  influencerId: string;
  statusId: string;
}

export interface InfluencerManagementFormProps {
  mode: 'create' | 'edit';
  initialData?: InfluencerManagement;
  influencerManagementId?: string;
  onSubmit: (data: { influencerManagementId?: string; formData: InfluencerManagement }) => Promise<any>;
}

interface TrendCategory {
  category: string;
  logo: string;
}

export interface TrendCategoryFormProps {
  mode: 'create' | 'edit';
  initialData?: TrendCategory;
  trendCategoryId?: string;
  onSubmit: (data: { trendCategoryId?: string; formData: FormData }) => Promise<any>;
}

export interface SMAccount {
  url: string;
  domainId: string;
  productId: string;
}

export interface SMAccountFormProps {
  mode: 'create' | 'edit';
  initialData?: SMAccount;
  smAccountId?: string;
  onSubmit: (data: { smAccountId?: string; formData: SMAccount }) => Promise<any>;
}

export interface Mention {
  files: FormData;
}

export interface MentionFormProps {
  onSubmit: (data: FormData) => Promise<any>;
}

export interface BulkDeleteDigitalMention {
  date: string;
  project: string;
}

export interface BulkDeleteDigitalMentionsProps {
  items: BulkDeleteDigitalMention[];
}

export interface PopMentionFormProps {
  onSubmit: ({ files }: Mention) => Promise<any>;
}

export interface BulkDeleteDigitalPopMention {
  date: string;
  project: string;
}

export interface BulkDeleteDigitalPopMentionsProps {
  items: BulkDeleteDigitalPopMention[];
}

export interface PopAccountDLFormProps {
  onSubmit: ({ files }: Mention) => Promise<any>;
}

export interface BulkDeleteDigitalPopAccountDL {
  date: string;
  project: string;
}

export interface BulkDeleteDigitalPopAccountDLProps {
  items: BulkDeleteDigitalPopAccountDL[];
}

export interface HashtagDLFormProps {
  onSubmit: ({ files }: Mention) => Promise<any>;
}

export interface BulkDeleteDigitalHashtagDL {
  date: string;
  project: string;
}

export interface BulkDeleteDigitalHashtagDLProps {
  items: BulkDeleteDigitalHashtagDL[];
}

export interface DigitalEmotion {
  files: FormData;
}

export interface DigitalEmotionFormProps {
  onSubmit: ({ files }: DigitalEmotion) => Promise<any>;
}

export interface BulkDeleteDigitalEmotion {
  date: string;
  project: string;
}

export interface BulkDeleteDigitalEmotionProps {
  items: BulkDeleteDigitalEmotion[];
}

export interface WebVisitsFormProps {
  onSubmit: ({ files }: Mention) => Promise<any>;
}

export interface BulkDeleteDigitalWebVisits {
  date: string;
  project: string;
}

export interface BulkDeleteDigitalWebVisitsProps {
  items: BulkDeleteDigitalWebVisits[];
}

export interface Summary {
  files: FormData;
}

export interface SummaryFormProps {
  onSubmit: ({ files }: Summary) => Promise<any>;
}

export interface BulkDeleteDigitalSummaries {
  date: string;
  project: string;
}

export interface BulkDeleteDigitalSummariesProps {
  items: BulkDeleteDigitalSummaries[];
}

export interface Topic {
  files: FormData;
}

export interface TopicFormProps {
  onSubmit: ({ files }: Topic) => Promise<any>;
}

export interface Trends {
  data: FormData;
}

export interface TrendsFormProps {
  onSubmit: ({ data }: Trends) => Promise<any>;
}

export interface BulkDeleteTrends {
  date: string;
}

export interface BulkDeleteTrendsProps {
  items: BulkDeleteTrends[];
}

export interface BumperSetting {
  name: string;
  bumperIn: string;
  bumperOut: string;
  status: boolean;
  isAdminCreated?: boolean;
  isEditable?: boolean;
}

export interface BumperSettingFormProps {
  mode: 'create' | 'edit';
  initialData?: BumperSetting;
  bumperSettingId?: string;
  onSubmit: (data: { bumperSettingId?: string; formData: BumperSetting }) => Promise<any>;
}

export interface Channel {
  channel: string;
}

export interface ChannelFormProps {
  mode: 'create' | 'edit';
  initialData?: Channel;
  channelId?: string;
  onSubmit: (data: { channelId?: string; formData: Channel }) => Promise<any>;
}

export interface Time {
  name: string;
  startTime: string;
  endTime: string;
}

export interface Daypart {
  name: string;
  time: Time[];
  status: boolean;
  createdBy?: string;
  isAdminCreated?: boolean;
  isEditable?: boolean;
}

export interface DaypartFormProps {
  mode: 'create' | 'edit';
  initialData?: Daypart;
  daypartId?: string;
  onSubmit: (data: { daypartId?: string; formData: Daypart }) => Promise<any>;
}

export interface Listening {
  data: FormData;
}

export interface ListeningFormProps {
  onSubmit: ({ data }: Listening) => Promise<any>;
}

export interface BulkDeleteListening {
  date: string;
  channel: string;
}

export interface BulkDeleteListeningProps {
  items: BulkDeleteListening[];
}

export interface TargetAudience {
  targetAudience: string;
}

export interface TargetAudienceFormProps {
  mode: 'create' | 'edit';
  initialData?: TargetAudience;
  targetAudienceId?: string;
  onSubmit: (data: { targetAudienceId?: string; formData: TargetAudience }) => Promise<any>;
}

export interface VideoLocation {
  startDate: Date;
  endDate: Date;
  location: string;
  quality: string;
}

export interface VideoLocationFormProps {
  mode: 'create' | 'edit';
  initialData?: VideoLocation;
  videoLocationId?: string;
  onSubmit: (data: { videoLocationId?: string; formData: VideoLocation }) => Promise<any>;
}

export interface VideoLog {
  date: Date;
  channelId: string;
  SDFiles: number;
  HDFiles: number;
  remarks: string;
}

export interface VideoLogFormProps {
  mode: 'create' | 'edit';
  initialData?: VideoLog;
  videoLogId?: string;
  onSubmit: (data: { videoLogId?: string; formData: VideoLog }) => Promise<any>;
}

export interface Sector {
  data: FormData;
}

export interface SectorFormProps {
  onSubmit: ({ data }: Sector) => Promise<any>;
}

export interface Category {
  data: FormData;
}

export interface CategoryFormProps {
  onSubmit: ({ data }: Category) => Promise<any>;
}

export interface Advertiser {
  data: FormData;
}

export interface AdvertiserFormProps {
  onSubmit: ({ data }: Advertiser) => Promise<any>;
}

export interface Product {
  data: FormData;
}

export interface ProductFormProps {
  onSubmit: ({ data }: Product) => Promise<any>;
}

export interface Adstype {
  data: FormData;
}

export interface AdstypeFormProps {
  onSubmit: ({ data }: Adstype) => Promise<any>;
}

export interface Copyline {
  data: FormData;
}

export interface CopylineFormProps {
  onSubmit: ({ data }: Copyline) => Promise<any>;
}

export interface Program {
  data: FormData;
}

export interface ProgramFormProps {
  onSubmit: ({ data }: Program) => Promise<any>;
}

export interface ProgramType {
  data: FormData;
}

export interface ProgramTypeFormProps {
  onSubmit: ({ data }: ProgramType) => Promise<any>;
}

export interface ProgramSubType {
  data: FormData;
}

export interface ProgramSubTypeFormProps {
  onSubmit: ({ data }: ProgramSubType) => Promise<any>;
}

export interface CommGroup {
  data: FormData;
}

export interface CommGroupFormProps {
  onSubmit: ({ data }: CommGroup) => Promise<any>;
}

export interface Commercial {
  data: FormData;
}

export interface CommercialFormProps {
  onSubmit: ({ data }: Commercial) => Promise<any>;
}

export interface SocialMediaData {
  formData: FormData;
}

export interface SocialMediaDataFormProps {
  onSubmit: (data: SocialMediaData) => Promise<any>;
}

export interface TrendDetail {
  formData: FormData;
}

export interface TrendDetailFormProps {
  onSubmit: (data: TrendDetail) => Promise<any>;
}

export interface TrendsWidgetProps {
  keyword?: string;
  geo?: string;
  time?: string;
  type?: 'web' | 'shopping' | 'youtube' | 'news' | 'images';
  widgetType?: 'GEO_MAP' | 'TIMESERIES' | 'RELATED_TOPICS' | 'RELATED_QUERIES';
  title?: string;
  height?: string;
  className?: string;
  useFilters?: boolean;
}

export interface StatData {
  icon: React.ReactNode;
  title: string;
  value: string;
  totalViewValue?: string;
  percentage: string;
  trend: 'up' | 'down';
  color: string;
}

export interface PercentageBarChartProps {
  label?: string;
  data: {
    icon?: React.ReactNode;
    age?: string;
    percentage: string;
    percentageColor?: string;
    gradientFrom: string;
    gradientTo: string;
  }[];
}

export interface PostData {
  id: string;
  imageUrl: string;
  date: string;
  views: string;
  likes?: string;
  comments?: string;
  priceRange: string;
}

export interface ProductEntity {
  nproduct: string;
  iproduct: string;
  trends: string;
}

export interface CurrentUser {
  dataPeriod: {
    startDate: string;
    endDate: string;
  };
  assignedProjects: {
    _id: string;
    name: string;
  }[];
  products: string[];
}

export interface TrendsOverviewCard {
  totalRecords: number;
  minValue: number;
  maxValue: number;
  averageValue: number;
  trends: Array<{
    date: string;
    value: number;
  }>;
}

export interface InterestOverTimeTrendDetail {
  date: string;
  value: number;
  category: string;
  keyword: string;
  createdAt: string;
}

export interface TrendingSearchDetail {
  totalSearchVolume: number;
  searchVolume: string;
  startDate: string;
  endDate: string | null;
  link: string;
  trend: string;
  category: {
    category: string;
  };
}
