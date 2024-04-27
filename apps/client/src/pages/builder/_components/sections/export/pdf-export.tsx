import { t } from "@lingui/macro";
import { CircleNotch, FilePdf } from "@phosphor-icons/react";
import { buttonVariants, Card, CardContent, CardDescription, CardTitle } from "@reactive-resume/ui";
import { cn } from "@reactive-resume/utils";

import { usePrintResume } from "@/client/services/resume/print";
import { useResumeStore } from "@/client/stores/resume";

export const PdfExport = () => {
  const { printResume, loading } = usePrintResume();

  const onPdfExport = async () => {
    const { resume } = useResumeStore.getState();
    const { url } = await printResume({ id: resume.id });

    const openInNewTab = (url: string) => {
      const win = window.open(url, "_blank");
      if (win) win.focus();
    };

    openInNewTab(url);
  };

  return (
    <Card
      onClick={onPdfExport}
      className={cn(
        buttonVariants({ variant: "ghost" }),
        "h-auto cursor-pointer flex-row items-center gap-x-5 px-4 pb-3 pt-1",
        loading && "pointer-events-none cursor-progress opacity-75",
      )}
    >
      {loading ? <CircleNotch size={22} className="animate-spin" /> : <FilePdf size={22} />}

      <CardContent className="flex-1">
        <CardTitle className="text-sm">{t`PDF`}</CardTitle>
        <CardDescription className="font-normal">
          {t`Download a PDF of your resume. This file can be used to print your resume, send it to recruiters, or upload on job portals.`}
        </CardDescription>
      </CardContent>
    </Card>
  );
};
