import { cn } from "@/lib/utils";
import { FC } from "react";

interface SkeletonProps {
  values?: {
    className?: string;
  };
}

export const Skeleton: FC<SkeletonProps> = ({ values }) => {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", values?.className)}
    />
  );
};
