import { UserIcon, ExclamationCircleIcon } from "@heroicons/react/solid";
import { Button } from "@src/components/ui/Button";
import { PlaceHolderLine } from "@src/components/ui/PlaceHolderLine";
import Link from "next/link";

export interface AbnormalPatientPreviewItemProps {
  name?: string;
  providerTitle?: string;
  img?: string;
  icon?: React.ReactNode;
  isLoading?: boolean;
  abnormality?: string;
  patientId?: string;
}

export function AbnormalPatientPreviewItem({
  name,
  providerTitle,
  isLoading,
  icon,
  abnormality,
  patientId,
}: AbnormalPatientPreviewItemProps) {
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-4 md:p-6">
      <div className="flex flex-row justify-between gap-2 w-full">
        {isLoading ? (
          <div className="flex flex-col flex-shrink pb-6 w-3/5">
            <PlaceHolderLine amount={2} />
          </div>
        ) : (
          <div>
            <h2 className="text-gray-900 font-medium">{name}</h2>
            <p className="text-gray-600 font-normal">{providerTitle}</p>
          </div>
        )}
        {icon ? (
          icon
        ) : (
          <div className="flex rounded-full bg-lime-100 w-10 h-10 items-center justify-center min-w-[40px]">
            <UserIcon className="h-6 w-6 text-lime-700" />
          </div>
        )}
      </div>

      {isLoading ? (
        <PlaceHolderLine />
      ) : (
        <div className="bg-red-100 my-2 p-2 rounded-xl border border-red-500 font-light text-red-500 flex items-center">
          <ExclamationCircleIcon className="h-5 w-5 mr-2" />
          Abnormal {abnormality}
        </div>
      )}

      <div className="flex gap-x-2 justify-end border-t-[1px] rounded-b-xl -m-6 mt-4 py-4 px-4 bg-gray-50">
        <Link href={`/dashboard/patients/${patientId}`} passHref legacyBehavior>
          <Button buttonType="secondary">See Details</Button>
        </Link>
        <Link
          href={`/dashboard/patients/${patientId}?tab=Chat`}
          passHref
          legacyBehavior
        >
          <Button disabled={isLoading}>Contact</Button>
        </Link>
      </div>
    </div>
  );
}
