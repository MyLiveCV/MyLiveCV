import { PromptKey } from "@reactive-resume/schema";
import { ResumeSections } from "@reactive-resume/utils";
import { Editor } from "@tiptap/react";
import { useEffect, useState } from "react";

import { useRecommendations } from "@/client/services/recommendations/recommendations";

import { useResumeStore } from "../../stores/resume";
import { List } from "./list";
import { Search } from "./search";

export const Suggestions = ({
  editor,
  content,
  sectionName,
}: {
  editor: Editor;
  content: string;
  sectionName: ResumeSections;
}) => {
  const { resume } = useResumeStore.getState();

  const [jobTitle, setJobTitle] = useState<string>(() => resume.jobTitle || "");
  const [suggestions, setSuggestions] = useState<{ text: string; isSelected: boolean }[]>([]);
  const [relatedJobTitles, setRelatedJobTitles] = useState<string[]>([]);

  const { recommendations, loading } = useRecommendations(jobTitle, sectionName as PromptKey);

  useEffect(() => {
    const list = recommendations?.recommendations?.map((suggestion) => ({
      text: suggestion.phrase,
      isSelected: content.includes(suggestion.phrase),
    }));
    setSuggestions(list || []);
    setRelatedJobTitles(recommendations?.relatedJobTitles || []);
  }, [recommendations]);

  useEffect(() => {
    if (suggestions.length > 0) {
      const list = suggestions.map((suggestion) => ({
        text: suggestion.text,
        isSelected: content.includes(suggestion.text),
      }));
      setSuggestions(list);
    }
  }, [content]);

  const handleSuggestionClick = (suggestion: string) => {
    editor.commands.insertContent([
      {
        type: "paragraph",
        attrs: {
          "data-value": suggestion,
          id: "paragraph-01",
        },
        content: [
          {
            type: "text",
            text: suggestion,
          },
        ],
      },
    ]);
  };

  return (
    <div className="flex flex-col">
      <div>
        <Search relatedJobTitles={relatedJobTitles} setJobTitle={setJobTitle} />

        <List
          isLoading={loading}
          suggestions={suggestions}
          handleSuggestionClick={handleSuggestionClick}
        />
      </div>
    </div>
  );
};
