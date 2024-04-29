import { t } from "@lingui/macro";
import { Eye, EyeSlash } from "@phosphor-icons/react";
import { SectionKey, SectionWithItem } from "@reactive-resume/schema";
import { Button, Tooltip } from "@reactive-resume/ui";
import get from "lodash.get";

import { useResumeStore } from "@/client/stores/resume";

type Props = { id: SectionKey };

export const SectionVisibility = ({ id }: Props) => {
  const setValue = useResumeStore((state) => state.setValue);
  const section = useResumeStore((state) => get(state.resume.data.sections, id)) as SectionWithItem;
  const toggleVisibility = () => setValue(`sections.${id}.visible`, !section.visible);

  return (
    <div onClick={toggleVisibility}>
      <Tooltip content={section.visible ? t`Visible` : t`Hidden`}>
        <Button variant="ghost" size="icon">
          {section.visible ? <Eye /> : <EyeSlash />}
        </Button>
      </Tooltip>
    </div>
  );
};
