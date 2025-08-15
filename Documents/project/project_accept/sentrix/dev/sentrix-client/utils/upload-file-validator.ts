export const SUPPORTED_FILE_TYPES = {
  CSV: {
    mimeTypes: ['text/csv', 'application/csv'],
    extensions: ['.csv'],
  },
  EXCEL: {
    mimeTypes: ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
    extensions: ['.xls', '.xlsx'],
  },
} as const;

export const isSupportedFile = (file: File | string): boolean => {
  if (typeof file === 'string') return false;

  const fileName = file.name.toLowerCase();
  const fileType = file.type;

  const allMimeTypes = Object.values(SUPPORTED_FILE_TYPES).flatMap((type) => type.mimeTypes);
  const allExtensions = Object.values(SUPPORTED_FILE_TYPES).flatMap((type) => type.extensions);

  return (
    allMimeTypes.includes(fileType as (typeof allMimeTypes)[number]) ||
    allExtensions.some((ext) => fileName.endsWith(ext))
  );
};

export const filterSupportedFiles = (files: (File | string)[]): File[] => {
  return files.filter((file): file is File => isSupportedFile(file));
};

export const getSupportedFileTypesMessage = (): string => {
  const extensions = Object.values(SUPPORTED_FILE_TYPES)
    .flatMap((type) => type.extensions)
    .map((ext) => ext.toUpperCase())
    .join(', ');

  return `Supported file types: ${extensions}`;
};
