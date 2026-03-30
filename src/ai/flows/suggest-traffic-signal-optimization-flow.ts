'use server';
/**
 * @fileOverview This flow suggests optimal traffic signal timings based on real-time simulated data.
 *
 * - suggestTrafficSignalOptimization - A function that handles the traffic signal optimization process.
 * - SuggestTrafficSignalOptimizationInput - The input type for the suggestTrafficSignalOptimization function.
 * - SuggestTrafficSignalOptimizationOutput - The return type for the suggestTrafficSignalOptimization function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const SuggestTrafficSignalOptimizationInputSchema = z.object({
  vehicleCount: z.number().describe('The current number of vehicles detected at the junction.'),
  aqi: z.number().describe('The current Air Quality Index at the junction.'),
  roadCondition: z.enum(['Clear', 'Busy', 'Congested', 'Damaged', 'Market Traffic']).describe('The current road condition.'),
  baseTimer: z.number().describe('The default or minimum signal timer in seconds for the junction.'),
  maxTimer: z.number().describe('The maximum allowed signal timer in seconds for the junction.'),
  nodes: z.number().describe('The number of active traffic nodes/lanes at the junction.'),
});
export type SuggestTrafficSignalOptimizationInput = z.infer<typeof SuggestTrafficSignalOptimizationInputSchema>;

const SuggestTrafficSignalOptimizationOutputSchema = z.object({
  recommendedTimer: z.number().describe('The recommended traffic signal timer in seconds, adjusted for current conditions. Must be between baseTimer and maxTimer, and at least 10 seconds.'),
  rationale: z.string().describe('An explanation of why the recommended timer was chosen, considering vehicle count, AQI, and road conditions.'),
});
export type SuggestTrafficSignalOptimizationOutput = z.infer<typeof SuggestTrafficSignalOptimizationOutputSchema>;

export async function suggestTrafficSignalOptimization(input: SuggestTrafficSignalOptimizationInput): Promise<SuggestTrafficSignalOptimizationOutput> {
  return suggestTrafficSignalOptimizationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'trafficSignalOptimizationPrompt',
  input: { schema: SuggestTrafficSignalOptimizationInputSchema },
  output: { schema: SuggestTrafficSignalOptimizationOutputSchema },
  prompt: `You are an AI-powered traffic control system expert. Your task is to recommend an optimal traffic signal timing for a specific junction based on real-time simulated data.

Analyze the following information:
- Current Vehicle Count: {{{vehicleCount}}}
- Current AQI (Air Quality Index): {{{aqi}}}
- Current Road Condition: {{{roadCondition}}}
- Base Signal Timer: {{{baseTimer}}} seconds
- Maximum Signal Timer: {{{maxTimer}}} seconds
- Number of Active Nodes: {{{nodes}}}

Consider these factors when determining the recommended timer:
1.  **Vehicle Count**: Higher vehicle counts generally require longer signal times to clear traffic efficiently.
2.  **Road Condition**: 'Congested' or 'Market Traffic' conditions also suggest longer timers. 'Clear' or 'Busy' might allow for shorter timers. 'Damaged' implies careful management, possibly shorter cycles to prevent further congestion or re-routing.
3.  **AQI**: A higher AQI (indicating poorer air quality) suggests a need to minimize vehicle idling and promote smoother traffic flow. This might involve adjusting timers to reduce congestion where possible.
4.  **Constraints**: The recommended timer MUST be between the 'baseTimer' and 'maxTimer' values provided. The minimum possible timer should always be at least 10 seconds, even if baseTimer is lower.

Provide the 'recommendedTimer' in seconds and a 'rationale' explaining your decision based on the input data and the factors above.
`,
});

const suggestTrafficSignalOptimizationFlow = ai.defineFlow(
  {
    name: 'suggestTrafficSignalOptimizationFlow',
    inputSchema: SuggestTrafficSignalOptimizationInputSchema,
    outputSchema: SuggestTrafficSignalOptimizationOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
      throw new Error('Failed to get a response from the AI for traffic signal optimization.');
    }
    // Ensure the recommended timer adheres to constraints
    let recommendedTimer = Math.max(10, output.recommendedTimer);
    recommendedTimer = Math.max(input.baseTimer, recommendedTimer);
    recommendedTimer = Math.min(input.maxTimer, recommendedTimer);

    // If the LLM output needs correction, reflect that in the rationale for clarity.
    let rationale = output.rationale;
    if (recommendedTimer !== output.recommendedTimer) {
      rationale += ` (Note: The initial AI recommendation of ${output.recommendedTimer}s was adjusted to ${recommendedTimer}s to fit within the valid range [${input.baseTimer}s, ${input.maxTimer}s] and minimum 10s constraint).`;
    }

    return { ...output, recommendedTimer, rationale };
  }
);
