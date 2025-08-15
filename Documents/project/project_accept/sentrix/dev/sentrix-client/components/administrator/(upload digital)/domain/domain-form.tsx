'use client';

import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import ButtonAction from '@/components/button-action';
import FormInput from '@/components/form-input';
import FormInputFile from '@/components/form-input-file';
import Header from '@/components/header';
import { showMessage } from '@/components/toast';

import { DomainFormProps } from '@/types/components';

const DomainForm = ({ mode, initialData, domainId, onSubmit }: DomainFormProps) => {
  const router = useRouter();

  const [domain, setDomain] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [existingLogo, setExistingLogo] = useState<string>('');

  useEffect(() => {
    if (initialData) {
      setDomain(initialData.domain || '');

      if (initialData.logo) {
        setExistingLogo(initialData.logo);
        setFileName(initialData.logo.replace('/static/', ''));
      }
    }
  }, [initialData]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  const { mutate, isPending } = useMutation({
    mutationKey: [mode === 'create' ? 'create-domain' : 'update-domain', domainId],
    mutationFn: onSubmit,
    onSuccess: ({ success, message, data }) => {
      if (!success) {
        showMessage(message, 'error');
        return;
      }

      router.push(`/dashboard/administrator/upload-digital/domain`);

      showMessage(`Domain has been ${mode === 'create' ? 'created' : 'updated'}`);
    },
    onError: (error: Error) => {
      showMessage(error.message, 'error');
    },
    onSettled: () => {
      setDomain('');
      setFile(null);
      setFileName('');
      setExistingLogo('');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('domain', domain);

    if (file) {
      formData.append('logo', file);
    }

    if (mode === 'edit' && domainId) {
      mutate({ domainId, formData });
    } else {
      mutate({ formData });
    }
  };

  const hasLogo = !!(file || existingLogo);
  const isDisabled = mode === 'create' ? isPending || !domain || !fileName : isPending || !domain || !hasLogo;

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
            <FormInput
              label="Domain"
              value={domain}
              name="name"
              onChange={(e) => setDomain(e.target.value)}
              placeholder="Input Domain"
            />

            <FormInputFile
              label="Upload file image (512x512)"
              mode={mode}
              fileName={fileName}
              handleFileChange={handleFileChange}
              accept="image/*"
            />
          </div>

          <ButtonAction isDisabled={isDisabled} mode={mode} />
        </form>
      </div>
    </div>
  );
};

export default DomainForm;
