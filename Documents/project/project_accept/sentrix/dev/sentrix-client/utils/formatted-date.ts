export const formattedLastLoginDate = (date: Date | string) => {
  const convertedDate = new Date(date);
  const day = convertedDate.getDate().toString().padStart(2, '0');
  const month = (convertedDate.getMonth() + 1).toString().padStart(2, '0');
  const year = convertedDate.getFullYear();
  const hours = convertedDate.getHours().toString().padStart(2, '0');
  const minutes = convertedDate.getMinutes().toString().padStart(2, '0');
  const seconds = convertedDate.getSeconds().toString().padStart(2, '0');

  return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
};

export const formattedDate = (date: Date | string) => {
  const convertedDate = new Date(date);
  const day = convertedDate.getDate().toString().padStart(2, '0');
  const month = (convertedDate.getMonth() + 1).toString().padStart(2, '0');
  const year = convertedDate.getFullYear();
  return `${day}-${month}-${year}`;
};
