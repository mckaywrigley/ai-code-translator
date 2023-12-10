interface Props {
  tipAmount: number;
  onChange: (value: string) => void; // Correct the type of onChange to accept a string
}

export const TippingInput: React.FC<Props> = ({ tipAmount, onChange }) => {
  return (
    <input
      className="h-[36px] w-[100px] rounded-md border border-gray-300 px-3 py-3 text-black shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" 
      type="number"
      placeholder="Enter tip amount"
      value={tipAmount}
      onChange={(e) => onChange(e.target.value)} // Pass the string value to onChange
      min="0" // Ensure the minimum value is 0
    />
  );
};