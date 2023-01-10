import { gql, useMutation, useQuery } from "@apollo/client"
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/solid"
import * as Sentry from "@sentry/react"
import { FormikProvider } from "formik"
import { useFormikWizard } from "formik-wizard-form"
import { useEffect } from "react"
import { useParams } from "react-router"
import * as Yup from "yup"
import { Button } from "../../../components/Button"
import { ApplicationLayout } from "../../../components/layouts/ApplicationLayout"
import { Loading } from "../../../components/Loading"
import { TextLink } from "../../../components/TextLink"
import { parseError } from "../../../utils/parseError"
import { AppointmentConfirmed } from "./steps/AppointmentConfirmed"
import { AppointmentDetails } from "./steps/AppointmentDetails"
import { AvailabilityWrapper } from "./steps/Availability"
const updateAppointmentMutaton = gql`
  mutation UpdateAppointment($input: UpdateAppointmentInput!) {
    updateAppointment(input: $input) {
      eaAppointmentId
    }
  }
`

const appointmentQuery = gql`
  query Appointment($eaAppointmentId: String!) {
    appointment(eaAppointmentId: $eaAppointmentId) {
      eaAppointmentId
      startTimeInUtc
      endTimeInUtc
      notes
      eaProvider {
        id
        type
        name
        email
      }
    }
  }
`

export const RescheduleAppointment = () => {
  const { id } = useParams()
  const { data, loading, error } = useQuery(appointmentQuery, {
    variables: { eaAppointmentId: id },
  })
  const [updateAppointment] = useMutation(updateAppointmentMutaton)

  const updateAppointmentForm = useFormikWizard({
    initialValues: {
      reschedule: true,
      eaAppointmentId: id,
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
      resetForm()
      window.location.replace("/appointments")
    },
    validateOnNext: true,
    validateOnChange: false,
    activeStepIndex: 0,
    steps: [
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
            setStatus(null)
            setSubmitting(true)
            const result = await updateAppointment({
              variables: {
                input: {
                  eaAppointmentId: values.eaAppointmentId,
                  eaProviderId: values.eaProvider.id,
                  eaServiceId: values.eaServiceId,
                  startTimeInUtc: values.startTimeInUtc,
                  endTimeInUtc: values.endTimeInUtc,
                  providerType: values.providerType,
                  notes: values.notes,
                },
              },
            })
            console.log(result)
            setSubmitting(false)
          } catch (err) {
            const msg = parseError(err)
            setSubmitting(false)
            setStatus({ error: msg })
          }
        },
      },
      {
        component: AppointmentConfirmed,
      },
    ],
  })
  useEffect(() => {
    // If there is an error with the query, we want to log it to Sentry
    if (error) {
      Sentry.captureException(new Error(error.message), {
        tags: {
          query: "Appointment",
          component: "RescheduleAppointment",
        },
      })
    }
  }, [error])
  useEffect(() => {
    const { userEaProviderId, eaProvider } = updateAppointmentForm.values
    const { setFieldValue } = updateAppointmentForm
    if (loading) return
    if (error) return
    if (!data) return
    const { appointment } = data
    if (!appointment) return
    if (userEaProviderId) return
    if (eaProvider) return

    setFieldValue("selectedDate", new Date(appointment.startTimeInUtc))
    setFieldValue("endTimeInUtc", appointment.endTimeInUtc)
    setFieldValue("eaProvider", appointment.eaProvider)
    setFieldValue("userEaProviderId", appointment.eaProvider.id)
    setFieldValue("providerType", appointment.eaProvider.type)
    setFieldValue("notes", appointment.notes)
  }, [updateAppointmentForm, data, error, loading])

  const {
    renderComponent,
    handleNext,
    handlePrev,
    isPrevDisabled,
    isNextDisabled,
    isSubmitting,
    currentStepIndex,
    isLastStep,
  } = updateAppointmentForm

  if (loading) return <Loading />

  if (error) return <div>Error</div>

  return (
    <ApplicationLayout title="Reschedule Appointment">
      <div className="w-full flex justify-center">
        <FormikProvider value={updateAppointmentForm}>
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
                    ? "Appointments"
                    : currentStepIndex === 1
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
                  !isLastStep ? (
                    <ArrowRightIcon className="w-4 h-4 ml-3" />
                  ) : null
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
    </ApplicationLayout>
  )
}
