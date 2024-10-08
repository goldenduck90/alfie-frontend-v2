import React, { useEffect, useMemo } from "react";
import { gql, useMutation } from "@apollo/client";
import { Wrapper } from "../layouts/Wrapper";
import { IconInput } from "../inputs/IconInput";
import { MailIcon } from "@heroicons/react/solid";
import { FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import { parseError } from "../../utils/parseError";
import { getStateByAbbreviation } from "../../utils/states";
import { useRouter } from "next/router";
import { Button } from "@src/components/ui/Button";

const subscribeEmailMutation = gql`
  mutation SubscribeEmail($input: SubscribeEmailInput!) {
    subscribeEmail(input: $input) {
      message
    }
  }
`;

export function WaitListForm() {
  const router = useRouter();
  const [subscribeEmail] = useMutation(subscribeEmailMutation);

  useEffect(() => {
    if (localStorage.getItem("fullName") || localStorage.getItem("location"))
      return;

    router.push("/signup");
  }, [router]);

  const subscribeEmailForm = useFormik({
    initialValues: {
      email: "",
      fullName: localStorage.getItem("fullName") || "",
      location: localStorage.getItem("location") || "",
      waitlist: true,
      currentMember: false,
    },
    validateOnChange: false,
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email("Please enter a valid email address.")
        .required("Please enter a valid email address."),
    }),
    onSubmit: async (values, { setErrors, setStatus, resetForm }) => {
      try {
        const { data } = await subscribeEmail({
          variables: {
            input: values,
          },
        });

        resetForm();
        setStatus({ success: data.subscribeEmail.message });
      } catch (err) {
        const msg = parseError(err);
        setStatus({ error: msg });
        setErrors({
          email: " ",
        });
      }
    },
  });

  const state = useMemo(() => {
    if (!subscribeEmailForm.values.location) return;

    return getStateByAbbreviation(subscribeEmailForm.values.location)?.label;
  }, [subscribeEmailForm.values.location]);

  const { isSubmitting, submitForm, status } = subscribeEmailForm;

  return (
    <Wrapper>
      <FormikProvider value={subscribeEmailForm}>
        <div className="flex flex-col px-8 sm:px-14 pt-12 pb-10 bg-white rounded-md space-y-5 min-w-full md:min-w-0 md:max-w-md">
          {status?.error && (
            <div className="text-red-500 text-sm text-center">
              {status.error}
            </div>
          )}
          {status?.success && (
            <div className="text-green-500 text-sm text-center">
              {status.success}
            </div>
          )}
          <div className="flex flex-col">
            <p className="mb-2 font-md font-bold text-lg text-brand-berry">
              Unfortunately, Alfie is not available in {state} yet.
            </p>
            <p className="text-md text-gray-900 pt-6">
              Enter your email below and we will notify you as soon as we launch
              in your state.
            </p>
          </div>
          <div className="pb-2">
            <IconInput
              name="email"
              placeholder="Email address"
              type="email"
              disabled={isSubmitting}
              icon={<MailIcon className="h-5 w-5 text-brand-berry" />}
            />
          </div>
          <div className="pb-3 flex flex-col items-center">
            <Button
              onClick={submitForm}
              disabled={isSubmitting}
              fullWidth
              size="medium"
            >
              Join Waitlist
            </Button>
            <div className="pt-3">
              <a
                href="https://joinalfie.com"
                className="text-sm text-brand-berry hover:text-brand-berry-tint-1"
              >
                Return to joinalfie.com
              </a>
            </div>
          </div>
        </div>
      </FormikProvider>
    </Wrapper>
  );
}
