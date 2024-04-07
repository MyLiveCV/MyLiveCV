import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";

import { AuthModule } from "../auth/auth.module";
import { StorageModule } from "../storage/storage.module";
import { PaymentController } from "./payment.controller";
import { StripeService } from "./stripe.service";

@Module({
  imports: [AuthModule, HttpModule, StorageModule],
  controllers: [PaymentController],
  providers: [StripeService],
  exports: [StripeService],
})
export class PaymentModule {}
