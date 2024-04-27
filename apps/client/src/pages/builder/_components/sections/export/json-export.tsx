import { t } from "@lingui/macro";
import { FileJs } from "@phosphor-icons/react";
import { buttonVariants, Card, CardContent, CardDescription, CardTitle } from "@reactive-resume/ui";
import { cn } from "@reactive-resume/utils";
import { saveAs } from "file-saver";

import { useResumeStore } from "@/client/stores/resume";

export const JsonExport = () => {
  const onJsonExport = () => {
    const { resume } = useResumeStore.getState();
    const filename = `reactive_resume-${resume.id}.json`;
    const resumeJSON = JSON.stringify(resume.data, null, 2);

    saveAs(new Blob([resumeJSON], { type: "application/json" }), filename);
  };

  return (
    <Card
      onClick={onJsonExport}
      className={cn(
        buttonVariants({ variant: "ghost" }),
        "h-auto cursor-pointer flex-row items-center gap-x-5 px-4 pb-3 pt-1",
      )}
    >
      <FileJs size={22} />
      <CardContent className="flex-1">
        <CardTitle className="text-sm">{t`JSON`}</CardTitle>
        <CardDescription className="font-normal">
          {t`Download a JSON snapshot of your resume. This file can be used to import your resume in the future, or can even be shared with others to collaborate.`}
        </CardDescription>
      </CardContent>
    </Card>
  );
};
