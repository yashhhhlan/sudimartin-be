'use client';

import { FileText, X } from 'lucide-react';

interface FilePreviewProps {
  files: File[];
  onRemove: (index: number) => void;
  isDisabled?: boolean;
}

const FilePreview = ({ files, onRemove, isDisabled }: FilePreviewProps) => {
  return (
    files?.length > 0 && (
      <div className="flex gap-6">
        {files?.map((file, index) => (
          <>
            <div
              key={index}
              className="relative size-44 flex flex-col justify-center items-center p-4 bg-gray-200 rounded-md"
            >
              <button
                type="button"
                disabled={isDisabled}
                onClick={() => onRemove(index)}
                className="absolute -top-3 -left-3 h-6 w-6 flex items-center justify-center bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
              >
                <X size={16} className="text-gray-600" />
              </button>

              <div className="relative flex items-end">
                <FileText color="#999" size={72} />
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute -bottom-1 -right-1"
                >
                  <rect width="24" height="24" rx="4" fill="#8BC34A" />
                  <path
                    d="M7 12L10 15L17 9"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <div>
                <p className="text-xs text-center text-gray-600 mt-2 line-clamp-2">
                  {file.name} ({(file.size / 1024).toFixed(1)} KB)
                </p>
              </div>
            </div>
          </>
        ))}
      </div>
    )
  );
};

export default FilePreview;
