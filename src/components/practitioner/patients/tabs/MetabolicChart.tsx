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
import { CalendarIcon } from "@heroicons/react/outline";
import { Classification } from "@src/graphql/generated";
import dayjs from "dayjs";
import { makeArrayWithRange } from "@src/utils/range";

const legendItemKeys = {
  Rover: "#22C55E",
  Growler: "#0C52E8",
  Ember: "#8B5CF6",
  Empath: "#F43F5E",
};

export function MetabolicChart({ chartData }: { chartData?: Classification[] }) {
  interface ClassificationData {
    date: number;
    Rover: string;
    Growler: string;
    Ember: string;
    Empath: string;
  }

  const organizedClassifications: { [key: string]: ClassificationData } = {};

  const start = new Date(chartData?.[0]?.date).getTime();
  const end = new Date(chartData?.[chartData.length - 1]?.date).getTime();

  const ticks = makeArrayWithRange(start, end, 4);

  chartData?.forEach((classification) => {
    const date = dayjs(classification.date).format("YYYY-MM-DD");

    const initialClassification = {
      Rover: "0",
      Growler: "0",
      Ember: "0",
      Empath: "0",
    };

    //? calculated/ display/ then percentile
    const getPercentile = () => {
      const percentile = classification?.calculatedPercentile
        ?? classification?.percentile

      if (typeof percentile === "number") {
        return Math.round(percentile);
      }
      return percentile;
    };

    if (!organizedClassifications[date]) {
      organizedClassifications[date] = {
        ...initialClassification,
        date: new Date(classification.date).getTime(),
      } as ClassificationData;
    }

    (organizedClassifications as any)[date][classification?.classification] =
      getPercentile();
  });

  const data = Object.values(organizedClassifications).sort((a, b) =>
    dayjs(a.date).isAfter(dayjs(b.date)) ? 1 : -1
  );
  console.log(data, "data")
  return (
    <DashboardCard className="w-full md:max-w-[100%] md:min-w-max py-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex w-full flex-col md:flex-row gap-2">
          {Object.keys(legendItemKeys).map((key: any) => {
            const lastItem = data[data?.length - 1];
            return (
              <div
                key={key}
                className="flex justify-between items-center capitalize bg-gray-50 py-1 px-2 rounded-md"
              >
                <div className="flex items-center">
                  <span>
                    <div
                      className="w-4 h-4 rounded-full mr-2"
                      style={{
                        backgroundColor: (legendItemKeys as any)?.[key] || "",
                      }}
                    />
                  </span>
                  {key}
                </div>
                <span className="bg-white p-1 px-2 rounded-lg font-[700] text-center">{`${(lastItem as any)?.[key]
                  } %`}</span>
              </div>
            );
          })}
        </div>
        <div className="flex min-w-max justify-end items-center gap-x-2 text-sm border rounded-md py-2 px-4 border-gray-300 text-gray-600">
          <span>
            <CalendarIcon className="w-4 h-4 stroke-gray-600" />
          </span>
          <p>{`${dayjs(start).format("MM/DD/YYYY")}-${dayjs(end).format(
            "MM/DD/YYYY"
          )}`}</p>
        </div>
      </div>
      <div className="flex content-center w-full pt-8">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
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
              domain={[0, 100]}
              type="number"
              dataKey="Rover"
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
                const date = payload?.[0]?.payload?.date;
                if (!value) return null;
                return (
                  <div className="py-2 px-2 text-center bg-[#0F172A] text-white rounded-lg min-w-[120px] w-full flex flex-col gap-y-2">
                    <div className="text-sm">
                      {dayjs(date).format("MM/DD/YYYY")}
                    </div>
                    {payload?.map((pay, i) => {
                      return (
                        <div
                          className="flex items-center justify-between text-xs"
                          key={i}
                        >
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
