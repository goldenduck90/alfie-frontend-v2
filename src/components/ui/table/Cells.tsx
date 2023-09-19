import { Patient } from "@src/components/practitioner/dashboard/Table";
import { CellContext } from "@tanstack/react-table";
import dayjs from "dayjs";
import { useMemo } from "react";
import { AvatarInitial } from "../AvatarInitial";

export function NameCell({ info }: { info: CellContext<Patient, string> }) {
  const initials = useMemo(() => {
    const splitName = info.getValue().split(" ");
    const firstInitial = splitName[0].charAt(0);
    const lastInitial = splitName[splitName.length - 1].charAt(0);
    return `${firstInitial || ""}${lastInitial || ""}`;
  }, [info]);

  return (
    <div className="px-2 flex gap-x-2 items-center">
      <AvatarInitial text={initials} index={info.row.index} />
      <p className="capitalize">{info.getValue()}</p>
    </div>
  );
}

export function DateOfBirthCell({
  info,
}: {
  info: CellContext<Patient, string>;
}) {
  const dob = useMemo(() => {
    const date = new Date(info.getValue());
    return dayjs(date, { utc: true }).format("MM.DD.YYYY");
  }, [info]);

  return <div className="px-2">{dob || ""}</div>;
}

export function DefaultCell({ info }: { info: CellContext<Patient, string> }) {
  return <div className="px-2">{info.getValue()}</div>;
}
