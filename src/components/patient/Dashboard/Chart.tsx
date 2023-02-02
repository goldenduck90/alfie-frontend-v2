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
} from "recharts";
import dayjs from "dayjs";

const data = [
  {
    date: "2021-01-01",
    weight: 90,
  },
  {
    date: "2021-02-01",
    weight: 120,
  },
  {
    date: "2021-03-01",
    weight: 70,
  },
  {
    date: "2021-04-01",
    weight: 120,
  },
];

export function Chart() {
  return (
    <DashboardCard
      className="w-full md:max-w-[75%] md:min-w-max py-4"
      cardHeader={<h2 className="font-semibold">Your weight over time</h2>}
    >
      <div className="flex content-center w-full pt-8">
        <LineChart height={400} width={800} data={data}>
          <CartesianGrid strokeDasharray="0 0" vertical={false} />
          <XAxis
            dataKey="date"
            strokeWidth={0}
            tickFormatter={(unixTime) => dayjs(unixTime).format("MMM")}
          />
          <YAxis
            domain={[0, 150]}
            axisLine={false}
            tickFormatter={(weight) => `${weight} kg`}
          />
          <Tooltip />
          <Legend />
          <Line
            type="linear"
            dataKey="weight"
            stroke="#0C52E8"
            strokeWidth={3}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </div>
    </DashboardCard>
  );
}
