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

const legendItemKeys = {
  rover: "#22C55E",
  growler: "#0C52E8",
  ember: "#8B5CF6",
  empath: "#F43F5E",
};

const tempData = [
  {
    date: Date.now(),
    rover: 55,
    growler: 10,
    ember: 20,
    empath: 30,
  },
  {
    date: Date.now(),
    rover: 45,
    growler: 35,
    ember: 60,
    empath: 35,
  },
  {
    date: Date.now(),
    rover: 65,
    growler: 40,
    ember: 30,
    empath: 12,
  },
  {
    date: Date.now(),
    rover: 80,
    growler: 10,
    ember: 89,
    empath: 60,
  },
];

export function MetabolicChart() {
  const { user } = useCurrentUserStore();

  return (
    <DashboardCard className="w-full md:max-w-[100%] md:min-w-max py-4">
      <div className="flex gap-x-4">
        {Object.keys(legendItemKeys).map((key: any) => {
          const lastItem = tempData?.[tempData?.length - 1];
          return (
            <div
              key={key}
              className="flex gap-x-2 items-center capitalize bg-gray-50 py-1 px-2 rounded-md"
            >
              <span>
                <div
                  className="w-4 h-4 rounded-full"
                  style={{
                    backgroundColor: (legendItemKeys as any)?.[key] || "",
                  }}
                />
              </span>
              {key}
              <span className="bg-white p-1 rounded-md font-[700] text-center">{`${
                (lastItem as any)?.[key]
              } %`}</span>
            </div>
          );
        })}
      </div>
      <div className="flex content-center w-full pt-8">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={tempData}>
            <CartesianGrid strokeDasharray="0 0" vertical={false} />
            <XAxis
              dataKey="date"
              strokeWidth={0}
              tickFormatter={(unixTime) => dayjs(unixTime).format("MMM")}
              tickMargin={15}
            />
            <YAxis
              domain={[0, 100]}
              type="number"
              dataKey={"rover"}
              axisLine={false}
              tickLine={false}
              tickCount={5}
              tickFormatter={(weight) => `${weight}th`}
              tickMargin={10}
            />
            {Object.keys(legendItemKeys).map((key: any) => {
              return (
                <Line
                  key={key}
                  type="monotone"
                  dataKey={key}
                  stroke={(legendItemKeys as any)[key]}
                  strokeWidth={3}
                  dot={false}
                  activeDot={{ r: 8 }}
                />
              );
            })}
            <Tooltip
              offset={0}
              content={({ payload, active }) => {
                if (!active) return null;
                const value = payload?.[0]?.value;
                if (!value) return null;

                console.log({ payload });
                return (
                  <div className="py-2 px-2 text-center bg-[#0F172A] text-white rounded-lg min-w-[120px] w-full flex flex-col gap-y-2">
                    {payload?.map((pay) => {
                      return (
                        <div className="flex items-center justify-between text-xs">
                          <div
                            key={pay.name}
                            className="flex gap-x-2 items-center capitalize mr-4"
                          >
                            <div className="border-2 border-white rounded-full">
                              <div
                                style={{
                                  backgroundColor: (pay as any)?.stroke || "",
                                  width: 15,
                                  height: 15,
                                  borderRadius: "50%",
                                }}
                              />
                            </div>
                            <p>{pay.name}:</p>
                          </div>
                          <p className="text-right">{pay.value}th</p>
                        </div>
                      );
                    })}
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
