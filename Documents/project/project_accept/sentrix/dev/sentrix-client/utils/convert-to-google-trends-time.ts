export const convertToGoogleTrendsTime = (startDate: string, endDate: string): string => {
  if (!startDate || !endDate || startDate === 'null' || endDate === 'null') {
    return 'today 1-m';
  }

  return `${startDate} ${endDate}`;
};
