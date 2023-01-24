import {
  BellIcon,
  CheckCircleIcon,
  ChevronRightIcon,
  XCircleIcon,
} from "@heroicons/react/solid";
import { PatientTasksSkeletonLoader } from "@src/components/loading/PatientTasksSkeletonLoader";
import { Layout } from "@src/components/layouts/Layout";

const PatientTasks = ({
  loading,
  data,
  selectATask,
}: {
  loading: boolean;
  data: any;
  selectATask: (task: any) => void;
}) => {
  return (
    <>
      {loading && <PatientTasksSkeletonLoader />}
      <div>
        <ul role="list" className="divide-y divide-gray-200">
          {!loading &&
            data &&
            data.getAllUserTasksByUser.map((task: any) => (
              <li
                onClick={() => selectATask(task)}
                key={task?._id}
                className="hover:bg-gray-50 cursor-pointer"
              >
                <div className="flex items-center px-4 py-4 sm:px-6">
                  <div className="flex min-w-0 flex-1 items-center">
                    <div className="min-w-0 flex-1  md:grid md:grid-cols-2 md:gap-4">
                      <div>
                        <p className="truncate text-sm font-medium text-indigo-600">
                          {task?.task?.name}
                        </p>
                        <p className="mt-2 flex items-center text-sm text-gray-500">
                          <BellIcon
                            className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                            aria-hidden="true"
                          />
                          <span className="truncate">
                            Last notified{" "}
                            {new Date(
                              task?.lastNotifiedUserAt
                            ).toLocaleDateString()}
                          </span>
                        </p>
                      </div>
                      <div className="hidden md:block">
                        <div>
                          <p className="text-sm text-gray-900">
                            Created on{" "}
                            <time dateTime={task?.createdAt}>
                              {/* Format date */}
                              {new Date(task?.createdAt).toLocaleDateString()}
                            </time>
                          </p>
                          <p className="mt-2 flex items-center text-sm text-gray-500">
                            {task?.completed && (
                              <CheckCircleIcon
                                className="mr-1.5 h-5 w-5 flex-shrink-0 text-green-400"
                                aria-hidden="true"
                              />
                            )}
                            {!task?.completed && (
                              <XCircleIcon
                                className="mr-1.5 h-5 w-5 flex-shrink-0 text-red-400"
                                aria-hidden="true"
                              />
                            )}
                            {task?.completed ? "Completed" : "Not Completed"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <ChevronRightIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </li>
            ))}
        </ul>
        {/* <ul>
        {applications.map((application) => (
          <li key={application.applicant.email}>
            <a href={application.href} className="block hover:bg-gray-50">
              <div className="flex items-center px-4 py-4 sm:px-6">
                <div className="flex min-w-0 flex-1 items-center">
                  <div className="min-w-0 flex-1  md:grid md:grid-cols-2 md:gap-4">
                    <div>
                      <p className="truncate text-sm font-medium text-indigo-600">
                        {application.applicant.name}
                      </p>
                      <p className="mt-2 flex items-center text-sm text-gray-500">
                        <BriefcaseIcon
                          className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                          aria-hidden="true"
                        />
                        <span className="truncate">
                          {application.applicant.email}
                        </span>
                      </p>
                    </div>
                    <div className="hidden md:block">
                      <div>
                        <p className="text-sm text-gray-900">
                          Applied on{" "}
                          <time dateTime={application.date}>
                            {application.dateFull}
                          </time>
                        </p>
                        <p className="mt-2 flex items-center text-sm text-gray-500">
                          <CheckCircleIcon
                            className="mr-1.5 h-5 w-5 flex-shrink-0 text-green-400"
                            aria-hidden="true"
                          />
                          {application.stage}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <ChevronRightIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </a>
          </li>
        ))}
      </ul> */}
      </div>
    </>
  );
};
