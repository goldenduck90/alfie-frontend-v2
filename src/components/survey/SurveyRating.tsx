import React, { useState } from "react";
import { useField } from "formik";

type RatingOption = {
  value: number;
  label?: string;
  color: string;
  component?: React.ReactNode;
};

type RatingProps = {
  name: string;

  options: RatingOption[];
};

const NPSRating = ({ name, options }: RatingProps) => {
  const [, { value, error }, helpers] = useField(name);
  const [hoverIndex, setHoverIndex] = useState(-1);

  const handleMouseEnter = (option: RatingOption) => {
    setHoverIndex(option.value);
  };

  const handleMouseLeave = () => {
    setHoverIndex(-1);
  };

  return (
    <div className="flex gap-4 w-full flex-wrap justify-center">
      {options.map((option, idx) => (
        <div
          key={idx}
          className="relative flex flex-col items-center cursor-pointer w-8 h-8 transition ease-in-out delay-100 hover:scale-110 duration-200"
          onClick={() => helpers.setValue(option.value)}
          onMouseEnter={() => handleMouseEnter(option)}
          onMouseLeave={handleMouseLeave}
        >
          <input
            type="radio"
            name={name}
            value={option.value}
            className={`absolute opacity-0`}
          />
          <div
            className="w-full h-full text-white flex justify-center items-center rounded-md transition duration-800"
            style={{
              backgroundColor:
                hoverIndex > -1
                  ? option.value > hoverIndex
                    ? "#d2d2d2"
                    : option.color
                  : value >= option.value
                  ? option.color
                  : "#d2d2d2",
            }}
          ></div>
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white">
            {option.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default NPSRating;
