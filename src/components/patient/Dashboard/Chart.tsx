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
} from "recharts";
import dayjs from "dayjs";

const data = [
  {
    date: "2021-01-01",
    weight: 90,
  },
  {
    date: "2021-02-01",
    weight: 77,
  },
  {
    date: "2021-03-01",
    weight: 60,
  },
  {
    date: "2021-04-01",
    weight: 45,
  },
  {
    date: "2021-05-01",
    weight: 10,
  },
];

export function Chart() {
  return (
    <DashboardCard
      className="w-full md:max-w-[75%] md:min-w-max py-4"
      cardHeader={<h2 className="font-semibold">Your weight over time</h2>}
    >
      <div className="flex content-center w-full pt-8">
        <ResponsiveContainer width="100%" height={312}>
          <LineChart data={data}>
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
              dataKey={"weight"}
              axisLine={false}
              tickLine={false}
              tickCount={5}
              tickFormatter={(weight) => `${weight} kg`}
              tickMargin={10}
            />
            <Line
              type="linear"
              dataKey="weight"
              stroke="#0C52E8"
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 8 }}
            />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </DashboardCard>
  );
}
