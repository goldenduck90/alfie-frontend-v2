import { EaAppointment } from "../../graphql/generated";
import { SeeAll } from "../SeeAll";
import { TaskItem } from "../patient/tasks/TaskItem";

export const AppointmentList = ({
  appointments,
}: {
  appointments: EaAppointment[];
}) => {
  return (
    <div className="w-full lg:w-full md:pl-12">
      {appointments.length > 0 && (
        <div>
          <h1 className="text-xl md:text-2xl font-bold font-mulish">
            Appointments:
          </h1>
          {appointments.map((app: EaAppointment) => (
            <div className="pt-6">
              <TaskItem
                meetingLocation={app.location}
                key={app.eaAppointmentId}
                id={app.eaAppointmentId}
                type={app.eaProvider.type || ""}
                title={app.eaProvider.name || ""}
                createdAt={app.startTimeInUtc}
                appointmentStartTime={app.startTimeInUtc}
                providerType={app.eaProvider.type}
                // dueAt={userTask.dueAt}
                // pastDue={userTask.pastDue}
                actionText="Join Visit"
              />
            </div>
          ))}
          <div className="mt-2 md:mt-4 flex flex-col md:flex-row items-center justify-center md:justify-end">
            <SeeAll path="/appointments" name="appointments" />
          </div>
        </div>
      )}
    </div>
  );
};
