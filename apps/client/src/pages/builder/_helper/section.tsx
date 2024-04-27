import { t } from "@lingui/macro";
import { Plus, PlusCircle } from "@phosphor-icons/react";
import {
  Award,
  Certification,
  CustomSection,
  Education,
  Experience,
  Interest,
  Language,
  Profile,
  Project,
  Publication,
  Reference,
  Skill,
  Volunteer,
} from "@reactive-resume/schema";
import { Button, Separator } from "@reactive-resume/ui";
import { ResumeOptions, ResumeSections } from "@reactive-resume/utils";
import { Fragment } from "react";

import { Copyright } from "@/client/components/copyright";
import { BasicsSection } from "@/client/pages/builder/_components/sections/basics";
import { ExportSection } from "@/client/pages/builder/_components/sections/export";
import { InformationSection } from "@/client/pages/builder/_components/sections/information";
import { LayoutSection } from "@/client/pages/builder/_components/sections/layout";
import { NotesSection } from "@/client/pages/builder/_components/sections/notes";
import { PageSection } from "@/client/pages/builder/_components/sections/page";
import { SectionBase } from "@/client/pages/builder/_components/sections/shared/section-base";
import { SharingSection } from "@/client/pages/builder/_components/sections/sharing";
import { StatisticsSection } from "@/client/pages/builder/_components/sections/statistics";
import { SummarySection } from "@/client/pages/builder/_components/sections/summary";
import { TemplateSection } from "@/client/pages/builder/_components/sections/template";
import { ThemeSection } from "@/client/pages/builder/_components/sections/theme";
import { TypographySection } from "@/client/pages/builder/_components/sections/typography";
import { useResumeStore } from "@/client/stores/resume";

import { getSectionIcon, SectionIcon } from "../_components/sections/shared/section-icon";
import { MetadataSectionIcon } from "../_components/shared/metadata-section-icon";

/**
 * Defines the Order of Sections and Steps and their Icons
 */
export const SectionSteps: ResumeSections[] = [
  ResumeSections.BASICS,
  ResumeSections.SUMMARY,
  ResumeSections.PROFILES,
  ResumeSections.EXPERIENCE,
  ResumeSections.EDUCATION,
  ResumeSections.SKILLS,
  ResumeSections.LANGUAGES,
  ResumeSections.AWARDS,
  ResumeSections.CERTIFICATIONS,
  ResumeSections.INTERESTS,
  ResumeSections.PROJECTS,
  ResumeSections.PUBLICATIONS,
  ResumeSections.VOLUNTEER,
  ResumeSections.REFERENCES,
  ResumeSections.CUSTOM,
];

/**
 * Defines the Order of Resume Sections Options and their Icons
 */
export const ResumeOptionsSteps: ResumeOptions[] = [
  ResumeOptions.TEMPLATE,
  ResumeOptions.LAYOUT,
  ResumeOptions.TYPOGRAPHY,
  ResumeOptions.THEME,
  ResumeOptions.PAGE,
  ResumeOptions.SHARING,
  ResumeOptions.STATISTICS,
  ResumeOptions.EXPORT,
  ResumeOptions.NOTES,
  ResumeOptions.INFORMATION,
  ResumeOptions.COPYRIGHT,
];

const CustomSections = () => {
  const customSections = useResumeStore((state) => state.resume.data.sections.custom);
  const addSection = useResumeStore((state) => state.addSection);

  return (
    <div id={ResumeSections.CUSTOM}>
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-x-4">
          {getSectionIcon(ResumeSections.CUSTOM)}
          <h2 className="line-clamp-1 text-3xl font-bold">{t`Custom Sections`}</h2>
        </div>
      </header>
      <Separator className="my-4" />
      {Object.values(customSections).map((section) => (
        <Fragment key={section.id}>
          {/* <Separator /> */}

          <SectionBase<CustomSection>
            id={`${ResumeSections.CUSTOM}.${section.id}`}
            title={(item) => item.name}
            description={(item) => item.description}
          />
        </Fragment>
      ))}
      <Separator className="mb-4" />
      <Button size="lg" variant="outline" onClick={addSection}>
        <PlusCircle />
        <span className="ml-2">{t`Add a new section`}</span>
      </Button>
    </div>
  );
};

