import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Throttle } from "@nestjs/throttler";
import { RecommendationRequest } from "@reactive-resume/schema";

import { TwoFactorGuard } from "../auth/guards/two-factor.guard";
import { Features } from "../payment/decorators/payment.decorator";
import { PaymentGuard } from "../payment/guards/payment.guard";
import { GeminiService } from "./gemini/gemini.service";
import { RecommendationsService } from "./recommendations.service";

@ApiTags("Recommendations")
@Controller("recommendations")
export class RecommendationsController {
  constructor(
    private readonly geminiService: GeminiService,
    private readonly recommendationService: RecommendationsService,
  ) {}

  @Throttle({ default: { limit: 5, ttl: 1000 } })
  @Post("text")
  @UseGuards(TwoFactorGuard, PaymentGuard)
  async text(@Body() req: RecommendationRequest) {
    const recommendation = await this.geminiService.getTextRecommendation(req.prompt);
    return recommendation;
  }

  @Get(":jobTitle/summary")
  @Features(["recommendations"])
  @UseGuards(TwoFactorGuard, PaymentGuard)
  async Summary(@Param("jobTitle") jobTitle: string) {
    const recommendation = await this.recommendationService.getRecommendation(jobTitle, "summary");
    return recommendation;
  }

  @Get(":jobTitle/experience")
  @Features(["recommendations"])
  @UseGuards(TwoFactorGuard, PaymentGuard)
  async WorkSummary(@Param("jobTitle") jobTitle: string) {
    const recommendation = await this.recommendationService.getRecommendation(
      jobTitle,
      "experience",
    );
    return recommendation;
  }

  @Get(":jobTitle/education")
  @Features(["recommendations"])
  @UseGuards(TwoFactorGuard, PaymentGuard)
  async EducationSummary(@Param("jobTitle") jobTitle: string) {
    const recommendation = await this.recommendationService.getRecommendation(
      jobTitle,
      "education",
    );
    return recommendation;
  }

  @Get("suggest/job-titles")
  @UseGuards(TwoFactorGuard)
  async JobTitles(@Param("jobTitle") jobTitle: string) {
    const recommendation = await this.recommendationService.searchJobTitles(jobTitle);
    return recommendation;
  }
}
