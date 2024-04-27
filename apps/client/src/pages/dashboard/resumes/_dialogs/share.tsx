import { t } from "@lingui/macro";
import { CopySimple } from "@phosphor-icons/react";
import { ResumeDto } from "@reactive-resume/dto";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Button,
  Input,
  Label,
  Tooltip,
} from "@reactive-resume/ui";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo } from "react";

import { toast } from "@/client/hooks/use-toast";
import { useVisibleResume } from "@/client/services/resume/visibility";
import { useUser } from "@/client/services/user";
import { useDialog } from "@/client/stores/dialog";

export const ShareDialog = () => {
  const { isOpen, payload, close } = useDialog<ResumeDto>("sharing");
  const { visibleResume, loading } = useVisibleResume();
  const { user } = useUser();

  const username = user?.username;

  const isPrivate = useMemo(() => {
    return payload?.item?.visibility === "private";
  }, [payload]);

  const slug = useMemo(() => {
    return payload?.item?.slug;
  }, [payload]);

  const url = `${window.location.origin}/${username}/${slug}`;

  const onCopy = async () => {
    await navigator.clipboard.writeText(url);

    toast({
      variant: "success",
      title: t`A link has been copied to your clipboard.`,
      description: t`Anyone with this link can view and download the resume. Share it on your profile or with recruiters.`,
    });
  };

  const onSubmit = async () => {
    if (!payload.item) return;

    await visibleResume({ id: payload.item.id, set: isPrivate });

    close();
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={close}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {isPrivate
              ? t`Are you sure you want to make this resume pubic?`
              : t`Are you sure you want to make this resume private?`}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {isPrivate
              ? t`Making a resume public will allow you to collect Statistics for it again.`
              : t`Making a resume private will prevent any Statistics collection for it.`}

            <AnimatePresence presenceAffectsLayout>
              {isPrivate && (
                <motion.div
                  layout
                  className="space-y-1.5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Label htmlFor="resume-url">{t`URL`}</Label>

                  <div className="flex gap-x-1.5">
                    <Input id="resume-url" readOnly value={url} className="flex-1" />

                    <Tooltip content={t`Copy to Clipboard`}>
                      <Button size="icon" variant="ghost" onClick={onCopy}>
                        <CopySimple />
                      </Button>
                    </Tooltip>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>{t`Cancel`}</AlertDialogCancel>
          <AlertDialogAction variant="info" disabled={loading} onClick={onSubmit}>
            {isPrivate ? t`Enable Public Sharing` : t`Enable Private Sharing`}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
