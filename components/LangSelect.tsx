import { FC } from 'react';

interface Props {
  langs: Langs;
  onChange: (model: Langs) => void;
}

export const LangSelect: FC<Props> = ({ langs, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value as Langs);
  };

  return (
    <select
      className="h-[40px] w-[250px] rounded-md bg-[#1F2937] px-4 py-2 text-neutral-200"
      value={langs}
      onChange={handleChange}
    >
      <option value="English">English</option>
    </select>
  );
};

