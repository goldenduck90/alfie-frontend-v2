import { DashboardCard } from "@src/components/ui/DashboardCard";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { AbnormalPatientPreviewItem } from "./components/AbnormalPatientPreviewItem";
import { AvatarInitial } from "@src/components/ui/AvatarInitial";
import { GrayPlaceHolderBox } from "@src/components/GrayPlaceHolderBox";

import { gql, useQuery } from "@apollo/client";
import { nameToInitials } from "@src/utils/nameToInitials";

const getAlerts = gql`
  query getAlerts {
    getAlerts {
      _id
      title
      description
      severity
      medical
      acknowledgedAt
      user {
        _id
        name
        email
      }
    }
  }
`;

export function PatientAbnormalities() {
  const { data, loading, error } = useQuery(getAlerts);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    if (loading) return;

    if (error) {
      setAlerts([]);
    } else {
      const _alerts = data.getAlerts.filter((g: any) => !g.acknowledgedAt)

      setAlerts(_alerts);
    }
  }, [data, loading, error]);

  const renderPatient = [...alerts]
    ?.slice(0, 3)
    .map((alert: any, i: number) => (
      <AbnormalPatientPreviewItem
        key={i}
        abnormality={alert.title}
        icon={
          <div className="pr-4">
            <AvatarInitial
              size="lg"
              index={i}
              text={nameToInitials(alert.user.name)}
            />
          </div>
        }
        name={alert.user.name}
        providerTitle={alert.user.email}
        patientId={alert.user._id}
      />
    ));

  const renderLoadItems = [0, 1].map((_, i) => (
    <AbnormalPatientPreviewItem isLoading key={i} />
  ));

  return (
    <DashboardCard
      className="w-full md:min-w-[370px] md:max-w-[400px] py-4"
      cardHeader={
        <div className="flex justify-between pb-7  items-center">
          <h3 className="font-bold">Patients with health issues</h3>{" "}
          <Link href="/dashboard/patients?tab=issues">
            <p className="font-semibold hover:underline">View all</p>
          </Link>
        </div>
      }
    >
      <div className="flex flex-col w-full gap-y-4 overflow-y-auto max-h-80">
        {!loading && alerts.length === 0 && (
          <GrayPlaceHolderBox content="No patients with abnormalities" />
        )}
        {renderPatient}
        {loading && renderLoadItems}
      </div>
    </DashboardCard>
  );
}
