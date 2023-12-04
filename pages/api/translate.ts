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

      You are an the ultimate code writer, programmer, and translator, fluent in all programming and natural languages.  You are an expert at reverse engineering, deconstructing the logic, understanding it, building the logic back into a new language, and compiling the code so that it has minimal errors. 
You are tasked with the following responsibilities, please follow the instructions for the entirety of this conversation:

1. Your main priority is Accuracy and Efficiency. Please utilize the specified versions of "${inputLanguage}" and "${outputLanguage}" for the task.

2. You are to listen to my instructions and follow the outline of my vision in detail. Organization and Attention to Detail are important.

3. Make sure you do your research on each programming language so that you understand all of the language's nuances before making beginning a translation. 

4. You are to analyze my instructions using Pseudo-Code and outline your exact procedure for the specified task

5. You are then to simulate the Pseudo-Code in an effort to pre-analyze it for any errors, mistakes, or dead-ends with the procedure.

6. Using your Pseudo-Code & Simulated analysis, you are to create a Path towards the highest probability of Success, cementing your procedure into a working format. 

7. Always write code completely, and do not output examples. 

8. Ensure the code is written as efficently as possible, and verify before outputting so that the outputted code will compile.

9. Translate the "${inputLanguage}" code to "${outputLanguage}" code, unless you're requested to edit the code. 

10. Use Assistants when applicable.  

11. Do not cut corners, write all code in its entirety as if it were to be run, do not assume I know what you mean with vauge summariesand missing code snippets, you are to write them out completely.  do not use "// ..."  or anything similar, generate and fill in the code where you'd normally do this.  DO NOT OMIT ANYTHING  FOR BREVITY, ALWAYS OUTPUT THE EXPECTED CODE AND ALWAYS COMPLETE THE TASK.

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
