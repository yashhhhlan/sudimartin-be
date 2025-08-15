export const extractUsername = (url: string) => {
  if (!url) return '';

  try {
    const urlObj = new URL(url);
    const pathname = urlObj.pathname;

    const username = pathname.split('/').filter(Boolean)[0];

    return username.replace('@', '');
  } catch (error) {
    console.error('Invalid URL:', url);
    return '';
  }
};
