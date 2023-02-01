import React from "react";

interface DashboardCardProps {
  cardHeader?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

export function DashboardCard({
  cardHeader,
  children,
  className,
}: DashboardCardProps) {
  return (
    <div className={`p-6 rounded-xl border bg-white my-2 ${className}`}>
      {cardHeader}
      {children}
    </div>
  );
}
