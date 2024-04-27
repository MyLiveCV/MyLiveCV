import { t } from "@lingui/macro";
import {
  ArrowClockwise,
  ArrowCounterClockwise,
  CircleNotch,
  ClockClockwise,
  CubeFocus,
  FilePdf,
  Hash,
  LineSegment,
  LinkSimple,
  MagnifyingGlassMinus,
  MagnifyingGlassPlus,
} from "@phosphor-icons/react";
import { Button, Separator, Toggle, Tooltip } from "@reactive-resume/ui";
import { BuilderArtBoardEventType } from "@reactive-resume/utils";
import { motion } from "framer-motion";

import { useToast } from "@/client/hooks/use-toast";
import { usePrintResume } from "@/client/services/resume";
import { useUser } from "@/client/services/user";
import { useBuilderStore } from "@/client/stores/builder";
import { useResumeStore, useTemporalResumeStore } from "@/client/stores/resume";

export const BuilderToolbar = () => {
  const { toast } = useToast();
  const setValue = useResumeStore((state) => state.setValue);
  const undo = useTemporalResumeStore((state) => state.undo);
  const isUndo = useTemporalResumeStore((state) => state.pastStates.length > 0);
  const redo = useTemporalResumeStore((state) => state.redo);
  const isRedo = useTemporalResumeStore((state) => state.futureStates.length > 0);
  const frameRef = useBuilderStore((state) => state.frame.ref);
  const { user } = useUser();

  const id = useResumeStore((state) => state.resume.id);
  const isPublic = useResumeStore((state) => state.resume.visibility === "public");
  const pageOptions = useResumeStore((state) => state.resume.data.metadata.page.options);
  const slug = useResumeStore((state) => state.resume.slug);

  const { printResume, loading } = usePrintResume();

  const onPrint = async () => {
    const { url } = await printResume({ id });

    const openInNewTab = (url: string) => {
      const win = window.open(url, "_blank");
      if (win) win.focus();
    };

    openInNewTab(url);
  };

  const onCopy = async () => {
    const url = `${window.location.origin}/${user?.username}/${slug}`;
    await navigator.clipboard.writeText(url);

    toast({
      variant: "success",
      title: t`A link has been copied to your clipboard.`,
      description: t`Anyone with this link can view and download the resume. Share it on your profile or with recruiters.`,
    });
  };

  const onZoomIn = () =>
    frameRef?.contentWindow?.postMessage({ type: BuilderArtBoardEventType.ZOOM_IN }, "*");
  const onZoomOut = () =>
    frameRef?.contentWindow?.postMessage({ type: BuilderArtBoardEventType.ZOOM_OUT }, "*");
  const onResetView = () =>
    frameRef?.contentWindow?.postMessage({ type: BuilderArtBoardEventType.RESET_VIEW }, "*");
  const onCenterView = () =>
    frameRef?.contentWindow?.postMessage({ type: BuilderArtBoardEventType.CENTER_VIEW }, "*");

  return (
    <motion.div className="relative">
      <div className="absolute inset-x-0 bottom-0 mx-auto block py-10 text-center">
        <div className="inline-flex items-center justify-center rounded-full bg-background px-4 shadow-xl">
          <Tooltip content={t`Undo`}>
            <Button
              size="icon"
              variant="ghost"
              className="rounded-none"
              onClick={() => undo()}
              disabled={!isUndo}
            >
              <ArrowCounterClockwise />
            </Button>
          </Tooltip>

          <Tooltip content={t`Redo`}>
            <Button
              size="icon"
              variant="ghost"
              className="rounded-none"
              onClick={() => redo()}
              disabled={!isRedo}
            >
              <ArrowClockwise />
            </Button>
          </Tooltip>
          <Separator orientation="vertical" className="h-9" />

          <Tooltip content={t`Zoom In`}>
            <Button size="icon" variant="ghost" className="rounded-none" onClick={onZoomIn}>
              <MagnifyingGlassPlus />
            </Button>
          </Tooltip>

          <Tooltip content={t`Zoom Out`}>
            <Button size="icon" variant="ghost" className="rounded-none" onClick={onZoomOut}>
              <MagnifyingGlassMinus />
            </Button>
          </Tooltip>

          <Tooltip content={t`Reset Zoom`}>
            <Button size="icon" variant="ghost" className="rounded-none" onClick={onResetView}>
              <ClockClockwise />
            </Button>
          </Tooltip>

          <Tooltip content={t`Center Artboard`}>
            <Button size="icon" variant="ghost" className="rounded-none" onClick={onCenterView}>
              <CubeFocus />
            </Button>
          </Tooltip>

          <Separator orientation="vertical" className="h-9" />

          <Tooltip content={t`Toggle Page Break Line`}>
            <Toggle
              className="rounded-none"
              pressed={pageOptions.breakLine}
              onPressedChange={(pressed) => {
                setValue("metadata.page.options.breakLine", pressed);
              }}
            >
              <LineSegment />
            </Toggle>
          </Tooltip>

          <Tooltip content={t`Toggle Page Numbers`}>
            <Toggle
              className="rounded-none"
              pressed={pageOptions.pageNumbers}
              onPressedChange={(pressed) => {
                setValue("metadata.page.options.pageNumbers", pressed);
              }}
            >
              <Hash />
            </Toggle>
          </Tooltip>

          <Separator orientation="vertical" className="h-9" />

          <Tooltip content={t`Copy Link to Resume`}>
            <Button
              size="icon"
              variant="ghost"
              className="rounded-none"
              onClick={onCopy}
              disabled={!isPublic}
            >
              <LinkSimple />
            </Button>
          </Tooltip>

          <Tooltip content={t`Download PDF`}>
            <Button
              size="icon"
              variant="ghost"
              onClick={onPrint}
              disabled={loading}
              className="rounded-none"
            >
              {loading ? <CircleNotch className="animate-spin" /> : <FilePdf />}
            </Button>
          </Tooltip>
        </div>
      </div>
    </motion.div>
  );
};
