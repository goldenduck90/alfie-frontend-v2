import { DashboardCard } from "@src/components/ui/DashboardCard";
import React from "react";
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  ResponsiveContainer,
} from "recharts";
import dayjs from "dayjs";
import { makeArrayWithRange } from "@src/utils/range";

export function StepsChart({
  title,
  lineColor = "#0C52E8",
  chartData,
}: {
  title: string;
  lineColor?: string;
  chartData: { value: string; date: number }[];
}) {
  const start = chartData?.[0]?.date;
  const end = chartData?.[chartData.length - 1]?.date;

  const ticks = makeArrayWithRange(start, end, 3);
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
              domain={[start, end]}
              strokeWidth={0}
              tickFormatter={(unixTime) => dayjs(unixTime).format("MM/DD/YY")}
              tickMargin={15}
              type="number"
              ticks={ticks}
            />
            <YAxis
              domain={[0, "auto"]}
              type="number"
              dataKey={"value"}
              axisLine={false}
              tickLine={false}
              tickCount={5}
              tickFormatter={(step) => `${step}`}
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
                const date = payload?.[0]?.payload.date;
                if (!value) return null;
                return (
                  <div className="py-1 px-2 text-center bg-black text-white rounded-md">
                    <div>{dayjs(date).format("MM/DD/YYYY")}</div>
                    <div>{`${value}`}</div>
                  </div>
                );
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </DashboardCard>
  );
}
