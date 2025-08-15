export const platformConfig: any = {
  instagram: {
    prefix: '/',
    baseUrl: 'https://instagram.com',
  },
  youtube: {
    prefix: '/@',
    baseUrl: 'https://youtube.com',
  },
  facebook: {
    prefix: '/',
    baseUrl: 'https://facebook.com',
  },
  tiktok: {
    prefix: '/@',
    baseUrl: 'https://tiktok.com',
  },
  x: {
    prefix: '/',
    baseUrl: 'https://x.com',
  },
  twitter: {
    prefix: '/',
    baseUrl: 'https://twitter.com',
  },
};

export const generatePlatformRoute = (platform: string, username: string) => {
  const config = platformConfig[platform.toLowerCase()];
  if (!config) return `/${username}`;

  return `${config.prefix}${username}`;
};
