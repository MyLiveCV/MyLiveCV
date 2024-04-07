import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { UserWithSecrets } from "@reactive-resume/dto";
import { ErrorMessage } from "@reactive-resume/utils";
import { Request } from "express";

import { ResumeService } from "@/server/resume/resume.service";

import { Features } from "../decorators/payment.decorator";
import { StripeService } from "../stripe.service";

@Injectable()
export class PaymentGuard implements CanActivate {
  constructor(
    private readonly subscriptionService: StripeService,
    private readonly resumeService: ResumeService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // For which feature check the Guard
    const features = this.reflector.get(Features, context.getHandler());
    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user as UserWithSecrets | false;

    const userId = user && user.id;

    if (!userId) {
      return false;
    }

    try {
      const activeSubscription = await this.subscriptionService.findActiveSubscription(userId);

      // Check If Payment not exist
      if (!activeSubscription) {
        console.log("subscription not valid");
        throw new HttpException(ErrorMessage.PaymentRequired, HttpStatus.PAYMENT_REQUIRED);
      }

      // If features Decorator is empty or not valid
      if (!features || !Array.isArray(features) || features.length === 0) {
        // If features is not an actual array
        return true;
      }

      try {
        const productMetadata = activeSubscription?.price.product.metadata as {
          resume: string;
          unlimited: string;
          recommendations: string;
        };

        console.log(productMetadata);

        // Check If resume allowed
        if (features.includes("resume")) {
          const resumeCount = await this.resumeService.findResumeCount(userId);
          if (
            // if not unlimited and resume allowed
            productMetadata.unlimited !== "true" &&
            resumeCount >= parseInt(productMetadata.resume)
          ) {
            console.log("new resume not allowed");
            throw new HttpException(ErrorMessage.PaymentRequired, HttpStatus.PAYMENT_REQUIRED);
          }
        }

        // Check If suggestion allowed
        if (features.includes("recommendations") && productMetadata.recommendations !== "true") {
          console.log("suggestion not allowed");
          throw new HttpException(ErrorMessage.PaymentRequired, HttpStatus.PAYMENT_REQUIRED);
        }
      } catch (error) {
        console.log(error);
        throw new HttpException(ErrorMessage.PaymentRequired, HttpStatus.PAYMENT_REQUIRED);
      }
      return true;
    } catch (error) {
      console.log(error);
      throw new HttpException(ErrorMessage.PaymentRequired, HttpStatus.PAYMENT_REQUIRED);
    }
  }
}
