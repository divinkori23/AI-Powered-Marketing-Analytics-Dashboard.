
'use server';
/**
 * @fileOverview An AI flow for generating marketing insights.
 *
 * - generateInsights - A function that generates insights based on marketing metrics.
 * - GenerateInsightsInput - The input type for the generateInsights function.
 * - GenerateInsightsOutput - The return type for the generateInsights function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const GenerateInsightsInputSchema = z.object({
  revenue: z.number().describe('Total revenue in USD.'),
  revenueChange: z.number().describe('The percentage change in revenue from the last month.'),
  users: z.number().describe('The number of active users.'),
  usersChange: z.number().describe('The percentage change in active users from the last month.'),
  conversions: z.number().describe('The number of conversions.'),
  conversionsChange: z.number().describe('The percentage change in conversions from the last month.'),
  growth: z.number().describe('The overall growth rate percentage.'),
});
export type GenerateInsightsInput = z.infer<typeof GenerateInsightsInputSchema>;

const GenerateInsightsOutputSchema = z.object({
  summary: z.string().describe("A brief, high-level summary of the marketing performance."),
  recommendations: z.array(z.string()).describe("A list of actionable recommendations to improve performance."),
});
export type GenerateInsightsOutput = z.infer<typeof GenerateInsightsOutputSchema>;


export async function generateInsights(input: GenerateInsightsInput): Promise<GenerateInsightsOutput> {
  return generateInsightsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateInsightsPrompt',
  input: { schema: GenerateInsightsInputSchema },
  output: { schema: GenerateInsightsOutputSchema },
  prompt: `You are a marketing analyst AI. Analyze the following marketing data and provide a summary and actionable recommendations.

Data:
- Total Revenue: {{{revenue}}} (Change: {{{revenueChange}}}%)
- Active Users: {{{users}}} (Change: {{{usersChange}}}%)
- Conversions: {{{conversions}}} (Change: {{{conversionsChange}}}%)
- Growth Rate: {{{growth}}}%

Provide a concise summary of the overall performance. Then, provide a list of 3-5 specific, actionable recommendations for a marketing agency to improve these metrics. Focus on practical steps they can take.`,
});

const generateInsightsFlow = ai.defineFlow(
  {
    name: 'generateInsightsFlow',
    inputSchema: GenerateInsightsInputSchema,
    outputSchema: GenerateInsightsOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
