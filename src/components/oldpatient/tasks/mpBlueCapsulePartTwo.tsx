import * as Yup from "yup";
import { FormikProvider, useFormik } from "formik";
import { Button } from "../../Button";
import { convertFormValuesIntoAnswers, parseCachedVal } from "../helpers";
import { Question } from "../Question";
import { BackButton } from "../../ui/BackButton";

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
export const MpBlueCapsulePartTwo = ({ userTaskId = "" }) => {
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
    bluePillPartTwoTimeTaken: parseCachedVal(
      localStorage.bluePillPartTwoTimeTaken,
      ""
    ),
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
      bluePillPartTwoTimeTaken: Yup.date().required("Please enter a date"),
    }),
  });
  const { handleSubmit, errors } = formikValues;
  return (
    <FormikProvider value={formikValues}>
      <BackButton location="dashboard" />
      <div className="mt-20 flex flex-col px-8 sm:px-14 pt-10 pb-10 bg-white rounded-md space-y-5 sm:w-2/3">
        <div className="flex flex-col">
          <Question
            title="Please enter the time you passed blue poo."
            questionText="Great, you’ve taken the blue capsule! The average gut transit time is  ~30 hours, but it can vary by individual. Once you first notice that you have passed bluish-green stool, log the time you did so here. "
            input={
              <div className="pb-2">
                <div className="">
                  <TextInput
                    cache
                    name="bluePillPartTwoTimeTaken"
                    placeholder="Enter time"
                    type="datetime-local"
                  />
                </div>

                <div className="pt-5 md:pt-10 pb-3 flex flex-row justify-end">
                  <Button
                    title="Submit"
                    onPress={handleSubmit}
                    disabled={!!errors.bluePillPartTwoTimeTaken}
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
