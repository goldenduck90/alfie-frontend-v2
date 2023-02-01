import * as Yup from "yup";
import { FormikProvider, useFormik } from "formik";
import { useRef } from "react";
import { Button } from "../../Button";
import { NumberInput } from "../../inputs/NumbeInput";
import { convertFormValuesIntoAnswers, parseCachedVal } from "../helpers";
import { Question } from "../Question";
import { BackButton } from "../../BackButton";

import { useMutation, gql } from "@apollo/client";
import { useNavigate } from "react-router";
import { useNotificationDispatch } from "../../../context/NotificationContext";

const completeUserTaskMutation = gql`
  mutation CompleteTask($input: CompleteUserTaskInput!) {
    completeUserTask(input: $input) {
      completed
    }
  }
`;
export const WeightLog = ({ userTaskId = "" }) => {
  const notificationDispatchers = useNotificationDispatch();
  const navigate = useNavigate();
  const clearLocalStorage = () => {
    localStorage.removeItem("weight");
  };
  const onCompleted = () => {
    clearLocalStorage();
    notificationDispatchers.displayNotification(
      "Weight logged successfully",
      "Your results have been saved",
      "success"
    );
    navigate("/dashboard?refetch=true");
  };
  const [completeUserTask, { loading }] = useMutation(completeUserTaskMutation);

  const weightRef = useRef(null);
  const initialValues = {
    weight: parseCachedVal(localStorage.weight, ""),
  };
  const onSubmit = async (values = initialValues) => {
    const answers = convertFormValuesIntoAnswers(values);
    const input = { _id: userTaskId, answers };
    console.log("log: values", {
      input,
      values,
      convertedValues: convertFormValuesIntoAnswers(values),
    });

    await completeUserTask({ variables: { input } });
    onCompleted();
  };

  const formikValues = useFormik({
    initialValues,
    onSubmit,
    validationSchema: Yup.object().shape({
      weight: Yup.number()
        .required("Please select a value")
        .min(60, "Cannot be less than 60")
        .max(999, "Cannot be higher than 999"),
    }),
  });
  const { handleSubmit, errors } = formikValues;
  return (
    <FormikProvider value={formikValues}>
      <BackButton location="dashboard" />
      <div className="mt-20 flex flex-col px-8 sm:px-14 pt-10 pb-10 bg-white rounded-md space-y-5 md:w-2/3">
        <div className="flex flex-col">
          <Question
            title="Enter your weight"
            // aboveQuestionText="If you haven't taken a recent blood pressure reading, please visit your local pharmacy which may have a blood pressure machine available free to use or order a blood pressure machine online."
            questionText="How much do you currently weight?"
            input={
              <div className="pb-2">
                <div className="flex flex-row space-x-5">
                  <NumberInput
                    cache
                    name="weight"
                    placeholder="Enter your weight..."
                    type="tel"
                    maxLength={3}
                    position="right"
                    addonText="lbs"
                    showError={false}
                    nextFieldRef={weightRef}
                  />
                </div>
                {errors.weight && (
                  <span className="text-red-500 text-sm">{errors.weight}</span>
                )}
                <div className="pt-5 md:pt-10 pb-3 flex flex-row justify-end">
                  <Button
                    title="Submit"
                    onPress={handleSubmit}
                    disabled={!!errors.weight}
                    spinnerMl={3}
                    spinnerSize={16}
                    loading={loading}
                  />
                </div>
              </div>
            }
          />
        </div>
      </div>
    </FormikProvider>
  );
};
