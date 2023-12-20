import { APIKeyInput } from '@/components/APIKeyInput';
import { TippingInput } from '@/components/TippingInput'; // Import TippingInput component
import { CodeBlock } from '@/components/CodeBlock';
import { LanguageSelect } from '@/components/LanguageSelect';
import { LangSelect } from '@/components/LangSelect';
import { ModelSelect } from '@/components/ModelSelect';
import { OpenAIModel, TranslateBody } from '@/types/types';
import Head from 'next/head';
import { useEffect, useState } from 'react';

export default function Home() {
  const [inputLanguage, setInputLanguage] = useState<string>('1 - Natural Language -');
  const [lang, setLang] = useState<string>('English');
  const [outputLanguage, setOutputLanguage] = useState<string>('C#');
  const [inputCode, setInputCode] = useState<string>('');
  const [outputCode, setOutputCode] = useState<string>('');
  const [model, setModel] = useState<OpenAIModel>('gpt-4');
  const [loading, setLoading] = useState<boolean>(false);
  const [hasTranslated, setHasTranslated] = useState<boolean>(false);
  const [apiKey, setApiKey] = useState<string>('');
  const [tipping, setTipping] = useState<number>(0); // Initialize tipping with 0

  const handleTranslate = async () => {
    const maxCodeLength = model === 'gpt-3.5-turbo' ? 6000 : 128000;

    if (!apiKey) {
      alert('Please enter an API key.');
      return;
    }

    if (inputLanguage === outputLanguage) {
      alert('Please select different languages.');
      return;
    }
    
    if (tipping < 0) { // Check if tipping is less than 0
      alert('Tip amount cannot be negative.');
      return;
    }

    if (!inputCode) {
      alert('Please enter some code.');
      return;
    }

    if (inputCode.length > maxCodeLength) {
      alert(
        `Please enter code less than ${maxCodeLength} characters. You are currently at ${inputCode.length} characters.  A different model may allow enough characters`,
      );
      return;
    }

    setLoading(true);
    setOutputCode('');

    const controller = new AbortController();

    const body: TranslateBody = {
      inputLanguage,
      outputLanguage,
      inputCode,
      model,
      apiKey,
      tipping,
      lang,
    };

    const response = await fetch('/api/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: controller.signal,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      setLoading(false);
      alert('Something went wrong.');
      return;
    }

    const data = response.body;

    if (!data) {
      setLoading(false);
      alert('Something went wrong.');
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;
    let code = '';

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);

      code += chunkValue;

      setOutputCode((prevCode) => prevCode + chunkValue);
    }

    setLoading(false);
    setHasTranslated(true);
    copyToClipboard(code);
  };

  const copyToClipboard = (text: string) => {
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  };

  const handleApiKeyChange = (value: string) => {
    setApiKey(value);

    localStorage.setItem('apiKey', value);
  };

  const handleTippingChange = (value: string) => {
    const numericValue = Number(value);
    setTipping(numericValue >= 0 ? numericValue : tipping); 
    localStorage.setItem('tipping', numericValue.toString());
  };    
  
  useEffect(() => {
    if (hasTranslated) {
      handleTranslate();
    }
  }, [outputLanguage]);

  useEffect(() => {
    const apiKey = localStorage.getItem('apiKey');

    if (apiKey) {
      setApiKey(apiKey);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Ai Coder</title>
        <meta
          name="description"
          content="AI to translate code from one programming language to another."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex h-full min-h-screen flex-col items-center bg-[#0E1117] px-4 pb-20 text-neutral-200 sm:px-10">
        <div className="mt-10 flex flex-col items-center justify-center sm:mt-20">
          <div className="text-7xl font-bold">Ai Coder</div>
        </div>

        <div className="mt-8 text-center text-sm">
          <APIKeyInput apiKey={apiKey} onChange={handleApiKeyChange} />
        </div>


	  <div className="mt-4 text-center text-md">
          {'GPT model * * * * * * Max Tip Amount * * * * * * * * *'}
        </div>


        <div className="mt-0 flex items-center space-x-3">
          <ModelSelect model={model} onChange={(value) => setModel(value)} />
          
	   <div className="mt--6 flex items-center space-x-3">
          <TippingInput tipAmount={tipping} onChange={handleTippingChange} />
        
        </div>


          <button
            className="mt--2 h-[38px] w-[200px] cursor-pointer rounded-md bg-blue-500 px-4 py-2 font-bold hover:bg-blue-600 active:bg-blue-700"
            onClick={() => handleTranslate()}
            disabled={loading}
          >
            {loading ? 'Translating...' : 'Translate'}
          </button>
        </div>

        <div className="mt-2 text-center text-lg">
          {loading
            ? 'Translating...'
            : hasTranslated
            ? 'Output copied to clipboard!'
            : 'Select your Input and Output Languages, enter some code and/or commands, set a maximum tip amount, and click "Translate"'}
        </div>
	  <div className="mt-0 text-center text-xs">
          {'For complex operations, ChatGPT will automatically calculate and deduct the amount of additional tokens up to your maximum allowed tip amount necessary to complete the task'}
        </div>



        <div className="mt-6 flex w-full max-w-[8000px] flex-col justify-between sm:flex-row sm:space-x-1">
          <div className="flex h-full flex-col	justify-center space-y-2 sm:w-2/4">
            <div className="text-center text-xl font-bold">Input</div>

            <LanguageSelect
              language={inputLanguage}
              onChange={(value) => {
                setInputLanguage(value);
                setHasTranslated(false);
                setInputCode('');
                setOutputCode('');
              }}
            />

            <CodeBlock
              code={inputCode}
              editable={!loading}
              onChange={(value) => {
                setInputCode(value);
                setHasTranslated(false);
              }}
            />
          </div>
          <div className="mt-8 flex h-full flex-col justify-center space-y-2 sm:mt-0 sm:w-2/4">
            <div className="text-center text-xl font-bold">Output</div>

            <LanguageSelect
              language={outputLanguage}
              onChange={(value) => {
                setOutputLanguage(value);
                setOutputCode('');
              }}
            />

            <CodeBlock code={outputCode} />
          </div>
        </div>
      </div>
    </>
  );
}
