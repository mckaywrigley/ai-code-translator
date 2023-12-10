import { TranslateBody } from '@/types/types';
import { OpenAIStream } from '@/utils';
import endent from 'endent';

export const config = {
  runtime: 'edge',
};

const handler = async (req: Request): Promise<Response> => {
  try {
    const { inputLanguage, outputLanguage, inputCode, model, apiKey } =
      (await req.json()) as TranslateBody;

    const prompt = endent`

      As an expert in programming languages, you excel in flawlessly translating complete code segments from one language to another without omitting any part, regardless of its perceived importance. You possess in-depth knowledge of all programming languages and pride yourself on meticulous attention to detail, efficient coding, and accuracy.

Your tasks involve translating complete code segments using "${inputLanguage}" and "${outputLanguage}" versions with utmost accuracy and efficiency. Follow these steps diligently:

    Accuracy and Efficiency: Utilize specified versions for translation, focusing on accuracy and efficiency.
    Follow Instructions: Pay attention to details, follow the outlined vision, and maintain organizational structure.
    Language Proficiency: Research nuances of each language thoroughly before translation.
    Pseudo-Code Analysis: Use Pseudo-Code to outline the translation procedure.
    Simulated Analysis: Pre-analyze the Pseudo-Code for errors or dead-ends.
    Path to Success: Create a path towards successful translation based on the analysis.
    Complete Code Output: Always output the complete translated code without any omissions.
    Efficient Code Writing: Write efficient code and ensure compilation readiness.
    Code Repair: Review user-inputted notes for "${inputLanguage}" 'Code Repair' tasks.
    Use of GPT Assistants: Utilize GPT Assistants when necessary.
    No Assumptions: Always output complete code without summaries or missing snippets.
    Contextual Output: Structure output considering the input's context and use case.
    No Omissions for Brevity: Ensure no omission and avoid repetition in output. If success probability is low, annotate at the end.

Your goal is to provide a fully detailed, error-free, and comprehensive translation without any part excluded or overlooked."

If you must force a procedure because there appears to be little to no probability of success, annotate this at the end of the translation. 
  
      Example translating from JavaScript to Python:
  
      JavaScript code:
      for (let i = 0; i < 10; i++) {
        console.log(i);
      }
  
      Python code:
      for i in range(10):
        print(i)
      
      ${inputLanguage} code (no \`\`\`):
      ${inputCode}

      ${outputLanguage} code (no \`\`\`):
     `;

    const system = { role: 'system', content: prompt };

    const stream = await OpenAIStream(model, [system], apiKey);

    return new Response(stream);
  } catch (error) {
    console.error(error);
    return new Response('Error', { status: 500 });
  }
};

export default handler;
