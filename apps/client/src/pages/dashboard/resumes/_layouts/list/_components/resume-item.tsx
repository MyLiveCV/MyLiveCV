import { t } from "@lingui/macro";
import { ResumeDto } from "@reactive-resume/dto";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@reactive-resume/ui";
import dayjs from "dayjs";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import { useResumePreview } from "@/client/services/resume/preview";

import { OptionContext } from "../../options/option-context";
import { OptionMenu } from "../../options/option-menu";
import { BaseListItem } from "./base-item";

type Props = {
  resume: ResumeDto;
};

export const ResumeListItem = ({ resume }: Props) => {
  const navigate = useNavigate();

  const { url } = useResumePreview(resume.id);

  const lastUpdated = dayjs().to(resume.updatedAt);

  const onOpen = () => {
    navigate(`/builder/${resume.id}`);
  };

  const dropdownMenu = <OptionMenu resume={resume} />;

  return (
    <OptionContext resume={resume}>
      <HoverCard>
        <HoverCardTrigger>
          <BaseListItem
            onClick={onOpen}
            className="group"
            title={resume.title}
            description={t`Last updated ${lastUpdated}`}
            start={dropdownMenu}
            downloads={resume.downloads}
            views={resume.views}
          />
        </HoverCardTrigger>
        <HoverCardContent align="end" className="p-0" sideOffset={-100} alignOffset={100}>
          <AnimatePresence>
            {url && (
              <motion.img
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                loading="lazy"
                alt={resume.title}
                className="aspect-[1/1.4142] w-60 rounded-sm object-cover"
                src={`${url}?cache=${new Date().getTime()}`}
              />
            )}
          </AnimatePresence>
        </HoverCardContent>
      </HoverCard>
    </OptionContext>
  );
};
