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
export const FoodLog = ({ userTaskId = "" }) => {
  const notificationDispatchers = useNotificationDispatch();
  const navigate = useNavigate();
  const clearLocalStorage = () => {
    localStorage.removeItem("breakfast");
    localStorage.removeItem("lunch");
    localStorage.removeItem("dinner");
  };
  const onCompleted = () => {
    clearLocalStorage();
    notificationDispatchers.displayNotification(
      "Food Log Entry logged successfully",
      "Your results have been saved",
      "success"
    );
    navigate("/dashboard?refetch=true");
  };
  const [completeUserTask, { loading }] = useMutation(completeUserTaskMutation);

  const initialValues = {
    breakfast: parseCachedVal(localStorage.breakfast, ""),
    lunch: parseCachedVal(localStorage.lunch, ""),
    dinner: parseCachedVal(localStorage.dinner, ""),
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
      breakfast: Yup.string().required("Please enter a value"),
    }),
  });
  const { handleSubmit, errors } = formikValues;
  function questionText() {
    return (
      <>
        <p className="font-mulish text-gray-900">
          Please enter the food you ate for breakfast, lunch and dinner.
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
            title="Food Log"
            // aboveQuestionText=""
            questionText={questionText()}
            input={
              <div className="pb-2">
                <div className="flex flex-col space-y-5">
                  <div className="flex flex-col space-y-2">
                    <label className="font-mulish text-gray-900">
                      Breakfast
                    </label>

                    <TextInput
                      cache
                      name="breakfast"
                      placeholder="Cereal, milk, fruit, etc."
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col space-y-2">
                    <label className="font-mulish text-gray-900">Lunch</label>
                    <TextInput
                      cache
                      name="lunch"
                      placeholder="Sandwich, soup, salad, etc."
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col space-y-2">
                    <label className="font-mulish text-gray-900">Dinner</label>

                    <TextInput
                      cache
                      name="dinner"
                      placeholder="Chicken, rice, vegetables, etc."
                      type="text"
                    />
                  </div>
                </div>

                <div className="pt-5 md:pt-10 pb-3 flex flex-row justify-end">
                  <Button
                    title="Submit"
                    onPress={handleSubmit}
                    disabled={!!errors.breakfast}
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
