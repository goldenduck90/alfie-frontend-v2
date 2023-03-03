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
  ReferenceLine,
} from "recharts";
import dayjs from "dayjs";

export function BloodPressureChart({
  title,
  systolicColor = "#0C52E8",
  diastolicColor = "#eb0e0e",
  chartData,
}: {
  title: string;
  systolicColor?: string;
  diastolicColor?: string;
  chartData: any;
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
              dataKey={"systolic"}
              axisLine={false}
              tickLine={false}
              tickCount={5}
              tickFormatter={(pressure) => `${pressure}`}
              tickMargin={10}
            />
            <Line
              type="monotone"
              dataKey="systolic"
              stroke={systolicColor}
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey="diastolic"
              stroke={diastolicColor}
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 8 }}
            />
            <Tooltip
              offset={0}
              content={({ payload, active }) => {
                if (!active) return null;
                const systolic = payload?.[0]?.payload?.systolic;
                const diastolic = payload?.[0]?.payload?.diastolic;
                if (!systolic || !diastolic) return null;
                return (
                  <div className="py-1 px-2 text-center bg-black text-white rounded-lg text-sm ">
                    <div className="flex items-center space-x-2 pb-1">
                      <div
                        className="h-4 w-4 rounded-full border-white border-2"
                        style={{ backgroundColor: systolicColor }}
                      />
                      <p>systolic: {`${systolic}`}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div
                        className="h-4 w-4 rounded-full border-white border-2"
                        style={{ backgroundColor: diastolicColor }}
                      />
                      <p>diastolic: {`${diastolic}`}</p>
                    </div>
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
