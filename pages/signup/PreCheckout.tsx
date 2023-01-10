import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/solid";
import { FormikProvider } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../src/components/Button";
import { Wrapper } from "../../src/components/layouts/Wrapper";
import { BiologicalSex } from "./steps/BiologicalSex";
import { BMI } from "./steps/BMI";
import { DateOfBirth } from "./steps/DateOfBirth";
import { EmailCapture } from "./steps/EmailCapture";
import { FullName } from "./steps/FullName";
import { Location } from "./steps/Location";
import * as Yup from "yup";
import { WeightLossMotivator } from "./steps/WeightLossMotivator";
import { useFormikWizard } from "formik-wizard-form";
import { differenceInYears, format } from "date-fns";
import { ValidStates } from "../../utils/states";
import { ProgressBar } from "../../src/components/ProgressBar";
import { Logo } from "../../src/components/Logo";
import { gql, useMutation } from "@apollo/client";
import { parseError } from "../../utils/parseError";
import { Gender } from "../../graphql/generated";

const TOTAL_STEPS = 6;

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
  const navigate = useNavigate();
  const [createOrFindCheckout] = useMutation(createOrFindCheckoutMutation);

  const preCheckoutForm = useFormikWizard({
    initialValues: {
      fullName: localStorage.getItem("fullName") || "",
      weightLossMotivator: localStorage.getItem("weightLossMotivator") || "",
      dateOfBirth:
        localStorage.getItem("dateOfBirth") || format(new Date(), "yyyy-MM-dd"),
      biologicalSex: localStorage.getItem("biologicalSex") || "",
      location: localStorage.getItem("location") || "",
      heightFeet: localStorage.getItem("heightFeet") || "",
      heightInches: localStorage.getItem("heightInches") || "",
      weight: localStorage.getItem("weight") || "",
      email: localStorage.getItem("email") || "",
      textOptIn: Boolean(localStorage.getItem("textOptIn")) || null,
      phone: localStorage.getItem("phone") || "",
    },
    onSubmit: async (
      {
        fullName: name,
        weightLossMotivator,
        dateOfBirth,
        biologicalSex,
        location: state,
        heightFeet,
        heightInches,
        weight,
        email,
        textOptIn,
        phone,
      },
      { setStatus, resetForm }
    ) => {
      try {
        const heightInInches =
          parseInt(heightFeet) * 12 + parseInt(heightInches);
        const { data } = await createOrFindCheckout({
          variables: {
            input: {
              name,
              email,
              weightLossMotivator,
              dateOfBirth,
              gender: biologicalSex === "male" ? Gender.Male : Gender.Female,
              state,
              heightInInches,
              weightInLbs: Number(weight),
              textOptIn,
              phone,
            },
          },
        });

        const { checkout } = data.createOrFindCheckout;
        resetForm();
        navigate(`/signup/checkout/${checkout._id}`);
      } catch (err) {
        const msg = parseError(err);
        setStatus({ error: msg });
      }
    },
    validateOnNext: true,
    validateOnChange: false,
    activeStepIndex: Number(localStorage.getItem("preCheckoutStep")) || 0,
    steps: [
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
        component: WeightLossMotivator,
        validationSchema: Yup.object().shape({
          weightLossMotivator: Yup.string().required(
            "Please select an option."
          ),
        }),
        beforeNext({ weightLossMotivator }, _, currentStepIndex) {
          localStorage.setItem("weightLossMotivator", weightLossMotivator);
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
        component: Location,
        validationSchema: Yup.object().shape({
          location: Yup.string().required("Please select an option."),
        }),
        beforeNext({ location }, _, currentStepIndex) {
          localStorage.setItem("location", location);
          localStorage.setItem("preCheckoutStep", String(currentStepIndex));

          if (!ValidStates.includes(location)) {
            navigate("/signup/waitlist");
          }

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
          weight: Yup.number()
            .required("Please enter your weight.")
            .min(70, "Please enter a valid weight.")
            .max(800, "Please enter a valid weight."),
        }),
        beforeNext({ heightFeet, heightInches, weight }, _, currentStepIndex) {
          // We need to calculate the users BMI and throw an ineligible error if they are not eligible for the program because their BMI is less than 27.
          const heightInInches =
            parseInt(heightFeet) * 12 + parseInt(heightInches);
          const bmi = (weight / (heightInInches * heightInInches)) * 703;
          if (bmi < 27) {
            navigate("/signup/ineligible");
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
        }),
        beforeNext({ email, textOptIn, phone }, _, currentStepIndex) {
          console.log(textOptIn, "textOptIn");
          localStorage.setItem("email", email);
          localStorage.setItem("textOptIn", textOptIn);
          localStorage.setItem("phone", phone);
          localStorage.setItem("preCheckoutStep", String(currentStepIndex));
          return Promise.resolve();
        },
      },
    ],
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

  console.log(isNextDisabled);
  return (
    <>
      <ProgressBar progress={(currentStepIndex / TOTAL_STEPS) * 100} />
      <Wrapper>
        <Logo />
        <FormikProvider value={preCheckoutForm}>
          <div className="flex flex-col px-8 sm:px-14 pt-10 pb-10 bg-white rounded-md space-y-5 min-w-full md:min-w-0 max-w-lg">
            <div className="flex flex-col">
              <span className="text-base font-mulish font-light font-sm text-gray-400">
                Step {currentStepIndex + 1} of {TOTAL_STEPS + 1}
              </span>
            </div>

            <div className="flex flex-col">{renderComponent()}</div>
            <div className="pt-5 md:pt-10 pb-3 flex flex-row justify-between">
              <Button
                title="Back"
                onPress={handlePrev}
                disabled={isPrevDisabled}
                buttonLeft={<ArrowLeftIcon className="w-4 h-4 mr-3" />}
              />
              <Button
                title={isLastStep ? "Continue" : "Next"}
                onPress={handleNext}
                disabled={isSubmitting || isNextDisabled}
                loading={isSubmitting}
                spinnerMl={3}
                spinnerSize={16}
                buttonRight={<ArrowRightIcon className="w-4 h-4 ml-3" />}
              />
            </div>
            <div className="flex flex-col border-t border-gray-200">
              <p className="font-mulish text-center text-sm text-gray-400 pt-6">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-indigo-800 hover:text-indigo-600"
                >
                  Click here to login.
                </Link>
              </p>
            </div>
          </div>
        </FormikProvider>
      </Wrapper>
    </>
  );
};
