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

const tempData = [
  {
    date: Date.now(),
    value: 55,
  },
  {
    date: Date.now(),
    value: 45,
  },
  {
    date: Date.now(),
    value: 65,
  },
  {
    date: Date.now(),
    value: 80,
  },
];

export function BasicChart({ title }: { title: string }) {
  return (
    <DashboardCard
      className="w-full md:max-w-full md:min-w-max py-4"
      cardHeader={<h2 className="font-semibold">{title}</h2>}
    >
      <div className="flex content-center w-full pt-8">
        <ResponsiveContainer width="100%" height={312}>
          <LineChart data={tempData}>
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
              type="linear"
              dataKey="value"
              stroke="#0C52E8"
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
          </LineChart>
        </ResponsiveContainer>
      </div>
    </DashboardCard>
  );
}
