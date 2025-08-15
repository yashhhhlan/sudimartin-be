import { FormInputFileProps } from '@/types/components';
import { useRef } from 'react';

const FormInputFile = ({
  mode,
  label,
  fileName,
  files,
  handleFileChange,
  className = 'w-full',
  ...props
}: FormInputFileProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={className}>
      <label htmlFor="logo">{label}</label>
      <div className="relative">
        <input
          ref={fileInputRef}
          type="file"
          name="logo"
          id="logo"
          onChange={handleFileChange}
          className="hidden"
          {...props}
        />
        <div
          className="flex items-center bg-[#E0E6ED] form-input p-0 overflow-hidden cursor-pointer"
          onClick={handleBrowseClick}
        >
          <div className="flex-1 px-3 py-2 bg-transparent">
            <span className={files?.length || fileName ? 'text-gray-900' : 'text-gray-500'}>
              {files?.length
                ? `${files.length} file${files.length > 1 ? 's' : ''} selected`
                : fileName
                  ? fileName
                  : 'Choose file...'}
            </span>
          </div>
          <button
            disabled={props.disabled}
            type="button"
            className="bg-primary text-white px-5 py-2 hover:bg-primary/90 transition-colors font-medium"
          >
            Browse
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormInputFile;
