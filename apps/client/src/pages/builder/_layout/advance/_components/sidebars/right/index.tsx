import { ScrollArea, Separator } from "@reactive-resume/ui";
import { Fragment, useMemo, useRef } from "react";

import { ThemeSwitch } from "@/client/components/theme-switch";
import {
  ResumeOptionsSteps,
  SectionIconsMapping,
  SectionIconsMappingProps,
  SectionMapping,
} from "@/client/pages/builder/_helper/section";

export const RightSidebar = () => {
  const containterRef = useRef<HTMLDivElement | null>(null);

  const scrollIntoView = (selector: string) => {
    const section = containterRef.current?.querySelector(selector);
    section?.scrollIntoView({ behavior: "smooth" });
  };

  const resumeOptionSections = useMemo(
    () =>
      ResumeOptionsSteps.map((step) => {
        const Section = SectionMapping[step] as React.FC;
        return (
          <div key={step}>
            <Section />
            <Separator className="mt-4" />
          </div>
        );
      }),
    [ResumeOptionsSteps, SectionMapping],
  );

  const resumeOptionSectionIcons = useMemo(
    () =>
      ResumeOptionsSteps.map((step) => {
        const Section = SectionIconsMapping[step] as React.FC<SectionIconsMappingProps>;
        return (
          <Fragment key={step}>
            <Section onClick={() => scrollIntoView(`#${step}`)} />
          </Fragment>
        );
      }),
    [ResumeOptionsSteps, SectionIconsMapping],
  );

  return (
    <div className="flex bg-secondary-accent/30">
      <ScrollArea orientation="vertical" className="h-screen flex-1 pb-16 lg:pb-0">
        <div ref={containterRef} className="grid gap-y-6 p-6 @container/right">
          {resumeOptionSections}
        </div>
      </ScrollArea>

      <div className="hidden basis-12 flex-col items-center justify-between bg-secondary-accent/30 py-4 sm:flex">
        <div />

        <div className="flex flex-col items-center justify-center gap-y-2">
          {resumeOptionSectionIcons}
        </div>

        <ThemeSwitch size={14} />
      </div>
    </div>
  );
};
