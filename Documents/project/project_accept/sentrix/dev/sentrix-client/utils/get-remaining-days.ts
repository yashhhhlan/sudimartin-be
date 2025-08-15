export const getRemainingDays = (licenseDate: Date | string): number => {
  if (!licenseDate) return 0;

  const today = new Date();
  const license = new Date(licenseDate);

  today.setHours(0, 0, 0, 0);
  license.setHours(0, 0, 0, 0);

  const diffTime = license.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
};
