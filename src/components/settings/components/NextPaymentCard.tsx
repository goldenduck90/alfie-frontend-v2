import { Button } from "@src/components/ui/Button";

export function NextPaymentCard() {
  return (
    <div>
      <div className="p-4 border border-gray-300 rounded-md flex-shrink-0 max-h-fit md:min-w-[270px] shadow">
        <p>Next payment</p>
        <p>on 25 Feb 2023</p>
        <div className="flex items-center justify-end mt-10">
          <Button buttonType="secondary">Manage payments</Button>
        </div>
      </div>
    </div>
  );
}
