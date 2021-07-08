import { useState } from "react";
import Link from "next/link";
import { Auth } from "aws-amplify";

import {
  BriefcaseIcon,
  ChartSquareBarIcon,
  MenuAlt2Icon,
  HomeIcon,
  UserAddIcon,
  PresentationChartLineIcon,
} from "@heroicons/react/outline";

const navigation = [
  { name: "Home", href: "/", icon: HomeIcon, current: false },
  { name: "Clients", href: "/clients", icon: BriefcaseIcon, current: true },
  {
    name: "Campaigns",
    href: "/campaigns",
    icon: ChartSquareBarIcon,
    current: false,
  },
  { name: "Sales", href: "/sales-team", icon: UserAddIcon, current: false },
  {
    name: "Reports",
    href: "/reports",
    icon: PresentationChartLineIcon,
    current: false,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Content({ setNavigation, setSidebarOpen, clientList }) {
  setNavigation(navigation);

  const [permission, setPermission] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [createPermission, setCreatePermission] = useState(null);

  const newFunc = async () => {
    let thisUser = await Auth.currentAuthenticatedUser();
    setUserDetails(thisUser.attributes.email);
  };
  newFunc();

  const verifyAccess = async () => {
    let thisUser = await Auth.currentAuthenticatedUser();
    console.log(thisUser);
    if (
      thisUser.signInUserSession.accessToken.payload["cognito:groups"][0] ===
      "admin"
    ) {
      console.log("Logged in as admin, all permissions granted");
      setPermission(true);
      setCreatePermission(true);
    } else if (
      thisUser.signInUserSession.accessToken.payload["cognito:groups"][0] ===
      "adops"
    ) {
      console.log("Logged in as adops");
      setPermission(true);
      setCreatePermission(true);
    } else {
      setPermission(false);
      setCreatePermission(false);
    }
  };
  verifyAccess();

  return (
    <>
      {userDetails && (
        <div className="flex-1 flex flex-col">
          <div className="w-full max-w-4xl mx-auto md:px-8 xl:px-0">
            <div className="relative z-10 flex-shrink-0 h-16 bg-white border-b border-gray-200 md:border-white flex">
              <button
                className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 md:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <span className="sr-only">Open sidebar</span>
                <MenuAlt2Icon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          </div>

          <main className="m-2 flex-1 overflow-y-auto focus:outline-none">
            <div className="relative max-w-4xl mx-auto md:px-8 xl:px-0">
              <div className="md:pt-0 pt-10 pb-16">
                <div className="pb-5 border-b border-gray-200 flex items-center justify-between">
                  <h1 className="text-3xl font-semibold text-gray-900">
                    Clients
                  </h1>
                  <div className="mt-3 sm:mt-0 sm:ml-4">
                    {permission && (
                      <a
                        type="button"
                        href="/clients/new"
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Create new client
                      </a>
                    )}
                  </div>
                </div>

                <div className="px-4 sm:px-6 md:px-0">
                  <div className="py-6">
                    {/* Description list with inline editing */}
                    <div className="mt-10 divide-y divide-gray-200">
                      <div className="mt-6">
                        <dl className="divide-y divide-gray-200">
                          <div
                            className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4"
                            key="1"
                          >
                            <dt className="text-sm font-medium text-gray-900">
                              Name
                            </dt>
                            <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                              <span className="flex-grow">Date Modified</span>
                              <span className="ml-4 flex-shrink-0">
                                <a
                                  type="button"
                                  className="bg-white rounded-md font-medium text-gray-900 hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                                >
                                  Manage
                                </a>
                              </span>
                            </dd>
                          </div>
                          {clientList.map((client) => (
                            <>
                              {client.sales_manager_email === userDetails ||
                              permission ? (
                                <>
                                  <div
                                    className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4"
                                    key={client.id}
                                  >
                                    <dt className="text-sm font-medium text-gray-500">
                                      {client.name}
                                    </dt>
                                    <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                      <span className="flex-grow">
                                        {client.date_modified}
                                      </span>
                                      <span className="ml-4 flex-shrink-0">
                                        <Link href={`/clients/${client.id}`}>
                                          <a
                                            type="button"
                                            className="bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                          >
                                            Manage
                                          </a>
                                        </Link>
                                      </span>
                                    </dd>
                                  </div>
                                </>
                              ) : (
                                <></>
                              )}
                            </>
                          ))}
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      )}
    </>
  );
}
