import React from "react";
import {
  DashboardPreviewItemProps,
  DashboardPreviewItem,
} from "./DashboardPreviewItem";

interface DashboardCardProps {
  cardHeader: React.ReactNode;
  items?: DashboardPreviewItemProps[];
  children?: React.ReactNode;
  className?: string;
}

export function DashboardCard({
  cardHeader,
  items,
  children,
  className,
}: DashboardCardProps) {
  const renderItems = items?.map((item, i) => (
    <DashboardPreviewItem key={i} {...item} />
  ));
  return (
    <div className={`p-6 rounded-xl border bg-white my-2 ${className}`}>
      {cardHeader}
      {renderItems}
      {children}
    </div>
  );
}
