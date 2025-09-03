'use server';

/**
 * @fileOverview A conversational agent that can answer questions about a fit analysis report.
 *
 * - chatWithReport - A function that handles the conversational chat.
 * - ChatWithReportInput - The input type for the chatWithReport function.
 * - ChatWithReportOutput - The return type for the chatWithReport function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ChatWithReportInputSchema = z.object({
  report: z.string().describe('The full text of the eyeglass fit analysis report.'),
  question: z.string().describe('The user\'s question about the report.'),
  history: z.array(z.object({
    role: z.enum(['user', 'model']),
    content: z.array(z.object({
      text: z.string()
    }))
  })).optional().describe('The conversation history.'),
});
export type ChatWithReportInput = z.infer<typeof ChatWithReportInputSchema>;

const ChatWithReportOutputSchema = z.object({
    answer: z.string().describe('The AI-generated answer to the user\'s question.'),
});
export type ChatWithReportOutput = z.infer<typeof ChatWithReportOutputSchema>;

export async function chatWithReport(input: ChatWithReportInput): Promise<ChatWithReportOutput> {
  return chatWithReportFlow(input);
}

const prompt = ai.definePrompt({
  name: 'chatWithReportPrompt',
  input: {schema: ChatWithReportInputSchema},
  output: {schema: ChatWithReportOutputSchema},
  prompt: `You are an AI assistant for FrameSense, designed to help users understand their eyeglass fit analysis report.
Your role is to answer questions based ONLY on the information provided in the report.
Do not answer any questions that are outside the scope of the report. Be friendly, concise, and helpful.

Here is the report:
---
{{{report}}}
---

Here is the user's question: {{{question}}}

Please provide a helpful answer.`,
});

const chatWithReportFlow = ai.defineFlow(
  {
    name: 'chatWithReportFlow',
    inputSchema: ChatWithReportInputSchema,
    outputSchema: ChatWithReportOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
