'use server';

/**
 * @fileOverview Analyzes the fit of eyeglasses based on user-provided selfies.
 *
 * - analyzeFit - A function that analyzes the fit of eyeglasses from images.
 * - AnalyzeFitInput - The input type for the analyzeFit function.
 * - AnalyzeFitOutput - The return type for the analyzeFit function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeFitInputSchema = z.object({
  frontSelfieDataUri: z
    .string()
    .describe(
      "A front-facing selfie of the user wearing glasses, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  sideSelfieDataUri: z
    .string()
    .describe(
      "A side-profile selfie of the user wearing glasses, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type AnalyzeFitInput = z.infer<typeof AnalyzeFitInputSchema>;

const FitCheckSchema = z.object({
    verdict: z.enum(['good', 'warning', 'bad']).describe('The verdict for this specific fit aspect.'),
    observation: z.string().describe('A brief, one-sentence observation about this aspect of the fit.')
});

const AnalyzeFitOutputSchema = z.object({
    fitVerdict: z.string().describe('A concise, overall verdict of the fit (e.g., "Good Fit", "Slightly Wide", "Needs Adjustment").'),
    frameWidth: FitCheckSchema.describe('Analysis of the frame width relative to the face.'),
    bridgePosition: FitCheckSchema.describe('Analysis of the bridge position on the nose.'),
    templeLength: FitCheckSchema.describe('Analysis of the temple arm length and curve behind the ear.'),
    analysisSummary: z.string().describe('A friendly, easy-to-understand paragraph summarizing the overall fit and providing actionable advice.')
});
export type AnalyzeFitOutput = z.infer<typeof AnalyzeFitOutputSchema>;


export async function analyzeFit(input: AnalyzeFitInput): Promise<AnalyzeFitOutput> {
  return analyzeFitFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeFitPrompt',
  input: {schema: AnalyzeFitInputSchema},
  output: {schema: AnalyzeFitOutputSchema},
  prompt: `You are an expert AI optician. Your task is to analyze two photos of a user wearing their glasses (front and side view) to determine how well they fit. Provide a detailed, easy-to-understand analysis.

**User Images:**
- Front View: {{media url=frontSelfieDataUri}}
- Side View: {{media url=sideSelfieDataUri}}

**Analysis Criteria:**

1.  **Frame Width:**
    - **Good:** The frame width should be slightly wider than the face, with eyes centered in the lenses. There should be no significant gap between the temples and the side of the head.
    - **Warning (Too Wide):** The frames extend too far past the sides of the face.
    - **Warning (Too Narrow):** The frames look smaller than the face, and the temples bow out.
    - **Bad:** The frames are drastically too wide or narrow, causing them to slip or pinch.

2.  **Bridge Position:**
    - **Good:** The bridge of the glasses sits comfortably on the nose without sliding down. There are no large gaps or red marks.
    - **Warning:** The glasses are sliding down the nose, or the bridge is sitting too high.
    - **Bad:** The bridge is clearly the wrong size, causing the glasses to constantly slip or sit at an incorrect angle, affecting vision.

3.  **Temple Length:**
    - **Good:** The temple arms extend straight back to the ears and curve down comfortably behind them, securing the glasses. The curve should start just at the top of the ear.
    - **Warning:** The arms curve too early (before the ear) or too late (far behind the ear).
    - **Bad:** The arms are so short they don't reach the ear, or so long they extend far down the neck, offering no support.

**Your Task:**

Based on the images, fill out the output schema. For each fit aspect (frameWidth, bridgePosition, templeLength), provide a 'verdict' and a concise 'observation'. Then, write a friendly 'analysisSummary' that explains your findings in simple terms and gives the user a clear recommendation on whether they should consider new frames. Finally, provide an overall 'fitVerdict'.`,
});


const analyzeFitFlow = ai.defineFlow(
  {
    name: 'analyzeFitFlow',
    inputSchema: AnalyzeFitInputSchema,
    outputSchema: AnalyzeFitOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
