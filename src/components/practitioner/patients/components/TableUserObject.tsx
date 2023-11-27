
import React from "react";
import { PlaceHolderLine } from "@src/components/ui/PlaceHolderLine";

export function TableUserObject({
    user,
    loading,
  }: {
    user: any;
    loading?: boolean;
  }) {
    if (!user) return null;
    return (
      <div className="">
        <div className="min-w-full mt-6 border border-gray-200 rounded-md divide-y divide-y-gray-300 bg-white">
          {Object.keys(user).map((key) => {
            if (!user[key] && !loading) {
              return null;
            }
            return (
              <div
                key={key}
                className="flex flex-col md:flex-row gap-x-4 px-6 py-4"
              >
                <p className="capitalize min-w-[275px] font-bold">{key}</p>
                {loading ? (
                  <div className="w-1/4 h-6 flex items-center">
                    <PlaceHolderLine hasTopMargin />
                  </div>
                ) : typeof user[key] !== "object" ||
                  React.isValidElement(user[key]) ? (
                  <div className="text-gray-600">{user[key]}</div>
                ) : (
                  <p className="text-gray-600">
                    {Object.keys(user[key]).map((subKey) => (
                      <p className="text-gray-600">
                        <strong>{subKey}:</strong>{" "}
                        {Array.isArray(user[key][subKey])
                          ? user[key][subKey]?.join(", ")
                          : user[key][subKey]?.toString()}
                      </p>
                    ))}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }