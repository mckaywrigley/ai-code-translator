import { StreamLanguage } from '@codemirror/language';
import { go } from '@codemirror/legacy-modes/mode/go';
import { tokyoNight } from '@uiw/codemirror-theme-tokyo-night';
import CodeMirror from '@uiw/react-codemirror';
import { FC } from 'react';

interface Props {
  code: string;
  editable?: boolean;
  onChange?: (value: string) => void;
}

export const CodeBlock: FC<Props> = ({
  code,
  editable = false,
  onChange = () => {},
}) => {
  return (
    <CodeMirror
      editable={editable}
      value={code}
      minHeight="700px"
      extensions={[StreamLanguage.define(go)]}
      theme={tokyoNight}
      onChange={(value) => onChange(value)}
    />
  );
};
