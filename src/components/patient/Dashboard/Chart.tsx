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
import { useCurrentUserStore } from "@src/hooks/useCurrentUser";

const data = [
  {
    date: "2021-01-01",
    weight: 200,
  },
  {
    date: "2021-02-01",
    weight: 190,
  },
  {
    date: "2021-03-01",
    weight: 185,
  },
  {
    date: "2021-04-01",
    weight: 170,
  },
  {
    date: "2021-05-01",
    weight: 165,
  },
];

export function Chart() {
  const { user } = useCurrentUserStore();
  console.log({ user });

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
              domain={[100, "auto"]}
              type="number"
              dataKey={"weight"}
              axisLine={false}
              tickLine={false}
              tickCount={5}
              tickFormatter={(weight) => `${weight}lbs`}
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
              y={35}
              stroke="#E99298"
              label={(props) => {
                // console.log({ props });
                return (
                  <svg {...props} className="p-1 rounded-full bg-red-300">
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
                      className="text-sm text-white p-1 rounded-full bg-red-300"
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
