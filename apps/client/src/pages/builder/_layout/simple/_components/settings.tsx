import { t } from "@lingui/macro";
import { Gear } from "@phosphor-icons/react";
import { Button, Tooltip } from "@reactive-resume/ui";
import { ResumeOptions, ResumeSections } from "@reactive-resume/utils";
import { useNavigate, useParams } from "react-router-dom";

import { useBuilderStore } from "@/client/stores/builder";

export const Settings = () => {
  const navigate = useNavigate();
  const activeSection = useBuilderStore((state) => state.activeSection.left);
  const params = useParams<{ id: string; section: string }>();
  const handleOptionClick = (sectionId: string) => {
    navigate(`/builder/${params.id}/${sectionId}`);
  };

  const openOptions = () => {
    handleOptionClick(activeSection.openOption ? ResumeSections.BASICS : ResumeOptions.TEMPLATE);
  };

  return (
    <Tooltip side="right" content={t({ message: "Resume Setting" })}>
      <Button size="icon" variant="ghost" className="flex" onClick={openOptions}>
        <Gear />
      </Button>
    </Tooltip>
  );
};
