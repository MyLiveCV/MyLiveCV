/* eslint-disable lingui/text-restrictions */

import { t } from "@lingui/macro";
import { RecommendationRequest } from "@reactive-resume/schema";
import { AxiosResponse } from "axios";

import { axios } from "@/client/libs/axios";

const PROMPT = `You are an AI writing assistant specialized in writing copy for resumes.
Do not return anything else except the text you improved. It should not begin with a newline. It should not have any prefix or suffix text.
The Text is in Html format, do not change the formatting.
Just fix the spelling and grammar of the following paragraph, do not change the meaning and returns in the language of the text

Text: """{input}"""`;

export const fixGrammar = async (text: string) => {
  const prompt = PROMPT.replace("{input}", text);

  const response = await axios.post<string, AxiosResponse<string>, RecommendationRequest>(
    "/recommendations/text",
    { prompt },
  );

  if (!response.data) {
    throw new Error(t`AI did not return any choices for your text.`);
  }

  const result = response.data;

  return result ?? text;
};
