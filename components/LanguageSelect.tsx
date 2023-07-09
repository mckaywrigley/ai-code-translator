import type { FC } from 'react';

interface Props {
  language: string;
  onChange: (language: string) => void;
}

export const LanguageSelect: FC<Props> = ({ language, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <select
      className="w-full rounded-md bg-[#1F2937] px-4 py-2 text-neutral-200"
      value={language}
      onChange={handleChange}
    >
      {languages
        .sort((a, b) => a.label.localeCompare(b.label))
        .map((language) => (
          <option key={language.value} value={language.value}>
            {language.label}
          </option>
        ))}
    </select>
  );
};

const languages = [
  { value: 'COBOL', label: 'COBOL' },
  { value: 'PYTHON', label: 'PYTHON' }
];
