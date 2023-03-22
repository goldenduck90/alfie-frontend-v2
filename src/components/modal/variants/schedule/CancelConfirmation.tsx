import { format } from "date-fns";
import {
  CalendarIcon,
  ClockIcon,
  UserIcon, XIcon
} from "@heroicons/react/outline";
import Image from "next/image";
import * as RadixDialog from "@radix-ui/react-dialog";
import { Button } from "../../../ui/Button";
import { useDialogToggle } from "../../Dialog";
import { useUserStateContext } from "@src/context/SessionContext";
import { gql, useMutation } from "@apollo/client";

// setup dayjs
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { useRouter } from "next/router";
import { useState } from "react";
import { client } from "@src/graphql";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault(dayjs.tz.guess());

const cancelAppointmentMutation = gql`
  mutation CancelAppointment($eaAppointmentId: String!) {
    cancelAppointment(eaAppointmentId: $eaAppointmentId) {
      message
    }
  }
`;

export const CancelConfirmation = ({
  eaAppointmentId,
  eaProvider,
  eaCustomer,
  start,
  end,
}: {
  eaAppointmentId: string;
  eaProvider: {
    name: string;
  };
  eaCustomer: {
    name: string;
  };
  start: string;
  end: string;
}) => {
  const session = useUserStateContext();
  const setOpen = useDialogToggle();
  const isProvider = session[0]?.user?.role !== "Patient";
  const [loading, setLoading] = useState(false);
  const [cancel] = useMutation(cancelAppointmentMutation);
  const router = useRouter();

  const cancelAppointment = async () => {
    setLoading(true);

    const { data, errors } = await cancel({
      variables: {
        eaAppointmentId,
      }
    })

    if (errors) {
      alert("An error occured cancelling this appointment. Please contact support.")
      console.log("An error occured cancelling this appointment", errors)
      setLoading(false);
      return;
    }

    console.log(data);
    alert("Successfully cancelled appointment!");
    await client.refetchQueries({
      include: "all",
    })
    setLoading(false);
    setOpen(false);
    router.back();
  }

  return (
    <div className="w-full max-w-[480px] min-w-full">
      <div className="w-full flex justify-end pr-6">
        <RadixDialog.Close className="" asChild>
          <button>
            <XIcon className="w-5 h-5" />
          </button>
        </RadixDialog.Close>
      </div>
      <div className="w-full min-w-full px-6 flex flex-col gap-y-2">
        <div className="flex flex-col gap-y-2 w-full">
          <div className="flex flex-col">
            <Image
              src={require("../../../../assets/red-alert.png")}
              alt="red cancellation alert"
              height={40}
              width={40}
              className="self-center mb-4"
            />
            <p className="font-eudoxus text-xl text-alertRed self-center font-bold mb-1">
              Cancel appointment
            </p>
            <p className="font-eudoxus text-sm text-gray-700 self-center font-medium">
              Are you sure you want to cancel this visit?
            </p>
            <p className="font-eudoxus text-sm text-gray-700 self-center font-medium mb-9">
              It cannot be undone.
            </p>
          </div>
          <div className="w-full py-4 px-2 rounded-md flex gap-x-4 bg-gray-100 text-sm whitespace-nowrap">
            <div className="flex gap-x-4 items-start">
              <UserIcon className="h-6 w-6 text-gray-500" />
              <div>
                <h2 className="text-gray-900 font-medium">
                  {isProvider ? eaCustomer.name : eaProvider.name}
                </h2>
                <p className="text-gray-600 font-normal">
                  {isProvider ? "Patient" : "Provider"}
                </p>
              </div>
            </div>
          </div>
          <div className="w-full py-4 px-2 rounded-md flex gap-x-4 bg-gray-100 text-sm whitespace-nowrap">
            <div className="flex gap-x-4 items-start">
              <CalendarIcon className="w-6 h-6 text-gray-500" />
              <div className="flex flex-col">
                <p className="font-bold">{dayjs(start).format("h:mm A")} -{" "}
                  {dayjs(end).format("h:mm A")}</p>
                <p className="text-gray-500 font-medium">
                  {dayjs(start).format("MMMM DD, YYYY")}
                </p>
              </div>
            </div>
          </div>
          <div className="w-full py-4 px-2 rounded-md flex gap-x-4 bg-gray-100 text-sm whitespace-nowrap">
            <div className="flex gap-x-4 items-start">
              <ClockIcon className="w-6 h-6 text-gray-500" />
              <div className="flex flex-col">
                <p className="font-bold">{"30 min"}</p>
                <p className="text-gray-500 font-medium">
                  {"Online video meeting duration"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-end items-center relative px-6 pt-6 gap-x-3">
        <RadixDialog.Close asChild>
          <Button
            disabled={loading}
            buttonType="secondary"
            onClick={() => {
              setOpen(false)
            }}
          >Keep this visit</Button>
        </RadixDialog.Close>
        <Button
          onClick={cancelAppointment}
          disabled={loading}
          buttonType="alert"
        >
          Cancel this visit
        </Button>
      </div>
    </div>
  );
}
