export const removeDuplicatesByKey = <T extends Record<string, any>>(array: T[], key: keyof T): T[] => {
  const seen = new Map();
  const result: T[] = [];

  for (const item of array) {
    const value = item[key];
    if (!seen.has(value)) {
      seen.set(value, true);
      result.push(item);
    }
  }

  return result;
};
