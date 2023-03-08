import { useCurrentUserStore } from "@src/hooks/useCurrentUser";
import dayjs from "dayjs";
import { DialogModal } from "../modal/Dialog";
import { ChangeEmailModal } from "../modal/settings/ChangeEmailModal";
import { ChangeNameModal } from "../modal/settings/ChangeNameModal";
import { ChangePasswordModal } from "../modal/settings/ChangePasswordModal";
import { Button } from "../ui/Button";
import { ToggleSwitch } from "../ui/ToggleSwitch";
import {
  TableViewRow,
  TableEntryInline,
  TableEntryStacked,
} from "./components/TableComponents";

export function AccountDetails() {
  const { user } = useCurrentUserStore();
  return (
    <div>
      <div>
        <h1 className="text-xl font-[600]">Account Details</h1>
        <TableViewRow
          inputs={[
            {
              left: (
                <TableEntryInline
                  leftText="Fullname"
                  rightText={user?.name || ""}
                />
              ),
              right: (
                <DialogModal
                  triggerAsChild
                  trigger={<Button buttonType="secondary">Change</Button>}
                >
                  <ChangeNameModal title="Full name" />
                </DialogModal>
              ),
            },
            {
              left: (
                <TableEntryInline
                  leftText="Email address"
                  rightText={user?.email || ""}
                />
              ),
              right: (
                <DialogModal
                  triggerAsChild
                  trigger={<Button buttonType="secondary">Change</Button>}
                >
                  <ChangeEmailModal title="Email address" />
                </DialogModal>
              ),
            },
          ]}
        />
      </div>
      <div className="mt-6">
        <h1 className="text-xl font-[600]">Change password</h1>
        <TableViewRow
          inputs={[
            {
              left: (
                <TableEntryStacked
                  title="Password"
                  subtext="You haven't changed your password recently"
                />
              ),
              right: (
                <DialogModal
                  triggerAsChild
                  trigger={
                    <Button buttonType="secondary">Change password</Button>
                  }
                >
                  <ChangePasswordModal title="Change password" />
                </DialogModal>
              ),
            },
          ]}
        />
      </div>
      <div className="mt-6">
        <h1 className="text-xl font-[600]">Language and region</h1>
        <TableViewRow
          inputs={[
            {
              left: (
                <TableEntryStacked
                  title="Automatic time zone"
                  subtext="Lumix uses your time zone to send summary and notification emails, for times in your activity feeds, and for reminders."
                />
              ),
              right: (
                <div className="flex justify-between md:justify-start items-center gap-x-3">
                  <div className="text-sm text-gray-600">
                    GMT {dayjs().format("Z")}
                  </div>
                  <ToggleSwitch
                    label=""
                    checked={true}
                    onCheckedChange={() => {}}
                    name="Automatic time zone"
                  />
                </div>
              ),
            },
          ]}
        />
      </div>
    </div>
  );
}
