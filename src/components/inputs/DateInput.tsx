import React from "react";
import { useField } from "formik";
import DatePicker from "react-datepicker";
import { range } from "lodash";
import { format, getYear, getMonth } from "date-fns";

import "react-datepicker/dist/react-datepicker.css";

const YEAR_OPTIONS = range(1940, getYear(new Date()) + 1, 1).reverse();

const MONTH_OPTIONS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export type DateInputProps = {
  name: string;
  placeholder: string;
  disabled?: boolean;
  icon: JSX.Element;
  minDate?: Date;
  maxDate?: Date;
};
export const DateInput = ({
  name,
  placeholder,
  disabled = false,
  icon,
  ...props
}: DateInputProps) => {
  const [, { value, error }, { setValue, setError }] = useField(name);

  return (
    <>
      <div className="relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 z-10">
          {icon}
        </span>
        <DatePicker
          className={`${
            error ? "border-red-500" : "border-gray-300"
          } w-full py-1 rounded-2xl border-2 pl-10 placeholder-gray-400 bg-white text-black`}
          placeholderText={placeholder}
          {...props}
          selected={new Date(value)}
          onFocus={() => setError(undefined)}
          onChange={(date) => date && setValue(date)}
          renderCustomHeader={({
            date,
            changeYear,
            changeMonth,
            decreaseMonth,
            increaseMonth,
            prevMonthButtonDisabled,
            nextMonthButtonDisabled,
          }) => (
            <div className="m-3 flex justify-between">
              <button
                onClick={decreaseMonth}
                disabled={prevMonthButtonDisabled}
              >
                {"<<"}
              </button>
              <div className="flex gap-1">
                <select
                  value={getYear(date)}
                  onChange={({ target }) =>
                    changeYear(getYear(new Date(target.value)) + 1)
                  }
                >
                  {YEAR_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>

                <select
                  value={MONTH_OPTIONS[getMonth(date)]}
                  onChange={({ target: { value } }) =>
                    changeMonth(MONTH_OPTIONS.indexOf(value))
                  }
                >
                  {MONTH_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={increaseMonth}
                disabled={nextMonthButtonDisabled}
              >
                {">>"}
              </button>
            </div>
          )}
        />
      </div>
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </>
  );
};
