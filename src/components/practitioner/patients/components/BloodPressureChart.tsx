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

export function BloodPressureChart({
  title,
  systolicColor = "#0C52E8",
  diastolicColor = "#eb0e0e",
  heartRateColor = "#22c55e",
  chartData,
}: {
  title: string;
  systolicColor?: string;
  diastolicColor?: string;
  heartRateColor?: string;
  chartData: any;
}) {
  const sortedChartData = chartData?.sort((a: any, b: any) => a.date - b.date);

  const start = sortedChartData?.[0]?.date;
  const end = sortedChartData?.[sortedChartData.length - 1]?.date;
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
              domain={[0, 200]}
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
            <Line
              type="monotone"
              dataKey="heartRate"
              stroke={heartRateColor}
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
                const heartRate = payload?.[0]?.payload?.heartRate;
                const date = payload?.[0]?.payload.date;

                if (!systolic || !diastolic || !heartRate) return null;
                return (
                  <div className="py-1 px-2 text-center bg-black text-white rounded-lg text-sm ">
                    <div>{dayjs(date).format("MM/DD/YYYY")}</div>
                    <div className="flex items-center space-x-2 pb-1">
                      <div
                        className="h-4 w-4 rounded-full border-white border-2"
                        style={{ backgroundColor: systolicColor }}
                      />
                      <p>systolic: {`${systolic}`}</p>
                    </div>
                    <div className="flex items-center space-x-2 pb-1">
                      <div
                        className="h-4 w-4 rounded-full border-white border-2"
                        style={{ backgroundColor: diastolicColor }}
                      />
                      <p>diastolic: {`${diastolic}`}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div
                        className="h-4 w-4 rounded-full border-white border-2"
                        style={{ backgroundColor: heartRateColor }}
                      />
                      <p>heart rate: {`${heartRate}`}</p>
                    </div>
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
