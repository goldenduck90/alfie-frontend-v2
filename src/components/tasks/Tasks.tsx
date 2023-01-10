import { gql, useQuery } from "@apollo/client"
import * as Sentry from "@sentry/react"
import { useEffect } from "react"
import { UserTask } from "../../graphql/generated"
import { ApplicationLayout } from "../layouts/ApplicationLayout"
import { Loading } from "../Loading"
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

export const Tasks = () => {
  const result = useQuery(userTasksQuery, {
    variables: {
      limit: 100,
      completed: false,
    },
  })
  useEffect(() => {
    // If there is an error with the query, we want to log it to Sentry
    if (result.error) {
      Sentry.captureException(new Error(result.error.message), {
        tags: {
          query: "userTasksQuery",
          component: "Tasks",
        },
      })
    }
  }, [result])
  if (result.loading) return <Loading />
  return (
    <ApplicationLayout title="Tasks">
      <div className="lg:w-full w-full sm:h-52 md:pb-10">
        {result.error && <div>{result.error.message}</div>}
        {!result.error && (
          <div>
            <h1 className="text-xl md:text-2xl font-bold font-mulish">
              Incomplete Tasks:
            </h1>
            {result.data.userTasks.userTasks.map((userTask: UserTask) => (
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
            </div>
          </div>
        )}
      </div>
    </ApplicationLayout>
  )
}
