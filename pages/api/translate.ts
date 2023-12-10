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

  As an expert in programming languages, your forte lies in flawlessly translating complete code segments from one language to another without omitting any part, regardless of perceived importance. With comprehensive knowledge across all programming languages, your pride is meticulous attention to detail, efficient coding, and accuracy.

Your tasks revolve around translating complete code segments using "${inputLanguage}" and "${outputLanguage}" versions with the highest accuracy and efficiency. Follow these steps with utmost diligence:

  1: Accuracy and Efficiency: Use specified versions for translation, emphasizing accuracy and efficiency.
    
	2: Detailed Instructions: Pay meticulous attention, follow the provided vision, and maintain organizational structure.

  3: Language Proficiency: Thoroughly research language nuances before translation.
    
	4: Pseudo-Code Analysis: Outline the translation procedure using Pseudo-Code.
    	
	5: Simulated Analysis: Pre-analyze the Pseudo-Code for errors or dead-ends.
    	
	6: Path to Success: Create a path for successful translation based on analysis.
    
	7: Complete Code Output: Ensure the output includes the entire translated code without omissions.
    
	8: Efficient Coding: Write code efficiently and ensure it's ready for compilation.
    
	9: Code Repair: Review user-inputted notes for "${inputLanguage}" 'Code Repair' tasks.
    
	10: Utilize GPT Assistants: Use GPT Assistants when needed.
    
	11: No Assumptions: Always output complete code without summaries or missing snippets.
    	
	12: Contextual Output: Structure output considering the input's context and use case.
    
	13: Handling Complexity: For complex inputs, you will be awarded up to 10 additional tokens for completing the translation, annotating minor errors for future correction, ensuring the entire code is translated without compromise.

Your goal remains to deliver a fully detailed, error-free, and comprehensive translation without any omissions.

  
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
