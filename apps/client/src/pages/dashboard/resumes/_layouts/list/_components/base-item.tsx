import { Download, Eye } from "@phosphor-icons/react";
import { cn } from "@reactive-resume/utils";

type Props = {
  title?: React.ReactNode;
  description?: React.ReactNode;
  downloads?: number;
  views?: number;
  start?: React.ReactNode;
  end?: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

export const BaseListItem = ({
  title,
  description,
  downloads,
  views,
  start,
  end,
  className,
  onClick,
}: Props) => (
  <div
    onClick={onClick}
    className={cn(
      "flex cursor-pointer items-center rounded p-4 transition-colors hover:bg-secondary/30",
      className,
    )}
  >
    <div className="flex w-full items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className="flex size-5 items-center justify-center">{start}</div>
        <h4 className="w-[180px] truncate font-medium lg:w-[320px]">{title}</h4>
        {views?.toString() && downloads?.toString() && (
          <h5 className="flex w-[80px] truncate font-medium">
            <p className="flex">
              {views}
              <Eye size={18} className="ml-1" />
            </p>
            <p className="ml-3 flex">
              {downloads}
              <Download size={18} className="ml-1" />
            </p>
          </h5>
        )}
        <p className="hidden text-xs opacity-75 sm:block">{description}</p>
      </div>

      {end && <div className="flex size-5 items-center justify-center">{end}</div>}
    </div>
  </div>
);
