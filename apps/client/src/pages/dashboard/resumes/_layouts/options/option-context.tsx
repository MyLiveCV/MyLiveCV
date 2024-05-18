import { t } from "@lingui/macro";
import {
  CopySimple,
  FolderOpen,
  Lock,
  LockOpen,
  PencilSimple,
  ShareFat,
  TrashSimple,
} from "@phosphor-icons/react";
import { ResumeDto } from "@reactive-resume/dto";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@reactive-resume/ui";
import { ResumeSections } from "@reactive-resume/utils";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

import { useDialog } from "@/client/stores/dialog";

type Props = {
  resume: ResumeDto;
  children: ReactNode;
};

export const OptionContext = ({ resume, children }: Props) => {
  const navigate = useNavigate();
  const { open } = useDialog<ResumeDto>("resume");
  const { open: lockOpen } = useDialog<ResumeDto>("lock");
  const { open: shareOpen } = useDialog<ResumeDto>("sharing");

  const isPublicResume = resume.visibility === "public";

  const onOpen = () => {
    navigate(`/builder/${resume.id}/${ResumeSections.BASICS}`);
  };

  const onUpdate = () => {
    open("update", { id: "resume", item: resume });
  };

  const onDuplicate = () => {
    open("duplicate", { id: "resume", item: resume });
  };

  const onLockChange = () => {
    lockOpen(resume.locked ? "update" : "create", { id: "lock", item: resume });
  };

  const onVisibilityChange = () => {
    shareOpen("update", { id: "sharing", item: resume });
  };

  const onDelete = () => {
    open("delete", { id: "resume", item: resume });
  };

  const lockIcon = resume.locked ? (
    <>
      <LockOpen size={14} className="mr-2" />
      {t`Unlock`}
    </>
  ) : (
    <>
      <Lock size={14} className="mr-2" />
      {t`Lock`}
    </>
  );

  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>

      <ContextMenuContent className="w-40">
        <ContextMenuItem onClick={onOpen}>
          <FolderOpen size={14} className="mr-2" />
          {t`Open`}
        </ContextMenuItem>
        <ContextMenuItem onClick={onUpdate}>
          <PencilSimple size={14} className="mr-2" />
          {t`Rename`}
        </ContextMenuItem>
        <ContextMenuItem onClick={onDuplicate}>
          <CopySimple size={14} className="mr-2" />
          {t`Duplicate`}
        </ContextMenuItem>

        <ContextMenuItem onClick={onLockChange}>{lockIcon}</ContextMenuItem>
        <ContextMenuItem onClick={onVisibilityChange}>
          <ShareFat size={14} className="mr-2" />
          {isPublicResume ? t`Do not Share` : t`Share Publicly`}
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem onClick={onDelete} className="text-error">
          <TrashSimple size={14} className="mr-2" />
          {t`Delete`}
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};
