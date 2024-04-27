import { t } from "@lingui/macro";
import { ScrollArea } from "@reactive-resume/ui";
import { ResumeOptions } from "@reactive-resume/utils";
import { useNavigate, useParams } from "react-router-dom";

import { MetadataSectionIcon } from "@/client/pages/builder/_components/shared/metadata-section-icon";
import { SectionMapping } from "@/client/pages/builder/_helper/section";
import { useBuilderStore } from "@/client/stores/builder";

export const Options = () => {
  const activeSection = useBuilderStore((state) => state.activeSection.left);
  const currentStep = activeSection.section;

  const navigate = useNavigate();
  const params = useParams<{ id: string; section: string }>();
  const handleOptionClick = (sectionId: string) => {
    navigate(`/builder/${params.id}/${sectionId}`);
  };
  const Section = SectionMapping[currentStep] as React.FC;
  return (
    <>
      <ScrollArea orientation="vertical" className="h-full flex-1" hideScrollbar>
        <div className="grid gap-y-6 p-6 @container/right">
          <Section />
        </div>
      </ScrollArea>

      <div className="basis-12 flex-col items-center justify-between bg-secondary-accent/30 py-4 sm:flex">
        <div />

        <div className="flex flex-col items-center justify-center gap-y-2">
          <MetadataSectionIcon
            id={ResumeOptions.TEMPLATE}
            name={t`Template`}
            onClick={() => handleOptionClick(ResumeOptions.TEMPLATE)}
          />
          <MetadataSectionIcon
            id={ResumeOptions.LAYOUT}
            name={t`Layout`}
            onClick={() => handleOptionClick(ResumeOptions.LAYOUT)}
          />
          <MetadataSectionIcon
            id={ResumeOptions.TYPOGRAPHY}
            name={t`Typography`}
            onClick={() => handleOptionClick(ResumeOptions.TYPOGRAPHY)}
          />
          <MetadataSectionIcon
            id={ResumeOptions.THEME}
            name={t`Theme`}
            onClick={() => handleOptionClick(ResumeOptions.THEME)}
          />
          <MetadataSectionIcon
            id={ResumeOptions.PAGE}
            name={t`Page`}
            onClick={() => handleOptionClick(ResumeOptions.PAGE)}
          />
          <MetadataSectionIcon
            id={ResumeOptions.SHARING}
            name={t`Sharing`}
            onClick={() => handleOptionClick(ResumeOptions.SHARING)}
          />
          <MetadataSectionIcon
            id={ResumeOptions.STATISTICS}
            name={t`Statistics`}
            onClick={() => handleOptionClick(ResumeOptions.STATISTICS)}
          />
          <MetadataSectionIcon
            id={ResumeOptions.EXPORT}
            name={t`Export`}
            onClick={() => handleOptionClick(ResumeOptions.EXPORT)}
          />
          <MetadataSectionIcon
            id={ResumeOptions.NOTES}
            name={t`Notes`}
            onClick={() => handleOptionClick(ResumeOptions.NOTES)}
          />
          <MetadataSectionIcon
            id={ResumeOptions.INFORMATION}
            name={t`Information`}
            onClick={() => handleOptionClick(ResumeOptions.INFORMATION)}
          />
        </div>

        <div />
      </div>
    </>
  );
};
