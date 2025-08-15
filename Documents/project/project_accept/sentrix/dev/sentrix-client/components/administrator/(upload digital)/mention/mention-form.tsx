'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import ButtonAction from '@/components/button-action';
import FormInputFile from '@/components/form-input-file';
import Header from '@/components/header';
import { showMessage } from '@/components/toast';
import FilePreview from '@/components/file-preview';

import { MentionFormProps } from '@/types/components';

import { filterSupportedFiles, getSupportedFileTypesMessage } from '@/utils/upload-file-validator';
import FormInputYear from '@/components/form-input-year';

const MentionForm = ({ onSubmit }: MentionFormProps) => {
  const router = useRouter();

  const [year, setYear] = useState<string | null>(null);
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const supportedFiles = filterSupportedFiles(selectedFiles);

    if (supportedFiles.length !== selectedFiles.length) {
      showMessage(`Please select supported files only. ${getSupportedFileTypesMessage()}`);
      return;
    }

    setFiles(supportedFiles);
  };

  const handleRemoveFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const { mutate, isPending } = useMutation({
    mutationKey: ['create-mention'],
    mutationFn: onSubmit,
    onSuccess: ({ success, message }) => {
      if (!success) {
        showMessage(message, 'error');
        return;
      }

      router.push(`/dashboard/administrator/upload-digital/mention`);
      showMessage(message);
    },
    onError: (error: Error) => {
      showMessage(error.message, 'error');
    },
    onSettled: () => {
      setFiles([]);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();

    if (year) {
      formData.append('year', year);
    }

    if (files) {
      files.forEach((file) => {
        formData.append('files', file);
      });
    }

    mutate(formData);
  };

  const isDisabled = isPending || files.length === 0;

  return (
    <div className="space-y-6">
      <Header
        className="font-semibold"
        title="Input Data"
        description={
          <>
            Please ensure all data is entered accurately and completely. Accurate data entry optimizes system
            performance, enhances analytical precision, and ensures the reliability of reports and insights generated.
          </>
        }
      />

      <div className="w-full bg-white rounded-md shadow-md p-6 space-y-6">
        <form onSubmit={handleSubmit} className="w-1/2 space-y-6">
          <div className="w-full">
            <FormInputYear value={year} onChange={setYear} />
          </div>

          <div className="gap-6">
            <FormInputFile
              label="Upload CSV/XLSX"
              mode="create"
              handleFileChange={handleFileChange}
              multiple
              files={files}
              className="w-full"
              accept=".csv,text/csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            />
          </div>

          <FilePreview files={files} onRemove={handleRemoveFile} />

          <ButtonAction isDisabled={isDisabled} mode="create" />
        </form>
      </div>
    </div>
  );
};

export default MentionForm;
