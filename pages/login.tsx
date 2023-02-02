import { gql, useMutation } from "@apollo/client";
import { Wrapper } from "../src/components/layouts/Wrapper";
import { IconHookInput, IconInput } from "../src/components/inputs/IconInput";
import { Checkbox } from "../src/components/inputs/Checkbox";
import { Button } from "../src/components/Button";
import { LockClosedIcon, UserIcon } from "@heroicons/react/solid";
import { FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import { parseError } from "../src/utils/parseError";
import Link from "next/link";
import { useLoginMutation } from "../src/hooks/useLoginMutation";
import { useRouter } from "next/router";
import { useCurrentUserStore } from "@src/hooks/useCurrentUser";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";

const loginMutation = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      token
      user {
        _id
        name
        email
        role
        eaProviderId
      }
    }
  }
`;

const LoginFormSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().trim().min(1, "Please enter your password."),
  remember: z.boolean().nullable(),
});

type LoginForm = z.infer<typeof LoginFormSchema>;

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email address.")
    .required("Please enter your email address."),
  password: Yup.string().required("Please enter your password."),
});

const Login = () => {
  const { setUser } = useCurrentUserStore();
  const [login] = useMutation(loginMutation);
  const { mutateAsync } = useLoginMutation();
  const router = useRouter();

  const { control, handleSubmit } = useForm<LoginForm>({
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
    resolver: zodResolver(LoginFormSchema),
  });

  const onSubmission = useCallback(async (form: LoginForm) => {
    const { email, password, remember } = form;
    console.log({ form });
    try {
      console.log("Made it here brutha");
    } catch (err) {}
  }, []);

  const loginForm = useFormik({
    initialValues: {
      error: "",
      email:
        // "robert@joinalfie.com",
        "dpgozza@gmail.com",
      password:
        // "Letmein1!",
        "Password1!",
      remember: false,
    },
    initialErrors: {
      // error: search.get("redirect")
      //   ? "Your session has expired. Please login again."
      //   : "",
    },
    validateOnChange: false,
    validationSchema: LoginSchema,
    onSubmit: async (values, { setErrors, resetForm }) => {
      const { email, password, remember } = values;

      try {
        await mutateAsync({ email, password });

        const { data } = await login({
          variables: {
            input: {
              email,
              password,
              remember,
            },
          },
        });
        const { token, user } = data.login;

        // setSession({ newToken: token, newUser: user });
        setUser(user);
        resetForm();
        router.replace("/dashboard");
      } catch (err) {
        const msg = parseError(err);
        setErrors({
          error: msg,
          email: " ",
          password: " ",
        });
      }
    },
  });

  const { isSubmitting, submitForm, errors } = loginForm;

  return (
    <Wrapper>
      <div className="flex flex-col items-center my-10">
        <img src={"/assets/logo.png"} alt="Alfie" className="w-36" />
      </div>
      <FormikProvider value={loginForm}>
        <form onSubmit={handleSubmit(onSubmission)}>
          <div className="flex flex-col max-w-md px-14 pt-14 pb-10 bg-white rounded-md gap-5">
            {errors.error && (
              <div className="text-red-500 text-sm text-center">
                {errors.error}
              </div>
            )}
            <div className="pb-2">
              <IconHookInput
                control={control}
                name="email"
                placeholder="Email address"
                type="email"
                disabled={isSubmitting}
                icon={<UserIcon className="h-5 w-5 text-indigo-800" />}
              />
            </div>
            <div className="pb-3">
              <IconHookInput
                control={control}
                name="password"
                placeholder="Password"
                type="password"
                disabled={isSubmitting}
                icon={<LockClosedIcon className="h-5 w-5 text-indigo-800" />}
              />
            </div>
            <div className="pb-3">
              <Checkbox
                name="remember"
                label="Remember me"
                disabled={isSubmitting}
              />
            </div>
            <div className="pb-3 flex flex-col items-center">
              <Button
                title="Login"
                onPress={submitForm}
                disabled={isSubmitting}
                fullWidth
              />
              <div className="pt-3">
                <Link
                  href="/forgot-password"
                  className="font-mulish text-sm text-indigo-800 hover:text-indigo-600"
                >
                  Forgot Password
                </Link>
              </div>
            </div>
            <div className="flex flex-col border-t border-gray-200">
              <p className="text-center text-sm text-gray-400 pt-6">
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
        </form>
      </FormikProvider>
    </Wrapper>
  );
};

Login.isAuthorized = false;
export default Login;
