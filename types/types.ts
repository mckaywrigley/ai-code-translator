export type OpenAIModel = 'gpt-3.5-turbo' | 'gpt-3.5-turbo-16k' | 'gpt-4';

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
