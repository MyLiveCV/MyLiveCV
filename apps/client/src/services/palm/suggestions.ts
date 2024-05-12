/* eslint-disable lingui/text-restrictions */
/* eslint-disable lingui/no-unlocalized-strings */
import { t } from "@lingui/macro";
import { RecommendationRequest } from "@reactive-resume/schema";
import { ResumeSections } from "@reactive-resume/utils";
import { AxiosResponse } from "axios";

import { axios } from "@/client/libs/axios";

type PromptType = {
  [key in ResumeSections]?: string;
};

const PROMPT: PromptType = {
  summary: `You are an AI writing assistant specialized in writing copy for resumes.
Generate the suggestion for Professional Profile Summary for provided Candidate Details for specific jobTitle.
Write the data in the following JSON format:
{"jobTitle": JOB_TITLE, "relatedJobTitles": [RELATED_JOB_TITLE_1, RELATED_JOB_TITLE_1], "suggestions": [SUGGESTION_1, SUGGESTION_2] }
Return just valid JSON, do not add new lines or extra spaces or special characters and suggest at least 5 suggestions
In suggestions text do not add * or special characters.

Candidate Details: """{input}"""
`,
  education: `You are an AI writing assistant specialized in writing copy for resumes.
Generate the suggestion for Education Summary for provided Candidate Details for specific jobTitle and Education Details.
Write the data in the following JSON format:
{"jobTitle": JOB_TITLE, "relatedJobTitles": [RELATED_JOB_TITLE_1, RELATED_JOB_TITLE_1], "suggestions": [SUGGESTION_1, SUGGESTION_2] }
Return just valid JSON, do not add new lines or extra spaces or special characters and suggest at least 8 suggestions.
In suggestions text do not add * or special characters.


Candidate Details: """{input}"""
`,
  experience: `You are an AI writing assistant specialized in writing copy for resumes.
Generate the suggestion for Experience Summary for provided Candidate Details for specific jobTitle, Skills and Work Experience.
Write the data in the following JSON format:
{"jobTitle": JOB_TITLE, "relatedJobTitles": [RELATED_JOB_TITLE_1, RELATED_JOB_TITLE_1], "suggestions": [SUGGESTION_1, SUGGESTION_2] }
Return just valid JSON, do not add new lines or extra spaces or special characters and suggest at least 8 suggestions.
In suggestions text do not add * or special characters.

Candidate Details: """{input}"""
`,
};

type Response = {
  suggestions: string[];
  relatedJobTitles: string[];
  jobTitle: string;
};

export const palmSuggestions = async (text: string, sectionName: ResumeSections) => {
  const prompt = PROMPT[sectionName]?.replace("{input}", text) || text;
  const response = await axios.post<string, AxiosResponse<string>, RecommendationRequest>(
    "/recommendations/text",
    { prompt },
  );

  if (!response.data) {
    throw new Error(t`AI did not return any choices for your text.`);
  }

  const result = response.data;
  let data: Response;
  try {
    data = JSON.parse(result) as Response;
  } catch {
    throw new Error(t`AI did not return a valid JSON.`);
  }

  return data;
};
