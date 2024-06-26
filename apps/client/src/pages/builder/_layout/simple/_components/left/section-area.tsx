import { t } from "@lingui/macro";
import { SectionKey } from "@reactive-resume/schema";
import { Button, ScrollArea } from "@reactive-resume/ui";
import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getSectionIcon } from "@/client/pages/builder/_components/sections/shared/section-icon";
import { SectionMapping, SectionSteps, StepsType } from "@/client/pages/builder/_helper/section";
import { useBuilderStore } from "@/client/stores/builder";
import { useTemporalResumeStore } from "@/client/stores/resume";

import { Options } from "./options";

export const SectionArea = () => {
  const navigate = useNavigate();
  const params = useParams<{ id: string; section: string }>();
  const clearHistory = useTemporalResumeStore((state) => state.clear);

  const activeSection = useBuilderStore((state) => state.activeSection);
  const currentStep = activeSection.left.section;

  const handleSectionClick = (sectionId: string) => {
    navigate(`/builder/${params.id}/${sectionId}`);
  };

  const handleFinalizeClick = () => {
    navigate(`/builder/${params.id}`);
  };

  const onStep = (section: StepsType) => {
    handleSectionClick(section);
    clearHistory();
  };

  const nextSection = useMemo(() => {
    const stepIndex = SectionSteps.findIndex((s) => s === currentStep);
    return SectionSteps[stepIndex + 1];
  }, [SectionSteps, currentStep]);

  const previousSection = useMemo(() => {
    const stepIndex = SectionSteps.findIndex((s) => s === currentStep);
    return SectionSteps[stepIndex - 1];
  }, [SectionSteps, currentStep]);

  const Section = SectionMapping[currentStep] as React.FC;

  return activeSection.left.openOption ? (
    <Options />
  ) : (
    <ScrollArea orientation="vertical" className="flex-1 sm:h-screen">
      <div className="grid gap-y-6 p-6 @container/left">
        <Section />

        <div className="grid grid-cols-3 gap-y-6 sm:mb-[100px]">
          {previousSection && (
            <Button
              className="col-span-1 gap-x-2"
              type="button"
              onClick={() => onStep(previousSection)}
            >
              {getSectionIcon(previousSection as SectionKey)}
              <span>{t`Previous`}</span>
            </Button>
          )}

          {nextSection ? (
            <Button
              className="col-span-1 col-start-3 gap-x-2"
              type="button"
              onClick={() => onStep(nextSection)}
            >
              {t`Next`} {getSectionIcon(nextSection as SectionKey)}
            </Button>
          ) : (
            <Button
              className="col-span-1 col-start-3 gap-x-2"
              type="button"
              onClick={handleFinalizeClick}
            >
              {t`Finalize`}
            </Button>
          )}
        </div>
      </div>
    </ScrollArea>
  );
};
