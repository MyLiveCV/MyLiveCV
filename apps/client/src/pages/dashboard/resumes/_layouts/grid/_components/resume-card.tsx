import { t } from "@lingui/macro";
import { CircleNotch, Download, Eye, Lock } from "@phosphor-icons/react";
import { ResumeDto } from "@reactive-resume/dto";
import { Tooltip } from "@reactive-resume/ui";
import { cn, ResumeSections } from "@reactive-resume/utils";
import dayjs from "dayjs";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import { useResumePreview } from "@/client/services/resume/preview";

import { OptionContext } from "../../options/option-context";
import { OptionMenu } from "../../options/option-menu";
import { BaseCard } from "./base-card";

type Props = {
  resume: ResumeDto;
};

export const ResumeCard = ({ resume }: Props) => {
  const navigate = useNavigate();

  const { url, loading } = useResumePreview(resume.id);

  const lastUpdated = dayjs().to(resume.updatedAt);

  const onOpen = () => {
    navigate(`/builder/${resume.id}/${ResumeSections.BASICS}`);
  };

  return (
    <OptionContext resume={resume}>
      <BaseCard onClick={onOpen} className="space-y-0">
        <AnimatePresence presenceAffectsLayout>
          {loading && (
            <motion.div
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <CircleNotch
                size={64}
                weight="thin"
                opacity={0.5}
                className="animate-spin self-center justify-self-center"
              />
            </motion.div>
          )}

          {!loading && url && (
            <motion.img
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              loading="lazy"
              alt={resume.title}
              className="size-full object-cover"
              src={`${url}?cache=${new Date().getTime()}`}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {resume.locked && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center bg-background/75 backdrop-blur-sm"
            >
              <Lock size={42} />
            </motion.div>
          )}
        </AnimatePresence>

        <div
          className={cn(
            "absolute inset-x-0 bottom-0 z-10 flex flex-row justify-between space-y-0.5 p-4 pt-12",
            "bg-gradient-to-t from-background from-50% via-background/80 to-transparent",
          )}
        >
          <div>
            <h4 className="line-clamp-2 font-medium">{resume.title}</h4>
            <p className="line-clamp-1 justify-end text-xs opacity-75">{t`Last updated ${lastUpdated}`}</p>

            <p
              className={cn(
                "line-clamp-1 justify-end pt-2 opacity-80",
                resume.visibility !== "public" && "blur-sm",
              )}
            >
              <Tooltip
                side="top"
                content={
                  resume.visibility !== "public"
                    ? t`Statistics are available only for public resumes.`
                    : t`You can track the number of views  and downloads your resume has received.`
                }
              >
                {resume.views?.toString() && resume.downloads?.toString() && (
                  <p className="flex w-[80px] font-medium">
                    <p className="flex">
                      {resume.views}
                      <Eye size={18} className="ml-1" />
                    </p>
                    <p className="ml-3 flex">
                      {resume.downloads}
                      <Download size={18} className="ml-1" />
                    </p>
                  </p>
                )}
              </Tooltip>
            </p>
          </div>
          <div className="flex">
            <div className="content-center">
              <OptionMenu resume={resume} />
            </div>
          </div>
        </div>
      </BaseCard>
    </OptionContext>
  );
};
