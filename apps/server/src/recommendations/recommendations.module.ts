import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import { PaymentModule } from "../payment/payment.module";
import { PrinterService } from "../printer/printer.service";
import { ResumeService } from "../resume/resume.service";
import { StorageModule } from "../storage/storage.module";
import { UserService } from "../user/user.service";
import { UtilsService } from "../utils/utils.service";
import { GeminiService } from "./gemini/gemini.service";
import { JobTitleService } from "./job-title/job-title.service";
import { PalmService } from "./palm/palm.service";
import { RecommendationsController } from "./recommendations.controller";
import { RecommendationsService } from "./recommendations.service";

@Module({
  imports: [HttpModule, StorageModule, PaymentModule],
  providers: [
    RecommendationsService,
    PalmService,
    GeminiService,
    JobTitleService,
    ConfigService,
    UserService,
    UtilsService,
    ResumeService,
    PrinterService,
  ],
  controllers: [RecommendationsController],
})
export class RecommendationsModule {}
