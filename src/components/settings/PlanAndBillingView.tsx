import { Button } from "../ui/Button";
import { DialogModal } from "@src/components/modal/Dialog";
import { ChangeNameModal } from "@src/components/modal/settings/ChangeNameModal";
import { useCurrentUserStore } from "@src/hooks/useCurrentUser";
import { NextPaymentCard } from "./components/NextPaymentCard";
import { PlanCard } from "./components/PlanCard";
import { TableViewRow, TableEntryInline } from "./components/TableComponents";
import { InvoiceHistoryTable } from "./components/InvoiceHistoryTable";
import { ChangePhoneModal } from "../modal/settings/ChangePhoneNumber";
import { ChangeAddressModal } from "../modal/settings/ChangeAddressModal";
import { ChangeEmailModal } from "../modal/settings/ChangeEmailModal";

export function PlanAndBillingView() {
  const { user } = useCurrentUserStore();

  return (
    <div>
      <p className="text-xl font-semibold mb-6">Plan & Billing</p>
      <div className="flex flex-col md:flex-row gap-5">
        <PlanCard />
        <NextPaymentCard />
      </div>
      <div className="mt-6">
        <p>Billing Information</p>
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
                  <ChangeEmailModal title="Email" />
                </DialogModal>
              ),
            },
            {
              left: (
                <TableEntryInline
                  leftText="Billing address"
                  rightText={user?.address?.state || ""}
                />
              ),
              right: (
                <DialogModal
                  triggerAsChild
                  trigger={<Button buttonType="secondary">Change</Button>}
                >
                  <ChangeAddressModal title="Billing address" />
                </DialogModal>
              ),
            },
            {
              left: (
                <TableEntryInline
                  leftText="Phone number"
                  rightText={user?.phone || ""}
                />
              ),
              right: (
                <DialogModal
                  triggerAsChild
                  trigger={<Button buttonType="secondary">Change</Button>}
                >
                  <ChangePhoneModal title="Phone Number" />
                </DialogModal>
              ),
            },
          ]}
        />
      </div>
      <div className="mt-6">
        <p>Invoice history</p>
        <InvoiceHistoryTable />
      </div>
    </div>
  );
}
