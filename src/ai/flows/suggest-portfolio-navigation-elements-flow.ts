
'use server';
/**
 * @fileOverview An AI agent that suggests placements, content ideas, and styling for navigation elements
 *               based on existing design and style guidelines.
 *
 * - suggestPortfolioNavigationElements - A function that handles the navigation element suggestion process.
 * - SuggestPortfolioNavigationElementsInput - The input type for the suggestPortfolioNavigationElements function.
 * - SuggestPortfolioNavigationElementsOutput - The return type for the suggestPortfolioNavigationElements function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const StyleGuidelinesSchema = z.object({
  primaryColor: z.string().describe('The primary color for the portfolio (e.g., #2515D8).'),
  backgroundColor: z.string().describe('The background color for the portfolio (e.g., White).'),
  textColor: z.string().describe('The text color for the portfolio (e.g., Black).'),
  headlineFont: z.string().describe('The headline font (e.g., Belleza).'),
  bodyFont: z.string().describe('The body font (e.g., Alegreya).'),
  layoutDescription: z.string().describe('A description of the overall layout style (e.g., full-width, responsive).'),
  iconographyDescription: z.string().describe('A description of the iconography style (e.g., minimalistic, tech and design).'),
  animationDescription: z.string().describe('A description of animation principles (e.g., subtle on hover).'),
});

const SuggestPortfolioNavigationElementsInputSchema = z.object({
  heroSectionHtmlCss: z
    .string()
    .describe(
      'The HTML and CSS content of the existing hero section to inform design consistency.'
    ),
  aboutSectionContent: z
    .string()
    .describe(
      'The content from the \'About\' section to ensure contextual and styling consistency.'
    ),
  styleGuidelines: StyleGuidelinesSchema.describe('Comprehensive style guidelines for the portfolio.'),
  navigationItems: z.array(z.string()).describe('A list of navigation items to suggest (e.g., Work, Play, About, Resume/Contact).'),
});
export type SuggestPortfolioNavigationElementsInput = z.infer<
  typeof SuggestPortfolioNavigationElementsInputSchema
>;

const NavigationSuggestionSchema = z.object({
  item: z.string().describe('The name of the navigation item (e.g., \'Work\').'),
  placement: z.string().describe('Suggested placement for the navigation item (e.g., \'Top right of the header\', \'Fixed sidebar\').'),
  contentIdeas: z.string().describe('Ideas for the content that should be included in this navigation section.'),
  styling: z.string().describe('Detailed CSS or style descriptions for the navigation item and its content, consistent with overall guidelines.'),
});

const SuggestPortfolioNavigationElementsOutputSchema = z.object({
  suggestions: z.array(NavigationSuggestionSchema).describe('A list of suggestions for each requested navigation item.'),
});
export type SuggestPortfolioNavigationElementsOutput = z.infer<
  typeof SuggestPortfolioNavigationElementsOutputSchema
>;

export async function suggestPortfolioNavigationElements(
  input: SuggestPortfolioNavigationElementsInput
): Promise<SuggestPortfolioNavigationElementsOutput> {
  return suggestPortfolioNavigationElementsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestPortfolioNavigationElementsPrompt',
  input: {schema: SuggestPortfolioNavigationElementsInputSchema},
  output: {schema: SuggestPortfolioNavigationElementsOutputSchema},
  prompt: `You are an AI-powered style advisor for a digital portfolio branded as 'KM'.
Your task is to suggest placements, content ideas, and consistent styling for navigation elements.

Use the provided hero section design, about section content, and comprehensive style guidelines to ensure all suggestions maintain a cohesive look and feel.

--- Existing Information ---

Hero Section HTML/CSS:
"""
{{{heroSectionHtmlCss}}}
"""

About Section Content:
"""
{{{aboutSectionContent}}}
"""

Style Guidelines:
Primary Color: {{{styleGuidelines.primaryColor}}}
Background Color: {{{styleGuidelines.backgroundColor}}}
Text Color: {{{styleGuidelines.textColor}}}
Headline Font: {{{styleGuidelines.headlineFont}}}
Body Font: {{{styleGuidelines.bodyFont}}}
Layout Description: {{{styleGuidelines.layoutDescription}}}
Iconography Description: {{{styleGuidelines.iconographyDescription}}}
Animation Description: {{{styleGuidelines.animationDescription}}}

--- Task ---

For each of the following navigation items, provide a suggested placement, content ideas, and detailed styling consistent with the provided information:

{{#each navigationItems}}
- {{{this}}}
{{/each}}

Ensure the styling suggestions are precise, mentioning specific CSS properties where applicable, and reflect the overall brand and design principles of 'KM'. Consider the responsiveness and user experience.
`,
});

const suggestPortfolioNavigationElementsFlow = ai.defineFlow(
  {
    name: 'suggestPortfolioNavigationElementsFlow',
    inputSchema: SuggestPortfolioNavigationElementsInputSchema,
    outputSchema: SuggestPortfolioNavigationElementsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
