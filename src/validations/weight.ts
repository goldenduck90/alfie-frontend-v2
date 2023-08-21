import * as Yup from "yup";

const weightValidationSchema = (currentWeight?: number) =>
  Yup.number()
    .required("Please provide your weight.")
    .min(80, "The weight must be greater than or equal to 80.")
    .max(800, "The weight must be less than or equal to 800.")
    .test(
      "validator",
      "The weight value cannot deviate by more than +/- 10% from the last entered value.",
      (value: number | undefined) => {
        if (value === undefined || currentWeight === undefined) {
          return true;
        }

        const percentDiff = Math.floor(
          Math.abs((currentWeight - value) / ((currentWeight + value) / 2)) *
            100
        );
        return percentDiff <= 10;
      }
    );

export default weightValidationSchema;
