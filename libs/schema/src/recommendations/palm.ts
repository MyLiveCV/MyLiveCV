import { protos } from "@google-ai/generativelanguage";
import { z } from "zod";

export const recommendationSummaryRequest = z.object({
  prompt: z.string(),
});

export const recommendationSummaryResponse = z.object({
  summary: z.string(),
});

export const recommendationSummaryRequestDefault = { summary: "" };

export type RecommendationRequest = z.infer<typeof recommendationSummaryRequest>;

export type PalmGenerateTextRequest =
  protos.google.ai.generativelanguage.v1beta2.GenerateTextRequest;

export type PalmGenerateTextResponse = [
  protos.google.ai.generativelanguage.v1beta2.IGenerateTextResponse,
  protos.google.ai.generativelanguage.v1beta2.IGenerateTextRequest | undefined,
  undefined,
];

export type RecommendationSummaryResponse = z.infer<typeof recommendationSummaryResponse>;
export type RecommendationSuggestionResponse = {
  suggestions: string[];
  relatedJobTitles: string[];
  jobTitle: string;
  jobCategory?: string;
};
