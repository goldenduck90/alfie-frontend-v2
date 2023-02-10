import { gql, useMutation } from "@apollo/client";
import { Wrapper } from "../src/components/layouts/Wrapper";
import { IconInput } from "../src/components/inputs/IconInput";
import { Button } from "../src/components/old/Button";
import { LockClosedIcon } from "@heroicons/react/solid";
import { FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import { parseError } from "../src/utils/parseError";
import { useAuth } from "../src/hooks/useAuth";
import Link from "next/link";

const resetPasswordMutation = gql`
  mutation ResetPassword($input: ResetPasswordInput!) {
    resetPassword(input: $input) {
      message
      token
      user {
        _id
        name
        email
        role
      }
    }
  }
`;

const resetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .required("Please enter your password.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Your password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character."
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match.")
    .required("Please confirm your password."),
});

const ResetPassword = ({ register = false }: { register?: boolean }) => {
  // const { token } = useParams();
  const { setSession } = useAuth();
  const [resetPassword] = useMutation(resetPasswordMutation);
  // const [searchParams] = useSearchParams();

  const provider = searchParams.get("provider");

  const forgotForm = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validateOnChange: true,
    validationSchema: resetPasswordSchema,
    onSubmit: async (values, { setErrors, setStatus, resetForm }) => {
      const { password } = values;

      try {
        const { data } = await resetPassword({
          variables: {
            input: {
              token,
              password,
              registration: register,
              provider: provider === "true" ? true : false,
            },
          },
        });

        resetForm();
        setStatus({ success: data.resetPassword.message });
        const { token: newToken, user: newUser } = data.resetPassword;
        setTimeout(() => setSession({ newToken, newUser }), 2000);
      } catch (err) {
        const msg = parseError(err);
        setStatus({ error: msg });
        setErrors({
          password: " ",
          confirmPassword: " ",
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
              Please enter a new password below.
            </p>
          </div>
          <div className="pb-2">
            <IconInput
              name="password"
              placeholder="Password"
              type="password"
              disabled={isSubmitting}
              icon={<LockClosedIcon className="h-5 w-5 text-indigo-800" />}
            />
          </div>
          <div className="pb-2">
            <IconInput
              name="confirmPassword"
              placeholder="Confirm Password"
              type="password"
              disabled={isSubmitting}
              icon={<LockClosedIcon className="h-5 w-5 text-indigo-800" />}
            />
          </div>
          <div className="pb-3 flex flex-col items-center">
            <Button
              title={register ? "Complete Signup" : "Reset Password"}
              onPress={submitForm}
              disabled={isSubmitting}
              fullWidth
            />
            <div className="pt-3">
              <Link
                href="/login"
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
                href="/signup"
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

export default ResetPassword;
