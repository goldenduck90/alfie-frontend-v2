import { useNavigate, useParams } from "react-router";
import { ApplicationLayout } from "../../src/components/layouts/ApplicationLayout";
import { TaskType } from "../../graphql/generated";
import { CreateAppointment } from "./appointments/CreateAppointment";
import { BpLog } from "./tasks/BpLog";
import { FoodLog } from "./tasks/FoodLog";
import { Gsrs } from "./tasks/gsrs";
import { IdAndInsuranceUpload } from "./tasks/IdAndInsuranceUpload";
import { MpActivity } from "./tasks/mpActivity";
import { MpBlueCapsule } from "./tasks/mpBlueCapsule";
import { MpBlueCapsulePartTwo } from "./tasks/mpBlueCapsulePartTwo";
import { MpFeeling } from "./tasks/mpFeeling";
import { MpHunger } from "./tasks/mpHunger";
import { NewPatientIntake } from "./tasks/NewPatientIntake";
import { Tefq } from "./tasks/tefq";
import { WaistLog } from "./tasks/WaistLog";
import { WeightLog } from "./tasks/WeightLog";
// import { NewPatientIntake } from "./tasks/NewPatientIntake"

const TaskSelector = ({
  type,
  userTaskId,
}: {
  type: string;
  userTaskId: string;
}) => {
  switch (type) {
    case TaskType.IdAndInsuranceUpload:
      return <IdAndInsuranceUpload userTaskId={userTaskId} />;
    case TaskType.NewPatientIntakeForm:
      return <NewPatientIntake userTaskId={userTaskId} />;
    case TaskType.BpLog:
      return <BpLog userTaskId={userTaskId} />;
    case TaskType.WaistLog:
      return <WaistLog userTaskId={userTaskId} />;
    case TaskType.WeightLog:
      return <WeightLog userTaskId={userTaskId} />;
    case TaskType.MpHunger:
      return <MpHunger userTaskId={userTaskId} />;
    case TaskType.MpFeeling:
      return <MpFeeling userTaskId={userTaskId} />;
    case TaskType.MpActivity:
      return <MpActivity userTaskId={userTaskId} />;
    case TaskType.MpBlueCapsule:
      return <MpBlueCapsule userTaskId={userTaskId} />;
    case TaskType.MpBlueCapsule_2:
      return <MpBlueCapsulePartTwo userTaskId={userTaskId} />;
    case TaskType.ScheduleAppointment:
      return <CreateAppointment />;
    case TaskType.FoodLog:
      return <FoodLog userTaskId={userTaskId} />;
    case TaskType.Gsrs:
      return <Gsrs userTaskId={userTaskId} />;
    case TaskType.Tefq:
      return <Tefq userTaskId={userTaskId} />;
    default:
      return <div>Default</div>;
  }
};

export const TaskDetail = () => {
  const { type, id } = useParams();
  const navigate = useNavigate();

  if (!type || !id) {
    navigate("/dashboard?refetch=true");
    return null;
  }

  return (
    <ApplicationLayout title="">
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <TaskSelector type={type} userTaskId={id} />
      </div>
    </ApplicationLayout>
  );
};
