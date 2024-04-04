import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import { PrinterService } from "../printer/printer.service";
import { ResumeService } from "../resume/resume.service";
import { StorageModule } from "../storage/storage.module";
import { StripeModule } from "../stripe/stripe.module";
import { UserService } from "../user/user.service";
import { UtilsService } from "../utils/utils.service";
import { JobTitleService } from "./job-title/job-title.service";
import { PalmService } from "./palm/palm.service";
import { RecommendationsController } from "./recommendations.controller";
import { RecommendationsService } from "./recommendations.service";

@Module({
  imports: [HttpModule, StorageModule, StripeModule],
  providers: [
    RecommendationsService,
    PalmService,
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
