import { GoogleGenerativeAI } from "@google/generative-ai";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { RecommendationSuggestionResponse } from "@reactive-resume/schema";

import { Config } from "../../config/schema";
import { PROMPT } from "./gemini.prompt";

@Injectable()
export class GeminiService {
  readonly gemini_key: string;
  readonly gemini_modal_name: string;
  readonly genAI: GoogleGenerativeAI;

  constructor(private readonly configService: ConfigService<Config>) {
    this.gemini_key = this.configService.get("PALM_API_KEY") || "";
    this.gemini_modal_name = this.configService.get("PALM_MODEL_NAME") || "";
    this.genAI = new GoogleGenerativeAI(this.gemini_key);
  }

  async getTextRecommendation(prompt: string) {
    const model = this.genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const data = response.text();
    return data;
  }

  async getRecommendation(
    jobTitle: string,
    section: "summary" | "education" | "experience",
  ): Promise<RecommendationSuggestionResponse> {
    const prompt = PROMPT[section].replace("{input}", jobTitle);
    const model = this.genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const data = response.text();

    if (!data) {
      throw new Error(`AI did not return any choices for your text.`);
    }

    try {
      const result = data;
      return JSON.parse(result) as RecommendationSuggestionResponse;
    } catch {
      throw new Error(`AI did not return a valid JSON.`);
    }
  }
}
