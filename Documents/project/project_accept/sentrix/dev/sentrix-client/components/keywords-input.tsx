import { KeywordInputProps } from '@/types/components';

const KeywordsInput = ({
  title,
  description,
  placeholder = 'Contoh: Nike',
  keywords,
  onKeywordsChange,
}: KeywordInputProps) => {
  const handleKeywordChange = (index: number, value: string) => {
    const newKeywords = [...keywords];
    newKeywords[index] = value;
    onKeywordsChange(newKeywords);
  };

  return (
    <div className="space-y-3">
      <div>
        <label className="font-semibold">{title}</label>
        <p className="text-xs text-gray-600 mt-1">{description}</p>
      </div>

      <div className="text-xs text-primary">{placeholder}</div>

      <div className="space-y-2">
        {keywords?.map((keyword, index) => (
          <div key={index}>
            <input
              type="text"
              value={keyword}
              onChange={(e) => handleKeywordChange(index, e.target.value)}
              placeholder={placeholder}
              className="form-input w-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default KeywordsInput;
