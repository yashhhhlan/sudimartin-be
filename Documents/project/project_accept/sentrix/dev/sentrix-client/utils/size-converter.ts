export const sizeCompactString = (size: number) => {
  const formatter = Intl.NumberFormat("en-US", { notation: "compact", compactDisplay: "short" });
  return formatter.format(size);
}