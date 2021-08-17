import { useState, Fragment, useEffect } from "react";
import {
  BriefcaseIcon,
  ChartSquareBarIcon,
  MenuAlt2Icon,
  HomeIcon,
  UploadIcon as outlineUploadIcon,
  UserGroupIcon,
  PresentationChartLineIcon,
} from "@heroicons/react/outline";
import {
  InboxInIcon,
  TrendingUpIcon,
  CurrencyRupeeIcon,
  UploadIcon,
} from "@heroicons/react/solid";
import { getJsDateFromExcel } from "excel-date-to-js";
import moment from "moment";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/solid";

const navigation = [
  { name: "Home", href: "/", icon: HomeIcon, current: false },
  { name: "Clients", href: "/clients", icon: BriefcaseIcon, current: false },
  {
    name: "Campaigns",
    href: "/campaigns",
    icon: ChartSquareBarIcon,
    current: false,
  },
  { name: "Sales", href: "/sales-team", icon: UserGroupIcon, current: false },
  {
    name: "Reports",
    href: "/reports",
    icon: PresentationChartLineIcon,
    current: true,
  },
];

const tabs = [
  { name: "Upload", href: "/reports", icon: outlineUploadIcon, current: false },
  {
    name: "Pacing",
    href: "#",
    icon: InboxInIcon,
    current: true,
  },
  {
    name: "Performance",
    href: "/reports/performance",
    icon: TrendingUpIcon,
    current: false,
  },
  {
    name: "Profit",
    href: "/reports/profit",
    icon: CurrencyRupeeIcon,
    current: false,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const publishingOptions = [
  {
    title: "Today (temporary)",
    date: moment().subtract(1, "days").format("YYYY-MM-DD"),
    slug: "created this month: ",
    current: false,
  },
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

// FROM STACKOVERFLOW START
const combine = (data) => {
  let combinedData = data.reduce((acc, curr) => {
    delete curr.date;

    if (acc.length == 0) {
      acc.push(curr);
      return acc;
    }

    let d = acc.find(
      (x) =>
        x.campaign == curr.campaign &&
        x.reference == curr.reference &&
        x.platform == curr.platform
    );

    if (d) {
      d.impressions += curr.impressions;
      d.clicks += curr.clicks;
      d.visits += curr.visits;
      d.views += curr.views;
      d.completed_views += curr.completed_views;
      d.conversions += curr.conversions;
      d.viewability += curr.viewability;
      d.cost += curr.cost;
    } else {
      acc.push(curr);
    }

    return acc;
  }, []);

  return combinedData;
};
// ^^ FROM STACKOVERFLOW END ^^

export default function Content({
  setNavigation,
  setSidebarOpen,
  reports,
  campaigns,
}) {
  setNavigation(navigation);

  const [selected, setSelected] = useState({
    title: "This Month",
    date: moment().subtract(1, "months").format("YYYY-MM-DD"),
    slug: "created this month: ",
    current: false,
  });

  console.log("PAGE RELOAD");
  console.log(reports);

  const [combinedArray, setCombinedArray] = useState([]);
  const [JSONReports, setJSONReports] = useState([]);

  let reportsInJSON = [];

  useEffect(() => {
    console.log("PAGE RELOAD");
    console.log(reports);
    console.log("CAMPAIGNS HERE: ", campaigns);
    const combineReports = (reports) => {
      {
        reports.map((report) =>
          JSON.parse(report.xlsxToJSONStr).map((row) => reportsInJSON.push(row))
        );
        console.log(reportsInJSON);
        setJSONReports(reportsInJSON);
      }
    };
    combineReports(reports);
  }, [reports]);

  useEffect(() => {
    let thisIsCombined = combine(JSONReports);
    console.log("comb: ", thisIsCombined);
    setCombinedArray(thisIsCombined);
  }, [JSONReports]);

  return (
    <>
      {combinedArray && (
        <div className="flex-1 flex flex-col">
          <div className="w-full max-w-6xl mx-auto md:px-8 xl:px-0">
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
            <div className="relative max-w-6xl mx-auto md:px-8 xl:px-0">
              <div className="md:pt-0 pt-10 pb-16">
                <div className="px-4 sm:px-6 md:px-0">
                  <h1 className="text-3xl font-semibold text-gray-900">
                    Reports
                  </h1>
                  <div className="mt-8 mb-6">
                    <div className="sm:hidden">
                      <label htmlFor="tabs" className="sr-only">
                        Select a tab
                      </label>
                      <select
                        id="tabs"
                        name="tabs"
                        className="block w-full focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                        defaultValue={tabs.find((tab) => tab.current).name}
                      >
                        {tabs.map((tab) => (
                          <option key={tab.name}>{tab.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="hidden sm:block">
                      <div className="border-b border-gray-200">
                        <nav
                          className="-mb-px flex space-x-8"
                          aria-label="Tabs"
                        >
                          {tabs.map((tab) => (
                            <a
                              key={tab.name}
                              href={tab.href}
                              className={classNames(
                                tab.current
                                  ? "border-indigo-500 text-indigo-600"
                                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                                "group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm"
                              )}
                              aria-current={tab.current ? "page" : undefined}
                            >
                              <tab.icon
                                className={classNames(
                                  tab.current
                                    ? "text-indigo-500"
                                    : "text-gray-400 group-hover:text-gray-500",
                                  "-ml-0.5 mr-2 h-5 w-5"
                                )}
                                aria-hidden="true"
                              />
                              <span>{tab.name}</span>
                            </a>
                          ))}
                        </nav>
                      </div>
                    </div>
                  </div>
                  {/* comment */}
                  <div className="pb-5 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
                    <h3 className="text-lg leading-6 font-medium text-gray-900"></h3>
                    <div className="mt-3 flex sm:mt-0 sm:ml-4">
                      <Listbox
                        className="mr-0"
                        value={selected}
                        onChange={setSelected}
                      >
                        {({ open }) => (
                          <>
                            <Listbox.Label className="sr-only">
                              Change published status
                            </Listbox.Label>
                            <div className="relative">
                              <div className="inline-flex shadow-sm rounded divide-x-2 divide-blue-500">
                                <div className="relative border-2 border-blue-500 rounded z-0 inline-flex shadow-sm rounded divide-x-2 divide-blue-500">
                                  <div className="relative inline-flex items-center bg-gray-50 py-2 pl-3 pr-4 rounded-l-sm shadow-sm text-blue-600">
                                    <CheckIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                    <p className="ml-2.5 text-sm font-medium">
                                      {selected.title}
                                    </p>
                                  </div>
                                  <Listbox.Button className="relative inline-flex items-center bg-gray-50 p-2 rounded-l-none rounded-r-sm text-sm font-medium text-blue-600 hover:bg-blue-gray-200 focus:outline-none">
                                    <span className="sr-only">
                                      Change published status
                                    </span>
                                    <ChevronDownIcon
                                      className="h-5 w-5 text-blue-600"
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
                                  className="origin-top-right absolute z-10 right-0 mt-2 w-72 rounded shadow-lg overflow-hidden bg-white divide-y divide-gray-200 ring-1 ring-black ring-opacity-5 focus:outline-none"
                                >
                                  {publishingOptions.map((option) => (
                                    <Listbox.Option
                                      key={option.title}
                                      className={({ active }) =>
                                        classNames(
                                          active
                                            ? "cursor-copy text-white bg-blue-500"
                                            : "text-gray-900",
                                          "cursor-copy select-none relative p-2.5 pb-1 text-sm"
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
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                      <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                              <tr>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  Campaign
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  Date
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  Camp Type
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  Impressions
                                </th>

                                <th scope="col" className="relative px-6 py-3">
                                  <span className="sr-only">Edit</span>
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {combinedArray.map((row) => (
                                <tr>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {row.campaign}
                                  </td>

                                  {campaigns.map((campaign) =>
                                    campaign.name === row.campaign ? (
                                      <>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                          {campaign.clientName}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                          {campaign.reference_id_video_campaign ===
                                          row.reference ? (
                                            <>video</>
                                          ) : (
                                            <></>
                                          )}
                                          {campaign.reference_id_search_campaign ===
                                          row.reference ? (
                                            <>search</>
                                          ) : (
                                            <></>
                                          )}
                                          {campaign.reference_id_social_campaign ===
                                          row.reference ? (
                                            <>social</>
                                          ) : (
                                            <></>
                                          )}
                                          {campaign.reference_id_display_campaign ===
                                          row.reference ? (
                                            <>display</>
                                          ) : (
                                            <></>
                                          )}
                                          {campaign.reference_id_richMedia_campaign ===
                                          row.reference ? (
                                            <>Rich media</>
                                          ) : (
                                            <></>
                                          )}
                                          {campaign.reference_id_pop_campaign ===
                                          row.reference ? (
                                            <>pop</>
                                          ) : (
                                            <></>
                                          )}
                                          {campaign.reference_id_push_campaign ===
                                          row.reference ? (
                                            <>push</>
                                          ) : (
                                            <></>
                                          )}
                                          {campaign.reference_id_highImpact_campaign ===
                                          row.reference ? (
                                            <>High impact</>
                                          ) : (
                                            <></>
                                          )}
                                          {campaign.reference_id_native_campaign ===
                                          row.reference ? (
                                            <>native</>
                                          ) : (
                                            <></>
                                          )}
                                        </td>
                                      </>
                                    ) : (
                                      <></>
                                    )
                                  )}
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {row.impressions}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
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
