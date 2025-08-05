
'use server';
/**
 * @fileOverview A chat flow that uses Genkit's streaming capabilities.
 *
 * - chat - a streaming flow for conversational AI.
 * - ChatInput - The input type for the chat function.
 * - ChatMessage - The type for a single chat message.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { getMetrics } from '@/lib/data';

const ChatMessageSchema = z.object({
  role: z.enum(['user', 'model']),
  content: z.string(),
});
export type ChatMessage = z.infer<typeof ChatMessageSchema>;

const ChatInputSchema = z.object({
  history: z.array(ChatMessageSchema),
  prompt: z.string(),
});
export type ChatInput = z.infer<typeof ChatInputSchema>;


export async function chat(input: ChatInput) {
    return chatFlow(input);
}

const chatFlow = ai.defineFlow(
  {
    name: 'chatFlow',
    inputSchema: ChatInputSchema,
    outputSchema: z.void(),
    stream: { schema: z.object({ content: z.string() }) },
  },
  async function* (input) {
    const metrics = await getMetrics();

    const systemPrompt = `You are an expert marketing analyst AI. Your goal is to help users understand their marketing data and provide actionable advice.

Here is the current data:
- Total Revenue: $${metrics.revenue.toFixed(2)} (${metrics.revenueChange > 0 ? '+' : ''}${metrics.revenueChange.toFixed(1)}%)
- Active Users: ${metrics.users} (${metrics.usersChange > 0 ? '+' : ''}${metrics.usersChange.toFixed(1)}%)
- Conversions: ${metrics.conversions} (${metrics.conversionsChange > 0 ? '+' : ''}${metrics.conversionsChange.toFixed(1)}%)
- Growth Rate: ${metrics.growth.toFixed(1)}%

Keep your answers concise and helpful.`;

    const { stream } = ai.generateStream({
      prompt: [
        ...input.history.map(msg => ({
          role: msg.role,
          content: [{ text: msg.content }],
        })),
        { role: 'user', content: [{ text: input.prompt }] },
      ],
      config: {
        // Use a different model for chat
        model: 'googleai/gemini-2.0-flash',
      },
      system: systemPrompt,
    });

    for await (const chunk of stream) {
      if (chunk.content) {
        yield { content: chunk.content };
      }
    }
  }
);
