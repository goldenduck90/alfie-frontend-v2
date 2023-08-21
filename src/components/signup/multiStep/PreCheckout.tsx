import Link from "next/link";
import { useMemo } from "react";
import { useRouter } from "next/router";
import { FormikProvider } from "formik";
import * as Yup from "yup";

import { isValidPhoneNumber } from "libphonenumber-js";

import { Wrapper } from "@src/components/layouts/Wrapper";

// Steps
import { FullName } from "./steps/FullName";
import { Location } from "./steps/Location";
import { WeightLossMotivatorV2 } from "./steps/WeightLossMotivatorV2";
import { Testimonial } from "./steps/Testimonial";
import { PastTries } from "./steps/PastTries";
import { WhatAlfieUse } from "./steps/WhatAlfieUse";
import { BiologicalSex } from "./steps/BiologicalSex";
import { BMI } from "./steps/BMI";
import { DateOfBirth } from "./steps/DateOfBirth";
import { EmailCapture } from "./steps/EmailCapture";
import { PartnerProvider } from "./steps/PartnerProvider";

import { useFormikWizard, Step } from "formik-wizard-form";
import { differenceInYears, format } from "date-fns";
import { ValidStates } from "@src/utils/states";
import { gql, useMutation } from "@apollo/client";
import { parseError } from "@src/utils/parseError";

import { Button } from "@src/components/ui/Button";
import { usePartnerContext } from "@src/context/PartnerContext";
import weightValidationSchema from "@src/validations/weight";

import { Gender, CreateCheckoutInput } from "@src/graphql/generated";

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

