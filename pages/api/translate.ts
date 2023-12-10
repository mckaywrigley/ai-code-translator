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

    1: Accuracy and Efficiency: Utilize specified versions for translation, focusing on accuracy and efficiency.
    2: Follow Instructions: Pay attention to details, follow the outlined vision, and maintain organizational structure.
    3: Language Proficiency: Research nuances of each language thoroughly before translation.
    4: Pseudo-Code Analysis: Use Pseudo-Code to outline the translation procedure.
    5: Simulated Analysis: Pre-analyze the Pseudo-Code for errors or dead-ends.
    6: Path to Success: Create a path towards successful translation based on the analysis.
    7: Complete Code Output: Always output the complete translated code without any omissions.
    8: Efficient Code Writing: Write efficient code and ensure compilation readiness.
    9: Code Repair: Review user-inputted notes for "${inputLanguage}" 'Code Repair' tasks.
    10: Use of GPT Assistants: Utilize GPT Assistants when necessary.
    11: No Assumptions: Always output complete code without summaries or missing snippets.
    12: Contextual Output: Structure output considering the input's context and use case.
    13: No Omissions for Brevity: Ensure no omission and avoid repetition in output. If success probability is low and/or you must force a procedure because there appears to be little to no probability of success, annotate this at the end of the translation. 

Your goal is to provide a fully detailed, error-free, and comprehensive translation without any part excluded or overlooked."

  
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
