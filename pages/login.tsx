import { Wrapper } from "../src/components/layouts/Wrapper";
import { IconHookInput } from "../src/components/inputs/IconInput";
import { CheckboxHook } from "../src/components/inputs/Checkbox";
import { Button } from "../src/components/Button";
import { LockClosedIcon, UserIcon } from "@heroicons/react/solid";
import { parseError } from "../src/utils/parseError";
import Link from "next/link";
import { useLoginMutation } from "../src/hooks/useLoginMutation";
import { useRouter } from "next/router";
import { useCurrentUserStore } from "@src/hooks/useCurrentUser";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { User } from "@src/graphql/generated";

const LoginFormSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().trim().min(1, "Please enter your password."),
  remember: z.boolean().nullable(),
});

type LoginForm = z.infer<typeof LoginFormSchema>;

const Login = () => {
  const { setUser } = useCurrentUserStore();
  const { mutateAsync } = useLoginMutation();
  const router = useRouter();
  const { control, handleSubmit, reset, setError, formState } =
    useForm<LoginForm>({
      defaultValues: {
        email: "dpgozza@gmail.com",
        password: "Password1!",
        remember: false,
      },
      resolver: zodResolver(LoginFormSchema),
    });

  const onSubmission = useCallback(
    async (form: LoginForm) => {
      const { email, password, remember } = form;
      try {
        const result = await mutateAsync({
          email,
          password,
        });
        const user = result?.user as User;
        setUser(user);
        reset();
        router.push("/dashboard");
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
    [setError]
  );

  const isSubmitting = formState.isSubmitting;

  return (
    <Wrapper>
      <div className="flex flex-col items-center my-10">
        <img src={"/assets/logo.png"} alt="Alfie" className="w-36" />
      </div>
      <div className="flex flex-col max-w-md px-14 pt-14 pb-10 bg-white rounded-md gap-5">
        {!!formState?.errors?.root?.serverError && (
          <div className="text-red-500 text-sm text-center">
            {formState?.errors?.root?.serverError?.message}
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
          <CheckboxHook
            control={control}
            name="remember"
            label="Remember me"
            disabled={isSubmitting}
          />
        </div>
        <div className="pb-3 flex flex-col items-center">
          <Button
            title="Login"
            onPress={handleSubmit(onSubmission)}
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
    </Wrapper>
  );
};

Login.isAuthorized = false;
export default Login;
