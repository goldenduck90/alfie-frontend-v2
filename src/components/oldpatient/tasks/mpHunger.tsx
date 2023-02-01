// import * as Yup from "yup"
import { FormikProvider, useFormik } from "formik";
import { BackButton } from "../../BackButton";
import { SliderRange } from "../../inputs/SliderRange";
import { TextInput } from "../../inputs/TextInput";
import { convertFormValuesIntoAnswers, parseCachedVal } from "../helpers";
import { Question } from "../Question";

import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router";
import { Button } from "../../Button";
import { useNotificationDispatch } from "../../../context/NotificationContext";

const completeUserTaskMutation = gql`
  mutation CompleteTask($input: CompleteUserTaskInput!) {
    completeUserTask(input: $input) {
      completed
    }
  }
`;
export const MpHunger = ({ userTaskId = "" }) => {
  const notificationDispatchers = useNotificationDispatch();
  const navigate = useNavigate();
  const clearLocalStorage = () => {
    localStorage.removeItem("foodEaten");
    localStorage.removeItem("hungerLevel1Hour");
    localStorage.removeItem("hungerLevel30Mins");
  };
  const onCompleted = () => {
    clearLocalStorage();
    notificationDispatchers.displayNotification(
      "Hunger logged successfully",
      "Your results have been saved",
      "success"
    );
    navigate("/dashboard?refetch=true");
  };

  const [completeUserTask, { loading }] = useMutation(completeUserTaskMutation);

  const initialValues = {
    foodEaten: parseCachedVal(localStorage.foodEaten, ""),
    hungerLevel1Hour: parseCachedVal(localStorage.hungerLevel1Hour, ""),
    hungerLevel30Mins: parseCachedVal(localStorage.hungerLevel30Mins, ""),
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
    // TODO: check if any validation is needed now
    // validationSchema: Yup.object().shape({
    // }),
  });
  const { handleSubmit, errors } = formikValues;
  return (
    <FormikProvider value={formikValues}>
      <BackButton location="dashboard" />
      <div className="mt-20 flex flex-col px-8 sm:px-14 pt-10 pb-10 bg-white rounded-md space-y-5 md:w-2/3">
        <div className="flex flex-col">
          <Question
            title="Metabolic Profile: Hunger"
            header="Understanding your hunger"
            aboveQuestionText={
              <>
                <p className="mb-10">
                  These questions, in combination with the Metabolic Profiling
                  kit sent to you, help us determine your metabolic profile in
                  order to understand which medications will be most effective
                  for you. Once we get the results of your metabolic kit we'll
                  share a detailed report on your personal metabolic profile!
                </p>
                <p>
                  We want to understand how you rate your baseline hunger after
                  meals. For this we ask that you eat a meal or snack that's
                  between 300 and 400 calories and then answer the questions
                  after 30 minutes and 1 hour without consuming other food.`
                </p>
              </>
            }
            questionText="The food I had"
            input={
              <>
                <TextInput name={"foodEaten"} placeholder={""} cache />
                <div className="my-20">
                  <Question
                    questionText="Rate your hunger on a scale of 0 - 100 30 minutes after eating lunch"
                    input={<SliderRange name="hungerLevel30Mins" cache />}
                  />
                </div>
                <Question
                  questionText="Rate your hunger on a scale of 0 - 100 1 hour after eating lunch"
                  input={<SliderRange name="hungerLevel1Hour" cache />}
                />
              </>
            }
          />
        </div>
        <div className="pt-5 md:pt-10 pb-3 flex flex-row justify-end">
          <Button
            title="Submit"
            onPress={handleSubmit}
            disabled={!!Object.keys(errors).length}
            spinnerMl={3}
            spinnerSize={16}
            loading={loading}
          />
        </div>
      </div>
    </FormikProvider>
  );
};
