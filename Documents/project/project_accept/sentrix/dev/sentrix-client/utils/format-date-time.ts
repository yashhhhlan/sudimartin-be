export const formatDateTime = (dateStr: string, timeStr: string): string => {
  const date = new Date(dateStr);
  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  return `${formattedDate} ${timeStr}`;
};
