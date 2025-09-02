'use server';

/**
 * @fileOverview A flow to classify the style/shape of eyeglasses.
 *
 * - classifyFrameStyle - A function that classifies the style/shape of eyeglasses.
 * - ClassifyFrameStyleInput - The input type for the classifyFrameStyle function.
 * - ClassifyFrameStyleOutput - The return type for the classifyFrameStyle function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ClassifyFrameStyleInputSchema = z.object({
  framePhotoDataUri: z
    .string()
    .describe(
      "A photo of the eyeglasses frame, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type ClassifyFrameStyleInput = z.infer<typeof ClassifyFrameStyleInputSchema>;

const ClassifyFrameStyleOutputSchema = z.object({
  style: z.string().describe('The style/shape of the eyeglasses (e.g., round, rectangle, aviator).'),
  confidence: z.number().describe('The confidence level of the classification (0-1).'),
});
export type ClassifyFrameStyleOutput = z.infer<typeof ClassifyFrameStyleOutputSchema>;

export async function classifyFrameStyle(input: ClassifyFrameStyleInput): Promise<ClassifyFrameStyleOutput> {
  return classifyFrameStyleFlow(input);
}

const classifyFrameStylePrompt = ai.definePrompt({
  name: 'classifyFrameStylePrompt',
  input: {schema: ClassifyFrameStyleInputSchema},
  output: {schema: ClassifyFrameStyleOutputSchema},
  prompt: `You are an expert in classifying eyeglasses styles and shapes.

  Analyze the provided image of the eyeglasses frame and classify its style/shape.
  Examples of styles include round, rectangle, aviator, cat-eye, etc.

  Provide the style/shape classification and a confidence level (0-1) for your assessment.

  Frame Photo: {{media url=framePhotoDataUri}}
  `, config: {temperature: 0.3},
});

const classifyFrameStyleFlow = ai.defineFlow(
  {
    name: 'classifyFrameStyleFlow',
    inputSchema: ClassifyFrameStyleInputSchema,
    outputSchema: ClassifyFrameStyleOutputSchema,
  },
  async input => {
    const {output} = await classifyFrameStylePrompt(input);
    return output!;
  }
);