export const PreCheckout = () => {
  const router = useRouter();
  const { partner } = usePartnerContext();
  const [createOrFindCheckout] = useMutation(createOrFindCheckoutMutation);

  const TOTAL_STEPS = useMemo(
    () => (partner && partner.providers.length > 0 ? 13 : 12),
    [partner]
  );

  const FORM_TITLES: { [key: number]: string } = useMemo(() => {
    const titles: { [key: number]: string } = {
      1: "Let’s start off with your details.",
      2: "Let’s start off with your details.",
      3: "Let’s start off with your details.",
      4: "Let’s start off with your details.",
      5: "A few more details about you.",
      6: "Let’s start off with your details.",
      7: "Let’s start off with your details.",
      8: "Understanding your health",
      9: "Understanding your health",
      10: "Get started with Alfie today!",
    };

    if (partner && partner.providers.length > 0) {
      titles[11] = "Signup Partner Provider";
    }

    return titles;
  }, [partner]);

  const FORM_STEPS: Step[] = useMemo(() => {
    const steps: Step[] = [
      {
        component: FullName,
        validationSchema: Yup.object().shape({
          fullName: Yup.string()
            .min(4, "Please enter your full name.")
            .required("Please enter your full name.")
            .matches(
              /^[A-Za-z]+((\s)?((\'|\-|\.)?([A-Za-z])+))*$/,
              "Please enter a valid full name. ie. John Smith"
            ),
        }),
        beforeNext({ fullName }, _, currentStepIndex) {
          localStorage.setItem("fullName", fullName);
          localStorage.setItem("preCheckoutStep", String(currentStepIndex));
          return Promise.resolve();
        },
      },
      {
        component: Location,
        validationSchema: Yup.object().shape({
          location: Yup.string().required("Please select an option."),
        }),
        beforeNext({ location }, _, currentStepIndex) {
          localStorage.setItem("location", location);
          localStorage.setItem("preCheckoutStep", String(currentStepIndex));

          if (!ValidStates.includes(location)) {
            router.push("/signup/waitlist");
          }

          return Promise.resolve();
        },
      },
      {
        component: WeightLossMotivatorV2,
        validationSchema: Yup.object().shape({
          weightLossMotivatorV2: Yup.array()
            .of(Yup.string())
            .min(1, "Please select at least 1 option.")
            .required("Please select options."),
        }),
        beforeNext({ weightLossMotivatorV2 }, _, currentStepIndex) {
          localStorage.setItem(
            "weightLossMotivatorV2",
            JSON.stringify(weightLossMotivatorV2)
          );
          localStorage.setItem("preCheckoutStep", String(currentStepIndex));
          return Promise.resolve();
        },
      },
      {
        component: Testimonial,
        beforeNext({}, _, currentStepIndex) {
          localStorage.setItem("preCheckoutStep", String(currentStepIndex));
          return Promise.resolve();
        },
      },
      {
        component: DateOfBirth,
        validationSchema: Yup.object().shape({
          dateOfBirth: Yup.date()
            .required("Please enter your date of birth.")
            .test(
              "dateOfBirth",
              "You must be at least 18 years old to signup for Alfie.",
              (value) => {
                return (
                  differenceInYears(new Date(), new Date(value || "")) >= 18
                );
              }
            ),
        }),
        beforeNext({ dateOfBirth }, _, currentStepIndex) {
          localStorage.setItem("dateOfBirth", dateOfBirth);
          localStorage.setItem("preCheckoutStep", String(currentStepIndex));
          return Promise.resolve();
        },
      },
      {
        component: PastTries,
        validationSchema: Yup.object().shape({
          pastTries: Yup.array()
            .of(Yup.string())
            .min(1, "Please select at least 1 option.")
            .required("Please select options."),
        }),
        beforeNext({ pastTries }, _, currentStepIndex) {
          localStorage.setItem("pastTries", JSON.stringify(pastTries));
          localStorage.setItem("preCheckoutStep", String(currentStepIndex));
          return Promise.resolve();
        },
      },
      {
        component: WhatAlfieUse,
        beforeNext({}, _, currentStepIndex) {
          localStorage.setItem("preCheckoutStep", String(currentStepIndex));
          return Promise.resolve();
        },
      },
      {
        component: BiologicalSex,
        validationSchema: Yup.object().shape({
          biologicalSex: Yup.string().required("Please select an option."),
        }),
        beforeNext({ biologicalSex }, _, currentStepIndex) {
          localStorage.setItem("biologicalSex", biologicalSex);
          localStorage.setItem("preCheckoutStep", String(currentStepIndex));
          return Promise.resolve();
        },
      },
      {
        component: BMI,
        validationSchema: Yup.object().shape({
          heightFeet: Yup.number()
            .required("Please enter your height.")
            .min(4, "Please enter a valid height.")
            .max(8, "Please enter a valid height."),
          heightInches: Yup.number()
            .required("Please enter your height.")
            .min(0, "Please enter a valid height.")
            .max(11, "Please enter a valid height."),
          weight: weightValidationSchema()
        }),
        beforeNext({ heightFeet, heightInches, weight }, _, currentStepIndex) {
          // We need to calculate the users BMI and throw an ineligible error if they are not eligible for the program because their BMI is less than 27.
          const heightInInches =
            parseInt(heightFeet) * 12 + parseInt(heightInches);
          const bmi = (weight / (heightInInches * heightInInches)) * 703;
          if (bmi < 27) {
            router.push("/signup/ineligible");
          } else {
            localStorage.setItem("heightFeet", heightFeet);
            localStorage.setItem("heightInches", heightInches);
            localStorage.setItem("weight", weight);
            localStorage.setItem("preCheckoutStep", String(currentStepIndex));
          }
          return Promise.resolve();
        },
      },
      {
        component: EmailCapture,
        validationSchema: Yup.object().shape({
          email: Yup.string()
            .email("Please enter a valid email address.")
            .required("Please enter your email address."),
          phone: Yup.string()
            .required("Please enter your phone number.")
            .test("phone", "Please enter valid phone number.", (value) => {
              return isValidPhoneNumber(value ?? "", "US");
            }),
        }),
        beforeNext({ email, textOptIn, phone }, _, currentStepIndex) {
          localStorage.setItem("email", email);
          localStorage.setItem("textOptIn", textOptIn);
          localStorage.setItem("phone", phone);
          localStorage.setItem("preCheckoutStep", String(currentStepIndex));
          return Promise.resolve();
        },
      },
    ];

    if (partner && partner.providers.length > 0) {
      steps.push({
        component: PartnerProvider,
        validationSchema:
          partner && partner.providers.length > 0
            ? Yup.string().required("Please select referring provider.")
            : Yup.string().optional(),
        beforeNext({ signupPartnerProvider }, _, currentStepIndex) {
          localStorage.setItem("signupPartnerProvider", signupPartnerProvider);
          localStorage.setItem("preCheckoutStep", String(currentStepIndex));
          return Promise.resolve();
        },
      });
    }

    return steps;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [partner]);

  const preCheckoutForm = useFormikWizard({
    initialValues: {
      fullName: localStorage.getItem("fullName") || "",
      location: localStorage.getItem("location") || "",
      weightLossMotivator: "",
      weightLossMotivatorV2: JSON.parse(
        localStorage.getItem("weightLossMotivatorV2") ?? "[]"
      ),
      dateOfBirth:
        localStorage.getItem("dateOfBirth") || format(new Date(), "yyyy-MM-dd"),
      pastTries: JSON.parse(localStorage.getItem("pastTries") ?? "[]"),
      biologicalSex: localStorage.getItem("biologicalSex") || "",
      heightFeet: localStorage.getItem("heightFeet") || "",
      heightInches: localStorage.getItem("heightInches") || "",
      weight: localStorage.getItem("weight") || "",
      email: localStorage.getItem("email") || "",
      textOptIn: Boolean(localStorage.getItem("textOptIn")) || true,
      phone: localStorage.getItem("phone") || "",
      signupPartnerProvider:
        localStorage.getItem("signupPartnerProvider") || "",
    },
    onSubmit: async (
      {
        fullName: name,
        location: state,
        weightLossMotivatorV2,
        dateOfBirth,
        pastTries,
        biologicalSex,
        heightFeet,
        heightInches,
        weight,
        email,
        textOptIn,
        phone,
        signupPartnerProvider,
      },
      { setStatus, resetForm }
    ) => {
      try {
        const heightInInches =
          parseInt(heightFeet) * 12 + parseInt(heightInches);

        const input: CreateCheckoutInput = {
          name,
          email,
          weightLossMotivatorV2,
          dateOfBirth,
          gender: biologicalSex === "male" ? Gender.Male : Gender.Female,
          state,
          heightInInches,
          weightInLbs: Number(weight),
          textOptIn,
          phone: `+1${phone.replace(/[^0-9]/g, "")}`,
          pastTries,
        };

        if (partner) {
          input.signupPartnerId = partner?._id;

          if (signupPartnerProvider.length > 0) {
            input.signupPartnerProviderId = signupPartnerProvider;
          }
        }

        const { data, errors } = await createOrFindCheckout({
          variables: {
            input,
          },
        });

        const { checkout } = data.createOrFindCheckout;
        if (errors) {
          setStatus({
            error: errors
              .map(({ message }: { message: string }) => message)
              .join(" "),
          });
          return;
        }
        resetForm();
        router.push(`/signup/insurance/${checkout._id}`);
      } catch (err) {
        const msg = parseError(err);
        setStatus({ error: msg });
      }
    },
    validateOnNext: true,
    validateOnChange: false,
    activeStepIndex: Number(localStorage.getItem("preCheckoutStep")) || 0,
    steps: FORM_STEPS,
  });

  const {
    handlePrev,
    handleNext,
    isPrevDisabled,
    isNextDisabled,
    isSubmitting,
    renderComponent,
    currentStepIndex,
    isLastStep,
  } = preCheckoutForm;

  return (
    <Wrapper
      header={
        <h2 className="text-lg sm:text-2xl text-white font-bold">
          {FORM_TITLES[currentStepIndex + 1]}
        </h2>
      }
    >
      <FormikProvider value={preCheckoutForm}>
        <div className="flex flex-col max-w-xl bg-white rounded-xl gap-5">
          <div className="border-b px-8 py-4">
            <span className="text-primary-700 bg-primary-100 font-medium font-sm px-4 py-1 rounded-3xl">
              {currentStepIndex + 1} out of {TOTAL_STEPS}
            </span>
          </div>

          <div className="flex flex-col">{renderComponent()}</div>
          <div className="pt-5 md:pt-10 pb-3 px-8 flex flex-row justify-between">
            <Button
              onClick={handlePrev}
              disabled={isPrevDisabled}
              size="medium"
            >
              Back
            </Button>
            <Button
              onClick={handleNext}
              disabled={isSubmitting || isNextDisabled}
              size="medium"
            >
              {isLastStep ? "Continue" : "Next"}
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
      </FormikProvider>
    </Wrapper>
  );
};

export default PreCheckout;
