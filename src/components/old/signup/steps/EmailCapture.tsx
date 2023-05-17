import { MailIcon, PhoneIcon } from "@heroicons/react/solid";
import React, { useMemo } from "react";
import { Checkbox } from "../../../inputs/Checkbox";
import { IconInput } from "../../../inputs/IconInput";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  bezierCurve: true,
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      ticks: {
        stepSize: 10,
        callback: (label: any) => label + " lbs",
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
};

export const EmailCapture = () => {
  const fullName = localStorage.getItem("fullName") || "";
  const weight = localStorage.getItem("weight") || "";

  const weightLossValue = useMemo(() => {
    if (!weight) return "15% of your current weight";

    const weightInLbs = parseInt(weight);
    const roundedWeightLoss = Math.round(weightInLbs * 0.15);
    return `${roundedWeightLoss} pounds`;
  }, [weight]);

  const chartData = useMemo(() => {
    const weightInLbs = parseInt(weight);
    const percentLost = 0.15;
    const months = 6;

    // Calculate the weight loss per month
    const weightLossPerMonth = (weightInLbs * percentLost) / months;

    // Create an array to store the weight loss values
    const weightLossArr = [];

    // Initialize variables
    let remainingWeight = weightInLbs;

    // Generate randomized weight loss values for each month
    for (let i = 0; i < months; i++) {
      // Calculate the maximum and minimum weight loss for this month
      const maxValue = weightLossPerMonth + weightLossPerMonth * 0.5;
      const minValue = weightLossPerMonth - weightLossPerMonth * 0.1;

      // Generate a random weight loss value within the range
      const randomLoss = Math.random() * (maxValue - minValue) + minValue;

      // Update the remaining weight
      remainingWeight -= randomLoss;

      // Add the random weight loss value to the array
      weightLossArr.push(Math.floor(remainingWeight));
    }

    return {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [
        {
          label: "Weight",
          data: weightLossArr,
          pointRadius: [0, 0, 0, 0, 0, 5],
          lineTension: 0.8,
          borderColor: "#0C52E8",
          backgroundColor: "#0C52E8",
        },
      ],
    };
  }, [weight]);

  return (
    <div className="px-8">
      <div className="flex justify-center items-center">
        <Line className="w-full" options={options} data={chartData} />
      </div>
      <p className="mb-10 mt-4 font-md font-medium text-lg text-secondary-500">
        Great news,{" "}
        <span className="capitalize">{fullName.split(" ")[0]}!</span>
        <br />
        <br />
        With Alfie, you could lose over {weightLossValue} in under 6 months.
        <br />
        <br />
        We&apos;ll design a customized plan for you that includes metabolic
        profiling, doctor-managed care, and accountability.
      </p>

      <div className="flex-flex-col mb-5">
        <p className="text-primary-700 font-bold">
          Enter your email address and phone number to continue to your plan.
        </p>
      </div>

      <div className="pb-4">
        <IconInput
          name="email"
          placeholder="My email address is..."
          type="email"
          icon={<MailIcon className="h-5 w-5 text-brand-berry" />}
        />
      </div>
      <div className="pb-4">
        <IconInput
          name="phone"
          placeholder="My phone number is..."
          type="tel"
          icon={<PhoneIcon className="h-5 w-5 text-brand-berry" />}
        />
      </div>
      <div>
        {/* 
        We need a checkbox that will allow the user to opt-in to receive text messages from us.
         */}
        <Checkbox
          name="textOptIn"
          label="I would like to receive text messages from Alfie"
        />
      </div>
      <p className="text-gray-500 font-semibold text-sm mt-8">
        Your data’s security is our top priority. This information is passed
        securely to the provider and is needed for them to provide care and is
        never shared outside of Alfie Health.
      </p>
    </div>
  );
};
