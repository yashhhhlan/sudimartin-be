export const getPlatformInfo = (domain: string) => {
  const platformMap = {
    'facebook.com': { platform: 'facebook', color: '#00C86E', borderColor: '#00C86E' },
    'instagram.com': { platform: 'instagram', color: '#00C86E', borderColor: '#00C86E' },
    'twitter.com': { platform: 'twitter', color: '#00C86E', borderColor: '#00C86E' },
    'x.com': { platform: 'twitter', color: '#00C86E', borderColor: '#00C86E' },
    'tiktok.com': { platform: 'tiktok', color: '#00C86E', borderColor: '#00C86E' },
    'youtube.com': { platform: 'youtube', color: '#00C86E', borderColor: '#00C86E' },
    'linkedin.com': { platform: 'linkedin', color: '#00C86E', borderColor: '#00C86E' },
  } as const;

  const key = domain.toLowerCase() as keyof typeof platformMap;
  const platform = platformMap[key];

  if (platform) return platform;

  return { platform: 'web', color: '#00C86E', borderColor: '#00C86E' };
};
