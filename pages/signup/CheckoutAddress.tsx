import React from "react"
import { Wrapper } from "../../components/layouts/Wrapper"
import { Logo } from "../../components/Logo"
import { gql, useMutation } from "@apollo/client"
import { useNavigate, useParams } from "react-router"
import { Button } from "../../components/Button"
import { Checkbox } from "../../components/inputs/Checkbox"
import { ArrowRightIcon } from "@heroicons/react/solid"
import { FormikProvider, useFormik } from "formik"
import { SelectInput } from "../../components/inputs/SelectInput"
import { States } from "../../utils/states"
import { TextInput } from "../../components/inputs/TextInput"
import * as Yup from "yup"
import { parseError } from "../../utils/parseError"

const createOrUpdateStripeSessionMutation = gql`
  mutation CreateOrUpdateStripeSession($input: CreateStripeCustomerInput!) {
    createOrUpdateStripeSession(input: $input) {
      checkout {
        _id
      }
    }
  }
`

export const CheckoutAddress = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [createOrUpdateStripeSession] = useMutation(
    createOrUpdateStripeSessionMutation
  )

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
            input: values,
          },
        })

        const { checkout } = data.createOrUpdateStripeSession
        resetForm()
        navigate(`/signup/checkout/${checkout._id}/payment`)
      } catch (err) {
        const msg = parseError(err)
        setStatus({ error: msg })
      }
    },
  })

  if (!id) {
    navigate("/signup")
  }

  // const { checkout, paymentLink } = data.checkout
  const { submitForm, isSubmitting } = form

  return (
    <Wrapper>
      <Logo />
      <FormikProvider value={form}>
        <div className="flex flex-col px-6 md:px-8 pt-8 pb-10 bg-white rounded-md space-y-5 min-w-full md:min-w-0 max-w-lg">
          <h1 className="pb-0 mb-0 mt-2 font-md font-mulish font-bold text-2xl text-indigo-800">
            Checkout
          </h1>
          <p className="font-mulish text-gray-900">
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
                title="Payment"
                onPress={submitForm}
                disabled={isSubmitting}
                loading={isSubmitting}
                spinnerMl={3}
                spinnerSize={16}
                buttonRight={<ArrowRightIcon className="w-4 h-4 ml-3" />}
              />
            </div>
          </div>
          {/* 
        We need a checkbox that will allow the user to opt-in to receive text messages from us.
         */}
        </div>
      </FormikProvider>
    </Wrapper>
  )
}
