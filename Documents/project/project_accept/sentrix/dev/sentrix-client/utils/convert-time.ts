export const timeToMs = (timeString: string): number => {
  const [hours, minutes, seconds] = timeString.split(':').map(Number);
  return (hours * 3600 + minutes * 60 + seconds) * 1000;
};
