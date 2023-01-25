import { DashboardCard } from "@src/components/DashboardCard";
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

export function Chart() {
  return (
    <DashboardCard
      className="w-full md:max-w-[75%] md:min-w-max"
      cardHeader={<h2 className="font-semibold">Your weight over time</h2>}
    >
      <div className="flex content-center">
        <LineChart
          height={200}
          width={500}
          // className="w-full"
          data={[]}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </div>
    </DashboardCard>
  );
}
