import * as Yup from "yup";
import { FormikProvider, useFormik } from "formik";
import { useRef } from "react";
import { Button } from "../../../src/components/Button";
import { NumberInput } from "../../../src/components/inputs/NumbeInput";
import { convertFormValuesIntoAnswers, parseCachedVal } from "../helpers";
import { Question } from "../Question";
import { BackButton } from "../../../src/components/BackButton";

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
export const BpLog = ({ userTaskId = "" }) => {
  const notificationDispatchers = useNotificationDispatch();
  const navigate = useNavigate();
  const clearLocalStorage = () => {
    localStorage.removeItem("systolic");
    localStorage.removeItem("diastolic");
  };
  const onCompleted = () => {
    clearLocalStorage();
    notificationDispatchers.displayNotification(
      "Blood pressure logged successfully",
      "Your results have been saved",
      "success"
    );
    navigate("/dashboard?refetch=true");
  };
  const [completeUserTask, { loading }] = useMutation(completeUserTaskMutation);

  const systolicBpRef = useRef(null);
  const diastolicBpRef = useRef(null);
  const initialValues = {
    systolicBp: parseCachedVal(localStorage.systolicBp, ""),
    diastolicBp: parseCachedVal(localStorage.diastolicBp, ""),
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
      systolicBp: Yup.number()
        .required("Please select a value")
        .min(60, "Cannot be less than 60")
        .max(220, "Cannot be higher than 220"),
      diastolicBp: Yup.number()
        .required("Please select a value")
        .min(40, "Cannot be less than 40")
        .max(150, "Cannot be higher than 150"),
    }),
  });
  const { handleSubmit, errors } = formikValues;
  return (
    <FormikProvider value={formikValues}>
      <BackButton location="dashboard" />
      <div className="mt-20 flex flex-col px-8 sm:px-14 pt-10 pb-10 bg-white rounded-md space-y-5 sm:w-2/3">
        <div className="flex flex-col">
          <Question
            title="Log your Blood Pressure"
            aboveQuestionText="If you haven't taken a recent blood pressure reading, please visit your local pharmacy which may have a blood pressure machine available free to use or order a blood pressure machine online."
            questionText="What was your latest blood pressure reading?"
            input={
              <div className="pb-2">
                <div className="flex flex-row space-x-5">
                  <NumberInput
                    cache
                    name="systolicBp"
                    placeholder="120"
                    type="tel"
                    maxLength={3}
                    position="right"
                    addonText="mm Hg"
                    showError={false}
                    nextFieldRef={systolicBpRef}
                  />
                  <NumberInput
                    cache
                    inputRef={systolicBpRef}
                    name="diastolicBp"
                    placeholder="80"
                    type="tel"
                    maxLength={3}
                    position="right"
                    addonText="mm Hg"
                    showError={false}
                    nextFieldRef={diastolicBpRef}
                  />
                </div>
                {(errors.systolicBp || errors.diastolicBp) && (
                  <span className="text-red-500 text-sm">
                    {errors.systolicBp || errors.diastolicBp}
                  </span>
                )}
                <div className="pt-5 md:pt-10 pb-3 flex flex-row justify-end">
                  <Button
                    title="Submit"
                    onPress={handleSubmit}
                    disabled={!!errors.diastolicBp || !!errors.systolicBp}
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
