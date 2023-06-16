import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCurrentUserStore } from "@src/hooks/useCurrentUser";
import { User } from "@src/graphql/generated";
import { parseError } from "../src/utils/parseError";
import { useLoginMutation } from "../src/hooks/useLoginMutation";
import { z } from "zod";
import { useForm } from "react-hook-form";

import { Wrapper } from "../src/components/layouts/Wrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../src/components/ui/Button";
import { HookTextField } from "@src/components/ui/hookComponents/HookTextField";
import { LockClosedIcon, UserIcon } from "@heroicons/react/solid";
import { HookCheckbox } from "@src/components/ui/hookComponents/HookCheckBox";

const LoginFormSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().trim().min(1, "Please enter your password."),
  remember: z.boolean().nullable(),
});

type LoginForm = z.infer<typeof LoginFormSchema>;

const Login = () => {
  const { setUser } = useCurrentUserStore();
  const { mutateAsync, isLoading } = useLoginMutation();
  const router = useRouter();
  const { control, handleSubmit, reset, setError, formState } =
    useForm<LoginForm>({
      defaultValues: {
        email: "",
        password: "",
        remember: false,
      },
      resolver: zodResolver(LoginFormSchema),
    });

  const onSubmission = React.useCallback(
    async (form: LoginForm) => {
      const { email, password, remember } = form;
      try {
        const result = await mutateAsync({
          email,
          password,
        });
        const user = result?.user as User;
        setUser(user);
        await router.push("/dashboard");
        reset();
      } catch (err) {
        const msg = parseError(err);
        /**
         * Simple hack since setError only allows a single
         */
        setError("root.serverError", {
          message: msg,
        });
        setError("email", {
          message: "",
        });
        setError("password", {
          message: "",
        });
      }
    },
    [mutateAsync, reset, router, setError, setUser]
  );

  const isSubmitting = formState.isSubmitting;

  return (
    <Wrapper
      header={
        <h2 className="text-lg sm:text-2xl text-white font-bold">
          {"Welcome back!"}
        </h2>
      }
    >
      <div className="flex flex-col max-w-md px-14 pt-14 pb-10 bg-white rounded-xl shadow-md gap-5">
        {!!formState?.errors?.root?.serverError && (
          <div className="text-red-500 text-sm text-center">
            {formState?.errors?.root?.serverError?.message}
          </div>
        )}
        <div className="pb-2">
          <HookTextField
            control={control}
            name="email"
            placeholder="Email address"
            type="email"
            disabled={isSubmitting || isLoading}
            leftIcon={<UserIcon className="h-5 w-5 text-brand-berry" />}
            inputSize="medium"
          />
        </div>
        <div className="pb-3">
          <HookTextField
            control={control}
            name="password"
            placeholder="Password"
            type="password"
            disabled={isSubmitting || isLoading}
            leftIcon={<LockClosedIcon className="h-5 w-5 text-brand-berry" />}
            inputSize="medium"
          />
        </div>
        <div className="pb-3">
          <HookCheckbox
            control={control}
            name="remember"
            label="Remember me"
            disabled={isSubmitting || isLoading}
          />
        </div>
        <div className="pb-3 flex flex-col items-center">
          <Button
            onClick={handleSubmit(onSubmission)}
            disabled={isSubmitting || isLoading}
            fullWidth
            size="medium"
          >
            Login
          </Button>
          <div className="pt-3">
            <Link
              href="/forgot-password"
              className="text-sm text-brand-berry hover:text-brand-berry-tint-1"
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
              className="text-brand-berry hover:text-brand-berry-tint-1"
            >
              Click here to see if you are eligible for Alfie.
            </Link>
          </p>
        </div>
      </div>
    </Wrapper>
  );
};

Login.isAuthRequired = false;
export default Login;
