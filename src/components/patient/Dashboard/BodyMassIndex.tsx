import React from "react";
import { CakeIcon } from "@heroicons/react/solid";
import { PencilIcon } from "@heroicons/react/outline";
import { DashboardCard } from "@src/components/ui/DashboardCard";

// export const BodyMassIndexQuery = gql`
//   query BodyMassIndex {
//     something
//     somethingElse
//   }
// `;

export function BodyMassIndex() {
  // const { loading, data, error } = useQuery(BodyMassIndexQuery, {});

  return (
    <DashboardCard
      className="w-full md:mr-4"
      cardHeader={
        <div className="flex justify-between items center">
          <div className="flex">
            <CakeIcon className="h-5 w-5 mr-2" />
            <h2 className="text-gray-900 ">Body Mass Index</h2>
          </div>
          <PencilIcon className="h-4 w-4 text-gray-400" />
        </div>
      }
    />
  );
}
