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
  suggestedSize: z
    .string()
    .describe(
      'A general size category for the user, such as "Narrow", "Medium", or "Wide".'
    ),
  similarShapes: z
    .array(z.string())
    .describe(
      'An array of eyeglass shapes that are likely to fit the user well (e.g., round, rectangle, aviator).'
    ),
  recommendationText: z
    .string()
    .describe(
      'A friendly, easy-to-understand explanation of the recommendations, written for a general audience.'
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
  prompt: `You are a friendly and helpful AI assistant for an eyeglass fitting app. Your goal is to provide recommendations that are easy for anyone to understand, avoiding technical jargon.

Analyze the user's measurements and face shape to suggest a general frame size and recommend flattering shapes.

User's Measurements:
- Lens Width: {{{lensWidth}}} mm
- Bridge Width: {{{bridgeWidth}}} mm
- Temple Length: {{{templeLength}}} mm
- Face Shape: {{#if faceShape}}{{{faceShape}}}{{else}}Not provided{{/if}}

**Your Task:**

1.  **Determine the Size Category:** Based on the measurements, classify the best fit into a simple category: "Narrow", "Medium", or "Wide".
2.  **Suggest Flattering Shapes:** Recommend a few frame shapes that would complement the user's measurements and face shape (if provided).
3.  **Write a Friendly Recommendation:** Combine your analysis into a short, encouraging, and easy-to-read paragraph. Explain *why* these shapes might be a good choice in simple terms. For example, "Wider frames might balance a square face," or "Cat-eye styles can add a nice lift."

**Example Response Format:**
{
  "suggestedSize": "Medium",
  "similarShapes": ["Rectangle", "Oval", "Wayfarer"],
  "recommendationText": "It looks like a medium-sized frame would be a great fit for you. Based on your features, rectangular or wayfarer styles could provide a nice, balanced look. If you're feeling adventurous, an oval frame could also be a very flattering choice!"
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
