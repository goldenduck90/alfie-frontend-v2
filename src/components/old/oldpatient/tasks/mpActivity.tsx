import * as Yup from "yup";
import { FormikProvider, useFormik } from "formik";
import { useRef } from "react";
import { Button } from "../../Button";
import { NumberInput } from "../../../inputs/NumbeInput";
import { convertFormValuesIntoAnswers, parseCachedVal } from "../helpers";
import { Question } from "../Question";
import { BackButton } from "../../../ui/BackButton";

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
export const MpActivity = ({ userTaskId = "" }) => {
  const notificationDispatchers = useNotificationDispatch();
  const navigate = useNavigate();
  const clearLocalStorage = () => {
    localStorage.removeItem("systolic");
    localStorage.removeItem("diastolic");
  };
  const onCompleted = () => {
    clearLocalStorage();
    notificationDispatchers.displayNotification(
      "Steps logged successfully",
      "Your results have been saved",
      "success"
    );
    navigate("/dashboard?refetch=true");
  };
  const [completeUserTask, { loading }] = useMutation(completeUserTaskMutation);

  const stepsRef = useRef(null);
  const initialValues = {
    steps: parseCachedVal(localStorage.steps, ""),
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
      steps: Yup.number()
        .required("Please select a value")
        .min(0, "Cannot be less than 0")
        .max(30000, "Cannot be higher than 30000"),
    }),
  });
  const { handleSubmit, errors } = formikValues;
  return (
    <FormikProvider value={formikValues}>
      <BackButton location="dashboard" />
      <div className="mt-20 flex flex-col px-8 sm:px-14 pt-10 pb-10 bg-white rounded-md space-y-5 sm:w-2/3">
        <div className="flex flex-col">
          <Question
            title="Enter Average Steps per Day"
            aboveQuestionText="Please enter your average number of steps per day for the past week"
            input={
              <div className="pb-2">
                <div className="flex flex-row space-x-5">
                  <NumberInput
                    cache
                    name="steps"
                    placeholder="120"
                    type="tel"
                    maxLength={5}
                    position="right"
                    addonText="steps"
                    showError={false}
                    nextFieldRef={stepsRef}
                  />
                </div>

                <div className="pt-5 md:pt-10 pb-3 flex flex-row justify-end">
                  <Button
                    title="Submit"
                    onPress={handleSubmit}
                    disabled={!!errors.steps}
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
