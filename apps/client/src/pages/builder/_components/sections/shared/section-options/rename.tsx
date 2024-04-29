import { t } from "@lingui/macro";
import { ArrowCounterClockwise, PencilSimple } from "@phosphor-icons/react";
import { defaultSections, SectionKey, SectionWithItem } from "@reactive-resume/schema";
import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tooltip,
} from "@reactive-resume/ui";
import get from "lodash.get";

import { useResumeStore } from "@/client/stores/resume";

type Props = { id: SectionKey };

export const SectionRename = ({ id }: Props) => {
  const setValue = useResumeStore((state) => state.setValue);

  const originalName = get(defaultSections, `${id}.name`, "") as SectionWithItem;
  const section = useResumeStore((state) => get(state.resume.data.sections, id)) as SectionWithItem;

  const onResetName = () => setValue(`sections.${id}.name`, originalName);

  return (
    <Popover>
      <Tooltip content={t`Rename Section`}>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon">
            <PencilSimple />
          </Button>
        </PopoverTrigger>
      </Tooltip>
      <PopoverContent className="p-1.5">
        <div className="relative col-span-2">
          <Input
            id={`sections.${id}.name`}
            value={section.name}
            onChange={(event) => {
              setValue(`sections.${id}.name`, event.target.value);
            }}
          />
          <Button
            size="icon"
            variant="link"
            onClick={onResetName}
            className="absolute inset-y-0 right-0"
          >
            <ArrowCounterClockwise />
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
