import { CalculatorIcon } from "@heroicons/react/outline";
import * as RadixDialog from "@radix-ui/react-dialog";
import { Button } from "../../ui/Button";
import { DialogLongBody, DialogLongHeader } from "../Dialog";
import ConnectWithingsButton from "@src/components/settings/components/ConnectWithingsButton";
import { useRouter } from "next/router";

type Props = {
  title: string;
};
export function ConnectWithingsScale({ title }: Props) {
  const router = useRouter();

  const handleConnectClick = () => {
    router.push("/settings/connect-withings");
  };

  return (
    <div className="w-full max-w-[560px] whitespace-line md:min-w-[560px]">
      <DialogLongHeader
        title={title}
        step={1}
        total={1}
        icon={<CalculatorIcon className="w-5 h-5 stroke-inherit" />}
      />
      <DialogLongBody>
        <div className="flex flex-col gap-y-2 w-full">
          <p className="text-sm mb-2">
            Once you have downloaded the Withings app and connected your scale
            to WiFi, click below to connect your scale to your Alfie Health
            account. If you have received your scale within 5 business days of
            signing up, please contact support@joinalfie.com
          </p>
        </div>
      </DialogLongBody>
      <div className="w-full flex justify-end items-center relative px-6 pt-6 gap-x-3 flex-col md:flex-row gap-y-6">
        <RadixDialog.Close asChild>
          <Button size="medium" buttonType="secondary">
            Cancel
          </Button>
        </RadixDialog.Close>
        <ConnectWithingsButton />
      </div>
    </div>
  );
}
