import React from "react";
import { gql, useMutation } from "@apollo/client";
import { Wrapper } from "../../components/layouts/Wrapper";
import { IconInput } from "../../components/inputs/IconInput";
import { Button } from "../../components/Button";
import { UserIcon } from "@heroicons/react/solid";
import { FormikProvider, useFormik } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { parseError } from "../../utils/parseError";

const forgotPasswordMutation = gql`
  mutation ForgotPassword($input: ForgotPasswordInput!) {
    forgotPassword(input: $input) {
      message
    }
  }
`;

const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email address.")
    .required("Please enter a valid email address."),
});

const ForgotPassword = () => {
  const [forgotPassword] = useMutation(forgotPasswordMutation);

  const forgotForm = useFormik({
    initialValues: {
      email: "",
    },
    validateOnChange: false,
    validationSchema: ForgotPasswordSchema,
    onSubmit: async (values, { setErrors, setStatus, resetForm }) => {
      const { email } = values;

      try {
        const { data } = await forgotPassword({
          variables: {
            input: {
              email,
            },
          },
        });

        resetForm();
        setStatus({ success: data.forgotPassword.message });
      } catch (err) {
        const msg = parseError(err);
        setStatus({ error: msg });
        setErrors({
          email: " ",
        });
      }
    },
  });

  const { isSubmitting, submitForm, status } = forgotForm;

  return (
    <Wrapper>
      <div className="flex flex-col items-center my-10">
        <img
          src={require("../../assets/logo.png")}
          alt="Alfie"
          className="w-36"
        />
      </div>
      <FormikProvider value={forgotForm}>
        <div className="flex flex-col px-8 sm:px-14 pt-8 pb-10 bg-white rounded-md space-y-5 min-w-full md:min-w-0 md:max-w-md">
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
            <p className="font-mulish text-sm text-gray-400 pt-6">
              Please enter your email address below to reset your password.
            </p>
          </div>
          <div className="pb-2">
            <IconInput
              name="email"
              placeholder="Email address"
              type="email"
              disabled={isSubmitting}
              icon={<UserIcon className="h-5 w-5 text-indigo-800" />}
            />
          </div>
          <div className="pb-3 flex flex-col items-center">
            <Button
              title="Reset Password"
              onPress={submitForm}
              disabled={isSubmitting}
              fullWidth
            />
            <div className="pt-3">
              <Link
                to="/login"
                className="font-mulish text-sm text-indigo-800 hover:text-indigo-600"
              >
                Login
              </Link>
            </div>
          </div>
          <div className="flex flex-col border-t border-gray-200">
            <p className="font-mulish text-center text-sm text-gray-400 pt-6">
              Haven&apos;t signed up yet?{" "}
              <Link
                to="/signup"
                className="text-indigo-800 hover:text-indigo-600"
              >
                Click here to see if you are eligible for Alfie.
              </Link>
            </p>
          </div>
        </div>
      </FormikProvider>
    </Wrapper>
  );
};

export default ForgotPassword;
