import React from "react";
import { Wrapper } from "@src/components/layouts/Wrapper";
import { gql, useMutation } from "@apollo/client";
import { Checkbox } from "@src/components/inputs/Checkbox";
import { ArrowRightIcon } from "@heroicons/react/solid";
import { FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import { parseError } from "@src/utils/parseError";
import { Button } from "@src/components/ui/Button";
import { AddressForm } from "@src/components/ui/AddressForm";
import { useRouter } from "next/router";
import { Loading } from "@src/components/Loading";
import { useCheckoutQuery } from "@src/hooks/useCheckoutQuery";
import { CheckoutAddressInput } from "@src/graphql/generated";

import { randomId } from "@src/utils/randomId";
import { useNotificationStore } from "@src/hooks/useNotificationStore";

const createOrUpdateStripeSessionMutation = gql`
  mutation CreateOrUpdateStripeSession($input: CheckoutAddressInput!) {
    createOrUpdateStripeSession(input: $input) {
      checkout {
        _id
      }
    }
  }
`;

const createInsuredUserFromCheckoutMutation = gql`
  mutation createInsuredUserFromCheckout($input: CheckoutAddressInput!) {
    createInsuredUserFromCheckout(input: $input) {
      checkout {
        _id
      }
    }
  }
`;

export const CheckoutAddress = () => {
  const router = useRouter();
  const { id } = router.query;
  const { loading, error, insuranceCovered } = useCheckoutQuery(id);
  const { addNotification } = useNotificationStore();

  const [createOrUpdateStripeSession] = useMutation(
    createOrUpdateStripeSessionMutation
  );

  const [createInsuredUserFromCheckout] = useMutation(
    createInsuredUserFromCheckoutMutation
  );

  const form = useFormik({
    initialValues: {
      _id: id as string,
      shipping: {
        line1: "",
        line2: "",
        city: "",
        state: "",
        postalCode: "",
        country: "US",
      },
      billing: {
        line1: "",
        line2: "",
        city: "",
        state: "",
        postalCode: "",
        country: "US",
      },
      sameAsShipping: true,
    },
    validationSchema: Yup.object().shape({
      shipping: Yup.object().shape({
        line1: Yup.string().required("Please enter your address."),
        city: Yup.string().required("Please enter your city."),
        state: Yup.string().required("Please enter your state."),
        postalCode: Yup.string().required("Please enter your zip code."),
      }),
    }),
    onSubmit: async (values, { resetForm, setStatus }) => {
      try {
        const input: CheckoutAddressInput = { ...values };
        if (insuranceCovered) {
          await createInsuredUserFromCheckout({
            variables: {
              input,
            },
          });
        } else {
          await createOrUpdateStripeSession({
            variables: {
              input,
            },
          });
        }

        resetForm();

        insuranceCovered
          ? router.push(`/signup/checkout/success`)
          : router.push(`/signup/checkout/${id}/payment`);
      } catch (err) {
        const msg = parseError(err);
        setStatus({ error: msg });
        addNotification({
          id: randomId(),
          type: "error",
          description: msg,
          title: "Error",
        });
      }
    },
  });

  if (!id) {
    router.push("/signup");
  }

  if (error) {
    router.push("/login");
  }

  if (loading) return <Loading />;

  // const { checkout, paymentLink } = data.checkout;
  const { submitForm, isSubmitting } = form;

  return (
    <Wrapper>
      <FormikProvider value={form}>
        <div className="flex flex-col max-w-md px-14 pt-14 pb-10 bg-white rounded-xl shadow-md gap-5">
          <h1 className="pb-0 mb-0 mt-2 font-md font-bold text-2xl text-brand-berry">
            Checkout
          </h1>
          <p className="text-gray-900">
            Enter your address below so we can ship your welcome kit to you.
          </p>

          <div className="flex flex-col space-y-4">
            <div className="flex flex-col space-y-2">
              <h2 className="font-bold text-lg">Shipping Address</h2>
              <AddressForm formName="shipping" values={form.values.shipping} />
            </div>
          </div>

          <div className="flex flex-col space-y-4">
            <div className="flex flex-col space-y-2">
              <h2 className="font-bold text-lg">Billing Address</h2>
              <div className="flex flex-col">
                <div className="pb-2">
                  <Checkbox
                    name="sameAsShipping"
                    label="My billing address is the same as my shipping address."
                  />
                </div>
              </div>
              {!form.values.sameAsShipping && (
                <AddressForm formName="billing" values={form.values.billing} />
              )}
            </div>

            <div className="pt-4 flex flex-col items-center">
              <Button
                fullWidth
                onClick={submitForm}
                disabled={isSubmitting}
                icon={
                  insuranceCovered ? null : (
                    <ArrowRightIcon className="w-4 h-4 ml-3" />
                  )
                }
                iconSide="right"
                size="medium"
              >
                {insuranceCovered ? "Complete Registration" : "Payment"}
              </Button>
            </div>
          </div>
          {/* 
        We need a checkbox that will allow the user to opt-in to receive text messages from us.
         */}
        </div>
      </FormikProvider>
    </Wrapper>
  );
};
