import { FC } from "react";

interface Props {
  onUpload: (e: ProgressEvent<FileReader>) => void;
}

export const FileUpload: FC<Props> = ({ onUpload }) => {
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target && e.target.files && e.target.files[0];
    const reader = new FileReader();

    if(file){
    reader.onloadend = onUpload;
    reader.readAsText(file);
  }
  };

  return (
    <input
      type="file"
      onChange={handleFileUpload}
      className="w-full rounded-md bg-[#1F2937] px-4 py-2 text-neutral-200"
    />
  );
};
