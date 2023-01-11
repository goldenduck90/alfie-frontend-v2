import { ApolloProvider } from "@apollo/client";
import { IntercomProvider } from "react-use-intercom";
import Toast from "../src/components/notifications/Toast";
import { NotificationProvider } from "../src/context/NotificationContext";
import { client } from "../src/graphql";
import { AuthProvider } from "../src//hooks/useAuth";
import Login from "./loginn";
import { Tasks } from "../src/components/tasks/Tasks";
import { Role } from "../src/graphql/generated";
import { NoAuth } from "../src/middleware/NoAuth";
import { RequireAuth } from "../src/middleware/RequireAuth";
import { AdminPatients } from "./admin/AdminPatients";
import Appointments from "./appointments";
import ForgotPassword from "./forgot-password";
import ResetPassword from "./ResetPassword";
import Chat from "./Chat";
import { Faq } from "./faq";
import { HealthCoachPatients } from "./healthCoach/HealthCoachPatients";
import { AppointmentsPage } from "./patient/appointments/AppointmentList";
import { Call } from "./patient/appointments/Call";
import { CreateAppointment } from "./patient/appointments/CreateAppointment";
import { RescheduleAppointment } from "./patient/appointments/RescheduleAppointment";
import { Billing } from "./patient/billing/Billings";
import Dashboard from "./patient/Dashboard";
import { Medications } from "./patient/medications/Medications";
import { TaskDetail } from "./patient/TaskDetail";
import { Patients } from "./practitioner/patients/Patients";
import { Settings } from "./practitioner/settings";
import { Checkout } from "./signup/Checkout";
import { CheckoutAddress } from "./signup/CheckoutAddress";
import { PreCheckout } from "./signup/PreCheckout";
import { Ineligible } from "./signup/steps/Ineligible";
import { StripeWrapper } from "./signup/StripeWrapper";
import Success from "./signup/Success";
import WaitlistForm from "./signup/WaitlistForm";

const App = ({ Component }: any) => {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <IntercomProvider appId={process.env.REACT_APP_INTERCOM_APP_ID || ""}>
          <NotificationProvider>
            <Toast />
            <Login />
            {Component}
          </NotificationProvider>
        </IntercomProvider>
      </AuthProvider>
    </ApolloProvider>
  );
};

export default App;
