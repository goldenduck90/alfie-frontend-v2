/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { gql, useQuery, useMutation } from "@apollo/client";
import { useFormik, FormikProvider } from "formik";
import * as Yup from "yup";

import { useNotificationStore } from "@src/hooks/useNotificationStore";
import { randomId } from "@src/utils/randomId";

import { Loading } from "../Loading";
import { Wrapper } from "@src/components/layouts/Wrapper";
import NPSRating from "./SurveyRating";
import { Button } from "../ui/Button";
import TextAnswer from "./TextAnswer";
import FeedbackAnswer from "./FeedbackAnswer";

const getSurveyQuery = gql`
  query getSurvey($id: String!) {
    getSurvey(id: $id) {
      _id
      score
    }
  }
`;

const submitSurveyMutation = gql`
  mutation SubmitSurvey($input: NPSInput!) {
    submitSurvey(input: $input) {
      _id
    }
  }
`;

const SurveyForm = () => {
  const { addNotification } = useNotificationStore();
  const router = useRouter();
  const { id } = router.query;

  const { data, loading, error } = useQuery(getSurveyQuery, {
    variables: {
      id,
    },
  });

  const [submitSurvey] = useMutation(submitSurveyMutation);

  useEffect(() => {
    if (error) {
      addNotification({
        id: randomId(),
        type: "error",
        description: "Please make sure the survey url is valid",
        title: "Unable to load survey",
      });
      router.push(`/login`);
    } else {
      if (data?.getSurvey.score) {
        addNotification({
          id: randomId(),
          type: "warning",
          description: "Your feedback has been recorded already.",
          title: "Survey already submitted",
        });
      }
      router.push(`/login`);
    }
  }, [data, error]);

  const formik = useFormik({
    initialValues: {
      score: -1,
      textAnswer: "",
      feedback: "",
    },
    validateOnChange: false,
    validationSchema: Yup.object({
      score: Yup.number()
        .required("Please rate your experience.")
        .min(0)
        .max(10),
      textAnswer: Yup.string().optional(),
      feedback: Yup.string().optional(),
    }),
    onSubmit: async (values, { resetForm }) => {
      console.log(values);
      const { score, textAnswer, feedback } = values;

      const input = { id, score, textAnswer, feedback };
      await submitSurvey({
        variables: {
          input,
        },
      });

      addNotification({
        id: randomId(),
        type: "success",
        description: "Thank you for using Alfie Health",
        title: "Your feedback has been recorded",
      });

      resetForm();
      router.push(`/login`);
    },
  });

  if (loading) return <Loading />;

  return (
    <Wrapper
      header={
        <>
          <h2 className="text-lg text-center sm:text-2xl text-white font-bold">
            Thank you for using Alfie Health! At Alfie Health!
          </h2>
          <h5 className="font-32 text-lg text-white">
            Your well-being and satisfaction are of utmost importance to us.
          </h5>
        </>
      }
    >
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit}>
          <div className="flex flex-col max-w-sm sm:max-w-lg md:max-w-3xl lg:max-w-5xl bg-white rounded-xl gap-5 p-3">
            <div className="px-8 py-8 w-full flex flex-col gap-8">
              <div className="w-full flex flex-col p-2">
                <h6 className="mb-2">
                  On a scale of 0 to 10, how likely are you to recommend Alfie
                  Health to a friend or family member?
                </h6>
                <NPSRating
                  name="score"
                  options={[
                    { value: 0, label: "0", color: "#ff0000" },
                    { value: 1, label: "1", color: "#fe4000" },
                    { value: 2, label: "2", color: "#f96000" },
                    { value: 3, label: "3", color: "#f96000" },
                    { value: 4, label: "4", color: "#e59100" },
                    { value: 5, label: "5", color: "#d7a700" },
                    { value: 6, label: "6", color: "#c4ba00" },
                    { value: 7, label: "7", color: "#aecd00" },
                    { value: 8, label: "8", color: "#91df00" },
                    { value: 9, label: "9", color: "#6aef00" },
                    { value: 10, label: "10", color: "#00ff00" },
                  ]}
                />
              </div>

              <div className="w-full flex flex-col">
                <TextAnswer name="textAnswer" />
              </div>

              <div className="w-full flex flex-col">
                <FeedbackAnswer name="feedback" />
              </div>

              <div className="w-full flex flex-col items-center">
                <Button type="submit">Submit</Button>
              </div>
            </div>
          </div>
        </form>
      </FormikProvider>
    </Wrapper>
  );
};

export default SurveyForm;
