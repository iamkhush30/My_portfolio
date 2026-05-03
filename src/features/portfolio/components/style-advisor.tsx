
"use client";

import React, { useState } from 'react';
import { Sparkles, Loader2, Wand2, ArrowRight } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/shared/ui/card';
import { suggestPortfolioNavigationElements, type SuggestPortfolioNavigationElementsOutput } from '@/ai/flows/suggest-portfolio-navigation-elements-flow';

export const StyleAdvisor = () => {
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<SuggestPortfolioNavigationElementsOutput | null>(null);

  const handleSuggest = async () => {
    setLoading(true);
    try {
      const result = await suggestPortfolioNavigationElements({
        heroSectionHtmlCss: "Hero section with large headline 'Turning Logic into Art', split layout, primary color #1E3A8A, high-tech imagery.",
        aboutSectionContent: "I am a professional with a background in DevOps and UI/UX. I focus on bridging efficiency with aesthetics. My style is minimalistic, sophisticated, and high-tech.",
        styleGuidelines: {
          primaryColor: "#1E3A8A",
          backgroundColor: "White",
          textColor: "Black",
          headlineFont: "Outfit",
          bodyFont: "Plus Jakarta Sans",
          layoutDescription: "Full-width design with prominent typography, responsive grid.",
          iconographyDescription: "Minimalistic, tech and design focused icons.",
          animationDescription: "Subtle hover states and fade-ins for interactive elements."
        },
        navigationItems: ["Work", "Play", "About", "Resume/Contact"]
      });
      setSuggestions(result);
    } catch (error) {
      console.error("Failed to fetch suggestions:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="ai-advisor" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center text-center space-y-6 mb-16">
          <div className="w-16 h-16 bg-primary/10 flex items-center justify-center rounded-full">
            <Sparkles className="text-primary w-8 h-8" />
          </div>
          <h2 className="text-secondary-heading">AI Style Advisor</h2>
          <p className="text-description max-w-xl text-center">
            Let the AI Style Advisor suggest content and placement ideas for your portfolio to maintain a consistent high-end brand.
          </p>
          <Button 
            onClick={handleSuggest} 
            disabled={loading}
            size="lg"
            className="h-14 px-8 rounded-none border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-white transition-all font-bold tracking-widest"
          >
            {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Wand2 className="mr-2 h-5 w-5" />}
            GENERATE SUGGESTIONS
          </Button>
        </div>

        {suggestions && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
            {suggestions.suggestions.map((suggestion, idx) => (
              <Card key={idx} className="border border-border shadow-xl rounded-none hover:border-primary/50 transition-all group">
                <CardHeader className="bg-primary/5 border-b border-primary/10">
                  <CardTitle className="font-headline text-2xl flex items-center justify-between">
                    {suggestion.item}
                    <ArrowRight className="w-5 h-5 text-primary group-hover:translate-x-2 transition-transform" />
                  </CardTitle>
                  <CardDescription className="font-medium text-primary uppercase tracking-wider text-xs">
                    Placement: {suggestion.placement}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  <div>
                    <h4 className="text-label text-muted-foreground mb-2">Content Ideas</h4>
                    <p className="text-body">{suggestion.contentIdeas}</p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-sm">
                    <h4 className="text-label text-muted-foreground mb-2">Styling Guidelines</h4>
                    <p className="text-label font-code text-primary">{suggestion.styling}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
