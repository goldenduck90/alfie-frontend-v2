import { gql, useMutation } from "@apollo/client";
import { Wrapper } from "../src/components/layouts/Wrapper";
import { IconInput } from "../src/components/inputs/IconInput";
import { LockClosedIcon } from "@heroicons/react/solid";
import { FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import { parseError } from "../src/utils/parseError";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button } from "@src/components/ui/Button";
import { useNotificationStore } from "@src/hooks/useNotificationStore";

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

const ResetPassword = () => {
  const router = useRouter();
  console.log(router.query)

  const registration = router.query?.registration === "true"
  const token = router.query?.token as string

  const [resetPassword] = useMutation(resetPasswordMutation);
  const { addNotification } = useNotificationStore();

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
              registration,
            },
          },
        });

        resetForm();
        addNotification({
          description: "Password successfully reset.",
          id: "reset-password-success",
          type: "success",
          title: "Success",
        });
        setStatus({ success: data.resetPassword.message });
        console.log(data.resetPassword);
        await router.push("/login");
      } catch (err) {
        const msg = parseError(err);

        addNotification({
          description: (err as any)?.message || msg,
          id: "reset-password-fail",
          type: "error",
          title: "Failure",
        });
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
        <Image src={"/assets/logo.png"} height={58} width={144} alt="Alfie" />
      </div>
      <FormikProvider value={forgotForm}>
        <div className="flex flex-col max-w-md px-14 pt-14 pb-10 bg-white rounded-xl shadow-md gap-5">
          {status?.error && (
            <div className="text-red-500 text-sm text-center">
              {status.error}
            </div>
          )}
          <div className="flex flex-col">
            <p className="text-sm text-gray-400 pt-6">
              Please enter a new password below.
            </p>
          </div>
          <div className="pb-2">
            <IconInput
              name="password"
              placeholder="Password"
              type="password"
              disabled={isSubmitting}
              icon={<LockClosedIcon className="h-5 w-5 text-brand-berry" />}
            />
          </div>
          <div className="pb-2">
            <IconInput
              name="confirmPassword"
              placeholder="Confirm Password"
              type="password"
              disabled={isSubmitting}
              icon={<LockClosedIcon className="h-5 w-5 text-brand-berry" />}
            />
          </div>
          <div className="pb-3 flex flex-col items-center">
            <Button
              onClick={submitForm}
              disabled={isSubmitting}
              fullWidth
              size="medium"
            >
              {registration ? "Complete Signup" : "Reset Password"}
            </Button>
            <div className="pt-3">
              <Link
                href="/login"
                className="text-sm text-brand-berry hover:text-brand-berry-tint-1"
              >
                Login
              </Link>
            </div>
          </div>
          <div className="flex flex-col border-t border-gray-200">
            <p className="text-center text-sm text-gray-400 pt-6">
              Haven&apos;t signed up yet?{" "}
              <Link
                href="/signup"
                className="text-brand-berry hover:text-brand-berry-tint-1"
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

ResetPassword.isAuthRequired = false;
export default ResetPassword;
