import { createZodDto } from "nestjs-zod/dto";
import { z } from "nestjs-zod/z";

import { priceSchema } from "./price";

export const productMetadataSchema = z.object({
  resume: z.number().default(0),
  unlimited: z.boolean().default(false),
  recommendations: z.boolean().default(false),
});
export type ProductMetadata = z.infer<typeof productMetadataSchema>;

export const productSchema = z.object({
  // Product ID from Stripe, e.g. prod_1234.
  id: z.string(),
  // Whether the product is currently available for purchase.
  active: z.boolean().default(false),
  // The product's name, meant to be displayable to the customer. Whenever this product is sold via a subscription, name will show up on associated invoice line item descriptions.
  name: z.string().max(255),
  // The product's description, meant to be displayable to the customer. Use this field to optionally store a long form explanation of the product being sold for your own rendering purposes.
  description: z.string().nullable(),
  // A URL of the product image in Stripe, meant to be displayable to the customer.
  image: z.string().nullable(),
  // Set of key-value pairs, used to store additional information about the object in a structured format.
  metadata: z.json(),

  prices: z.array(priceSchema).optional(),
});

export class ProductDto extends createZodDto(productSchema) {}

export const createProductMetadataFromJson = (content: string): ProductMetadata => {
  return z
    .custom<string>(() => {
      try {
        JSON.parse(content);
      } catch (error) {
        return false;
      }
      return true;
    }, "invalid json") // write whatever error you want here
    .transform((content) => JSON.parse(content))
    .pipe(productMetadataSchema)
    .parse(content);
};
