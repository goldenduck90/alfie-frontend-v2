import React from "react";
import { Wrapper, PARTNERS } from "@src/components/layouts/Wrapper";
import { gql, useMutation } from "@apollo/client";
import { Checkbox } from "@src/components/inputs/Checkbox";
import { ArrowRightIcon } from "@heroicons/react/solid";
import { FormikProvider, useFormik } from "formik";
import { SelectInput } from "@src/components/inputs/SelectInput";
import { States } from "@src/utils/states";
import { TextInput } from "@src/components/inputs/TextInput";
import * as Yup from "yup";
import { parseError } from "@src/utils/parseError";
import { Button } from "@src/components/ui/Button";
import { useRouter } from "next/router";
import { Loading } from "../../Loading";
import { useCheckoutQuery } from "@src/hooks/useCheckoutQuery";

const createOrUpdateStripeSessionMutation = gql`
  mutation CreateOrUpdateStripeSession($input: CreateStripeCustomerInput!) {
    createOrUpdateStripeSession(input: $input) {
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

  const [createOrUpdateStripeSession] = useMutation(
    createOrUpdateStripeSessionMutation
  );

  const form = useFormik({
    initialValues: {
      _id: id,
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
        const { data } = await createOrUpdateStripeSession({
          variables: {
            input: { ...values, insurance: insuranceCovered },
          },
        });

        const { checkout } = data.createOrUpdateStripeSession;
        resetForm();
        router.push(`/signup/optavia/checkout/${checkout._id}/payment`);
      } catch (err) {
        const msg = parseError(err);
        setStatus({ error: msg });
      }
    },
  });

  if (!id) {
    router.push("/signup/optavia");
  }

  if (error) {
    router.push("/login");
  }

  if (loading) return <Loading />;

  // const { checkout, paymentLink } = data.checkout;
  const { submitForm, isSubmitting } = form;

  return (
    <Wrapper partner={PARTNERS.optavia}>
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
              <div className="flex flex-col">
                <div className="pb-2">
                  <TextInput name="shipping.line1" placeholder="Address 1" />
                </div>
                <div className="pb-2">
                  <TextInput name="shipping.line2" placeholder="Address 2" />
                </div>
                <div className="pb-3">
                  <TextInput name="shipping.city" placeholder="City" />
                </div>
                <div className="pb-2">
                  <SelectInput
                    name="shipping.state"
                    placeholder="State..."
                    options={States}
                  />
                </div>
                <div className="pb-2">
                  <TextInput
                    name="shipping.postalCode"
                    placeholder="Postal Code"
                  />
                </div>
              </div>
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
                <>
                  <div className="flex flex-col">
                    <div className="pb-2">
                      <TextInput name="billing.line1" placeholder="Address 1" />
                    </div>
                    <div className="pb-2">
                      <TextInput name="billing.line2" placeholder="Address 2" />
                    </div>
                    <div className="pb-3">
                      <TextInput name="billing.city" placeholder="City" />
                    </div>
                    <div className="pb-2">
                      <SelectInput
                        name="billing.state"
                        placeholder="State..."
                        options={States}
                      />
                    </div>
                    <div className="pb-2">
                      <TextInput
                        name="billing.postalCode"
                        placeholder="Postal Code"
                      />
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="pt-4 flex flex-col items-center">
              <Button
                fullWidth
                onClick={submitForm}
                disabled={isSubmitting}
                icon={<ArrowRightIcon className="w-4 h-4 ml-3" />}
                iconSide="right"
                size="medium"
              >
                Payment
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
