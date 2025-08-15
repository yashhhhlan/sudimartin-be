'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import ButtonAction from '@/components/button-action';
import FormInputFile from '@/components/form-input-file';
import Header from '@/components/header';
import { showMessage } from '@/components/toast';
import FilePreview from '@/components/file-preview';

import { SummaryFormProps } from '@/types/components';

import { filterSupportedFiles, getSupportedFileTypesMessage } from '@/utils/upload-file-validator';

const SummaryForm = ({ onSubmit }: SummaryFormProps) => {
  const router = useRouter();

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
    mutationKey: ['create-summary'],
    mutationFn: onSubmit,
    onSuccess: ({ success, message }) => {
      if (!success) {
        showMessage(message, 'error');
        return;
      }
      router.push(`/dashboard/administrator/upload-digital/summary`);
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

    if (files) {
      files.forEach((file) => {
        formData.append('files', file);
      });
    }

    mutate({
      files: formData,
    });
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
        <form onSubmit={handleSubmit} className="w-full space-y-6">
          <div className="flex gap-6">
            <FormInputFile
              label="Upload CSV/XLSX"
              mode="create"
              handleFileChange={handleFileChange}
              multiple
              files={files}
              className="w-1/2"
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

export default SummaryForm;
