/* eslint-disable @typescript-eslint/no-explicit-any */
import { gql, useQuery } from "@apollo/client"
import * as Sentry from "@sentry/react"
import { useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { TaskType, UserTask } from "../../graphql/generated"
import { SeeAll } from "../SeeAll"
import { TaskItem } from "./TaskItem"
const userTasksQuery = gql`
  query UserTasksQuery($limit: Float, $offset: Float, $completed: Boolean) {
    userTasks(
      input: { limit: $limit, offset: $offset, completed: $completed }
    ) {
      total
      userTasks {
        _id
        task {
          _id
          name
          type
          highPriority
        }
        dueAt
        pastDue
        createdAt
      }
    }
  }
`

export const DashboardTaskList = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const param = searchParams.get("refetch")
  const result = useQuery(userTasksQuery, {
    variables: {
      limit: 20,
      completed: false,
    },
  })
  const filteredTasks = result.data?.userTasks.userTasks.filter((task: any) => {
    return (
      task.task.type === TaskType.WeightLog ||
      task.task.type === TaskType.NewPatientIntakeForm ||
      task.task.type === TaskType.IdAndInsuranceUpload
    )
  })
  // if filteredTasks is empty, then we want to show the full list of tasks
  const tasks =
    filteredTasks?.length > 0
      ? filteredTasks
      : result?.data?.userTasks?.userTasks
  useEffect(() => {
    if (param !== null) {
      result.refetch()
      searchParams.delete("refetch")
      setSearchParams(searchParams)
    }
  }, [param, result, searchParams, setSearchParams])
  useEffect(() => {
    // If there is an error with the query, we want to log it to Sentry
    if (result.error) {
      Sentry.captureException(new Error(result.error.message), {
        tags: {
          query: "userTasksQuery",
          component: "DashboardTaskList",
        },
      })
    }
  }, [result])
  if (result.loading) return <> Loadingsadada</>
  return (
    <div className="lg:w-full w-full pb-10">
      {result.error && <div>{result.error.message}</div>}
      {!result.error && (
        <div>
          <h1 className="text-xl md:text-2xl font-bold font-mulish">
            Incomplete Tasks:
          </h1>
          {tasks.map((userTask: UserTask) => (
            <div className="pt-6">
              <TaskItem
                key={userTask._id}
                id={userTask._id}
                type={userTask?.task?.type || ""}
                title={userTask?.task?.name || ""}
                createdAt={userTask.createdAt}
                dueAt={userTask.dueAt}
                pastDue={userTask.pastDue}
                actionText="Complete"
              />
            </div>
          ))}
          <div className="mt-2 md:mt-4 flex flex-col md:flex-row items-center justify-center md:justify-end">
            <span className="text-gray-700 text-sm mb-1 md:text-md font-mulish font-medium md:hidden">
              1 of {result.data.userTasks.total}
            </span>
            <SeeAll path="/tasks" name="tasks" />
          </div>
        </div>
      )}
    </div>
  )
}
