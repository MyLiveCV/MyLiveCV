import { t } from "@lingui/macro";
import {
  CopySimple,
  DotsThreeVertical,
  FolderOpen,
  Lock,
  LockOpen,
  PencilSimple,
  ShareFat,
  TrashSimple,
} from "@phosphor-icons/react";
import { ResumeDto } from "@reactive-resume/dto";
import {
  Button,
  ContextMenuSeparator,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@reactive-resume/ui";
import { ResumeSections } from "@reactive-resume/utils";
import { useNavigate } from "react-router-dom";

import { useDialog } from "@/client/stores/dialog";

type Props = {
  resume: ResumeDto;
};

export const OptionMenu = ({ resume }: Props) => {
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="aspect-square">
        <Button size="icon" variant="ghost">
          <DotsThreeVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40">
        <DropdownMenuItem
          onClick={(event) => {
            event.stopPropagation();
            onOpen();
          }}
        >
          <FolderOpen size={14} className="mr-2" />
          {t`Open`}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={(event) => {
            event.stopPropagation();
            onUpdate();
          }}
        >
          <PencilSimple size={14} className="mr-2" />
          {t`Rename`}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={(event) => {
            event.stopPropagation();
            onDuplicate();
          }}
        >
          <CopySimple size={14} className="mr-2" />
          {t`Duplicate`}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={(event) => {
            event.stopPropagation();
            onLockChange();
          }}
        >
          {lockIcon}
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={(event) => {
            event.stopPropagation();
            onVisibilityChange();
          }}
        >
          <ShareFat size={14} className="mr-2" />
          {isPublicResume ? t`Do not Share` : t`Share Publicly`}
        </DropdownMenuItem>
        <ContextMenuSeparator />
        <DropdownMenuItem
          className="text-error"
          onClick={(event) => {
            event.stopPropagation();
            onDelete();
          }}
        >
          <TrashSimple size={14} className="mr-2" />
          {t`Delete`}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
