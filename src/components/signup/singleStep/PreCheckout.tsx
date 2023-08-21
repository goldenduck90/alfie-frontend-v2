import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { gql, useMutation } from "@apollo/client";
import { useFormik, FormikProvider } from "formik";
import * as Yup from "yup";
import { differenceInYears } from "date-fns";
import { isValidPhoneNumber } from "libphonenumber-js";

import { Wrapper } from "@src/components/layouts/Wrapper";
import { Button } from "@src/components/ui/Button";

import ContactInformation from "./sections/ContactInformation";
import PatientDetails from "./sections/PatientDetails";
import PartnerDetails from "./sections/PartnerDetails";

import { usePartnerContext } from "@src/context/PartnerContext";
import weightValidationSchema from "@src/validations/weight";

import { ValidStates } from "@src/utils/states";
import { Gender, CreateCheckoutInput } from "@src/graphql/generated";

const TOTAL_STEPS = 2;

const createOrFindCheckoutMutation = gql`
  mutation CreateOrFindCheckout($input: CreateCheckoutInput!) {
    createOrFindCheckout(input: $input) {
      message
      checkout {
        _id
      }
    }
  }
`;

const PreCheckout = () => {
  const router = useRouter();
  const { partner } = usePartnerContext();
  const [createOrFindCheckout] = useMutation(createOrFindCheckoutMutation);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      biologicalSex: "male",
      state: "",
      phone: "",
      email: "",
      heightFeet: "",
      heightInches: "",
      weight: "",
      pastTries: [],
      skipInsurance: false,
      signupPartnerProvider: "",
      referrer: router.query?.health_coach,
    },
    validateOnChange: false,
    validationSchema: Yup.object({
      firstName: Yup.string().required("Please enter your first name."),
      lastName: Yup.string().required("Please enter your last name."),
      dateOfBirth: Yup.date()
        .required("Please enter your date of birth.")
        .test(
          "dateOfBirth",
          "You must be at least 18 years old to signup for Alfie.",
          (value) => {
            return differenceInYears(new Date(), new Date(value || "")) >= 18;
          }
        ),
      state: Yup.string().required("Please select your state."),
      phone: Yup.string()
        .required("Please enter your phone number.")
        .test("phone", "Please enter valid phone number.", (value) => {
          return isValidPhoneNumber(value ?? "", "US");
        }),
      email: Yup.string()
        .email("Please enter a valid email address.")
        .required("Please enter your email address."),
      heightFeet: Yup.number()
        .required("Please enter height.")
        .min(4, "Please enter a valid height.")
        .max(8, "Please enter a valid height."),
      heightInches: Yup.number()
        .required("Please enter height.")
        .min(0, "Please enter a valid height.")
        .max(11, "Please enter a valid height."),
      weight: weightValidationSchema(),
      pastTries: Yup.array()
        .of(Yup.string())
        .min(1, "Please select at least 1 option.")
        .required("Please select options."),
      signupPartnerProvider:
        partner && partner.providers.length > 0
          ? Yup.string().required("Please select referring provider.")
          : Yup.string().optional(),
    }),
    onSubmit: async (values, { resetForm }) => {
      const {
        firstName,
        lastName,
        dateOfBirth,
        biologicalSex,
        state,
        email,
        phone,
        heightFeet,
        heightInches,
        weight,
        pastTries,
        signupPartnerProvider,
        referrer,
      } = values;

      const fullName = `${firstName} ${lastName}`;

      if (!ValidStates.includes(state)) {
        localStorage.setItem("fullName", fullName);
        localStorage.setItem("location", state);
        router.push("/signup/waitlist");
        resetForm();
        return;
      }

      const heightInInches = parseInt(heightFeet) * 12 + parseInt(heightInches);
      const bmi = (Number(weight) / (heightInInches * heightInInches)) * 703;
      if (bmi < 27) {
        resetForm();
        router.push("/signup/ineligible");
        return;
      }

      const input: CreateCheckoutInput = {
        name: fullName,
        email,
        dateOfBirth,
        gender: biologicalSex === "male" ? Gender.Male : Gender.Female,
        state: state,
        phone: `+1${phone.replace(/[^0-9]/g, "")}`,
        heightInInches,
        weightInLbs: Number(weight),
        weightLossMotivatorV2: [],
        pastTries: pastTries,
        signupPartnerId: partner?._id,
      };

      if (referrer && typeof referrer === "string") {
        input.referrer = referrer;
      }

      if (signupPartnerProvider.length > 0) {
        input.signupPartnerProviderId = signupPartnerProvider;
      }

      const { data } = await createOrFindCheckout({
        variables: {
          input,
        },
      });
      const { checkout } = data.createOrFindCheckout;
      console.log(checkout);
      resetForm();
      router.push(`/signup/insurance/${checkout._id}`);
    },
  });

  return (
    <Wrapper
      header={
        <h2 className="text-lg text-center sm:text-2xl text-white font-bold">
          Achieve Results with the Power of Alfie and {partner?.title}
        </h2>
      }
    >
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit}>
          <div className="flex flex-col max-w-sm sm:max-w-lg md:max-w-3xl lg:max-w-5xl bg-white rounded-xl gap-5">
            <div className="border-b px-8 py-4">
              <span className="text-primary-700 bg-primary-100 font-medium font-sm px-4 py-1 rounded-3xl">
                1 out of {TOTAL_STEPS}
              </span>
            </div>

            <div className="flex flex-col gap-4">
              <div className="p-4">
                <p>
                  This simple form helps us get you enrolled in Alfie Health’s
                  medical weight loss program.{" "}
                </p>
                <br />
                <p>
                  Alfie Health is in network with various insurance plans. You
                  will be responsible for meeting any deductibles and paying any
                  copays or coinsurance, which are typically around $15-25 per
                  month.
                </p>
                <br />
                <p className="text-[#61656C] italic">
                  DISCLAIMER: If you are experiencing a medical emergency,
                  please call 9-1-1.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-8 p-4">
              <ContactInformation />
              <PatientDetails />
              {partner && partner.providers.length > 0 && (
                <PartnerDetails providers={partner?.providers} />
              )}
            </div>

            <div className="pt-5 md:pt-10 pb-3 px-8 flex flex-row justify-end">
              <Button type="submit" size="medium">
                Next
              </Button>
            </div>

            <div className="flex flex-col">
              <p className="text-center text-sm font-medium text-gray-400 py-6">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-brand-berry hover:text-brand-berry-tint-1 underline"
                >
                  Click here to login.
                </Link>
              </p>
            </div>
          </div>
        </form>
      </FormikProvider>
    </Wrapper>
  );
};

export default PreCheckout;
