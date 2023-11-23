import { FC } from 'react';

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
  { value: 'Natural Language', label: 'Natural Language' },
  { value: 'Assembly Language', label: 'Assembly Language' },
  { value: 'Bash', label: 'Bash' },
  { value: 'C', label: 'C' },
  { value: 'C++', label: 'C++' },
  { value: 'C#', label: 'C#' },
  { value: 'Clojure', label: 'Clojure' },
  { value: 'COBOL', label: 'COBOL' },
  { value: 'CoffeeScript', label: 'CoffeeScript' },
  { value: 'CSS', label: 'CSS' },
  { value: 'Dart', label: 'Dart' },
  { value: 'Elixir', label: 'Elixir' },
  { value: 'Fortran', label: 'Fortran' },
  { value: 'Go', label: 'Go' },
  { value: 'Groovy', label: 'Groovy' },
  { value: 'Haskell', label: 'Haskell' },
  { value: 'HTML', label: 'HTML' },
  { value: 'Java', label: 'Java' },
  { value: 'JavaScript', label: 'JavaScript' },
  { value: 'Julia', label: 'Julia' },
  { value: 'JSX', label: 'JSX' },
  { value: 'Kotlin', label: 'Kotlin' },
  { value: 'Lisp', label: 'Lisp' },
  { value: 'Lua', label: 'Lua' },
  { value: 'Matlab', label: 'Matlab' },
  { value: 'MQL4', label: 'MQL4' },
  { value: 'MQL5', label: 'MQL5' },
  { value: 'NoSQL', label: 'NoSQL' },
  { value: 'Objective-C', label: 'Objective-C' },
  { value: 'Pascal', label: 'Pascal' },
  { value: 'Perl', label: 'Perl' },
  { value: 'PHP', label: 'PHP' },
  { value: 'Python', label: 'Python' },
  { value: 'R', label: 'R' },
  { value: 'Racket', label: 'Racket' },
  { value: 'Ruby', label: 'Ruby' },
  { value: 'Rust', label: 'Rust' },
  { value: 'PL/SQL', label: 'PL/SQL' },
  { value: 'Powershell', label: 'Powershell' },
  { value: 'SAS', label: 'SAS' },
  { value: 'Scala', label: 'Scala' },
  { value: 'SQL', label: 'SQL' },
  { value: 'Swift', label: 'Swift' },
  { value: 'SwiftUI', label: 'SwiftUI' },
  { value: 'ThinkScript', label: 'ThinkScript' },
  { value: 'TSX', label: 'TSX' },
  { value: 'TypeScript', label: 'TypeScript' },
  { value: 'Visual Basic .NET', label: 'Visual Basic .NET' },
  { value: 'Vue', label: 'Vue' },
  { value: 'NinjaScript for NinjaTrader 7, NinjaScript is a nuanced language is written in C# targeting .NET 3.5 Care needs to be taken to ensure the code is not broken by incorrectly referencing C# or a different version of NinjaScript.', label: 'NinjaScript 7' },
  { value: 'NinjaScript for NinjaTrader 8.1.2.0 or higher, NinjaScript is a nuanced language written in C# targeting .NET 8.0 Care needs to be taken to ensure the code is not broken by incorrectly referencing C# or a different version of NinjaScript.', label: 'NinjaScript >= 8.1.2.0' },
  { value: 'NinjaScript for NinjaTrader 8.1.1.7 or lower, NinjaScript is a nuanced language written in C# targeting .NET 4.8 Care needs to be taken to ensure the code is not broken by incorrectly referencing C# or a different version of NinjaScript.', label: 'NinjaScript <= 8.1.1.7' },
  { value: 'Pine Script V3, Pine Script™ is TradingView.com’s programming language. Helpguides are available at https://www.tradingview.com/pine-script-docs/en/v3 ', label: 'Pine Script v3' },
  { value: 'Pine Script V4, Pine Script™ is TradingView.com’s programming language. Helpguides are available at https://www.tradingview.com/pine-script-docs/en/v4 ', label: 'Pine Script v4' },
  { value: 'Pine Script V5, Pine Script™ is TradingView.com’s programming language. Helpguides are available at https://www.tradingview.com/pine-script-docs/en/v5 ', label: 'Pine Script v5' },
];
];
