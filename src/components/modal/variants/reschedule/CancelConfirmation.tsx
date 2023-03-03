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
// TODO: remove test data inputs once hooked up to api
export const CancelConfirmation = ({ eaProvider = { email: "npierre@provider.com", id: "1", name: "Noah Pierre", numberOfPatients: 0, timezone: "MT", type: "Doctor" }, selectedDate = new Date("2023-03-01T05:00:00.000Z"), startTimeInUtc = "2023-02-23T20:25:15.656Z", endTimeInUtc = "2023-02-21T23:25:15.656Z" }) => {
    const setOpen = useDialogToggle();

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
                                    {eaProvider?.name}
                                </h2>
                                <p className="text-gray-600 font-normal">
                                    {eaProvider?.type}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full py-4 px-2 rounded-md flex gap-x-4 bg-gray-100 text-sm whitespace-nowrap">
                        <div className="flex gap-x-4 items-start">
                            <CalendarIcon className="w-6 h-6 text-gray-500" />
                            <div className="flex flex-col">
                                <p className="font-bold">{format(new Date(startTimeInUtc), "h:mm aa")} -{" "}
                                    {format(new Date(endTimeInUtc), "h:mm aa")}</p>
                                <p className="text-gray-500 font-medium">
                                    {selectedDate.toLocaleDateString("en-US", {
                                        weekday: "long",
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    }) || ""}
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
                    <Button buttonType="secondary" onClick={() => {
                        setOpen(false)
                    }}>Keep this visit</Button>
                </RadixDialog.Close>
                <Button
                    onClick={() => {
                        setOpen(false)
                    }}
                    buttonType="alert"
                >
                    Cancel this visit
                </Button>
            </div>
        </div>
    );
}
