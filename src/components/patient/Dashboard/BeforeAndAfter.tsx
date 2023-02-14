import React from "react";
import { gql, useQuery } from "@apollo/client";

import { UserIcon } from "@heroicons/react/outline";
import { Button } from "@src/components/ui/Button";
import { DashboardCard } from "@src/components/ui/DashboardCard";
import { PlaceHolderLine } from "@src/components/ui/PlaceHolderLine";

export const beforeAfterQuery = gql`
  query BeforeAfterQuery {
    before
    after
    between {
      maybe
    }
  }
`;

export function BeforeAndAfter() {
  const { loading, data, error } = useQuery(beforeAfterQuery, {
    onError: (e) => console.log(e),
  });

  return (
    <DashboardCard cardHeader={""} className="w-full">
      <div className="flex flex-row">
        <div>
          <UserIcon className="h-5 w-5 mr-2 mt-[2px]" />
        </div>
        <div className="flex flex-col">
          <div className="flex flex-row items-center pb-2">
            {loading ? (
              <PlaceHolderLine />
            ) : (
              <h2 className="text-gray-900 font-bold">Before and after</h2>
            )}
          </div>

          {loading ? (
            <div className="w-[200px]">
              <PlaceHolderLine />
            </div>
          ) : (
            <p className="text-gray-700">
              Add photos of yourself and keep record of your progress.
            </p>
          )}
          <div className="pt-4">
            <Button disabled={loading} buttonType="secondary">
              Upload photo
            </Button>
          </div>
        </div>
      </div>
    </DashboardCard>
  );
}