export const SectionMapping: { [key in ResumeSections | ResumeOptions]?: React.FC } = {
  [ResumeSections.BASICS]: () => <BasicsSection />,
  [ResumeSections.SUMMARY]: () => <SummarySection />,
  [ResumeSections.PROFILES]: () => (
    <SectionBase<Profile>
      id={ResumeSections.PROFILES}
      title={(item) => item.network}
      description={(item) => item.username}
    />
  ),
  [ResumeSections.EDUCATION]: () => (
    <SectionBase<Education>
      id={ResumeSections.EDUCATION}
      title={(item) => item.institution}
      description={(item) => item.area}
    />
  ),
  [ResumeSections.EXPERIENCE]: () => (
    <SectionBase<Experience>
      id={ResumeSections.EXPERIENCE}
      title={(item) => item.company}
      description={(item) => item.position}
    />
  ),
  [ResumeSections.SKILLS]: () => (
    <SectionBase<Skill>
      id={ResumeSections.SKILLS}
      title={(item) => item.name}
      description={(item) => {
        if (item.description) return item.description;
        if (item.keywords.length > 0) return `${item.keywords.length} keywords`;
      }}
    />
  ),
  [ResumeSections.LANGUAGES]: () => (
    <SectionBase<Language>
      id={ResumeSections.LANGUAGES}
      title={(item) => item.name}
      description={(item) => item.description}
    />
  ),
  [ResumeSections.AWARDS]: () => (
    <SectionBase<Award>
      id={ResumeSections.AWARDS}
      title={(item) => item.title}
      description={(item) => item.awarder}
    />
  ),
  [ResumeSections.CERTIFICATIONS]: () => (
    <SectionBase<Certification>
      id={ResumeSections.CERTIFICATIONS}
      title={(item) => item.name}
      description={(item) => item.issuer}
    />
  ),
  [ResumeSections.INTERESTS]: () => (
    <SectionBase<Interest>
      id={ResumeSections.INTERESTS}
      title={(item) => item.name}
      description={(item) => {
        if (item.keywords.length > 0) return `${item.keywords.length} keywords`;
      }}
    />
  ),
  [ResumeSections.PROJECTS]: () => (
    <SectionBase<Project>
      id={ResumeSections.PROJECTS}
      title={(item) => item.name}
      description={(item) => item.description}
    />
  ),
  [ResumeSections.PUBLICATIONS]: () => (
    <SectionBase<Publication>
      id={ResumeSections.PUBLICATIONS}
      title={(item) => item.name}
      description={(item) => item.publisher}
    />
  ),
  [ResumeSections.VOLUNTEER]: () => (
    <SectionBase<Volunteer>
      id={ResumeSections.VOLUNTEER}
      title={(item) => item.organization}
      description={(item) => item.position}
    />
  ),
  [ResumeSections.REFERENCES]: () => (
    <SectionBase<Reference>
      id={ResumeSections.REFERENCES}
      title={(item) => item.name}
      description={(item) => item.description}
    />
  ),
  [ResumeSections.CUSTOM]: () => <CustomSections />,
  [ResumeOptions.TEMPLATE]: () => <TemplateSection />,
  [ResumeOptions.LAYOUT]: () => <LayoutSection />,
  [ResumeOptions.TYPOGRAPHY]: () => <TypographySection />,
  [ResumeOptions.THEME]: () => <ThemeSection />,
  [ResumeOptions.PAGE]: () => <PageSection />,
  [ResumeOptions.SHARING]: () => <SharingSection />,
  [ResumeOptions.STATISTICS]: () => <StatisticsSection />,
  [ResumeOptions.EXPORT]: () => <ExportSection />,
  [ResumeOptions.NOTES]: () => <NotesSection />,
  [ResumeOptions.INFORMATION]: () => <InformationSection />,
  [ResumeOptions.COPYRIGHT]: () => <Copyright className="text-center" />,
};

export type SectionIconsMappingProps = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

