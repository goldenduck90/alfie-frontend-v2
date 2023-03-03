import { DashboardCard } from "@src/components/ui/DashboardCard";
import React from "react";
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import dayjs from "dayjs";

export function BasicChart({
  title,
  lineColor = "#0C52E8",
  chartData,
}: {
  title: string;
  lineColor?: string;
  chartData: { value: string; date: string }[];
}) {
  return (
    <DashboardCard
      className="w-full md:max-w-full md:min-w-max py-4"
      cardHeader={<h2 className="font-semibold">{title}</h2>}
    >
      <div className="flex content-center w-full pt-8">
        <ResponsiveContainer width="100%" height={312}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="0 0" vertical={false} />
            <XAxis
              dataKey="date"
              strokeWidth={0}
              tickFormatter={(unixTime) => dayjs(unixTime).format("MMM")}
              tickMargin={15}
            />
            <YAxis
              domain={[0, "auto"]}
              type="number"
              dataKey={"value"}
              axisLine={false}
              tickLine={false}
              tickCount={5}
              tickFormatter={(weight) => `${weight}lbs`}
              tickMargin={10}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke={lineColor}
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 8 }}
            />
            <Tooltip
              offset={0}
              content={({ payload, active }) => {
                if (!active) return null;
                const value = payload?.[0]?.value;
                if (!value) return null;
                return (
                  <div className="py-1 px-2 text-center bg-black text-white rounded-full">
                    {`${value} lbs`}
                  </div>
                );
              }}
            />
            <ReferenceLine
              y={30}
              stroke="#E99298"
              label={(props) => {
                return (
                  <svg
                    {...props}
                    className="p-1 rounded-full bg-brand-peachy-shade"
                  >
                    <rect
                      x={10}
                      y={props?.viewBox?.y - 13}
                      rx="8"
                      ry="6"
                      width={60}
                      height={25}
                      fill={"#E99298"}
                    />
                    <text
                      x={25}
                      y={props?.viewBox?.y + 4}
                      className="text-sm text-white p-1 rounded-full bg-brand-peachy-shade"
                      fill="white"
                    >
                      Goal
                    </text>
                  </svg>
                );
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </DashboardCard>
  );
}
