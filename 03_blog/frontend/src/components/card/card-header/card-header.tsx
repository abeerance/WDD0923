import { Text } from "@/components/ui/text/text";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface CardHeaderProps {
  title: string;
  lead: string;
  content?: ReactNode;
  className?: string;
}

export const CardHeader = ({ title, lead, content, className }: CardHeaderProps) => {
  return (
    <div className={cn("pt-m px-s pb-s flex flex-col gap-xs", className)}>
      <div className="flex flex-col gap-xs">
        <Text
          as="h4"
          variant="headline-4"
          className="line-clamp-2 h-[calc(2*var(--text-headline-4-line-height))]"
        >
          {title}
        </Text>
        <Text
          variant="body-small"
          className="line-clamp-3 h-[calc(3*var(--text-body-small-line-height))]"
        >
          {lead}
        </Text>
      </div>
      {content}
    </div>
  );
};
