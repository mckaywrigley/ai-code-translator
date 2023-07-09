import { APIKeyInput } from '@/components/APIKeyInput';
import { CodeBlock } from '@/components/CodeBlock';

import { LanguageSelect } from '@/components/LanguageSelect';
import { ModelSelect } from '@/components/ModelSelect';
import { TextBlock } from '@/components/TextBlock';
import { OpenAIModel, TranslateBody } from '@/types/types';
import Head from 'next/head';
import { useEffect, useState } from 'react';

export default function Home() {
  const [inputLanguage, setInputLanguage] = useState<string>('COBOL');
  const [outputLanguage, setOutputLanguage] = useState<string>('Python');
  const [inputCode, setInputCode] = useState<string>('');
  const [outputCode, setOutputCode] = useState<string>('');
  const [suggestion, setSuggestions] = useState<string>('');
  const [explanation, setExplanation] = useState<string>('');
  const [check1, setCheck1] = useState<string>('');
  const [check2, setCheck2] = useState<string>('');
  const [syntax, setSyntax] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [functionality, setFunctionality] = useState<string>('');
  const [data, setData] = useState({ json: { "Syntax": "MY Value", "Suggestions": "'To produce the same result as the Cobol code, you can make the following changes in the Python code:\n\n1. Use the Decimal data type for more precise calculations.\n2. Adjust the precision of the temperature change calculation to match the Cobol code.\n3. Convert the final result to the desired format for display.'" }, });
  const [model, setModel] = useState<OpenAIModel>('gpt-3.5-turbo');
  const [loading, setLoading] = useState<boolean>(false);
  const [hasTranslated, setHasTranslated] = useState<boolean>(false);
  const [apiKey, setApiKey] = useState<string>('');

  const handleTranslate = async () => {
    const maxCodeLength = model === 'gpt-3.5-turbo' ? 6000 : 12000;

    if (!apiKey) {
      alert('Please enter an API key.');
      return;
    }

    if (!inputCode) {
      alert('Please enter some code.');
      return;
    }

    if (inputCode.length > maxCodeLength) {
      alert(
        `Please enter code less than ${maxCodeLength} characters. You are currently at ${inputCode.length} characters.`,
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

      // setStatusCode();
      setOutputCode((prevCode) => prevCode + chunkValue);
    }

    setLoading(false);
    setHasTranslated(true);
    copyToClipboard(code);
  };

  const handlenewtranslate = async () => {
    const maxCodeLength = model === 'gpt-3.5-turbo' ? 6000 : 12000;

    if (!apiKey) {
      alert('Please enter an API key.');
      return;
    }

    if (!inputCode) {
      alert('Please enter some code.');
      return;
    }

    if (inputCode.length > maxCodeLength) {
      alert(
        `Please enter code less than ${maxCodeLength} characters. You are currently at ${inputCode.length} characters.`,
      );
      return;
    }

    setLoading(true);

    // const json = await fetch("https://genaifastapi-1-h1144556.deta.app/constantoutput").then((res) => res.json());
    // const callAPI = async () => {
      try {
        const res = await fetch(
          `https://genaifastapi-1-h1144556.deta.app/constantoutput`
        );
        const data = await res.json();
        console.log(data);
        setData(data);
        setOutputCode(data.Python_Code);
        setSuggestions(data.Suggestions);
        setExplanation(data.Explanation);
        setCheck1(data.Check_1);
        setCheck2(data.Check_2);
        setSyntax(data.Syntax);
        setFunctionality(data.Functionality);
        setResult(data.Result);
        setLoading(false);
        setHasTranslated(true);
      } catch (err) {
        console.log(err);
      }
    // };



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
        <title>Code Translator</title>
        <meta
          name="description"
          content="Use AI to translate code from one language to another."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.2/font/bootstrap-icons.css"></link>
      </Head>
      <div className="flex flex-col items-center justify-center bg-[#0E1117] text-neutral-200 sm:px-10">
        <div className="mt-10">
          <div className="text-4xl font-bold">COBOL to PYTHON Translator</div>
        </div>
      </div>
      <div className="flex h-full min-h-screen flex-col items-center bg-[#0E1117] px-4 pb-20 text-neutral-200 sm:px-10">
        {/* <div className="mt-10 flex flex-col items-center justify-center sm:mt-20">
          <div className="text-4xl font-bold">COBOL to PYTHON Translator</div>
        </div> */}

        <div className="mt-6 flex w-full max-w-[1800px] flex-col justify-between sm:flex-row sm:space-x-4">
          <div className="h-100 flex flex-col justify-center space-y-2 sm:w-2/4">

            <div className="mt-6  text-sm">
              <APIKeyInput apiKey={apiKey} onChange={handleApiKeyChange} />
            </div>

            <div className="mt-2 flex items-center space-x-2">
              <ModelSelect model={model} onChange={(value) => setModel(value)} />

              <button
                className="w-[140px] cursor-pointer rounded-md bg-violet-500 px-4 py-2 font-bold hover:bg-violet-600 active:bg-violet-700"
                onClick={() => handlenewtranslate()}
                disabled={loading}
              >
                {loading ? 'Translating...' : 'Translate'}
              </button>

            </div>

            <div className="mt-2 text-xs">
              {loading
                ? 'Translating...'
                : hasTranslated
                  ? 'Output copied to clipboard!'
                  : 'Enter some code and click "Translate"'}
            </div>

          </div>

          <div className="h-100 flex flex-col justify-center space-y-2 sm:w-2/4">

            <div className="mt-2 flex items-center space-x-5">
              <i className="bi bi-square-fill" data-status={check1}> Similarity Check_1</i>
              <i className="bi bi-square-fill" data-status={check2}> Similarity Check_2</i>
              <i className="bi bi-square-fill" data-status={syntax}> Syntax</i>
              <i className="bi bi-square-fill" data-status={result}> Consistency</i>
              <i className="bi bi-square-fill" data-status={functionality}> Code Functionality</i>
            </div>

          </div>

        </div>



        <div className="mt-6 flex w-full max-w-[1800px] flex-col justify-between sm:flex-row sm:space-x-4">
          <div className="h-100 flex flex-col justify-center space-y-2 sm:w-2/4">

            <div className="text-center text-xl font-bold">Cobol</div>


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
            <div className="text-center text-xl font-bold">Python</div>
            <CodeBlock code={outputCode} />

          </div>

        </div>

        <div className="mt-6 flex w-full max-w-[1800px] flex-col justify-between sm:flex-row sm:space-x-4">
          <div className="mt-8 flex h-full flex-col justify-center space-y-2 sm:mt-0 sm:w-2/4">
            <div className="text-center text-xl font-bold">Explanation</div>
            <CodeBlock code={explanation} />
          </div>

          <div className="mt-8 flex h-full flex-col justify-center space-y-2 sm:mt-0 sm:w-2/4">
            <div className="text-center text-xl font-bold">Suggestions</div>
            <CodeBlock code={suggestion} />
          </div>
        </div>
      </div>
    </>
  );
}
