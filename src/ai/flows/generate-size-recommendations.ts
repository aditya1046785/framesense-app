'use server';
/**
 * @fileOverview Provides size recommendations based on frame analysis.
 *
 * - generateSizeRecommendations - A function that generates size and style recommendations.
 * - GenerateSizeRecommendationsInput - The input type for the generateSizeRecommendations function.
 * - GenerateSizeRecommendationsOutput - The return type for the generateSizeRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateSizeRecommendationsInputSchema = z.object({
  lensWidth: z.number().describe('The width of the lens in millimeters.'),
  bridgeWidth: z.number().describe('The width of the bridge in millimeters.'),
  templeLength: z.number().describe('The length of the temple in millimeters.'),
  faceShape: z
    .string()
    .optional()
    .describe('The shape of the user\'s face (e.g., round, oval, square).'),
});
export type GenerateSizeRecommendationsInput = z.infer<
  typeof GenerateSizeRecommendationsInputSchema
>;

const GenerateSizeRecommendationsOutputSchema = z.object({
  suggestedSizeRange: z
    .string()
    .describe(
      'A suggested size range for eyeglasses, formatted as lensWidth-bridgeWidth-templeLength (e.g., 52-18-140).'
    ),
  similarShapes: z
    .array(z.string())
    .describe(
      'An array of similar eyeglass shapes that tend to fit the user (e.g., round, rectangle, aviator).'
    ),
  recommendationText: z
    .string()
    .describe(
      'A human-readable string providing detailed recommendations based on the analysis.'
    ),
});
export type GenerateSizeRecommendationsOutput = z.infer<
  typeof GenerateSizeRecommendationsOutputSchema
>;

export async function generateSizeRecommendations(
  input: GenerateSizeRecommendationsInput
): Promise<GenerateSizeRecommendationsOutput> {
  return generateSizeRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateSizeRecommendationsPrompt',
  input: {schema: GenerateSizeRecommendationsInputSchema},
  output: {schema: GenerateSizeRecommendationsOutputSchema},
  prompt: `Based on the provided eyeglass measurements and face shape, provide size and style recommendations.

Lens Width: {{{lensWidth}}} mm
Bridge Width: {{{bridgeWidth}}} mm
Temple Length: {{{templeLength}}} mm
Face Shape: {{{faceShape}}}

Consider the following when generating recommendations:
- The suggested size range should be a reasonable range around the provided measurements.
- Similar shapes should be shapes that are likely to fit the user's face shape and the provided measurements.
- The recommendation text should be a detailed explanation of the recommendations.

Respond in the following format:
{
  "suggestedSizeRange": "lensWidth-bridgeWidth-templeLength (e.g., 52-18-140)",
  "similarShapes": ["shape1", "shape2", "shape3"],
   "recommendationText": "Detailed explanation of the recommendations."
}
`,
});

const generateSizeRecommendationsFlow = ai.defineFlow(
  {
    name: 'generateSizeRecommendationsFlow',
    inputSchema: GenerateSizeRecommendationsInputSchema,
    outputSchema: GenerateSizeRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
