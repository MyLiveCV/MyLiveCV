import { Reflector } from "@nestjs/core";

type Feature = "resume" | "recommendations";

export const Features = Reflector.createDecorator<Feature[]>();
