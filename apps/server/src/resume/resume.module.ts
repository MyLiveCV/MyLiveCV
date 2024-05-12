import { Module } from "@nestjs/common";

import { AuthModule } from "@/server/auth/auth.module";
import { PrinterModule } from "@/server/printer/printer.module";

import { PaymentModule } from "../payment/payment.module";
import { StorageModule } from "../storage/storage.module";
import { ResumeController } from "./resume.controller";
import { ResumeService } from "./resume.service";

@Module({
  imports: [AuthModule, PrinterModule, StorageModule, PaymentModule],
  controllers: [ResumeController],
  providers: [ResumeService],
  exports: [ResumeService],
})
export class ResumeModule {}
