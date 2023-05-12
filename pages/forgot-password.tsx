import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { Wrapper } from '../src/components/layouts/Wrapper';
import { Button } from '@src/components/ui/Button';
import { UserIcon } from '@heroicons/react/solid';
import { parseError } from '../src/utils/parseError';
import Link from 'next/link';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { HookTextField } from '@src/components/ui/hookComponents/HookTextField';
import { useNotificationStore } from '@src/hooks/useNotificationStore';
import { randomId } from '@src/utils/randomId';

const forgotPasswordMutation = gql`
  mutation ForgotPassword($input: ForgotPasswordInput!) {
    forgotPassword(input: $input) {
      message
    }
  }
`;

const ForgotPasswordSchema = z.object({
  email: z.string().email().min(1, 'Please enter a valid email address.'),
});

type ForgotPasswordForm = z.infer<typeof ForgotPasswordSchema>;

function ForgotPassword() {
  const { addNotification } = useNotificationStore();
  const [forgotPassword, { loading }] = useMutation(forgotPasswordMutation);
  const { control, handleSubmit, reset, setError, formState } =
    useForm<ForgotPasswordForm>({
      defaultValues: {
        email: '',
      },
      resolver: zodResolver(ForgotPasswordSchema),
    });

  const onSubmission = React.useCallback(
    async (form: ForgotPasswordForm) => {
      const { email } = form;
      try {
        const { data } = await forgotPassword({
          variables: {
            input: {
              email,
            },
          },
        });
        addNotification({
          type: 'success',
          description: data?.forgotPassword?.message,
          id: randomId(),
          title: 'Check your email',
        });
        reset();
      } catch (err) {
        const msg = parseError(err);
        setError('root.serverError', {
          message: msg,
        });
        setError('email', {
          message: '',
        });
      }
    },
    [addNotification, forgotPassword, reset, setError]
  );
  const isSubmitting = formState.isSubmitting;

  return (
    <Wrapper>
      <div className="flex flex-col max-w-md px-14 pt-14 pb-10 bg-white rounded-xl shadow-md gap-5">
        {!!formState?.errors?.root?.serverError && (
          <div className="text-red-500 text-sm text-center">
            {formState?.errors?.root?.serverError?.message}
          </div>
        )}
        <div className="flex flex-col">
          <p className="text-sm text-gray-400">
            Please enter your email address below to reset your password.
          </p>
        </div>
        <div className="pb-2">
          <HookTextField
            control={control}
            name="email"
            placeholder="Email address"
            type="email"
            disabled={isSubmitting}
            leftIcon={<UserIcon className="h-5 w-5 text-brand-berry" />}
            inputSize="medium"
          />
        </div>
        <div className="pb-3 flex flex-col items-center gap-3">
          <Button
            onClick={handleSubmit(onSubmission)}
            disabled={isSubmitting || loading}
            fullWidth
            size="medium"
          >
            Reset Password
          </Button>
          <Link
            href="/login"
            className="text-brand-berry hover:text-brand-berry-tint-1 text-sm"
          >
            Login
          </Link>
        </div>
        <div className="flex flex-col border-t border-gray-200">
          <p className="text-center text-sm text-gray-400 pt-6">
            Haven&apos;t signed up yet?{' '}
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
}

ForgotPassword.isAuthRequired = false;
export default ForgotPassword;