export const SectionIconsMapping: {
  [key in ResumeSections | ResumeOptions]?: React.FC<SectionIconsMappingProps>;
} = {
  [ResumeSections.BASICS]: ({ onClick }) => (
    <SectionIcon
      id={ResumeSections.BASICS}
      onClick={onClick}
      name={t({
        message: "Basics",
        context:
          "The basics section of a resume consists of User's Picture, Full Name, Location etc.",
      })}
    />
  ),
  [ResumeSections.SUMMARY]: ({ onClick }) => (
    <SectionIcon id={ResumeSections.SUMMARY} onClick={onClick} />
  ),
  [ResumeSections.PROFILES]: ({ onClick }) => (
    <SectionIcon id={ResumeSections.PROFILES} onClick={onClick} />
  ),
  [ResumeSections.EDUCATION]: ({ onClick }) => (
    <SectionIcon id={ResumeSections.EDUCATION} onClick={onClick} />
  ),
  [ResumeSections.EXPERIENCE]: ({ onClick }) => (
    <SectionIcon id={ResumeSections.EXPERIENCE} onClick={onClick} />
  ),
  [ResumeSections.SKILLS]: ({ onClick }) => (
    <SectionIcon id={ResumeSections.SKILLS} onClick={onClick} />
  ),
  [ResumeSections.LANGUAGES]: ({ onClick }) => (
    <SectionIcon id={ResumeSections.LANGUAGES} onClick={onClick} />
  ),
  [ResumeSections.AWARDS]: ({ onClick }) => (
    <SectionIcon id={ResumeSections.AWARDS} onClick={onClick} />
  ),
  [ResumeSections.CERTIFICATIONS]: ({ onClick }) => (
    <SectionIcon id={ResumeSections.CERTIFICATIONS} onClick={onClick} />
  ),
  [ResumeSections.INTERESTS]: ({ onClick }) => (
    <SectionIcon id={ResumeSections.INTERESTS} onClick={onClick} />
  ),
  [ResumeSections.PROJECTS]: ({ onClick }) => (
    <SectionIcon id={ResumeSections.PROJECTS} onClick={onClick} />
  ),
  [ResumeSections.PUBLICATIONS]: ({ onClick }) => (
    <SectionIcon id={ResumeSections.PUBLICATIONS} onClick={onClick} />
  ),
  [ResumeSections.VOLUNTEER]: ({ onClick }) => (
    <SectionIcon id={ResumeSections.VOLUNTEER} onClick={onClick} />
  ),
  [ResumeSections.REFERENCES]: ({ onClick }) => (
    <SectionIcon id={ResumeSections.REFERENCES} onClick={onClick} />
  ),
  [ResumeSections.CUSTOM]: ({ onClick }) => (
    <SectionIcon
      id={ResumeSections.CUSTOM}
      variant="outline"
      name={t`Add a new section`}
      icon={<Plus size={14} />}
      onClick={onClick}
    />
  ),
  [ResumeOptions.TEMPLATE]: ({ onClick }) => (
    <MetadataSectionIcon id={ResumeOptions.TEMPLATE} name={t`Template`} onClick={onClick} />
  ),
  [ResumeOptions.LAYOUT]: ({ onClick }) => (
    <MetadataSectionIcon id={ResumeOptions.LAYOUT} name={t`Layout`} onClick={onClick} />
  ),
  [ResumeOptions.TYPOGRAPHY]: ({ onClick }) => (
    <MetadataSectionIcon id={ResumeOptions.TYPOGRAPHY} name={t`Typography`} onClick={onClick} />
  ),
  [ResumeOptions.THEME]: ({ onClick }) => (
    <MetadataSectionIcon id={ResumeOptions.THEME} name={t`Theme`} onClick={onClick} />
  ),
  [ResumeOptions.PAGE]: ({ onClick }) => (
    <MetadataSectionIcon id={ResumeOptions.PAGE} name={t`Page`} onClick={onClick} />
  ),
  [ResumeOptions.SHARING]: ({ onClick }) => (
    <MetadataSectionIcon id={ResumeOptions.SHARING} name={t`Sharing`} onClick={onClick} />
  ),
  [ResumeOptions.STATISTICS]: ({ onClick }) => (
    <MetadataSectionIcon id={ResumeOptions.STATISTICS} name={t`Theme`} onClick={onClick} />
  ),
  [ResumeOptions.EXPORT]: ({ onClick }) => (
    <MetadataSectionIcon id={ResumeOptions.THEME} name={t`Statistics`} onClick={onClick} />
  ),
  [ResumeOptions.NOTES]: ({ onClick }) => (
    <MetadataSectionIcon id={ResumeOptions.NOTES} name={t`Notes`} onClick={onClick} />
  ),
  [ResumeOptions.INFORMATION]: ({ onClick }) => (
    <MetadataSectionIcon id={ResumeOptions.INFORMATION} name={t`Information`} onClick={onClick} />
  ),
  [ResumeOptions.COPYRIGHT]: () => null,
};
