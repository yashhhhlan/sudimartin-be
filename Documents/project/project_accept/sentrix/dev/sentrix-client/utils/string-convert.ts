// Convert Snake Case to Pascal Case
export const snakeCaseToPascalCase = (msg: string): string => {
  return msg
    .split('_')
    .map((word,idx) => idx === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word) // Capitalize the first letter of each word
    .join(' '); // Join the words back together without separators
}
