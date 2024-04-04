import { Module } from "@nestjs/common";

import { AuthModule } from "@/server/auth/auth.module";
import { PrinterModule } from "@/server/printer/printer.module";

import { StorageModule } from "../storage/storage.module";
import { StripeModule } from "../stripe/stripe.module";
import { ResumeController } from "./resume.controller";
import { ResumeService } from "./resume.service";

@Module({
  imports: [AuthModule, PrinterModule, StorageModule, StripeModule],
  controllers: [ResumeController],
  providers: [ResumeService],
  exports: [ResumeService],
})
export class ResumeModule {}
