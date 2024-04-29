import { plural } from "@lingui/macro";
import { Columns } from "@phosphor-icons/react";
import { DropdownMenuRadioGroup } from "@radix-ui/react-dropdown-menu";
import { SectionKey, SectionWithItem } from "@reactive-resume/schema";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@reactive-resume/ui";
import get from "lodash.get";

import { useResumeStore } from "@/client/stores/resume";

type Props = { id: SectionKey };

export const SectionColumns = ({ id }: Props) => {
  const setValue = useResumeStore((state) => state.setValue);

  const section = useResumeStore((state) => get(state.resume.data.sections, id)) as SectionWithItem;

  const onChangeColumns = (value: string) => setValue(`sections.${id}.columns`, Number(value));

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Columns />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-48">
        <DropdownMenuRadioGroup value={`${section.columns}`} onValueChange={onChangeColumns}>
          {Array.from({ length: 5 }, (_, i) => i + 1).map((value) => (
            <DropdownMenuRadioItem key={value} value={`${value}`}>
              {value} {plural(value, { one: "Column", other: "Columns" })}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
