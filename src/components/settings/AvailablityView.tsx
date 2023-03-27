import { gql, useQuery } from "@apollo/client";
import {
  DocumentDuplicateIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import { useCurrentUserStore } from "@src/hooks/useCurrentUser";
import { Button } from "../ui/Button";
import { Checkbox } from "../ui/Checkbox";
import { TextField } from "../ui/TextField";

const getProfile = gql`
  query getProvider($eaProviderId: String!) {
    getAProvider(eaProviderId: $eaProviderId) {
      settings {
        workingPlan {
          monday {
            start
            end
            breaks {
              start
              end
            }
          }
          tuesday {
            start
            end
            breaks {
              start
              end
            }
          }
          wednesday {
            start
            end
            breaks {
              start
              end
            }
          }
          thursday {
            start
            end
            breaks {
              start
              end
            }
          }
          friday {
            start
            end
            breaks {
              start
              end
            }
          }
          saturday {
            start
            end
            breaks {
              start
              end
            }
          }
          sunday {
            start
            end
            breaks {
              start
              end
            }
          }
        }
      }
    }
  }
`;

const updateProfile = gql`
  mutation updateEaProfile(
    $eaProviderId: String!
    $input: EAProviderProfileInput!
  ) {
    updateProviderProfile(eaProviderId: $eaProviderId, input: $input) {
      settings {
        workingPlan {
          monday {
            start
            end
            breaks {
              start
              end
            }
          }
          tuesday {
            start
            end
          }
        }
      }
    }
  }
`;

export function AvailabilityView() {
  const { user } = useCurrentUserStore();
  const { data, loading } = useQuery(getProfile, {
    variables: {
      eaProviderId: (user as any)?.eaProviderId,
    },
  });

  const plans = Object.entries(data?.getAProvider?.settings?.workingPlan || {});

  const weeklyHours = plans?.map((plan, i) => (
    <DailyHours key={i} day={plan[0]} times={plan[1]} />
  ));

  return (
    <div>
      <h3 className="pb-8 font-semibold text-xl">Availability</h3>
      <div className="flex flex-col md:flex-row border border-1 rounded-lg w-full h-full">
        <div className="w-full md:w-2/3 p-6">
          <p className="gray-900 font-bold pb-6">Set your weekly hours</p>
          {weeklyHours}
        </div>
        <div className="md:w-1/3 w-full md:border-l  p-6">
          <div>
            <p className="gray-900 font-bold pb-6">Add date overrides</p>
            <Button>Add a date override</Button>
            {true && <DateOverride {...({} as any)} />}
          </div>
        </div>
      </div>
    </div>
  );
}

function DailyHours({
  day,
  times,
}: {
  day: string;
  times?: {
    start: string;
    end: string;
    breaks: { start: string; end: string };
  };
}) {
  const hasTime = !!times?.start && !!times?.end;

  return (
    <div className="flex sm:flex-row flex-col sm:items-center justify-between py-4">
      <div className="flex min-w-[120px]">
        <Checkbox checked={hasTime} />
        <p className="capitalize">{day}</p>
      </div>
      {hasTime ? (
        <>
          <div className="flex items-center max-w-[400px]">
            <TextField inputSize="medium" value={times?.start} />{" "}
            <span className="px-2 text-gray-300">-</span>{" "}
            <TextField inputSize="medium" value={times?.end} />
            <button onClick={undefined} className="pl-6">
              <TrashIcon className="h-5 w-5 text-gray-400" />
            </button>
          </div>
          <div className="flex gap-3">
            <button>
              <PlusIcon className="h-5 w-5 text-gray-400" />
            </button>
            <button>
              <DocumentDuplicateIcon className="h-5 w-5 text-gray-400" />
            </button>
          </div>
        </>
      ) : (
        <div>
          <p className="text-gray-400">Unavailable</p>
        </div>
      )}
    </div>
  );
}

function DateOverride({
  date,
  time,
  onRemove,
}: {
  date: string;
  time: string;
  onRemove: () => void;
}) {
  return (
    <div className="flex justify-between w-full border-b items-center py-4">
      <div>
        <p>{date || "unknown"}</p>
        <p className="text-gray-400">{time || "unknown"}</p>
      </div>
      <button onClick={onRemove}>
        <TrashIcon className="h-5 w-5 text-gray-400" />
      </button>
    </div>
  );
}
