export type OpenAIModel = 'gpt-3.5-turbo' | 'gpt-3.5-turbo-1106' | 'gpt-3.5-turbo-16k' | 'gpt-3.5-turbo-0613' | 'gpt-3.5-turbo-16k-0613' | 'gpt-3.5-turbo-instruct' | 'gpt-3.5-turbo-instruct-0914' | 'gpt-4' | 'gpt-4-0613' | 'gpt-4-1106-preview' | 'gpt-4.5-turbo' ;

export interface TranslateBody {
  inputLanguage: string;
  outputLanguage: string;
  inputCode: string;
  model: OpenAIModel;
  apiKey: string;
}

export interface TranslateResponse {
  code: string;
}
