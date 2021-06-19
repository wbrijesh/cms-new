import { useState, Fragment } from "react";
import { Switch } from "@headlessui/react";
import Link from "next/link";
import moment from "moment";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/solid";

import {
  BriefcaseIcon,
  HomeIcon,
  DocumentReportIcon,
  MenuAlt2Icon,
} from "@heroicons/react/outline";

const navigation = [
  { name: "Home", href: "/", icon: HomeIcon, current: false },
  { name: "Clients", href: "/clients", icon: BriefcaseIcon, current: false },
  {
    name: "Campaigns",
    href: "/campaigns",
    icon: DocumentReportIcon,
    current: true,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const publishingOptions = [
  {
    title: "This Month",
    date: moment().subtract(1, "months").format("YYYY-MM-DD"),
    slug: "created this month: ",
    current: false,
  },
  {
    title: "This Quarter",
    date: moment().subtract(3, "months").format("YYYY-MM-DD"),
    slug: "created this quarter: ",
    current: false,
  },
  {
    title: "This Year",
    date: moment().subtract(12, "months").format("YYYY-MM-DD"),
    slug: "created this year: ",
    current: true,
  },
  {
    title: "Show All",
    date: moment().subtract(9999999, "months").format("YYYY-MM-DD"),
    slug: "created this anytime: ",
    current: true,
  },
];

export default function Content({
  setNavigation,
  setSidebarOpen,
  campaignList,
}) {
  setNavigation(navigation);

  const [selected, setSelected] = useState(publishingOptions[0]);
  const [filteredCampaigns, setFilteredCampaigns] = useState(null);

  var oneYearAgo = moment().subtract(12, "months").format("YYYY-MM-DD");

  async function checkIsAfter() {
    let toFilter = [];
    campaignList.map((campaign) =>
      campaign.date_created > selected.date ? toFilter.push(campaign) : null
    );
    console.log(toFilter);
  }
  checkIsAfter();

  return (
    <>
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

        <main className="flex-1 overflow-y-auto focus:outline-none">
          <div className="relative max-w-4xl mx-auto md:px-8 xl:px-0">
            <div className="md:pt-0 pt-10 pb-16">
              <div className="pb-5 border-b border-gray-200 flex items-center justify-between">
                <h1 className="text-3xl font-semibold text-gray-900">
                  Campaigns
                </h1>
                <div className="mt-3 sm:mt-0 sm:ml-4 flex">
                  <Listbox value={selected} onChange={setSelected}>
                    {({ open }) => (
                      <>
                        <Listbox.Label className="sr-only">
                          Change published status
                        </Listbox.Label>
                        <div className="relative">
                          <div className="inline-flex shadow-sm rounded-md divide-x divide-blue-600">
                            <div className="relative z-0 inline-flex shadow-sm rounded-md divide-x divide-blue-600">
                              <div className="relative inline-flex items-center bg-blue-500 py-2 pl-3 pr-4 border border-transparent rounded-l-md shadow-sm text-white">
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                                <p className="ml-2.5 text-sm font-medium">
                                  {selected.title}
                                </p>
                              </div>
                              <Listbox.Button className="relative inline-flex items-center bg-blue-500 p-2 rounded-l-none rounded-r-md text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:z-10 focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-blue-500">
                                <span className="sr-only">
                                  Change published status
                                </span>
                                <ChevronDownIcon
                                  className="h-5 w-5 text-white"
                                  aria-hidden="true"
                                />
                              </Listbox.Button>
                            </div>
                          </div>

                          <Transition
                            show={open}
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Listbox.Options
                              static
                              className="origin-top-right absolute z-10 right-0 mt-2 w-72 rounded-md shadow-lg overflow-hidden bg-white divide-y divide-gray-200 ring-1 ring-black ring-opacity-5 focus:outline-none"
                            >
                              {publishingOptions.map((option) => (
                                <Listbox.Option
                                  key={option.title}
                                  className={({ active }) =>
                                    classNames(
                                      active
                                        ? "text-white bg-blue-500"
                                        : "text-gray-900",
                                      "cursor-default select-none relative p-4 text-sm"
                                    )
                                  }
                                  value={option}
                                >
                                  {({ selected, active }) => (
                                    <div className="flex flex-col">
                                      <div className="flex justify-between">
                                        <p
                                          className={
                                            selected
                                              ? "font-semibold"
                                              : "font-normal"
                                          }
                                        >
                                          {option.title}
                                        </p>
                                        {selected ? (
                                          <span
                                            className={
                                              active
                                                ? "text-white"
                                                : "text-blue-500"
                                            }
                                          >
                                            <CheckIcon
                                              className="h-5 w-5"
                                              aria-hidden="true"
                                            />
                                          </span>
                                        ) : null}
                                      </div>
                                      <p
                                        className={classNames(
                                          active
                                            ? "text-blue-200"
                                            : "text-gray-500",
                                          "mt-2"
                                        )}
                                      >
                                        {option.description}
                                      </p>
                                    </div>
                                  )}
                                </Listbox.Option>
                              ))}
                            </Listbox.Options>
                          </Transition>
                        </div>
                      </>
                    )}
                  </Listbox>
                  <a
                    type="button"
                    href="/campaigns/new"
                    className="ml-2 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Create new campaign
                  </a>
                </div>
              </div>
              <div className="px-4 sm:px-6 md:px-0">
                <div className="py-6">
                  {/* Description list with inline editing */}
                  <div className="mt-10 divide-y divide-gray-200">
                    <div className="mt-6">
                      <dl className="divide-y divide-gray-200">
                        {campaignList.map((campaign) => (
                          <>
                            {campaign.date_created > selected.date ? (
                              <div
                                className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4"
                                key={campaign.id}
                              >
                                <dt className="text-sm font-medium text-gray-500">
                                  Name
                                </dt>
                                <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                  <span className="flex-grow">
                                    {campaign.name}
                                  </span>
                                  <span className="ml-4 flex-shrink-0">
                                    <Link href={`/campaigns/${campaign.id}`}>
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
    </>
  );
}
