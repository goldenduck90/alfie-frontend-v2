import { Patient } from "@src/components/practitioner/dashboard/Table";
import { Maybe, Provider } from "@src/graphql/generated";
import { CellContext } from "@tanstack/react-table";
import dayjs from "dayjs";
import { useMemo } from "react";
import { AvatarInitial } from "../AvatarInitial";
import { nameToInitials } from "@src/utils/nameToInitials";

export function NameCell({ info }: { info: CellContext<Patient, string> }) {
  const name = useMemo(() => info.getValue(), [info]);

  return (
    <div className="px-2 flex gap-x-2 items-center">
      <AvatarInitial text={nameToInitials(name)} index={info.row.index} />
      <p className="capitalize">{name}</p>
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

export function ProviderNameCell({
  info,
}: {
  info: CellContext<Provider, string>;
}) {
  const name = useMemo(() => info.getValue(), [info]);

  return (
    <div className="px-2 flex gap-x-2 items-center">
      <AvatarInitial text={nameToInitials(name)} index={info.row.index} />
      <p className="capitalize">{name}</p>
    </div>
  );
}

export function NPICell({ info }: { info: CellContext<Provider, string> }) {
  return <div className="px-2">{info.getValue()}</div>;
}

export function NumberOfPatientsCell({
  info,
}: {
  info: CellContext<Provider, Maybe<number> | undefined>;
}) {
  return <div className="px-2">{info.getValue()}</div>;
}

export function ProviderDefaultCell({
  info,
}: {
  info: CellContext<Provider, string>;
}) {
  return <div className="px-2">{info.getValue()}</div>;
}
