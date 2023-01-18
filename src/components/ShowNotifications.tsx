import { Fragment } from "react";
import { Transition } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/outline";
import { XIcon } from "@heroicons/react/solid";
import React, { useEffect } from "react";

import { useNotificationStore } from "../hooks/useNotificationStore";
import type { INotification } from "../hooks/useNotificationStore";
import { v4 as randomId } from "uuid";

//? This is on the basic page layout for every page
//? all you need to do is add to the useNotification hook
export function ShowNotification() {
  const notifications = useNotificationStore((store) => store.notifications);
  return (
    <div className="fixed bottom-6 left-10 z-50">
      {notifications.map((notification) => (
        <Notification {...notification} id={randomId()} key={notification.id} />
      ))}
    </div>
  );
}

function Notification({ id, description, type, title }: INotification) {
  const removeNotification = useNotificationStore(
    (store) => store.removeNotification
  );

  // remove notification after 4 seconds
  useEffect(() => {
    const timeout = setTimeout(() => {
      removeNotification(id);
    }, 4000);
    return () => clearTimeout(timeout);
  }, [id, removeNotification]);

  return (
    <Transition
      as={Fragment}
      enter="transform ease-out duration-300 transition"
      enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
      enterTo="translate-y-0 opacity-100 sm:translate-x-0"
      leave="transition ease-in duration-100"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className={`notification-${type}`}>
        <p className="text-sm font-medium text-gray-900">{title}</p>
        <p className="mt-1 text-sm text-gray-500">{description}</p>
        <button onClick={() => removeNotification(id)}>
          <XIcon className="h-5 w-5 hover:text-prim-400" />
        </button>
      </div>
    </Transition>
  );
}
// const Toast = () => {
//   const notificationState = useNotificationState();
//   const notificationDispatchers = useNotificationDispatch();
//   return (
//     <>
//       {/* Global notification live region, render this permanently at the end of the document */}
//       <div
//         aria-live="assertive"
//         className="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
//       >
//         <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
//           {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
//           <Transition
//             show={notificationState.displayNotification}
//             as={Fragment}
//             enter="transform ease-out duration-300 transition"
//             enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
//             enterTo="translate-y-0 opacity-100 sm:translate-x-0"
//             leave="transition ease-in duration-100"
//             leaveFrom="opacity-100"
//             leaveTo="opacity-0"
//           >
//             <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
//               <div className="p-4">
//                 <div className="flex items-start">
//                   <div className="flex-shrink-0">
//                     <CheckCircleIcon
//                       className="h-6 w-6 text-green-400"
//                       aria-hidden="true"
//                     />
//                   </div>
//                   <div className="ml-3 w-0 flex-1 pt-0.5">
//                     <p className="text-sm font-medium text-gray-900">
//                       {notificationState.title}
//                     </p>
//                     <p className="mt-1 text-sm text-gray-500">
//                       {notificationState.description}
//                     </p>
//                   </div>
//                   <div className="ml-4 flex flex-shrink-0">
//                     <button
//                       type="button"
//                       className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//                       onClick={() => {
//                         notificationDispatchers.hideNotification();
//                       }}
//                     >
//                       <span className="sr-only">Close</span>
//                       <XIcon className="h-5 w-5" aria-hidden="true" />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </Transition>
//         </div>
//       </div>
//     </>
//   );
// };
// export default Toast;
