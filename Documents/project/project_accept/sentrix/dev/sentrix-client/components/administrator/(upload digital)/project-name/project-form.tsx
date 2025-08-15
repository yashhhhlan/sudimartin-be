'use client';

import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import Header from '@/components/header';
import IconArrowRight from '@/components/icon/icon-arrow-right';
import KeywordsInput from '@/components/keywords-input';
import { showMessage } from '@/components/toast';
import FormInputFile from '@/components/form-input-file';
import FormInput from '@/components/form-input';
import ButtonAction from '@/components/button-action';
import FormSelect from '@/components/form-select';

import { ProjectFormProps } from '@/types/components';

const ProjectForm = ({
  mode,
  initialData,
  projectId,
  onSubmit,
  title,
  description,
  successMessage,
  redirectPath = '/dashboard/administrator/upload-digital/project-name',
}: ProjectFormProps) => {
  const router = useRouter();

  const [name, setName] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<string>('');
  const [fileName, setFileName] = useState<string>('');
  const [existingLogo, setExistingLogo] = useState<string>('');
  const [mainKeywords, setMainKeywords] = useState<string[]>(['', '', '']);
  const [optionalKeywords, setOptionalKeywords] = useState<string[]>(['', '', '']);
  const [excludedKeywords, setExcludedKeywords] = useState<string[]>(['', '', '']);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || '');
      setStatus(initialData.status || '');

      if (initialData.logo) {
        setExistingLogo(initialData.logo);
        setFileName(initialData.logo.replace('/static/', ''));
      }

      const ensureMinimumInputs = (keywords: string[] | undefined) => {
        if (!keywords || keywords.length === 0) return ['', '', ''];
        return keywords;
      };

      const mainKw = ensureMinimumInputs(initialData.mainKeywords);
      const optionalKw = ensureMinimumInputs(initialData.optionalKeywords);
      const excludedKw = ensureMinimumInputs(initialData.excludedKeywords);

      const maxLength = Math.max(mainKw.length, optionalKw.length, excludedKw.length);

      const padToMaxLength = (arr: string[]) => {
        const newArr = [...arr];
        while (newArr.length < maxLength) {
          newArr.push('');
        }
        return newArr;
      };

      setMainKeywords(padToMaxLength(mainKw));
      setOptionalKeywords(padToMaxLength(optionalKw));
      setExcludedKeywords(padToMaxLength(excludedKw));
    }
  }, [initialData]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  const addAllKeywords = () => {
    setMainKeywords([...mainKeywords, '', '', '']);
    setOptionalKeywords([...optionalKeywords, '', '', '']);
    setExcludedKeywords([...excludedKeywords, '', '', '']);
  };

  const { mutate, isPending } = useMutation({
    mutationKey: [mode === 'create' ? 'create-project' : 'update-project', projectId],
    mutationFn: onSubmit,
    onSuccess: ({ success, message }) => {
      if (!success) {
        showMessage(message, 'error');
        return;
      }
      router.push(redirectPath);
      showMessage(successMessage || `Project has been ${mode === 'create' ? 'created' : 'updated'}`);
    },
    onError: (error: Error) => {
      showMessage(error.message, 'error');
    },
    onSettled: () => {
      setName('');
      setStatus('');
      setFile(null);
      setFileName('');
      setExistingLogo('');
      setMainKeywords(['', '', '']);
      setOptionalKeywords(['', '', '']);
      setExcludedKeywords(['', '', '']);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const processedMainKeywords = mainKeywords.map((k) => (k.trim() === '' ? '-' : k.trim()));
    const processedOptionalKeywords = optionalKeywords.map((k) => (k.trim() === '' ? '-' : k.trim()));
    const processedExcludedKeywords = excludedKeywords.map((k) => (k.trim() === '' ? '-' : k.trim()));

    const validMainKeywords = mainKeywords.filter((k) => k.trim() !== '');

    if (validMainKeywords.length === 0) {
      showMessage('At least one main keyword is required', 'error');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('status', status);

    if (file) {
      formData.append('logo', file);
    }

    formData.append('mainKeywords', JSON.stringify(processedMainKeywords));
    formData.append('optionalKeywords', JSON.stringify(processedOptionalKeywords));
    formData.append('excludedKeywords', JSON.stringify(processedExcludedKeywords));

    if (mode === 'edit' && projectId) {
      mutate({ projectId, formData });
    } else {
      mutate({ formData });
    }
  };

  const hasValidMainKeyword = mainKeywords.some((k) => k.trim() !== '');
  const hasLogo = !!(file || existingLogo);
  const isDisabled =
    mode === 'create'
      ? isPending || !name || !status || !fileName || !hasValidMainKeyword
      : isPending || !name || !status || !hasLogo || !hasValidMainKeyword;

  const defaultDescription = (
    <>
      Please ensure all data is entered accurately and completely. Accurate data entry optimizes system performance,
      enhances analytical precision, and ensures the reliability of reports and insights generated.
    </>
  );

  return (
    <div className="space-y-6">
      <Header className="font-semibold" title={title} description={description || defaultDescription} />

      <div className="w-full bg-white rounded-md shadow-md p-6 space-y-6">
        <form onSubmit={handleSubmit} className="w-full space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <FormInput
              label="Project Name"
              value={name}
              name="name"
              onChange={(e) => setName(e.target.value)}
              placeholder="Text Input"
            />

            <FormInputFile
              label="Logo"
              mode={mode}
              fileName={fileName}
              handleFileChange={handleFileChange}
              accept="image/*"
            />

            <FormSelect
              label="Status"
              placeholder="Select Status"
              value={status}
              onChange={setStatus}
              data={[
                { label: 'Active', value: 'active' },
                { label: 'Inactive', value: 'inactive' },
              ]}
            />
          </div>

          <div className="grid grid-cols-[1fr_80px_1fr_80px_1fr] gap-0 items-start">
            <div>
              <KeywordsInput
                title="Main Keyword"
                description="The main keywords or phrases that your project will use to collect data (not case sensitive)."
                keywords={mainKeywords}
                onKeywordsChange={setMainKeywords}
                placeholder="Contoh: Honda"
              />
            </div>

            <div className="flex flex-col items-center justify-start pt-[96px] space-y-1">
              {mainKeywords.map((_, index) => (
                <div key={index} className="h-[42px] flex items-center justify-center">
                  <IconArrowRight />
                </div>
              ))}
            </div>

            <div>
              <KeywordsInput
                title="Optional Keyword"
                description="Additional keywords - Each keyword must appear in order for mentions to be collected (not case sensitive)."
                keywords={optionalKeywords}
                onKeywordsChange={setOptionalKeywords}
                placeholder="Contoh: Mobil"
              />
            </div>

            <div className="flex flex-col items-center justify-start pt-[96px] space-y-1">
              {optionalKeywords.map((_, index) => (
                <div key={index} className="h-[42px] flex items-center justify-center">
                  <IconArrowRight />
                </div>
              ))}
            </div>

            <div>
              <KeywordsInput
                title="Exclude Keyword"
                description="Additional keywords - None can appear if mentions are to be collected (not case sensitive)."
                keywords={excludedKeywords}
                onKeywordsChange={setExcludedKeywords}
                placeholder="Contoh: Keuangan"
              />
            </div>
          </div>

          <div className="flex justify-start">
            <button type="button" onClick={addAllKeywords} className="btn btn-primary text-sm">
              Add Keyword
            </button>
          </div>

          <ButtonAction isDisabled={isDisabled} mode={mode} />
        </form>
      </div>
    </div>
  );
};

export default ProjectForm;
