import { defaultSections } from "@reactive-resume/schema";
import { RichInput } from "@reactive-resume/ui";
import { cn, ResumeSections } from "@reactive-resume/utils";

import { AiActions } from "@/client/components/ai-actions";
import { useResumeStore } from "@/client/stores/resume";

import { getSectionIcon } from "./shared/section-icon";
import {
  SectionColumns,
  SectionOptions,
  SectionRename,
  SectionVisibility,
} from "./shared/section-options";
import { Editor } from "@tiptap/react";

export const SummarySection = () => {
  const setValue = useResumeStore((state) => state.setValue);
  const section = useResumeStore(
    (state) => state.resume.data.sections.summary ?? defaultSections.summary,
  );

  return (
    <section id={ResumeSections.SUMMARY} className="grid gap-y-6">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-x-4">
          {getSectionIcon(ResumeSections.SUMMARY)}
          <h2 className="line-clamp-1 text-3xl font-bold">{section.name}</h2>

          <div className="invisible flex items-center sm:visible">
            <SectionRename id={ResumeSections.SUMMARY} />
            <SectionVisibility id={ResumeSections.SUMMARY} />
            <SectionColumns id={ResumeSections.SUMMARY} />
          </div>
        </div>

        <div className="flex items-center gap-x-2">
          <SectionOptions id={ResumeSections.SUMMARY} />
        </div>
      </header>

      <main className={cn(!section.visible && "opacity-50")}>
        <RichInput
          content={section.content}
          onChange={(value: string) => setValue("sections.summary.content", value)}
          footer={(editor: Editor) => (
            <AiActions editor={editor} sectionName={ResumeSections.SUMMARY} />
          )}
        />
      </main>
    </section>
  );
};
