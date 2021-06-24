import { useState } from "react";
import Link from "next/link";
import {
  BriefcaseIcon,
  DocumentReportIcon,
  MenuAlt2Icon,
  HomeIcon,
  UserAddIcon,
} from "@heroicons/react/outline";

const navigation = [
  { name: "Home", href: "/", icon: HomeIcon, current: false },
  { name: "Clients", href: "/clients", icon: BriefcaseIcon, current: false },
  {
    name: "Campaigns",
    href: "/campaigns",
    icon: DocumentReportIcon,
    current: false,
  },
  { name: "Sales", href: "/sales-team", icon: UserAddIcon, current: true },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Content({ setNavigation, setSidebarOpen, salesList }) {
  setNavigation(navigation);
  console.log("salesList: ", salesList);
  return (
    <>
      sales home{salesList == undefined ? <>not fetched</> : <>fetched</>}
      {/* <div className="flex-1 flex flex-col">
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
                  Sales Team
                </h1>
                <div className="mt-3 sm:mt-0 sm:ml-4">
                  <a
                    type="button"
                    href="sales-team/new"
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Create new sales member
                  </a>
                </div>
              </div>

              <div className="px-4 sm:px-6 md:px-0">
                <div className="py-6">
                  <div className="mt-10 divide-y divide-gray-200">
                    <div className="mt-6">
                      <dl className="divide-y divide-gray-200">
                        {salesList.map((sales) => (
                          <div
                            className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4"
                            key={sales.id}
                          >
                            <dt className="text-sm font-medium text-gray-500">
                              Name
                            </dt>
                            <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                              <span className="flex-grow">{sales.name}</span>
                              <span className="ml-4 flex-shrink-0">
                                <Link href={`sales-team/${sales.id}`}>
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
                        ))}
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div> */}
    </>
  );
}
