import * as Yup from "yup";
import { FormikProvider, useFormik } from "formik";
import { Button } from "../../Button";
import { convertFormValuesIntoAnswers, parseCachedVal } from "../helpers";
import { Question } from "../Question";
import { BackButton } from "../../BackButton";

import { useMutation, gql } from "@apollo/client";
import { useNavigate } from "react-router";
import { useNotificationDispatch } from "../../../context/NotificationContext";
import { TextInput } from "../../inputs/TextInput";

const completeUserTaskMutation = gql`
  mutation CompleteTask($input: CompleteUserTaskInput!) {
    completeUserTask(input: $input) {
      completed
    }
  }
`;
export const MpBlueCapsule = ({ userTaskId = "" }) => {
  const notificationDispatchers = useNotificationDispatch();
  const navigate = useNavigate();
  const clearLocalStorage = () => {
    localStorage.removeItem("systolic");
    localStorage.removeItem("diastolic");
  };
  const onCompleted = () => {
    clearLocalStorage();
    notificationDispatchers.displayNotification(
      "Blue Pill Entry logged successfully",
      "Your results have been saved",
      "success"
    );
    navigate("/dashboard?refetch=true");
  };
  const [completeUserTask, { loading }] = useMutation(completeUserTaskMutation);

  const initialValues = {
    bluePillTimeTaken: parseCachedVal(localStorage.bluePillTimeTaken, ""),
    foodTaken: parseCachedVal(localStorage.foodTaken, ""),
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
      bluePillTimeTaken: Yup.date().required("Please enter a date"),
      foodTaken: Yup.string().required("Please enter a value"),
    }),
  });
  const { handleSubmit, errors } = formikValues;
  function questionText() {
    return (
      <>
        <p className="font-mulish text-gray-900">
          You should plan to take a single blue capsule with a standard meal of
          700-900 calories. An example meal could be 2 muffins. It’s very
          important that you stay in this calorie range. You should wait 4 hours
          before eating again and limit your next meal to 500 calories (e.g. a
          bagel with cream cheese).
        </p>
        <p className="font-mulish text-gray-900 pt-4">
          Once you complete this task, you will be assigned a task to log when
          you pass blue stool. The average gut transit time is ~30 hours, but it
          can vary by individual.
        </p>
      </>
    );
  }
  return (
    <FormikProvider value={formikValues}>
      <BackButton location="dashboard" />
      <div className="mt-20 flex flex-col px-8 sm:px-14 pt-10 pb-10 bg-white rounded-md space-y-5 sm:w-2/3">
        <div className="flex flex-col">
          <Question
            title="Please enter the time you took the blue capsule. "
            aboveQuestionText="You should have received a sachet with two blue capsules in your onboarding kit."
            questionText={questionText()}
            input={
              <div className="pb-2">
                <div className="flex flex-col space-y-5">
                  <TextInput
                    cache
                    name="bluePillTimeTaken"
                    placeholder="Enter time"
                    type="datetime-local"
                  />
                  <TextInput
                    cache
                    name="foodTaken"
                    placeholder="Enter food eaten if multiple separate by comma"
                    type="text"
                  />
                </div>

                <div className="pt-5 md:pt-10 pb-3 flex flex-row justify-end">
                  <Button
                    title="Submit"
                    onPress={handleSubmit}
                    disabled={!!errors.bluePillTimeTaken || !!errors.foodTaken}
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
