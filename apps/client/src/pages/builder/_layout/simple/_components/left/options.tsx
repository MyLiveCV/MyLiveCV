import { t } from "@lingui/macro";
import { ScrollArea } from "@reactive-resume/ui";
import { ResumeOptions } from "@reactive-resume/utils";
import { useNavigate, useParams } from "react-router-dom";

import { MetadataSectionIcon } from "@/client/pages/builder/_components/shared/metadata-section-icon";
import {
  ResumeOptionsSteps,
  SectionIconsMapping,
  SectionIconsMappingProps,
  SectionMapping,
} from "@/client/pages/builder/_helper/section";
import { useBuilderStore } from "@/client/stores/builder";
import { Fragment, useMemo } from "react";

export const Options = () => {
  const activeSection = useBuilderStore((state) => state.activeSection.left);
  const currentStep = activeSection.section;

  const navigate = useNavigate();
  const params = useParams<{ id: string; section: string }>();
  const handleOptionClick = (sectionId: string) => {
    navigate(`/builder/${params.id}/${sectionId}`);
  };
  const Section = SectionMapping[currentStep] as React.FC;

  // Resume Section Option Icons
  const resumeOptionIcons = useMemo(
    () =>
      ResumeOptionsSteps.map((step) => {
        const Section = SectionIconsMapping[step] as React.FC<SectionIconsMappingProps>;
        return (
          <Fragment key={step}>
            <Section onClick={() => handleOptionClick(step)} />
          </Fragment>
        );
      }),
    [ResumeOptionsSteps, SectionIconsMapping],
  );

  return (
    <>
      <ScrollArea orientation="vertical" className="h-full flex-1" hideScrollbar>
        <div className="grid gap-y-6 p-6 @container/right">
          <Section />
        </div>
      </ScrollArea>

      <div className="basis-12 flex-col items-center justify-between bg-secondary-accent/30 py-4 sm:flex">
        <div />

        <div className="flex flex-col items-center justify-center gap-y-2">{resumeOptionIcons}</div>

        <div />
      </div>
    </>
  );
};
