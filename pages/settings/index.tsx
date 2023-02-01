import { gql, useMutation, useQuery } from "@apollo/client";
import * as Sentry from "@sentry/react";
import { useNotificationStore } from "@src/hooks/useNotificationStore";
import React, { useEffect, useState } from "react";
import { WorkingPlan } from "../../@types/easyAppointmentTypes";
import { Button } from "../../src/components/Button";
import UnControlledDropDown from "../../src/components/inputs/UnControlledDropDown";
import { UnControlledTextInput } from "../../src/components/inputs/UnControlledTextInput";
import { Layout } from "../../src/components/layouts/Layout";
// import { useNotificationDispatch } from "../../../context/NotificationContext";
function generateUUID() {
  let d = new Date().getTime(); //Timestamp
  let d2 =
    (typeof performance !== "undefined" &&
      performance.now &&
      performance.now() * 1000) ||
    0; //Time in microseconds since page-load or 0 if unsupported
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    let r = Math.random() * 16; //random number between 0 and 16
    if (d > 0) {
      //Use timestamp until depleted
      r = (d + r) % 16 | 0;
      d = Math.floor(d / 16);
    } else {
      //Use microseconds since page-load if supported
      r = (d2 + r) % 16 | 0;
      d2 = Math.floor(d2 / 16);
    }
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}
function Settings() {
  const userData = localStorage.getItem("user");
  const notificationDispatchers = useNotificationStore();
  const [user, setUser] = useState<any>(userData && JSON.parse(userData));
  const [workingPlan, setWorkingPlan] = useState<any>([]);
  const [workingBreaks, setWorkingBreaks] = useState<any>([]);
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

  const { data, loading, error } = useQuery(getProfile, {
    variables: {
      eaProviderId: user?.eaProviderId,
    },
  });
  // use mutation
  const [updateProfileMutation] = useMutation(updateProfile);
  React.useEffect(() => {
    const providerWorkingPlan: WorkingPlan =
      data?.getAProvider?.settings?.workingPlan;
    if (providerWorkingPlan) {
      const convertedWorkingPlan = Object.entries(providerWorkingPlan).map(
        ([key, value]: any) => {
          return {
            day: key,
            start: value.start,
            end: value.end,
            breaks: value.breaks,
          };
        }
      );
      // Add breaks to the workingBreaks state
      const userBreaks = convertedWorkingPlan.map((day: any) => {
        // add day to the breaks array of objects so on each break
        return day.breaks.map((breaks: any) => {
          return { ...breaks, day: day.day, id: generateUUID() };
        });
      });
      // flatten the breaks array
      const flattenedBreaks = userBreaks.flat();
      setWorkingBreaks(flattenedBreaks);
      setWorkingPlan(convertedWorkingPlan);
    }
  }, [data]);
  useEffect(() => {
    // If there is an error with the query, we want to log it to Sentry
    if (error) {
      Sentry.captureException(new Error(error.message), {
        tags: {
          query: "getProvider",
          component: "Settings",
        },
      });
    }
  }, [error]);
  function updateWorkingPlanStart(e: any, schedule: any) {
    setWorkingPlan((prev: any) => {
      return prev.map((item: any) => {
        if (item.day === schedule.day) {
          return {
            ...item,
            start: e.target.value,
          };
        }
        return item;
      });
    });
  }
  function updateWorkingPlanEnd(e: any, schedule: any) {
    setWorkingPlan((prev: any) => {
      return prev.map((item: any) => {
        if (item.day === schedule.day) {
          return {
            ...item,
            end: e.target.value,
          };
        }
        return item;
      });
    });
  }
  async function saveWorkingPlan() {
    try {
      const input = {
        settings: {
          // match the workingBreaks to the workingPlan by day and add the breaks to the workingPlan
          workingPlan: workingPlan.reduce((acc: any, item: any) => {
            const groupedBreaks = workingBreaks.filter(
              (usersBreaks: any) => usersBreaks.day === item.day
            );
            return {
              ...acc,
              [item.day]: {
                start: item.start,
                end: item.end,
                // remove id and day from breaks
                breaks: groupedBreaks.map((handledBreak: any) => {
                  const { id, day, ...rest } = handledBreak;
                  return rest;
                }),
              },
            };
          }, {}),
        },
      };

      const response = await updateProfileMutation({
        variables: {
          eaProviderId: user?.eaProviderId,
          input,
        },
      });
      notificationDispatchers.addNotification({
        type: "success",
        title: "Success",
        description: "You have successfully updated your working plan",
        displayNotification: true,
        id: "a",
      });
      console.log(response, "response");
    } catch (err) {
      console.log(err, "error");
    }
  }
  function addNewBreaksRow() {
    setWorkingBreaks((prev: any) => {
      return [
        ...prev,
        {
          start: "",
          end: "",
          day: "monday",
          id: generateUUID(),
        },
      ];
    });
  }
  function removeBreak(selectedBreak: any) {
    setWorkingBreaks((prev: any) => {
      return prev.filter((item: any) => item.id !== selectedBreak.id);
    });
  }
  function updateWorkingBreaksStart(e: any, selectedBreak: any) {
    setWorkingBreaks((prev: any) => {
      return prev.map((item: any) => {
        if (item.id === selectedBreak.id) {
          return {
            ...item,
            start: e.target.value,
          };
        }
        return item;
      });
    });
  }
  function updateWorkingBreaksEnd(e: any, selectedBreak: any) {
    console.log(e.target.value, selectedBreak);
    // find the working breaks by breakId and update the found one with the new value for the start time
    setWorkingBreaks((prev: any) => {
      return prev.map((item: any) => {
        if (item.id === selectedBreak.id) {
          return {
            ...item,
            end: e.target.value,
          };
        }
        return item;
      });
    });
  }
  function saveBreakToWorkingPlan(schedule: any) {
    // find the working plan by day and update the breaks with the new breaks. So if workingBreaks has two breaks for monday and workingPlan has one break for monday then update the workingPlan with the two breaks from workingBreaks
    setWorkingPlan((prev: any) => {
      return prev.map((item: any) => {
        console.log(item, "item");
        console.log(schedule, "schedule");
        //  if the day of the working plan matches the day of the working breaks then add all the breaks to the working plan breaks
        if (item.day === schedule.day) {
          return {
            ...item,
            // push all the breaks from workingBreaks to the workingPlan
            breaks: [...item.breaks].concat(schedule.breaks),
          };
        }
        return item;
      });
    });
  }
  function updateWorkingBreaksDay(e: any, selectedBreak: any) {
    setWorkingBreaks((prev: any) => {
      return prev.map((item: any) => {
        if (item.id === selectedBreak.id) {
          return {
            ...item,
            day: e,
          };
        }
        return item;
      });
    });
  }
  return (
    <>
      <div className="overflow-visible p-8">
        <div className="flex flex-row justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Schedule</h1>
          </div>
          {/* <div className="float-right"> */}
          <div>
            <Button
              customClass="mt-0"
              loading={loading}
              onPress={() => saveWorkingPlan()}
              title="Save"
            />
          </div>
        </div>
        {/* </div> */}
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Day
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Start
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        End
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {workingPlan?.map((schedule: any) => (
                      <tr key={schedule.day}>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <UnControlledTextInput
                            disabled
                            value={schedule.day}
                            name={schedule.day}
                            placeholder=""
                            type="text"
                          />
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <UnControlledTextInput
                            handleChange={(e: any) => {
                              updateWorkingPlanStart(e, schedule);
                            }}
                            name="start"
                            placeholder=""
                            value={schedule.start}
                            type="time"
                          />
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <UnControlledTextInput
                            name="start"
                            placeholder=""
                            value={schedule.end}
                            handleChange={(e: any) => {
                              updateWorkingPlanEnd(e, schedule);
                            }}
                            type="time"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="flex flex-row justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 py-8">Breaks</h1>
            </div>
            {/* <div className="float-right"> */}
            <div>
              <Button
                customClass="mt-0"
                loading={loading}
                onPress={() => addNewBreaksRow()}
                title="Add New Break"
              />
            </div>
          </div>
          <div className="overflow-scroll shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="py-6.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                  >
                    Day
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Start
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    End
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {workingBreaks.map((breaks: any) => (
                  // If we have two breaks on the same row we need to collapse one of them
                  <tr>
                    <td className="whitespace-nowrap py-4 pl-4 text-sm font-medium text-gray-900 sm:pl-6">
                      <UnControlledDropDown
                        selectedItem={breaks.day}
                        setSelected={(e: any) =>
                          updateWorkingBreaksDay(e, breaks)
                        }
                      />
                    </td>
                    <td className="whitespace-nowrap py-4 pl-4 text-sm font-medium text-gray-900 sm:pl-6">
                      <UnControlledTextInput
                        handleChange={(e: any) => {
                          updateWorkingBreaksStart(e, breaks);
                        }}
                        name="start"
                        placeholder="start"
                        value={breaks.start}
                        type="time"
                      />
                    </td>
                    <td className="whitespace-nowrap py-4 pl-4 text-sm font-medium text-gray-900 sm:pl-6">
                      <UnControlledTextInput
                        handleChange={(e: any) => {
                          updateWorkingBreaksEnd(e, breaks);
                        }}
                        name="end"
                        placeholder="end"
                        value={breaks.end}
                        type="time"
                      />
                    </td>
                    <td className="whitespace-nowrap py-4 text-sm font-medium text-gray-900 sm:pl-6 flex flex-row">
                      <div className="pr-4">
                        <button
                          onClick={(e) => saveBreakToWorkingPlan(breaks)}
                          className="bg-royalBlue hover:bg-indigo-700 text-white font-bold py-2 px-4"
                        >
                          Save
                        </button>
                      </div>
                      <div>
                        <button
                          onClick={(e) => removeBreak(breaks)}
                          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
Settings.getLayout = (page: any) => <Layout>{page}</Layout>;

export default Settings;
