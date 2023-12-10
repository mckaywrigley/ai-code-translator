import { OpenAIModel } from '@/types/types';
import { FC } from 'react';

interface Props {
  model: OpenAIModel;
  onChange: (model: OpenAIModel) => void;
}

export const ModelSelect: FC<Props> = ({ model, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value as OpenAIModel);
  };

  return (
    <select
      className="h-[40px] w-[250px] rounded-md bg-[#1F2937] px-4 py-2 text-neutral-200"
      value={model}
      onChange={handleChange}
    >
      <option value="gpt-3.5">GPT-3.5</option>
      <option value="gpt-3.5-turbo-1106">GPT-3.5-Turbo-1106</option>
      <option value="gpt-3.5-turbo-0613">GPT-3.5-Turbo-0613</option>
      <option value="gpt-3.5-turbo-16k-0613">GPT-3.5-Turbo-16k-0613</option>
      <option value="gpt-4-turbo">GPT-4-Turbo</option>
      <option value="gpt-4-1106-preview">GPT-4-1106-Preview</option>
      <option value="gpt-4-0613">GPT-4-0613</option>
      <option value="gpt-4-32k-0613">GPT-4-32k-0613</option>
    </select>
  );
};
