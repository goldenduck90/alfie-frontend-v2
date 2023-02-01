import { gql, useMutation, useQuery } from "@apollo/client";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/solid";
import * as Sentry from "@sentry/react";
import { FormikProvider } from "formik";
import { useFormikWizard } from "formik-wizard-form";
import { useEffect } from "react";
import * as Yup from "yup";
import { Button } from "../../Button";
import { Loading } from "../../Loading";
import { TextLink } from "../../TextLink";
import { Role } from "../../../graphql/generated";
import { parseError } from "../../../utils/parseError";
import { AppointmentConfirmed } from "./steps/AppointmentConfirmed";
import { AppointmentDetails } from "./steps/AppointmentDetails";
import { AvailabilityWrapper } from "./steps/Availability";
import { ProviderSelection } from "./steps/ProviderSelection";

export const userEaQuery = gql`
  query UserEa {
    me {
      _id
      provider {
        _id
        eaProviderId
      }
      eaHealthCoachId
    }
  }
`;

const createAppointmentMutaton = gql`
  mutation CreateAppointment($input: CreateAppointmentInput!) {
    createAppointment(input: $input) {
      eaAppointmentId
    }
  }
`;

export const CreateAppointment = ({
  healthCoach,
}: {
  healthCoach: boolean;
}) => {
  const { data, loading, error } = useQuery(userEaQuery);
  const [createAppointment] = useMutation(createAppointmentMutaton);

  const createAppointmentForm = useFormikWizard({
    initialValues: {
      reschedule: false,
      providerType: "",
      userEaProviderId: null,
      eaProvider: null,
      selectedDate: new Date(),
      startTimeInUtc: null,
      endTimeInUtc: null,
      eaServiceId: "1",
      notes: "",
    },
    onSubmit: (_, { resetForm }) => {
      resetForm();
      window.location.replace("/dashboard");
    },
    validateOnNext: true,
    validateOnChange: false,
    activeStepIndex: 0,
    steps: [
      {
        component: ProviderSelection,
        validationSchema: Yup.object().shape({
          providerType: Yup.string().required("Please select an option."),
        }),
        beforeNext: async ({ providerType }, { setFieldValue }) => {
          if (providerType === Role.Practitioner && data.me?.provider) {
            setFieldValue(
              "userEaProviderId",
              String(data.me.provider.eaProviderId)
            );
          } else if (
            providerType === Role.HealthCoach &&
            data.me?.eaHealthCoachId
          ) {
            setFieldValue("userEaProviderId", data.me.eaHealthCoachId);
          } else {
            setFieldValue("userEaProviderId", null);
          }
        },
      },
      {
        component: AvailabilityWrapper,
        validationSchema: Yup.object().shape({
          eaProvider: Yup.object().required("Please select a provider."),
          startTimeInUtc: Yup.string()
            .nullable()
            .required("Please select a timeslot to continue."),
          endTimeInUtc: Yup.string()
            .nullable()
            .required("Please select a timeslot to continue."),
        }),
      },
      {
        component: AppointmentDetails,
        validationSchema: Yup.object().shape({
          notes: Yup.string().nullable(),
        }),
        beforeNext: async (values, { setSubmitting, setStatus }) => {
          try {
            setStatus(null);
            setSubmitting(true);
            const result = await createAppointment({
              variables: {
                input: {
                  eaProviderId: values.eaProvider.id,
                  eaServiceId: values.eaServiceId,
                  startTimeInUtc: values.startTimeInUtc,
                  endTimeInUtc: values.endTimeInUtc,
                  providerType: values.providerType,
                  notes: values.notes,
                },
              },
            });
            console.log(result);
            setSubmitting(false);
          } catch (err) {
            const msg = parseError(err);
            setSubmitting(false);
            setStatus({ error: msg });
          }
        },
      },
      {
        component: AppointmentConfirmed,
      },
    ],
  });

  const {
    renderComponent,
    handleNext,
    handlePrev,
    isPrevDisabled,
    isNextDisabled,
    isSubmitting,
    currentStepIndex,
    isLastStep,
  } = createAppointmentForm;
  useEffect(() => {
    // If there is an error with the query, we want to log it to Sentry
    if (error) {
      Sentry.captureException(new Error(error.message), {
        tags: {
          query: "UserEa",
          component: "CreateAppointment",
        },
      });
    }
  }, [error]);
  if (loading) return <Loading />;

  if (error) return <div>Error</div>;

  return (
    // <ApplicationLayout title="Create Appointment">
    <div className="w-full flex justify-center">
      <FormikProvider value={createAppointmentForm}>
        <div className="flex flex-col px-8 sm:px-14 pt-10 pb-10 bg-white rounded-md space-y-5 min-w-full md:min-w-0 max-w-lg">
          {/* APPOINTMENT STEPS */}
          {renderComponent()}

          <div className="pt-5 md:pt-10 pb-3 flex flex-row justify-between">
            {!isLastStep && (
              <Button
                title="Back"
                onPress={handlePrev}
                disabled={isPrevDisabled}
                buttonLeft={<ArrowLeftIcon className="w-4 h-4 mr-3" />}
              />
            )}

            <Button
              title={
                isLastStep
                  ? "Dashboard"
                  : currentStepIndex === 2
                  ? "Confirm"
                  : "Next"
              }
              onPress={handleNext}
              disabled={isSubmitting || isNextDisabled}
              loading={isSubmitting}
              fullWidth={isLastStep}
              spinnerMl={3}
              spinnerSize={16}
              buttonLeft={
                isLastStep ? <ArrowLeftIcon className="w-4 h-4 mr-3" /> : null
              }
              buttonRight={
                !isLastStep ? <ArrowRightIcon className="w-4 h-4 ml-3" /> : null
              }
            />
          </div>

          <div className="flex flex-col border-t border-gray-200">
            <p className="font-mulish text-center text-sm text-gray-400 pt-6">
              Having trouble?{" "}
              <TextLink to="/chat" text="Chat with a care coordinator" />.
            </p>
          </div>
        </div>
      </FormikProvider>
    </div>
    // </ApplicationLayout>
  );
};
