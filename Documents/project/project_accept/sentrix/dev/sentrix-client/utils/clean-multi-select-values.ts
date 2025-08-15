export const cleanMulitSelectValues = (fieldValues: string[]) => {
  if (!fieldValues || fieldValues.length === 0) return [];

  return fieldValues.filter((val) => val !== '__ALL__');
};
