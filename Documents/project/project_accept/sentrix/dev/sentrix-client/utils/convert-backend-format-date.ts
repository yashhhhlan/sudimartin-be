export const convertBackendFormatDate = (dateStr: string) => {
  if (!dateStr || dateStr === 'null') return 'null';

  const [day, month, year] = dateStr.split('-');
  return `${year}-${month}-${day}`;
};
