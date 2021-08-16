import { useState, Fragment } from "react";
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
    href: "/reports/pacing",
    icon: InboxInIcon,
    current: false,
  },
  {
    name: "Performance",
    href: "#",
    icon: TrendingUpIcon,
    current: false,
  },
  {
    name: "Profit",
    href: "/reports/profit",
    icon: CurrencyRupeeIcon,
    current: true,
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

export default function Content({
  setNavigation,
  setSidebarOpen,
  reports,
  campaigns,
  clients,
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
  return (
    <>
      {reports && (
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
                    Reports {reports.length}
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
                                  Client
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
                                  Revenue
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  Media Cost
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  Rev Type
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  Kickback
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  Profit
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  Profit %
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  Rate
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  Cost Rate
                                </th>

                                <th scope="col" className="relative px-6 py-3">
                                  <span className="sr-only">Edit</span>
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {campaigns.map((campaign) => (
                                <>
                                  {campaign.display_campaign === false &&
                                  campaign.highImpact_campaign === false &&
                                  campaign.native_campaign === false &&
                                  campaign.pop_campaign === false &&
                                  campaign.push_campaign === false &&
                                  campaign.richMedia_campaign === false &&
                                  campaign.search_campaign === false &&
                                  campaign.social_campaign === false &&
                                  campaign.video_campaign === false ? (
                                    <></>
                                  ) : (
                                    <>
                                      {/* DISPLAY_CAMPAIGN */}
                                      {campaign.display_endDate >
                                        selected.date &&
                                      campaign.display_campaign === true ? (
                                        <>
                                          {JSON.parse(
                                            reports[reports.length - 1]
                                              .xlsxToJSONStr
                                          ).map((row) =>
                                            row.reference ===
                                            campaign.reference_id_display_campaign ? (
                                              <>
                                                <tr>
                                                  {/* NAME */}
                                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {campaign.name}
                                                  </td>
                                                  {/* CLIENT */}
                                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {campaign.clientName}
                                                  </td>
                                                  {/* CAMPAIGN TYPE */}
                                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    Display campaign
                                                  </td>
                                                  {/* REVENUE */}
                                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    $
                                                    {campaign.display_revType ===
                                                    "CPM" ? (
                                                      <>
                                                        {parseFloat(
                                                          (row.impressions *
                                                            campaign.display_unitRate) /
                                                            1000
                                                        )}
                                                      </>
                                                    ) : (
                                                      <></>
                                                    )}
                                                    {campaign.display_revType ===
                                                    "CPC" ? (
                                                      <>
                                                        {parseFloat(
                                                          row.clicks *
                                                            campaign.display_unitRate
                                                        )}
                                                      </>
                                                    ) : (
                                                      <></>
                                                    )}
                                                    {campaign.display_revType ===
                                                    "CPCV" ? (
                                                      <>
                                                        {parseFloat(
                                                          row.completed_views *
                                                            campaign.display_unitRate
                                                        )}
                                                      </>
                                                    ) : (
                                                      <></>
                                                    )}
                                                    {campaign.display_revType ===
                                                    "CPL" ? (
                                                      <>
                                                        {parseFloat(
                                                          row.conversions *
                                                            campaign.display_unitRate
                                                        )}
                                                      </>
                                                    ) : (
                                                      <></>
                                                    )}
                                                    {campaign.display_revType ===
                                                    "CPA" ? (
                                                      <>
                                                        {parseFloat(
                                                          row.conversions *
                                                            campaign.display_unitRate
                                                        )}
                                                      </>
                                                    ) : (
                                                      <></>
                                                    )}
                                                    {campaign.display_revType ===
                                                    "CPViews" ? (
                                                      <>
                                                        {parseFloat(
                                                          row.views *
                                                            campaign.display_unitRate
                                                        )}
                                                      </>
                                                    ) : (
                                                      <></>
                                                    )}
                                                    {campaign.display_revType ===
                                                    "CPVisit" ? (
                                                      <>
                                                        {parseFloat(
                                                          row.visits *
                                                            campaign.display_unitRate
                                                        )}
                                                      </>
                                                    ) : (
                                                      <></>
                                                    )}
                                                  </td>
                                                  {/* MEDIA_COST */}
                                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    <>{row.cost}</>
                                                  </td>
                                                  {/* REVENUE_TYPE */}
                                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {campaign.display_revType}
                                                  </td>
                                                  {/* KICKBACK */}
                                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {
                                                      <>
                                                        {campaign.display_revType ===
                                                        "CPM" ? (
                                                          <>
                                                            {clients.map(
                                                              (client) =>
                                                                campaign.clientName ===
                                                                client.name ? (
                                                                  <>
                                                                    {(parseFloat(
                                                                      row.impressions *
                                                                        campaign.display_unitRate
                                                                    ) *
                                                                      client.kickback_value) /
                                                                      100 /
                                                                      1000}
                                                                  </>
                                                                ) : (
                                                                  <></>
                                                                )
                                                            )}
                                                          </>
                                                        ) : (
                                                          <></>
                                                        )}
                                                        {campaign.display_revType ===
                                                        "CPC" ? (
                                                          <>
                                                            {clients.map(
                                                              (client) =>
                                                                campaign.clientName ===
                                                                client.name ? (
                                                                  <>
                                                                    {(parseFloat(
                                                                      row.clicks *
                                                                        campaign.display_unitRate
                                                                    ) *
                                                                      client.kickback_value) /
                                                                      100}
                                                                  </>
                                                                ) : (
                                                                  <></>
                                                                )
                                                            )}
                                                          </>
                                                        ) : (
                                                          <></>
                                                        )}
                                                        {campaign.display_revType ===
                                                        "CPCV" ? (
                                                          <>
                                                            {clients.map(
                                                              (client) =>
                                                                campaign.clientName ===
                                                                client.name ? (
                                                                  <>
                                                                    {(parseFloat(
                                                                      row.completed_views *
                                                                        campaign.display_unitRate
                                                                    ) *
                                                                      client.kickback_value) /
                                                                      100}
                                                                  </>
                                                                ) : (
                                                                  <></>
                                                                )
                                                            )}
                                                          </>
                                                        ) : (
                                                          <></>
                                                        )}
                                                        {campaign.display_revType ===
                                                        "CPL" ? (
                                                          <>
                                                            {clients.map(
                                                              (client) =>
                                                                campaign.clientName ===
                                                                client.name ? (
                                                                  <>
                                                                    {(parseFloat(
                                                                      row.conversions *
                                                                        campaign.display_unitRate
                                                                    ) *
                                                                      client.kickback_value) /
                                                                      100}
                                                                  </>
                                                                ) : (
                                                                  <></>
                                                                )
                                                            )}
                                                          </>
                                                        ) : (
                                                          <></>
                                                        )}
                                                        {campaign.display_revType ===
                                                        "CPA" ? (
                                                          <>
                                                            {clients.map(
                                                              (client) =>
                                                                campaign.clientName ===
                                                                client.name ? (
                                                                  <>
                                                                    {(parseFloat(
                                                                      row.conversions *
                                                                        campaign.display_unitRate
                                                                    ) *
                                                                      client.kickback_value) /
                                                                      100}
                                                                  </>
                                                                ) : (
                                                                  <></>
                                                                )
                                                            )}
                                                          </>
                                                        ) : (
                                                          <></>
                                                        )}
                                                        {campaign.display_revType ===
                                                        "CPViews" ? (
                                                          <>
                                                            {clients.map(
                                                              (client) =>
                                                                campaign.clientName ===
                                                                client.name ? (
                                                                  <>
                                                                    {(parseFloat(
                                                                      row.views *
                                                                        campaign.display_unitRate
                                                                    ) *
                                                                      client.kickback_value) /
                                                                      100}
                                                                  </>
                                                                ) : (
                                                                  <></>
                                                                )
                                                            )}
                                                          </>
                                                        ) : (
                                                          <></>
                                                        )}
                                                        {campaign.display_revType ===
                                                        "CPVisit" ? (
                                                          <>
                                                            {clients.map(
                                                              (client) =>
                                                                campaign.clientName ===
                                                                client.name ? (
                                                                  <>
                                                                    {(parseFloat(
                                                                      row.visits *
                                                                        campaign.display_unitRate
                                                                    ) *
                                                                      client.kickback_value) /
                                                                      100}
                                                                  </>
                                                                ) : (
                                                                  <></>
                                                                )
                                                            )}
                                                          </>
                                                        ) : (
                                                          <></>
                                                        )}
                                                      </>
                                                    }
                                                  </td>
                                                  {/* PROFIT */}
                                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    <>
                                                      {campaign.display_revType ===
                                                      "CPM" ? (
                                                        <>
                                                          {clients.map(
                                                            (client) =>
                                                              campaign.clientName ===
                                                              client.name ? (
                                                                <>
                                                                  {parseFloat(
                                                                    row.impressions *
                                                                      (campaign.display_unitRate /
                                                                        1000) *
                                                                      (1 -
                                                                        client.kickback_value /
                                                                          100) -
                                                                      row.cost
                                                                  ).toFixed(2)}
                                                                </>
                                                              ) : (
                                                                <></>
                                                              )
                                                          )}
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}
                                                      {campaign.display_revType ===
                                                      "CPC" ? (
                                                        <>
                                                          {clients.map(
                                                            (client) =>
                                                              campaign.clientName ===
                                                              client.name ? (
                                                                <>
                                                                  {parseFloat(
                                                                    row.clicks *
                                                                      campaign.display_unitRate *
                                                                      (1 -
                                                                        client.kickback_value /
                                                                          100) -
                                                                      row.cost
                                                                  ).toFixed(2)}
                                                                </>
                                                              ) : (
                                                                <></>
                                                              )
                                                          )}
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}
                                                      {campaign.display_revType ===
                                                      "CPCV" ? (
                                                        <>
                                                          {clients.map(
                                                            (client) =>
                                                              campaign.clientName ===
                                                              client.name ? (
                                                                <>
                                                                  {parseFloat(
                                                                    row.completed_views *
                                                                      campaign.display_unitRate *
                                                                      (1 -
                                                                        client.kickback_value /
                                                                          100) -
                                                                      row.cost
                                                                  ).toFixed(2)}
                                                                </>
                                                              ) : (
                                                                <></>
                                                              )
                                                          )}
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}
                                                      {campaign.display_revType ===
                                                      "CPL" ? (
                                                        <>
                                                          {clients.map(
                                                            (client) =>
                                                              campaign.clientName ===
                                                              client.name ? (
                                                                <>
                                                                  {parseFloat(
                                                                    row.conversions *
                                                                      campaign.display_unitRate *
                                                                      (1 -
                                                                        client.kickback_value /
                                                                          100) -
                                                                      row.cost
                                                                  ).toFixed(2)}
                                                                </>
                                                              ) : (
                                                                <></>
                                                              )
                                                          )}
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}
                                                      {campaign.display_revType ===
                                                      "CPA" ? (
                                                        <>
                                                          {clients.map(
                                                            (client) =>
                                                              campaign.clientName ===
                                                              client.name ? (
                                                                <>
                                                                  {parseFloat(
                                                                    row.conversions *
                                                                      campaign.display_unitRate *
                                                                      (1 -
                                                                        client.kickback_value /
                                                                          100) -
                                                                      row.cost
                                                                  ).toFixed(2)}
                                                                </>
                                                              ) : (
                                                                <></>
                                                              )
                                                          )}
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}
                                                      {campaign.display_revType ===
                                                      "CPViews" ? (
                                                        <>
                                                          {clients.map(
                                                            (client) =>
                                                              campaign.clientName ===
                                                              client.name ? (
                                                                <>
                                                                  {parseFloat(
                                                                    row.views *
                                                                      campaign.display_unitRate *
                                                                      (1 -
                                                                        client.kickback_value /
                                                                          100) -
                                                                      row.cost
                                                                  ).toFixed(2)}
                                                                </>
                                                              ) : (
                                                                <></>
                                                              )
                                                          )}
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}
                                                      {campaign.display_revType ===
                                                      "CPVisit" ? (
                                                        <>
                                                          {clients.map(
                                                            (client) =>
                                                              campaign.clientName ===
                                                              client.name ? (
                                                                <>
                                                                  {parseFloat(
                                                                    row.visits *
                                                                      campaign.display_unitRate *
                                                                      (1 -
                                                                        client.kickback_value /
                                                                          100) -
                                                                      row.cost
                                                                  ).toFixed(2)}
                                                                </>
                                                              ) : (
                                                                <></>
                                                              )
                                                          )}
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}
                                                    </>
                                                  </td>
                                                  {/* PROFIT_PERCENTAGE */}
                                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    <>
                                                      {campaign.display_revType ===
                                                      "CPM" ? (
                                                        <>
                                                          {clients.map(
                                                            (client) =>
                                                              campaign.clientName ===
                                                              client.name ? (
                                                                <>
                                                                  {parseFloat(
                                                                    ((row.impressions *
                                                                      (campaign.display_unitRate /
                                                                        1000) *
                                                                      (1 -
                                                                        client.kickback_value /
                                                                          100) -
                                                                      row.cost) /
                                                                      (row.impressions *
                                                                        campaign.display_unitRate)) *
                                                                      100
                                                                  ).toFixed(2)}
                                                                </>
                                                              ) : (
                                                                <></>
                                                              )
                                                          )}

                                                          {" %"}
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}
                                                      {campaign.display_revType ===
                                                      "CPC" ? (
                                                        <>
                                                          {clients.map(
                                                            (client) =>
                                                              campaign.clientName ===
                                                              client.name ? (
                                                                <>
                                                                  {parseFloat(
                                                                    ((row.clicks *
                                                                      campaign.display_unitRate *
                                                                      (1 -
                                                                        client.kickback_value /
                                                                          100) -
                                                                      row.cost) /
                                                                      (row.clicks *
                                                                        campaign.display_unitRate)) *
                                                                      100
                                                                  ).toFixed(2)}
                                                                </>
                                                              ) : (
                                                                <></>
                                                              )
                                                          )}
                                                          {" %"}
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}
                                                      {campaign.display_revType ===
                                                      "CPCV" ? (
                                                        <>
                                                          {clients.map(
                                                            (client) =>
                                                              campaign.clientName ===
                                                              client.name ? (
                                                                <>
                                                                  {parseFloat(
                                                                    ((row.completed_views *
                                                                      campaign.display_unitRate *
                                                                      (1 -
                                                                        client.kickback_value /
                                                                          100) -
                                                                      row.cost) /
                                                                      (row.completed_views *
                                                                        campaign.display_unitRate)) *
                                                                      100
                                                                  ).toFixed(2)}
                                                                </>
                                                              ) : (
                                                                <></>
                                                              )
                                                          )}
                                                          {" %"}
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}
                                                      {campaign.display_revType ===
                                                      "CPL" ? (
                                                        <>
                                                          {clients.map(
                                                            (client) =>
                                                              campaign.clientName ===
                                                              client.name ? (
                                                                <>
                                                                  {parseFloat(
                                                                    ((row.conversions *
                                                                      campaign.display_unitRate *
                                                                      (1 -
                                                                        client.kickback_value /
                                                                          100) -
                                                                      row.cost) /
                                                                      (row.conversions *
                                                                        campaign.display_unitRate)) *
                                                                      100
                                                                  ).toFixed(2)}
                                                                </>
                                                              ) : (
                                                                <></>
                                                              )
                                                          )}
                                                          {" %"}
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}
                                                      {campaign.display_revType ===
                                                      "CPA" ? (
                                                        <>
                                                          {clients.map(
                                                            (client) =>
                                                              campaign.clientName ===
                                                              client.name ? (
                                                                <>
                                                                  {parseFloat(
                                                                    ((row.conversions *
                                                                      campaign.display_unitRate *
                                                                      (1 -
                                                                        client.kickback_value /
                                                                          100) -
                                                                      row.cost) /
                                                                      (row.conversions *
                                                                        campaign.display_unitRate)) *
                                                                      100
                                                                  ).toFixed(2)}
                                                                </>
                                                              ) : (
                                                                <></>
                                                              )
                                                          )}
                                                          {" %"}
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}
                                                      {campaign.display_revType ===
                                                      "CPViews" ? (
                                                        <>
                                                          {clients.map(
                                                            (client) =>
                                                              campaign.clientName ===
                                                              client.name ? (
                                                                <>
                                                                  {parseFloat(
                                                                    ((row.views *
                                                                      campaign.display_unitRate *
                                                                      (1 -
                                                                        client.kickback_value /
                                                                          100) -
                                                                      row.cost) /
                                                                      (row.views *
                                                                        campaign.display_unitRate)) *
                                                                      100
                                                                  ).toFixed(2)}
                                                                </>
                                                              ) : (
                                                                <></>
                                                              )
                                                          )}
                                                          {" %"}
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}
                                                      {campaign.display_revType ===
                                                      "CPVisit" ? (
                                                        <>
                                                          {clients.map(
                                                            (client) =>
                                                              campaign.clientName ===
                                                              client.name ? (
                                                                <>
                                                                  {parseFloat(
                                                                    ((row.visits *
                                                                      campaign.display_unitRate *
                                                                      (1 -
                                                                        client.kickback_value /
                                                                          100) -
                                                                      row.cost) /
                                                                      (row.visits *
                                                                        campaign.display_unitRate)) *
                                                                      100
                                                                  ).toFixed(2)}
                                                                </>
                                                              ) : (
                                                                <></>
                                                              )
                                                          )}
                                                          {" %"}
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}
                                                    </>
                                                  </td>

                                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {campaign.display_unitRate}
                                                  </td>
                                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {
                                                      <>
                                                        {campaign.display_revType ===
                                                        "CPM" ? (
                                                          <>
                                                            {parseFloat(
                                                              (row.cost *
                                                                1000) /
                                                                row.impressions
                                                            ).toFixed(2)}
                                                          </>
                                                        ) : (
                                                          <></>
                                                        )}
                                                        {campaign.display_revType ===
                                                        "CPC" ? (
                                                          <>
                                                            {parseFloat(
                                                              row.cost /
                                                                row.clicks
                                                            ).toFixed(2)}
                                                          </>
                                                        ) : (
                                                          <></>
                                                        )}
                                                        {campaign.display_revType ===
                                                        "CPCV" ? (
                                                          <>
                                                            {parseFloat(
                                                              row.cost /
                                                                row.completed_views
                                                            ).toFixed(2)}
                                                          </>
                                                        ) : (
                                                          <></>
                                                        )}
                                                        {campaign.display_revType ===
                                                        "CPL" ? (
                                                          <>
                                                            {parseFloat(
                                                              row.cost /
                                                                row.conversions
                                                            ).toFixed(2)}
                                                          </>
                                                        ) : (
                                                          <></>
                                                        )}
                                                        {campaign.display_revType ===
                                                        "CPA" ? (
                                                          <>
                                                            {parseFloat(
                                                              row.cost /
                                                                row.conversions
                                                            ).toFixed(2)}
                                                          </>
                                                        ) : (
                                                          <></>
                                                        )}
                                                        {campaign.display_revType ===
                                                        "CPViews" ? (
                                                          <>
                                                            {parseFloat(
                                                              row.cost /
                                                                row.views
                                                            ).toFixed(2)}
                                                          </>
                                                        ) : (
                                                          <></>
                                                        )}
                                                        {campaign.display_revType ===
                                                        "CPVisit" ? (
                                                          <>
                                                            {parseFloat(
                                                              row.cost /
                                                                row.visits
                                                            ).toFixed(2)}
                                                          </>
                                                        ) : (
                                                          <></>
                                                        )}
                                                      </>
                                                    }
                                                  </td>
                                                </tr>
                                              </>
                                            ) : (
                                              <></>
                                            )
                                          )}
                                        </>
                                      ) : (
                                        <></>
                                      )}
                                      {/* HIGHIMPACT_CAMPAIGN */}
                                      {campaign.highImpact_endDate >
                                        selected.date &&
                                      campaign.highImpact_campaign === true ? (
                                        <>
                                          {JSON.parse(
                                            reports[reports.length - 1]
                                              .xlsxToJSONStr
                                          ).map((row) =>
                                            row.reference ===
                                            campaign.reference_id_highImpact_campaign ? (
                                              <>
                                                <tr>
                                                  {/* NAME */}
                                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {campaign.name}
                                                  </td>
                                                  {/* CLIENT */}
                                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {campaign.clientName}
                                                  </td>
                                                  {/* CAMPAIGN TYPE */}
                                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    High Impact campaign
                                                  </td>
                                                  {/* REVENUE */}
                                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    $
                                                    {campaign.highImpact_revType ===
                                                    "CPM" ? (
                                                      <>
                                                        {parseFloat(
                                                          (row.impressions *
                                                            campaign.highImpact_unitRate) /
                                                            1000
                                                        )}
                                                      </>
                                                    ) : (
                                                      <></>
                                                    )}
                                                    {campaign.highImpact_revType ===
                                                    "CPC" ? (
                                                      <>
                                                        {parseFloat(
                                                          row.clicks *
                                                            campaign.highImpact_unitRate
                                                        )}
                                                      </>
                                                    ) : (
                                                      <></>
                                                    )}
                                                    {campaign.highImpact_revType ===
                                                    "CPCV" ? (
                                                      <>
                                                        {parseFloat(
                                                          row.completed_views *
                                                            campaign.highImpact_unitRate
                                                        )}
                                                      </>
                                                    ) : (
                                                      <></>
                                                    )}
                                                    {campaign.highImpact_revType ===
                                                    "CPL" ? (
                                                      <>
                                                        {parseFloat(
                                                          row.conversions *
                                                            campaign.highImpact_unitRate
                                                        )}
                                                      </>
                                                    ) : (
                                                      <></>
                                                    )}
                                                    {campaign.highImpact_revType ===
                                                    "CPA" ? (
                                                      <>
                                                        {parseFloat(
                                                          row.conversions *
                                                            campaign.highImpact_unitRate
                                                        )}
                                                      </>
                                                    ) : (
                                                      <></>
                                                    )}
                                                    {campaign.highImpact_revType ===
                                                    "CPViews" ? (
                                                      <>
                                                        {parseFloat(
                                                          row.views *
                                                            campaign.highImpact_unitRate
                                                        )}
                                                      </>
                                                    ) : (
                                                      <></>
                                                    )}
                                                    {campaign.highImpact_revType ===
                                                    "CPVisit" ? (
                                                      <>
                                                        {parseFloat(
                                                          row.visits *
                                                            campaign.highImpact_unitRate
                                                        )}
                                                      </>
                                                    ) : (
                                                      <></>
                                                    )}
                                                  </td>
                                                  {/* MEDIA_COST */}
                                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    <>{row.cost}</>
                                                  </td>
                                                  {/* REVENUE_TYPE */}
                                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {
                                                      campaign.highImpact_revType
                                                    }
                                                  </td>
                                                  {/* KICKBACK */}
                                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {
                                                      <>
                                                        {campaign.highImpact_revType ===
                                                        "CPM" ? (
                                                          <>
                                                            {clients.map(
                                                              (client) =>
                                                                campaign.clientName ===
                                                                client.name ? (
                                                                  <>
                                                                    {(parseFloat(
                                                                      row.impressions *
                                                                        campaign.highImpact_unitRate
                                                                    ) *
                                                                      client.kickback_value) /
                                                                      100 /
                                                                      1000}
                                                                  </>
                                                                ) : (
                                                                  <></>
                                                                )
                                                            )}
                                                          </>
                                                        ) : (
                                                          <></>
                                                        )}
                                                        {campaign.highImpact_revType ===
                                                        "CPC" ? (
                                                          <>
                                                            {clients.map(
                                                              (client) =>
                                                                campaign.clientName ===
                                                                client.name ? (
                                                                  <>
                                                                    {(parseFloat(
                                                                      row.clicks *
                                                                        campaign.highImpact_unitRate
                                                                    ) *
                                                                      client.kickback_value) /
                                                                      100}
                                                                  </>
                                                                ) : (
                                                                  <></>
                                                                )
                                                            )}
                                                          </>
                                                        ) : (
                                                          <></>
                                                        )}
                                                        {campaign.highImpact_revType ===
                                                        "CPCV" ? (
                                                          <>
                                                            {clients.map(
                                                              (client) =>
                                                                campaign.clientName ===
                                                                client.name ? (
                                                                  <>
                                                                    {(parseFloat(
                                                                      row.completed_views *
                                                                        campaign.highImpact_unitRate
                                                                    ) *
                                                                      client.kickback_value) /
                                                                      100}
                                                                  </>
                                                                ) : (
                                                                  <></>
                                                                )
                                                            )}
                                                          </>
                                                        ) : (
                                                          <></>
                                                        )}
                                                        {campaign.highImpact_revType ===
                                                        "CPL" ? (
                                                          <>
                                                            {clients.map(
                                                              (client) =>
                                                                campaign.clientName ===
                                                                client.name ? (
                                                                  <>
                                                                    {(parseFloat(
                                                                      row.conversions *
                                                                        campaign.highImpact_unitRate
                                                                    ) *
                                                                      client.kickback_value) /
                                                                      100}
                                                                  </>
                                                                ) : (
                                                                  <></>
                                                                )
                                                            )}
                                                          </>
                                                        ) : (
                                                          <></>
                                                        )}
                                                        {campaign.highImpact_revType ===
                                                        "CPA" ? (
                                                          <>
                                                            {clients.map(
                                                              (client) =>
                                                                campaign.clientName ===
                                                                client.name ? (
                                                                  <>
                                                                    {(parseFloat(
                                                                      row.conversions *
                                                                        campaign.highImpact_unitRate
                                                                    ) *
                                                                      client.kickback_value) /
                                                                      100}
                                                                  </>
                                                                ) : (
                                                                  <></>
                                                                )
                                                            )}
                                                          </>
                                                        ) : (
                                                          <></>
                                                        )}
                                                        {campaign.highImpact_revType ===
                                                        "CPViews" ? (
                                                          <>
                                                            {clients.map(
                                                              (client) =>
                                                                campaign.clientName ===
                                                                client.name ? (
                                                                  <>
                                                                    {(parseFloat(
                                                                      row.views *
                                                                        campaign.highImpact_unitRate
                                                                    ) *
                                                                      client.kickback_value) /
                                                                      100}
                                                                  </>
                                                                ) : (
                                                                  <></>
                                                                )
                                                            )}
                                                          </>
                                                        ) : (
                                                          <></>
                                                        )}
                                                        {campaign.highImpact_revType ===
                                                        "CPVisit" ? (
                                                          <>
                                                            {clients.map(
                                                              (client) =>
                                                                campaign.clientName ===
                                                                client.name ? (
                                                                  <>
                                                                    {(parseFloat(
                                                                      row.visits *
                                                                        campaign.highImpact_unitRate
                                                                    ) *
                                                                      client.kickback_value) /
                                                                      100}
                                                                  </>
                                                                ) : (
                                                                  <></>
                                                                )
                                                            )}
                                                          </>
                                                        ) : (
                                                          <></>
                                                        )}
                                                      </>
                                                    }
                                                  </td>
                                                  {/* PROFIT */}
                                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    <>
                                                      {campaign.highImpact_revType ===
                                                      "CPM" ? (
                                                        <>
                                                          {clients.map(
                                                            (client) =>
                                                              campaign.clientName ===
                                                              client.name ? (
                                                                <>
                                                                  {parseFloat(
                                                                    row.impressions *
                                                                      (campaign.highImpact_unitRate /
                                                                        1000) *
                                                                      (1 -
                                                                        client.kickback_value /
                                                                          100) -
                                                                      row.cost
                                                                  ).toFixed(2)}
                                                                </>
                                                              ) : (
                                                                <></>
                                                              )
                                                          )}
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}
                                                      {campaign.highImpact_revType ===
                                                      "CPC" ? (
                                                        <>
                                                          {clients.map(
                                                            (client) =>
                                                              campaign.clientName ===
                                                              client.name ? (
                                                                <>
                                                                  {parseFloat(
                                                                    row.clicks *
                                                                      campaign.highImpact_unitRate *
                                                                      (1 -
                                                                        client.kickback_value /
                                                                          100) -
                                                                      row.cost
                                                                  ).toFixed(2)}
                                                                </>
                                                              ) : (
                                                                <></>
                                                              )
                                                          )}
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}
                                                      {campaign.highImpact_revType ===
                                                      "CPCV" ? (
                                                        <>
                                                          {clients.map(
                                                            (client) =>
                                                              campaign.clientName ===
                                                              client.name ? (
                                                                <>
                                                                  {parseFloat(
                                                                    row.completed_views *
                                                                      campaign.highImpact_unitRate *
                                                                      (1 -
                                                                        client.kickback_value /
                                                                          100) -
                                                                      row.cost
                                                                  ).toFixed(2)}
                                                                </>
                                                              ) : (
                                                                <></>
                                                              )
                                                          )}
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}
                                                      {campaign.highImpact_revType ===
                                                      "CPL" ? (
                                                        <>
                                                          {clients.map(
                                                            (client) =>
                                                              campaign.clientName ===
                                                              client.name ? (
                                                                <>
                                                                  {parseFloat(
                                                                    row.conversions *
                                                                      campaign.highImpact_unitRate *
                                                                      (1 -
                                                                        client.kickback_value /
                                                                          100) -
                                                                      row.cost
                                                                  ).toFixed(2)}
                                                                </>
                                                              ) : (
                                                                <></>
                                                              )
                                                          )}
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}
                                                      {campaign.highImpact_revType ===
                                                      "CPA" ? (
                                                        <>
                                                          {clients.map(
                                                            (client) =>
                                                              campaign.clientName ===
                                                              client.name ? (
                                                                <>
                                                                  {parseFloat(
                                                                    row.conversions *
                                                                      campaign.highImpact_unitRate *
                                                                      (1 -
                                                                        client.kickback_value /
                                                                          100) -
                                                                      row.cost
                                                                  ).toFixed(2)}
                                                                </>
                                                              ) : (
                                                                <></>
                                                              )
                                                          )}
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}
                                                      {campaign.highImpact_revType ===
                                                      "CPViews" ? (
                                                        <>
                                                          {clients.map(
                                                            (client) =>
                                                              campaign.clientName ===
                                                              client.name ? (
                                                                <>
                                                                  {parseFloat(
                                                                    row.views *
                                                                      campaign.highImpact_unitRate *
                                                                      (1 -
                                                                        client.kickback_value /
                                                                          100) -
                                                                      row.cost
                                                                  ).toFixed(2)}
                                                                </>
                                                              ) : (
                                                                <></>
                                                              )
                                                          )}
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}
                                                      {campaign.highImpact_revType ===
                                                      "CPVisit" ? (
                                                        <>
                                                          {clients.map(
                                                            (client) =>
                                                              campaign.clientName ===
                                                              client.name ? (
                                                                <>
                                                                  {parseFloat(
                                                                    row.visits *
                                                                      campaign.highImpact_unitRate *
                                                                      (1 -
                                                                        client.kickback_value /
                                                                          100) -
                                                                      row.cost
                                                                  ).toFixed(2)}
                                                                </>
                                                              ) : (
                                                                <></>
                                                              )
                                                          )}
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}
                                                    </>
                                                  </td>
                                                  {/* PROFIT_PERCENTAGE */}
                                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    <>
                                                      {campaign.highImpact_revType ===
                                                      "CPM" ? (
                                                        <>
                                                          {clients.map(
                                                            (client) =>
                                                              campaign.clientName ===
                                                              client.name ? (
                                                                <>
                                                                  {parseFloat(
                                                                    ((row.impressions *
                                                                      (campaign.highImpact_unitRate /
                                                                        1000) *
                                                                      (1 -
                                                                        client.kickback_value /
                                                                          100) -
                                                                      row.cost) /
                                                                      (row.impressions *
                                                                        campaign.highImpact_unitRate)) *
                                                                      100
                                                                  ).toFixed(2)}
                                                                </>
                                                              ) : (
                                                                <></>
                                                              )
                                                          )}

                                                          {" %"}
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}
                                                      {campaign.highImpact_revType ===
                                                      "CPC" ? (
                                                        <>
                                                          {clients.map(
                                                            (client) =>
                                                              campaign.clientName ===
                                                              client.name ? (
                                                                <>
                                                                  {parseFloat(
                                                                    ((row.clicks *
                                                                      campaign.highImpact_unitRate *
                                                                      (1 -
                                                                        client.kickback_value /
                                                                          100) -
                                                                      row.cost) /
                                                                      (row.clicks *
                                                                        campaign.highImpact_unitRate)) *
                                                                      100
                                                                  ).toFixed(2)}
                                                                </>
                                                              ) : (
                                                                <></>
                                                              )
                                                          )}
                                                          {" %"}
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}
                                                      {campaign.highImpact_revType ===
                                                      "CPCV" ? (
                                                        <>
                                                          {clients.map(
                                                            (client) =>
                                                              campaign.clientName ===
                                                              client.name ? (
                                                                <>
                                                                  {parseFloat(
                                                                    ((row.completed_views *
                                                                      campaign.highImpact_unitRate *
                                                                      (1 -
                                                                        client.kickback_value /
                                                                          100) -
                                                                      row.cost) /
                                                                      (row.completed_views *
                                                                        campaign.highImpact_unitRate)) *
                                                                      100
                                                                  ).toFixed(2)}
                                                                </>
                                                              ) : (
                                                                <></>
                                                              )
                                                          )}
                                                          {" %"}
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}
                                                      {campaign.highImpact_revType ===
                                                      "CPL" ? (
                                                        <>
                                                          {clients.map(
                                                            (client) =>
                                                              campaign.clientName ===
                                                              client.name ? (
                                                                <>
                                                                  {parseFloat(
                                                                    ((row.conversions *
                                                                      campaign.highImpact_unitRate *
                                                                      (1 -
                                                                        client.kickback_value /
                                                                          100) -
                                                                      row.cost) /
                                                                      (row.conversions *
                                                                        campaign.highImpact_unitRate)) *
                                                                      100
                                                                  ).toFixed(2)}
                                                                </>
                                                              ) : (
                                                                <></>
                                                              )
                                                          )}
                                                          {" %"}
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}
                                                      {campaign.highImpact_revType ===
                                                      "CPA" ? (
                                                        <>
                                                          {clients.map(
                                                            (client) =>
                                                              campaign.clientName ===
                                                              client.name ? (
                                                                <>
                                                                  {parseFloat(
                                                                    ((row.conversions *
                                                                      campaign.highImpact_unitRate *
                                                                      (1 -
                                                                        client.kickback_value /
                                                                          100) -
                                                                      row.cost) /
                                                                      (row.conversions *
                                                                        campaign.highImpact_unitRate)) *
                                                                      100
                                                                  ).toFixed(2)}
                                                                </>
                                                              ) : (
                                                                <></>
                                                              )
                                                          )}
                                                          {" %"}
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}
                                                      {campaign.highImpact_revType ===
                                                      "CPViews" ? (
                                                        <>
                                                          {clients.map(
                                                            (client) =>
                                                              campaign.clientName ===
                                                              client.name ? (
                                                                <>
                                                                  {parseFloat(
                                                                    ((row.views *
                                                                      campaign.highImpact_unitRate *
                                                                      (1 -
                                                                        client.kickback_value /
                                                                          100) -
                                                                      row.cost) /
                                                                      (row.views *
                                                                        campaign.highImpact_unitRate)) *
                                                                      100
                                                                  ).toFixed(2)}
                                                                </>
                                                              ) : (
                                                                <></>
                                                              )
                                                          )}
                                                          {" %"}
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}
                                                      {campaign.highImpact_revType ===
                                                      "CPVisit" ? (
                                                        <>
                                                          {clients.map(
                                                            (client) =>
                                                              campaign.clientName ===
                                                              client.name ? (
                                                                <>
                                                                  {parseFloat(
                                                                    ((row.visits *
                                                                      campaign.highImpact_unitRate *
                                                                      (1 -
                                                                        client.kickback_value /
                                                                          100) -
                                                                      row.cost) /
                                                                      (row.visits *
                                                                        campaign.highImpact_unitRate)) *
                                                                      100
                                                                  ).toFixed(2)}
                                                                </>
                                                              ) : (
                                                                <></>
                                                              )
                                                          )}
                                                          {" %"}
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}
                                                    </>
                                                  </td>

                                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {
                                                      campaign.highImpact_unitRate
                                                    }
                                                  </td>
                                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {
                                                      <>
                                                        {campaign.highImpact_revType ===
                                                        "CPM" ? (
                                                          <>
                                                            {parseFloat(
                                                              (row.cost *
                                                                1000) /
                                                                row.impressions
                                                            ).toFixed(2)}
                                                          </>
                                                        ) : (
                                                          <></>
                                                        )}
                                                        {campaign.highImpact_revType ===
                                                        "CPC" ? (
                                                          <>
                                                            {parseFloat(
                                                              row.cost /
                                                                row.clicks
                                                            ).toFixed(2)}
                                                          </>
                                                        ) : (
                                                          <></>
                                                        )}
                                                        {campaign.highImpact_revType ===
                                                        "CPCV" ? (
                                                          <>
                                                            {parseFloat(
                                                              row.cost /
                                                                row.completed_views
                                                            ).toFixed(2)}
                                                          </>
                                                        ) : (
                                                          <></>
                                                        )}
                                                        {campaign.highImpact_revType ===
                                                        "CPL" ? (
                                                          <>
                                                            {parseFloat(
                                                              row.cost /
                                                                row.conversions
                                                            ).toFixed(2)}
                                                          </>
                                                        ) : (
                                                          <></>
                                                        )}
                                                        {campaign.highImpact_revType ===
                                                        "CPA" ? (
                                                          <>
                                                            {parseFloat(
                                                              row.cost /
                                                                row.conversions
                                                            ).toFixed(2)}
                                                          </>
                                                        ) : (
                                                          <></>
                                                        )}
                                                        {campaign.highImpact_revType ===
                                                        "CPViews" ? (
                                                          <>
                                                            {parseFloat(
                                                              row.cost /
                                                                row.views
                                                            ).toFixed(2)}
                                                          </>
                                                        ) : (
                                                          <></>
                                                        )}
                                                        {campaign.highImpact_revType ===
                                                        "CPVisit" ? (
                                                          <>
                                                            {parseFloat(
                                                              row.cost /
                                                                row.visits
                                                            ).toFixed(2)}
                                                          </>
                                                        ) : (
                                                          <></>
                                                        )}
                                                      </>
                                                    }
                                                  </td>
                                                </tr>
                                              </>
                                            ) : (
                                              <></>
                                            )
                                          )}
                                        </>
                                      ) : (
                                        <></>
                                      )}

                                      {/* NATIVE_CAMPAIGN */}
                                      {campaign.native_endDate >
                                        selected.date &&
                                      campaign.native_campaign === true ? (
                                        <>
                                          {JSON.parse(
                                            reports[reports.length - 1]
                                              .xlsxToJSONStr
                                          ).map((row) =>
                                            row.reference ===
                                            campaign.reference_id_native_campaign ? (
                                              <>
                                                <tr>
                                                  {/* NAME */}
                                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {campaign.name}
                                                  </td>
                                                  {/* CLIENT */}
                                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {campaign.clientName}
                                                  </td>
                                                  {/* CAMPAIGN TYPE */}
                                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    Native campaign
                                                  </td>
                                                  {/* REVENUE */}
                                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    $
                                                    {campaign.native_revType ===
                                                    "CPM" ? (
                                                      <>
                                                        {parseFloat(
                                                          (row.impressions *
                                                            campaign.native_unitRate) /
                                                            1000
                                                        )}
                                                      </>
                                                    ) : (
                                                      <></>
                                                    )}
                                                    {campaign.native_revType ===
                                                    "CPC" ? (
                                                      <>
                                                        {parseFloat(
                                                          row.clicks *
                                                            campaign.native_unitRate
                                                        )}
                                                      </>
                                                    ) : (
                                                      <></>
                                                    )}
                                                    {campaign.native_revType ===
                                                    "CPCV" ? (
                                                      <>
                                                        {parseFloat(
                                                          row.completed_views *
                                                            campaign.native_unitRate
                                                        )}
                                                      </>
                                                    ) : (
                                                      <></>
                                                    )}
                                                    {campaign.native_revType ===
                                                    "CPL" ? (
                                                      <>
                                                        {parseFloat(
                                                          row.conversions *
                                                            campaign.native_unitRate
                                                        )}
                                                      </>
                                                    ) : (
                                                      <></>
                                                    )}
                                                    {campaign.native_revType ===
                                                    "CPA" ? (
                                                      <>
                                                        {parseFloat(
                                                          row.conversions *
                                                            campaign.native_unitRate
                                                        )}
                                                      </>
                                                    ) : (
                                                      <></>
                                                    )}
                                                    {campaign.native_revType ===
                                                    "CPViews" ? (
                                                      <>
                                                        {parseFloat(
                                                          row.views *
                                                            campaign.native_unitRate
                                                        )}
                                                      </>
                                                    ) : (
                                                      <></>
                                                    )}
                                                    {campaign.native_revType ===
                                                    "CPVisit" ? (
                                                      <>
                                                        {parseFloat(
                                                          row.visits *
                                                            campaign.native_unitRate
                                                        )}
                                                      </>
                                                    ) : (
                                                      <></>
                                                    )}
                                                  </td>
                                                  {/* MEDIA_COST */}
                                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    <>{row.cost}</>
                                                  </td>
                                                  {/* REVENUE_TYPE */}
                                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {campaign.native_revType}
                                                  </td>
                                                  {/* KICKBACK */}
                                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {
                                                      <>
                                                        {campaign.native_revType ===
                                                        "CPM" ? (
                                                          <>
                                                            {clients.map(
                                                              (client) =>
                                                                campaign.clientName ===
                                                                client.name ? (
                                                                  <>
                                                                    {(parseFloat(
                                                                      row.impressions *
                                                                        campaign.native_unitRate
                                                                    ) *
                                                                      client.kickback_value) /
                                                                      100 /
                                                                      1000}
                                                                  </>
                                                                ) : (
                                                                  <></>
                                                                )
                                                            )}
                                                          </>
                                                        ) : (
                                                          <></>
                                                        )}
                                                        {campaign.native_revType ===
                                                        "CPC" ? (
                                                          <>
                                                            {clients.map(
                                                              (client) =>
                                                                campaign.clientName ===
                                                                client.name ? (
                                                                  <>
                                                                    {(parseFloat(
                                                                      row.clicks *
                                                                        campaign.native_unitRate
                                                                    ) *
                                                                      client.kickback_value) /
                                                                      100}
                                                                  </>
                                                                ) : (
                                                                  <></>
                                                                )
                                                            )}
                                                          </>
                                                        ) : (
                                                          <></>
                                                        )}
                                                        {campaign.native_revType ===
                                                        "CPCV" ? (
                                                          <>
                                                            {clients.map(
                                                              (client) =>
                                                                campaign.clientName ===
                                                                client.name ? (
                                                                  <>
                                                                    {(parseFloat(
                                                                      row.completed_views *
                                                                        campaign.native_unitRate
                                                                    ) *
                                                                      client.kickback_value) /
                                                                      100}
                                                                  </>
                                                                ) : (
                                                                  <></>
                                                                )
                                                            )}
                                                          </>
                                                        ) : (
                                                          <></>
                                                        )}
                                                        {campaign.native_revType ===
                                                        "CPL" ? (
                                                          <>
                                                            {clients.map(
                                                              (client) =>
                                                                campaign.clientName ===
                                                                client.name ? (
                                                                  <>
                                                                    {(parseFloat(
                                                                      row.conversions *
                                                                        campaign.native_unitRate
                                                                    ) *
                                                                      client.kickback_value) /
                                                                      100}
                                                                  </>
                                                                ) : (
                                                                  <></>
                                                                )
                                                            )}
                                                          </>
                                                        ) : (
                                                          <></>
                                                        )}
                                                        {campaign.native_revType ===
                                                        "CPA" ? (
                                                          <>
                                                            {clients.map(
                                                              (client) =>
                                                                campaign.clientName ===
                                                                client.name ? (
                                                                  <>
                                                                    {(parseFloat(
                                                                      row.conversions *
                                                                        campaign.native_unitRate
                                                                    ) *
                                                                      client.kickback_value) /
                                                                      100}
                                                                  </>
                                                                ) : (
                                                                  <></>
                                                                )
                                                            )}
                                                          </>
                                                        ) : (
                                                          <></>
                                                        )}
                                                        {campaign.native_revType ===
                                                        "CPViews" ? (
                                                          <>
                                                            {clients.map(
                                                              (client) =>
                                                                campaign.clientName ===
                                                                client.name ? (
                                                                  <>
                                                                    {(parseFloat(
                                                                      row.views *
                                                                        campaign.native_unitRate
                                                                    ) *
                                                                      client.kickback_value) /
                                                                      100}
                                                                  </>
                                                                ) : (
                                                                  <></>
                                                                )
                                                            )}
                                                          </>
                                                        ) : (
                                                          <></>
                                                        )}
                                                        {campaign.native_revType ===
                                                        "CPVisit" ? (
                                                          <>
                                                            {clients.map(
                                                              (client) =>
                                                                campaign.clientName ===
                                                                client.name ? (
                                                                  <>
                                                                    {(parseFloat(
                                                                      row.visits *
                                                                        campaign.native_unitRate
                                                                    ) *
                                                                      client.kickback_value) /
                                                                      100}
                                                                  </>
                                                                ) : (
                                                                  <></>
                                                                )
                                                            )}
                                                          </>
                                                        ) : (
                                                          <></>
                                                        )}
                                                      </>
                                                    }
                                                  </td>
                                                  {/* PROFIT */}
                                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    <>
                                                      {campaign.native_revType ===
                                                      "CPM" ? (
                                                        <>
                                                          {clients.map(
                                                            (client) =>
                                                              campaign.clientName ===
                                                              client.name ? (
                                                                <>
                                                                  {parseFloat(
                                                                    row.impressions *
                                                                      (campaign.native_unitRate /
                                                                        1000) *
                                                                      (1 -
                                                                        client.kickback_value /
                                                                          100) -
                                                                      row.cost
                                                                  ).toFixed(2)}
                                                                </>
                                                              ) : (
                                                                <></>
                                                              )
                                                          )}
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}
                                                      {campaign.native_revType ===
                                                      "CPC" ? (
                                                        <>
                                                          {clients.map(
                                                            (client) =>
                                                              campaign.clientName ===
                                                              client.name ? (
                                                                <>
                                                                  {parseFloat(
                                                                    row.clicks *
                                                                      campaign.native_unitRate *
                                                                      (1 -
                                                                        client.kickback_value /
                                                                          100) -
                                                                      row.cost
                                                                  ).toFixed(2)}
                                                                </>
                                                              ) : (
                                                                <></>
                                                              )
                                                          )}
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}
                                                      {campaign.native_revType ===
                                                      "CPCV" ? (
                                                        <>
                                                          {clients.map(
                                                            (client) =>
                                                              campaign.clientName ===
                                                              client.name ? (
                                                                <>
                                                                  {parseFloat(
                                                                    row.completed_views *
                                                                      campaign.native_unitRate *
                                                                      (1 -
                                                                        client.kickback_value /
                                                                          100) -
                                                                      row.cost
                                                                  ).toFixed(2)}
                                                                </>
                                                              ) : (
                                                                <></>
                                                              )
                                                          )}
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}
                                                      {campaign.native_revType ===
                                                      "CPL" ? (
                                                        <>
                                                          {clients.map(
                                                            (client) =>
                                                              campaign.clientName ===
                                                              client.name ? (
                                                                <>
                                                                  {parseFloat(
                                                                    row.conversions *
                                                                      campaign.native_unitRate *
                                                                      (1 -
                                                                        client.kickback_value /
                                                                          100) -
                                                                      row.cost
                                                                  ).toFixed(2)}
                                                                </>
                                                              ) : (
                                                                <></>
                                                              )
                                                          )}
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}
                                                      {campaign.native_revType ===
                                                      "CPA" ? (
                                                        <>
                                                          {clients.map(
                                                            (client) =>
                                                              campaign.clientName ===
                                                              client.name ? (
                                                                <>
                                                                  {parseFloat(
                                                                    row.conversions *
                                                                      campaign.native_unitRate *
                                                                      (1 -
                                                                        client.kickback_value /
                                                                          100) -
                                                                      row.cost
                                                                  ).toFixed(2)}
                                                                </>
                                                              ) : (
                                                                <></>
                                                              )
                                                          )}
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}
                                                      {campaign.native_revType ===
                                                      "CPViews" ? (
                                                        <>
                                                          {clients.map(
                                                            (client) =>
                                                              campaign.clientName ===
                                                              client.name ? (
                                                                <>
                                                                  {parseFloat(
                                                                    row.views *
                                                                      campaign.native_unitRate *
                                                                      (1 -
                                                                        client.kickback_value /
                                                                          100) -
                                                                      row.cost
                                                                  ).toFixed(2)}
                                                                </>
                                                              ) : (
                                                                <></>
                                                              )
                                                          )}
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}
                                                      {campaign.native_revType ===
                                                      "CPVisit" ? (
                                                        <>
                                                          {clients.map(
                                                            (client) =>
                                                              campaign.clientName ===
                                                              client.name ? (
                                                                <>
                                                                  {parseFloat(
                                                                    row.visits *
                                                                      campaign.native_unitRate *
                                                                      (1 -
                                                                        client.kickback_value /
                                                                          100) -
                                                                      row.cost
                                                                  ).toFixed(2)}
                                                                </>
                                                              ) : (
                                                                <></>
                                                              )
                                                          )}
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}
                                                    </>
                                                  </td>
                                                  {/* PROFIT_PERCENTAGE */}
                                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    <>
                                                      {campaign.native_revType ===
                                                      "CPM" ? (
                                                        <>
                                                          {clients.map(
                                                            (client) =>
                                                              campaign.clientName ===
                                                              client.name ? (
                                                                <>
                                                                  {parseFloat(
                                                                    ((row.impressions *
                                                                      (campaign.native_unitRate /
                                                                        1000) *
                                                                      (1 -
                                                                        client.kickback_value /
                                                                          100) -
                                                                      row.cost) /
                                                                      (row.impressions *
                                                                        campaign.native_unitRate)) *
                                                                      100
                                                                  ).toFixed(2)}
                                                                </>
                                                              ) : (
                                                                <></>
                                                              )
                                                          )}

                                                          {" %"}
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}
                                                      {campaign.native_revType ===
                                                      "CPC" ? (
                                                        <>
                                                          {clients.map(
                                                            (client) =>
                                                              campaign.clientName ===
                                                              client.name ? (
                                                                <>
                                                                  {parseFloat(
                                                                    ((row.clicks *
                                                                      campaign.native_unitRate *
                                                                      (1 -
                                                                        client.kickback_value /
                                                                          100) -
                                                                      row.cost) /
                                                                      (row.clicks *
                                                                        campaign.native_unitRate)) *
                                                                      100
                                                                  ).toFixed(2)}
                                                                </>
                                                              ) : (
                                                                <></>
                                                              )
                                                          )}
                                                          {" %"}
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}
                                                      {campaign.native_revType ===
                                                      "CPCV" ? (
                                                        <>
                                                          {clients.map(
                                                            (client) =>
                                                              campaign.clientName ===
                                                              client.name ? (
                                                                <>
                                                                  {parseFloat(
                                                                    ((row.completed_views *
                                                                      campaign.native_unitRate *
                                                                      (1 -
                                                                        client.kickback_value /
                                                                          100) -
                                                                      row.cost) /
                                                                      (row.completed_views *
                                                                        campaign.native_unitRate)) *
                                                                      100
                                                                  ).toFixed(2)}
                                                                </>
                                                              ) : (
                                                                <></>
                                                              )
                                                          )}
                                                          {" %"}
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}
                                                      {campaign.native_revType ===
                                                      "CPL" ? (
                                                        <>
                                                          {clients.map(
                                                            (client) =>
                                                              campaign.clientName ===
                                                              client.name ? (
                                                                <>
                                                                  {parseFloat(
                                                                    ((row.conversions *
                                                                      campaign.native_unitRate *
                                                                      (1 -
                                                                        client.kickback_value /
                                                                          100) -
                                                                      row.cost) /
                                                                      (row.conversions *
                                                                        campaign.native_unitRate)) *
                                                                      100
                                                                  ).toFixed(2)}
                                                                </>
                                                              ) : (
                                                                <></>
                                                              )
                                                          )}
                                                          {" %"}
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}
                                                      {campaign.native_revType ===
                                                      "CPA" ? (
                                                        <>
                                                          {clients.map(
                                                            (client) =>
                                                              campaign.clientName ===
                                                              client.name ? (
                                                                <>
                                                                  {parseFloat(
                                                                    ((row.conversions *
                                                                      campaign.native_unitRate *
                                                                      (1 -
                                                                        client.kickback_value /
                                                                          100) -
                                                                      row.cost) /
                                                                      (row.conversions *
                                                                        campaign.native_unitRate)) *
                                                                      100
                                                                  ).toFixed(2)}
                                                                </>
                                                              ) : (
                                                                <></>
                                                              )
                                                          )}
                                                          {" %"}
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}
                                                      {campaign.native_revType ===
                                                      "CPViews" ? (
                                                        <>
                                                          {clients.map(
                                                            (client) =>
                                                              campaign.clientName ===
                                                              client.name ? (
                                                                <>
                                                                  {parseFloat(
                                                                    ((row.views *
                                                                      campaign.native_unitRate *
                                                                      (1 -
                                                                        client.kickback_value /
                                                                          100) -
                                                                      row.cost) /
                                                                      (row.views *
                                                                        campaign.native_unitRate)) *
                                                                      100
                                                                  ).toFixed(2)}
                                                                </>
                                                              ) : (
                                                                <></>
                                                              )
                                                          )}
                                                          {" %"}
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}
                                                      {campaign.native_revType ===
                                                      "CPVisit" ? (
                                                        <>
                                                          {clients.map(
                                                            (client) =>
                                                              campaign.clientName ===
                                                              client.name ? (
                                                                <>
                                                                  {parseFloat(
                                                                    ((row.visits *
                                                                      campaign.native_unitRate *
                                                                      (1 -
                                                                        client.kickback_value /
                                                                          100) -
                                                                      row.cost) /
                                                                      (row.visits *
                                                                        campaign.native_unitRate)) *
                                                                      100
                                                                  ).toFixed(2)}
                                                                </>
                                                              ) : (
                                                                <></>
                                                              )
                                                          )}
                                                          {" %"}
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}
                                                    </>
                                                  </td>

                                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {campaign.native_unitRate}
                                                  </td>
                                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {
                                                      <>
                                                        {campaign.native_revType ===
                                                        "CPM" ? (
                                                          <>
                                                            {parseFloat(
                                                              (row.cost *
                                                                1000) /
                                                                row.impressions
                                                            ).toFixed(2)}
                                                          </>
                                                        ) : (
                                                          <></>
                                                        )}
                                                        {campaign.native_revType ===
                                                        "CPC" ? (
                                                          <>
                                                            {parseFloat(
                                                              row.cost /
                                                                row.clicks
                                                            ).toFixed(2)}
                                                          </>
                                                        ) : (
                                                          <></>
                                                        )}
                                                        {campaign.native_revType ===
                                                        "CPCV" ? (
                                                          <>
                                                            {parseFloat(
                                                              row.cost /
                                                                row.completed_views
                                                            ).toFixed(2)}
                                                          </>
                                                        ) : (
                                                          <></>
                                                        )}
                                                        {campaign.native_revType ===
                                                        "CPL" ? (
                                                          <>
                                                            {parseFloat(
                                                              row.cost /
                                                                row.conversions
                                                            ).toFixed(2)}
                                                          </>
                                                        ) : (
                                                          <></>
                                                        )}
                                                        {campaign.native_revType ===
                                                        "CPA" ? (
                                                          <>
                                                            {parseFloat(
                                                              row.cost /
                                                                row.conversions
                                                            ).toFixed(2)}
                                                          </>
                                                        ) : (
                                                          <></>
                                                        )}
                                                        {campaign.native_revType ===
                                                        "CPViews" ? (
                                                          <>
                                                            {parseFloat(
                                                              row.cost /
                                                                row.views
                                                            ).toFixed(2)}
                                                          </>
                                                        ) : (
                                                          <></>
                                                        )}
                                                        {campaign.native_revType ===
                                                        "CPVisit" ? (
                                                          <>
                                                            {parseFloat(
                                                              row.cost /
                                                                row.visits
                                                            ).toFixed(2)}
                                                          </>
                                                        ) : (
                                                          <></>
                                                        )}
                                                      </>
                                                    }
                                                  </td>
                                                </tr>
                                              </>
                                            ) : (
                                              <></>
                                            )
                                          )}
                                        </>
                                      ) : (
                                        <></>
                                      )}

                                      {/* POP_CAMPAIGN */}
                                      {campaign.pop_endDate > selected.date &&
                                      campaign.pop_campaign === true ? (
                                        <>
                                          {JSON.parse(
                                            reports[reports.length - 1]
                                              .xlsxToJSONStr
                                          ).map((row) =>
                                            row.reference ===
                                            campaign.reference_id_pop_campaign ? (
                                              <>
                                                <tr>
                                                  {/* NAME */}
                                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {campaign.name}
                                                  </td>
                                                  {/* CLIENT */}
                                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {campaign.clientName}
                                                  </td>
                                                  {/* CAMPAIGN TYPE */}
                                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    pop campaign
                                                  </td>
                                                  {/* REVENUE */}
                                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    $
                                                    {campaign.pop_revType ===
                                                    "CPM" ? (
                                                      <>
                                                        {parseFloat(
                                                          (row.impressions *
                                                            campaign.pop_unitRate) /
                                                            1000
                                                        )}
                                                      </>
                                                    ) : (
                                                      <></>
                                                    )}
                                                    {campaign.pop_revType ===
                                                    "CPC" ? (
                                                      <>
                                                        {parseFloat(
                                                          row.clicks *
                                                            campaign.pop_unitRate
                                                        )}
                                                      </>
                                                    ) : (
                                                      <></>
                                                    )}
                                                    {campaign.pop_revType ===
                                                    "CPCV" ? (
                                                      <>
                                                        {parseFloat(
                                                          row.completed_views *
                                                            campaign.pop_unitRate
                                                        )}
                                                      </>
                                                    ) : (
                                                      <></>
                                                    )}
                                                    {campaign.pop_revType ===
                                                    "CPL" ? (
                                                      <>
                                                        {parseFloat(
                                                          row.conversions *
                                                            campaign.pop_unitRate
                                                        )}
                                                      </>
                                                    ) : (
                                                      <></>
                                                    )}
                                                    {campaign.pop_revType ===
                                                    "CPA" ? (
                                                      <>
                                                        {parseFloat(
                                                          row.conversions *
                                                            campaign.pop_unitRate
                                                        )}
                                                      </>
                                                    ) : (
                                                      <></>
                                                    )}
                                                    {campaign.pop_revType ===
                                                    "CPViews" ? (
                                                      <>
                                                        {parseFloat(
                                                          row.views *
                                                            campaign.pop_unitRate
                                                        )}
                                                      </>
                                                    ) : (
                                                      <></>
                                                    )}
                                                    {campaign.pop_revType ===
                                                    "CPVisit" ? (
                                                      <>
                                                        {parseFloat(
                                                          row.visits *
                                                            campaign.pop_unitRate
                                                        )}
                                                      </>
                                                    ) : (
                                                      <></>
                                                    )}
                                                  </td>
                                                  {/* MEDIA_COST */}
                                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    <>{row.cost}</>
                                                  </td>
                                                  {/* REVENUE_TYPE */}
                                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {campaign.pop_revType}
                                                  </td>
                                                  {/* KICKBACK */}
                                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {
                                                      <>
                                                        {campaign.pop_revType ===
                                                        "CPM" ? (
                                                          <>
                                                            {clients.map(
                                                              (client) =>
                                                                campaign.clientName ===
                                                                client.name ? (
                                                                  <>
                                                                    {(parseFloat(
                                                                      row.impressions *
                                                                        campaign.pop_unitRate
                                                                    ) *
                                                                      client.kickback_value) /
                                                                      100 /
                                                                      1000}
                                                                  </>
                                                                ) : (
                                                                  <></>
                                                                )
                                                            )}
                                                          </>
                                                        ) : (
                                                          <></>
                                                        )}
                                                        {campaign.pop_revType ===
                                                        "CPC" ? (
                                                          <>
                                                            {clients.map(
                                                              (client) =>
                                                                campaign.clientName ===
                                                                client.name ? (
                                                                  <>
                                                                    {(parseFloat(
                                                                      row.clicks *
                                                                        campaign.pop_unitRate
                                                                    ) *
                                                                      client.kickback_value) /
                                                                      100}
                                                                  </>
                                                                ) : (
                                                                  <></>
                                                                )
                                                            )}
                                                          </>
                                                        ) : (
                                                          <></>
                                                        )}
                                                        {campaign.pop_revType ===
                                                        "CPCV" ? (
                                                          <>
                                                            {clients.map(
                                                              (client) =>
                                                                campaign.clientName ===
                                                                client.name ? (
                                                                  <>
                                                                    {(parseFloat(
                                                                      row.completed_views *
                                                                        campaign.pop_unitRate
                                                                    ) *
                                                                      client.kickback_value) /
                                                                      100}
                                                                  </>
                                                                ) : (
                                                                  <></>
                                                                )
                                                            )}
                                                          </>
                                                        ) : (
                                                          <></>
                                                        )}
                                                        {campaign.pop_revType ===
                                                        "CPL" ? (
                                                          <>
                                                            {clients.map(
                                                              (client) =>
                                                                campaign.clientName ===
                                                                client.name ? (
                                                                  <>
                                                                    {(parseFloat(
                                                                      row.conversions *
                                                                        campaign.pop_unitRate
                                                                    ) *
                                                                      client.kickback_value) /
                                                                      100}
                                                                  </>
                                                                ) : (
                                                                  <></>
                                                                )
                                                            )}
                                                          </>
                                                        ) : (
                                                          <></>
                                                        )}
                                                        {campaign.pop_revType ===
                                                        "CPA" ? (
                                                          <>
                                                            {clients.map(
                                                              (client) =>
                                                                campaign.clientName ===
                                                                client.name ? (
                                                                  <>
                                                                    {(parseFloat(
                                                                      row.conversions *
                                                                        campaign.pop_unitRate
                                                                    ) *
                                                                      client.kickback_value) /
                                                                      100}
                                                                  </>
                                                                ) : (
                                                                  <></>
                                                                )
                                                            )}
                                                          </>
                                                        ) : (
                                                          <></>
                                                        )}
                                                        {campaign.pop_revType ===
                                                        "CPViews" ? (
                                                          <>
                                                            {clients.map(
                                                              (client) =>
                                                                campaign.clientName ===
                                                                client.name ? (
                                                                  <>
                                                                    {(parseFloat(
                                                                      row.views *
                                                                        campaign.pop_unitRate
                                                                    ) *
                                                                      client.kickback_value) /
                                                                      100}
                                                                  </>
                                                                ) : (
                                                                  <></>
                                                                )
                                                            )}
                                                          </>
                                                        ) : (
                                                          <></>
                                                        )}
                                                        {campaign.pop_revType ===
                                                        "CPVisit" ? (
                                                          <>
                                                            {clients.map(
                                                              (client) =>
                                                                campaign.clientName ===
                                                                client.name ? (
                                                                  <>
                                                                    {(parseFloat(
                                                                      row.visits *
                                                                        campaign.pop_unitRate
                                                                    ) *
                                                                      client.kickback_value) /
                                                                      100}
                                                                  </>
                                                                ) : (
                                                                  <></>
                                                                )
                                                            )}
                                                          </>
                                                        ) : (
                                                          <></>
                                                        )}
                                                      </>
                                                    }
                                                  </td>
                                                  {/* PROFIT */}
                                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    <>
                                                      {campaign.pop_revType ===
                                                      "CPM" ? (
                                                        <>
                                                          {clients.map(
                                                            (client) =>
                                                              campaign.clientName ===
                                                              client.name ? (
                                                                <>
                                                                  {parseFloat(
                                                                    row.impressions *
                                                                      (campaign.pop_unitRate /
                                                                        1000) *
                                                                      (1 -
                                                                        client.kickback_value /
                                                                          100) -
                                                                      row.cost
                                                                  ).toFixed(2)}
                                                                </>
                                                              ) : (
                                                                <></>
                                                              )
                                                          )}
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}
                                                      {campaign.pop_revType ===
                                                      "CPC" ? (
                                                        <>
                                                          {clients.map(
                                                            (client) =>
                                                              campaign.clientName ===
                                                              client.name ? (
                                                                <>
                                                                  {parseFloat(
                                                                    row.clicks *
                                                                      campaign.pop_unitRate *
                                                                      (1 -
                                                                        client.kickback_value /
                                                                          100) -
                                                                      row.cost
                                                                  ).toFixed(2)}
                                                                </>
                                                              ) : (
                                                                <></>
                                                              )
                                                          )}
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}
                                                      {campaign.pop_revType ===
                                                      "CPCV" ? (
                                                        <>
                                                          {clients.map(
                                                            (client) =>
                                                              campaign.clientName ===
                                                              client.name ? (
                                                                <>
                                                                  {parseFloat(
                                                                    row.completed_views *
                                                                      campaign.pop_unitRate *
                                                                      (1 -
                                                                        client.kickback_value /
                                                                          100) -
                                                                      row.cost
                                                                  ).toFixed(2)}
                                                                </>
                                                              ) : (
                                                                <></>
                                                              )
                                                          )}
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}
                                                      {campaign.pop_revType ===
                                                      "CPL" ? (
                                                        <>
                                                          {clients.map(
                                                            (client) =>
                                                              campaign.clientName ===
                                                              client.name ? (
                                                                <>
                                                                  {parseFloat(
                                                                    row.conversions *
                                                                      campaign.pop_unitRate *
                                                                      (1 -
                                                                        client.kickback_value /
                                                                          100) -
                                                                      row.cost
                                                                  ).toFixed(2)}
                                                                </>
                                                              ) : (
                                                                <></>
                                                              )
                                                          )}
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}
                                                      {campaign.pop_revType ===
                                                      "CPA" ? (
                                                        <>
                                                          {clients.map(
                                                            (client) =>
                                                              campaign.clientName ===
                                                              client.name ? (
                                                                <>
                                                                  {parseFloat(
                                                                    row.conversions *
                                                                      campaign.pop_unitRate *
                                                                      (1 -
                                                                        client.kickback_value /
                                                                          100) -
                                                                      row.cost
                                                                  ).toFixed(2)}
                                                                </>
                                                              ) : (
                                                                <></>
                                                              )
                                                          )}
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}
                                                      {campaign.pop_revType ===
                                                      "CPViews" ? (
                                                        <>
                                                          {clients.map(
                                                            (client) =>
                                                              campaign.clientName ===
                                                              client.name ? (
                                                                <>
                                                                  {parseFloat(
                                                                    row.views *
                                                                      campaign.pop_unitRate *
                                                                      (1 -
                                                                        client.kickback_value /
                                                                          100) -
                                                                      row.cost
                                                                  ).toFixed(2)}
                                                                </>
                                                              ) : (
                                                                <></>
                                                              )
                                                          )}
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}
                                                      {campaign.pop_revType ===
                                                      "CPVisit" ? (
                                                        <>
                                                          {clients.map(
                                                            (client) =>
                                                              campaign.clientName ===
                                                              client.name ? (
                                                                <>
                                                                  {parseFloat(
                                                                    row.visits *
                                                                      campaign.pop_unitRate *
                                                                      (1 -
                                                                        client.kickback_value /
                                                                          100) -
                                                                      row.cost
                                                                  ).toFixed(2)}
                                                                </>
                                                              ) : (
                                                                <></>
                                                              )
                                                          )}
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}
                                                    </>
                                                  </td>
                                                  {/* PROFIT_PERCENTAGE */}
                                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    <>
                                                      {campaign.pop_revType ===
                                                      "CPM" ? (
                                                        <>
                                                          {clients.map(
                                                            (client) =>
                                                              campaign.clientName ===
                                                              client.name ? (
                                                                <>
                                                                  {parseFloat(
                                                                    ((row.impressions *
                                                                      (campaign.pop_unitRate /
                                                                        1000) *
                                                                      (1 -
                                                                        client.kickback_value /
                                                                          100) -
                                                                      row.cost) /
                                                                      (row.impressions *
                                                                        campaign.pop_unitRate)) *
                                                                      100
                                                                  ).toFixed(2)}
                                                                </>
                                                              ) : (
                                                                <></>
                                                              )
                                                          )}

                                                          {" %"}
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}
                                                      {campaign.pop_revType ===
                                                      "CPC" ? (
                                                        <>
                                                          {clients.map(
                                                            (client) =>
                                                              campaign.clientName ===
                                                              client.name ? (
                                                                <>
                                                                  {parseFloat(
                                                                    ((row.clicks *
                                                                      campaign.pop_unitRate *
                                                                      (1 -
                                                                        client.kickback_value /
                                                                          100) -
                                                                      row.cost) /
                                                                      (row.clicks *
                                                                        campaign.pop_unitRate)) *
                                                                      100
                                                                  ).toFixed(2)}
                                                                </>
                                                              ) : (
                                                                <></>
                                                              )
                                                          )}
                                                          {" %"}
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}
                                                      {campaign.pop_revType ===
                                                      "CPCV" ? (
                                                        <>
                                                          {clients.map(
                                                            (client) =>
                                                              campaign.clientName ===
                                                              client.name ? (
                                                                <>
                                                                  {parseFloat(
                                                                    ((row.completed_views *
                                                                      campaign.pop_unitRate *
                                                                      (1 -
                                                                        client.kickback_value /
                                                                          100) -
                                                                      row.cost) /
                                                                      (row.completed_views *
                                                                        campaign.pop_unitRate)) *
                                                                      100
                                                                  ).toFixed(2)}
                                                                </>
                                                              ) : (
                                                                <></>
                                                              )
                                                          )}
                                                          {" %"}
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}
                                                      {campaign.pop_revType ===
                                                      "CPL" ? (
                                                        <>
                                                          {clients.map(
                                                            (client) =>
                                                              campaign.clientName ===
                                                              client.name ? (
                                                                <>
                                                                  {parseFloat(
                                                                    ((row.conversions *
                                                                      campaign.pop_unitRate *
                                                                      (1 -
                                                                        client.kickback_value /
                                                                          100) -
                                                                      row.cost) /
                                                                      (row.conversions *
                                                                        campaign.pop_unitRate)) *
                                                                      100
                                                                  ).toFixed(2)}
                                                                </>
                                                              ) : (
                                                                <></>
                                                              )
                                                          )}
                                                          {" %"}
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}
                                                      {campaign.pop_revType ===
                                                      "CPA" ? (
                                                        <>
                                                          {clients.map(
                                                            (client) =>
                                                              campaign.clientName ===
                                                              client.name ? (
                                                                <>
                                                                  {parseFloat(
                                                                    ((row.conversions *
                                                                      campaign.pop_unitRate *
                                                                      (1 -
                                                                        client.kickback_value /
                                                                          100) -
                                                                      row.cost) /
                                                                      (row.conversions *
                                                                        campaign.pop_unitRate)) *
                                                                      100
                                                                  ).toFixed(2)}
                                                                </>
                                                              ) : (
                                                                <></>
                                                              )
                                                          )}
                                                          {" %"}
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}
                                                      {campaign.pop_revType ===
                                                      "CPViews" ? (
                                                        <>
                                                          {clients.map(
                                                            (client) =>
                                                              campaign.clientName ===
                                                              client.name ? (
                                                                <>
                                                                  {parseFloat(
                                                                    ((row.views *
                                                                      campaign.pop_unitRate *
                                                                      (1 -
                                                                        client.kickback_value /
                                                                          100) -
                                                                      row.cost) /
                                                                      (row.views *
                                                                        campaign.pop_unitRate)) *
                                                                      100
                                                                  ).toFixed(2)}
                                                                </>
                                                              ) : (
                                                                <></>
                                                              )
                                                          )}
                                                          {" %"}
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}
                                                      {campaign.pop_revType ===
                                                      "CPVisit" ? (
                                                        <>
                                                          {clients.map(
                                                            (client) =>
                                                              campaign.clientName ===
                                                              client.name ? (
                                                                <>
                                                                  {parseFloat(
                                                                    ((row.visits *
                                                                      campaign.pop_unitRate *
                                                                      (1 -
                                                                        client.kickback_value /
                                                                          100) -
                                                                      row.cost) /
                                                                      (row.visits *
                                                                        campaign.pop_unitRate)) *
                                                                      100
                                                                  ).toFixed(2)}
                                                                </>
                                                              ) : (
                                                                <></>
                                                              )
                                                          )}
                                                          {" %"}
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}
                                                    </>
                                                  </td>

                                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {campaign.pop_unitRate}
                                                  </td>
                                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {
                                                      <>
                                                        {campaign.pop_revType ===
                                                        "CPM" ? (
                                                          <>
                                                            {parseFloat(
                                                              (row.cost *
                                                                1000) /
                                                                row.impressions
                                                            ).toFixed(2)}
                                                          </>
                                                        ) : (
                                                          <></>
                                                        )}
                                                        {campaign.pop_revType ===
                                                        "CPC" ? (
                                                          <>
                                                            {parseFloat(
                                                              row.cost /
                                                                row.clicks
                                                            ).toFixed(2)}
                                                          </>
                                                        ) : (
                                                          <></>
                                                        )}
                                                        {campaign.pop_revType ===
                                                        "CPCV" ? (
                                                          <>
                                                            {parseFloat(
                                                              row.cost /
                                                                row.completed_views
                                                            ).toFixed(2)}
                                                          </>
                                                        ) : (
                                                          <></>
                                                        )}
                                                        {campaign.pop_revType ===
                                                        "CPL" ? (
                                                          <>
                                                            {parseFloat(
                                                              row.cost /
                                                                row.conversions
                                                            ).toFixed(2)}
                                                          </>
                                                        ) : (
                                                          <></>
                                                        )}
                                                        {campaign.pop_revType ===
                                                        "CPA" ? (
                                                          <>
                                                            {parseFloat(
                                                              row.cost /
                                                                row.conversions
                                                            ).toFixed(2)}
                                                          </>
                                                        ) : (
                                                          <></>
                                                        )}
                                                        {campaign.pop_revType ===
                                                        "CPViews" ? (
                                                          <>
                                                            {parseFloat(
                                                              row.cost /
                                                                row.views
                                                            ).toFixed(2)}
                                                          </>
                                                        ) : (
                                                          <></>
                                                        )}
                                                        {campaign.pop_revType ===
                                                        "CPVisit" ? (
                                                          <>
                                                            {parseFloat(
                                                              row.cost /
                                                                row.visits
                                                            ).toFixed(2)}
                                                          </>
                                                        ) : (
                                                          <></>
                                                        )}
                                                      </>
                                                    }
                                                  </td>
                                                </tr>
                                              </>
                                            ) : (
                                              <></>
                                            )
                                          )}
                                        </>
                                      ) : (
                                        <></>
                                      )}

                                      {/* PUSH_CAMPAIGN */}
                                      {campaign.push_endDate > selected.date &&
                                      campaign.push_campaign === true ? (
                                        <>
                                          {JSON.parse(
                                            reports[reports.length - 1]
                                              .xlsxToJSONStr
                                          ).map((row) =>
                                            row.reference ===
                                            campaign.reference_id_push_campaign ? (
                                              <>
                                                <tr>
                                                  {/* NAME */}
                                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {campaign.name}
                                                  </td>
                                                  {/* CLIENT */}
                                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {campaign.clientName}
                                                  </td>
                                                  {/* CAMPAIGN TYPE */}
                                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    push campaign
                                                  </td>
                                                  {/* REVENUE */}
                                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    $
                                                    {campaign.push_revType ===
                                                    "CPM" ? (
                                                      <>
                                                        {parseFloat(
                                                          (row.impressions *
                                                            campaign.push_unitRate) /
                                                            1000
                                                        )}
                                                      </>
                                                    ) : (
                                                      <></>
                                                    )}
                                                    {campaign.push_revType ===
                                                    "CPC" ? (
                                                      <>
                                                        {parseFloat(
                                                          row.clicks *
                                                            campaign.push_unitRate
                                                        )}
                                                      </>
                                                    ) : (
                                                      <></>
                                                    )}
                                                    {campaign.push_revType ===
                                                    "CPCV" ? (
                                                      <>
                                                        {parseFloat(
                                                          row.completed_views *
                                                            campaign.push_unitRate
                                                        )}
                                                      </>
                                                    ) : (
                                                      <></>
                                                    )}
                                                    {campaign.push_revType ===
                                                    "CPL" ? (
                                                      <>
                                                        {parseFloat(
                                                          row.conversions *
                                                            campaign.push_unitRate
                                                        )}
                                                      </>
                                                    ) : (
                                                      <></>
                                                    )}
                                                    {campaign.push_revType ===
                                                    "CPA" ? (
                                                      <>
                                                        {parseFloat(
                                                          row.conversions *
                                                            campaign.push_unitRate
                                                        )}
                                                      </>
                                                    ) : (
                                                      <></>
                                                    )}
                                                    {campaign.push_revType ===
                                                    "CPViews" ? (
                                                      <>
                                                        {parseFloat(
                                                          row.views *
                                                            campaign.push_unitRate
                                                        )}
                                                      </>
                                                    ) : (
                                                      <></>
                                                    )}
                                                    {campaign.push_revType ===
                                                    "CPVisit" ? (
                                                      <>
                                                        {parseFloat(
                                                          row.visits *
                                                            campaign.push_unitRate
                                                        )}
                                                      </>
                                                    ) : (
                                                      <></>
                                                    )}
                                                  </td>
                                                  {/* MEDIA_COST */}
                                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    <>{row.cost}</>
                                                  </td>
                                                  {/* REVENUE_TYPE */}
                                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {campaign.push_revType}
                                                  </td>
                                                  {/* KICKBACK */}
                                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {
                                                      <>
                                                        {campaign.push_revType ===
                                                        "CPM" ? (
                                                          <>
                                                            {clients.map(
                                                              (client) =>
                                                                campaign.clientName ===
                                                                client.name ? (
                                                                  <>
                                                                    {(parseFloat(
                                                                      row.impressions *
                                                                        campaign.push_unitRate
                                                                    ) *
                                                                      client.kickback_value) /
                                                                      100 /
                                                                      1000}
                                                                  </>
                                                                ) : (
                                                                  <></>
                                                                )
                                                            )}
                                                          </>
                                                        ) : (
                                                          <></>
                                                        )}
                                                        {campaign.push_revType ===
                                                        "CPC" ? (
                                                          <>
                                                            {clients.map(
                                                              (client) =>
                                                                campaign.clientName ===
                                                                client.name ? (
                                                                  <>
                                                                    {(parseFloat(
                                                                      row.clicks *
                                                                        campaign.push_unitRate
                                                                    ) *
                                                                      client.kickback_value) /
                                                                      100}
                                                                  </>
                                                                ) : (
                                                                  <></>
                                                                )
                                                            )}
                                                          </>
                                                        ) : (
                                                          <></>
                                                        )}
                                                        {campaign.push_revType ===
                                                        "CPCV" ? (
                                                          <>
                                                            {clients.map(
                                                              (client) =>
                                                                campaign.clientName ===
                                                                client.name ? (
                                                                  <>
                                                                    {(parseFloat(
                                                                      row.completed_views *
                                                                        campaign.push_unitRate
                                                                    ) *
                                                                      client.kickback_value) /
                                                                      100}
                                                                  </>
                                                                ) : (
                                                                  <></>
                                                                )
                                                            )}
                                                          </>
                                                        ) : (
                                                          <></>
                                                        )}
                                                        {campaign.push_revType ===
                                                        "CPL" ? (
                                                          <>
                                                            {clients.map(
                                                              (client) =>
                                                                campaign.clientName ===
                                                                client.name ? (
                                                                  <>
                                                                    {(parseFloat(
                                                                      row.conversions *
                                                                        campaign.push_unitRate
                                                                    ) *
                                                                      client.kickback_value) /
                                                                      100}
                                                                  </>
                                                                ) : (
                                                                  <></>
                                                                )
                                                            )}
                                                          </>
                                                        ) : (
                                                          <></>
                                                        )}
                                                        {campaign.push_revType ===
                                                        "CPA" ? (
                                                          <>
                                                            {clients.map(
                                                              (client) =>
                                                                campaign.clientName ===
                                                                client.name ? (
                                                                  <>
                                                                    {(parseFloat(
                                                                      row.conversions *
                                                                        campaign.push_unitRate
                                                                    ) *
                                                                      client.kickback_value) /
                                                                      100}
                                                                  </>
                                                                ) : (
                                                                  <></>
                                                                )
                                                            )}
                                                          </>
                                                        ) : (
                                                          <></>
                                                        )}
                                                        {campaign.push_revType ===
                                                        "CPViews" ? (
                                                          <>
                                                            {clients.map(
                                                              (client) =>
                                                                campaign.clientName ===
                                                                client.name ? (
                                                                  <>
                                                                    {(parseFloat(
                                                                      row.views *
                                                                        campaign.push_unitRate
                                                                    ) *
                                                                      client.kickback_value) /
                                                                      100}
                                                                  </>
                                                                ) : (
                                                                  <></>
                                                                )
                                                            )}
                                                          </>
                                                        ) : (
                                                          <></>
                                                        )}
                                                        {campaign.push_revType ===
                                                        "CPVisit" ? (
                                                          <>
                                                            {clients.map(
                                                              (client) =>
                                                                campaign.clientName ===
                                                                client.name ? (
                                                                  <>
                                                                    {(parseFloat(
                                                                      row.visits *
                                                                        campaign.push_unitRate
                                                                    ) *
                                                                      client.kickback_value) /
                                                                      100}
                                                                  </>
                                                                ) : (
                                                                  <></>
                                                                )
                                                            )}
                                                          </>
                                                        ) : (
                                                          <></>
                                                        )}
                                                      </>
                                                    }
                                                  </td>
                                                  {/* PROFIT */}
                                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    <>
                                                      {campaign.push_revType ===
                                                      "CPM" ? (
                                                        <>
                                                          {clients.map(
                                                            (client) =>
                                                              campaign.clientName ===
                                                              client.name ? (
                                                                <>
                                                                  {parseFloat(
                                                                    row.impressions *
                                                                      (campaign.push_unitRate /
                                                                        1000) *
                                                                      (1 -
                                                                        client.kickback_value /
                                                                          100) -
                                                                      row.cost
                                                                  ).toFixed(2)}
                                                                </>
                                                              ) : (
                                                                <></>
                                                              )
                                                          )}
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}
                                                      {campaign.push_revType ===
                                                      "CPC" ? (
                                                        <>
                                                          {clients.map(
                                                            (client) =>
                                                              campaign.clientName ===
                                                              client.name ? (
                                                                <>
                                                                  {parseFloat(
                                                                    row.clicks *
                                                                      campaign.push_unitRate *
                                                                      (1 -
                                                                        client.kickback_value /
                                                                          100) -
                                                                      row.cost
                                                                  ).toFixed(2)}
                                                                </>
                                                              ) : (
                                                                <></>
                                                              )
                                                          )}
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}
                                                      {campaign.push_revType ===
                                                      "CPCV" ? (
                                                        <>
                                                          {clients.map(
                                                            (client) =>
                                                              campaign.clientName ===
                                                              client.name ? (
                                                                <>
                                                                  {parseFloat(
                                                                    row.completed_views *
                                                                      campaign.push_unitRate *
                                                                      (1 -
                                                                        client.kickback_value /
                                                                          100) -
                                                                      row.cost
                                                                  ).toFixed(2)}
                                                                </>
                                                              ) : (
                                                                <></>
                                                              )
                                                          )}
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}
                                                      {campaign.push_revType ===
                                                      "CPL" ? (
                                                        <>
                                                          {clients.map(
                                                            (client) =>
                                                              campaign.clientName ===
                                                              client.name ? (
                                                                <>
                                                                  {parseFloat(
                                                                    row.conversions *
                                                                      campaign.push_unitRate *
                                                                      (1 -
                                                                        client.kickback_value /
                                                                          100) -
                                                                      row.cost
                                                                  ).toFixed(2)}
                                                                </>
                                                              ) : (
                                                                <></>
                                                              )
                                                          )}
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}
                                                      {campaign.push_revType ===
                                                      "CPA" ? (
                                                        <>
                                                          {clients.map(
                                                            (client) =>
                                                              campaign.clientName ===
                                                              client.name ? (
                                                                <>
                                                                  {parseFloat(
                                                                    row.conversions *
                                                                      campaign.push_unitRate *
                                                                      (1 -
                                                                        client.kickback_value /
                                                                          100) -
                                                                      row.cost
                                                                  ).toFixed(2)}
                                                                </>
                                                              ) : (
                                                                <></>
                                                              )
                                                          )}
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}
                                                      {campaign.push_revType ===
                                                      "CPViews" ? (
                                                        <>
                                                          {clients.map(
                                                            (client) =>
                                                              campaign.clientName ===
                                                              client.name ? (
                                                                <>
                                                                  {parseFloat(
                                                                    row.views *
                                                                      campaign.push_unitRate *
                                                                      (1 -
                                                                        client.kickback_value /
                                                                          100) -
                                                                      row.cost
                                                                  ).toFixed(2)}
                                                                </>
                                                              ) : (
                                                                <></>
                                                              )
                                                          )}
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}
                                                      {campaign.push_revType ===
                                                      "CPVisit" ? (
                                                        <>
                                                          {clients.map(
                                                            (client) =>
                                                              campaign.clientName ===
                                                              client.name ? (
                                                                <>
                                                                  {parseFloat(
                                                                    row.visits *
                                                                      campaign.push_unitRate *
                                                                      (1 -
                                                                        client.kickback_value /
                                                                          100) -
                                                                      row.cost
                                                                  ).toFixed(2)}
                                                                </>
                                                              ) : (
                                                                <></>
                                                              )
                                                          )}
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}
                                                    </>
                                                  </td>
                                                  {/* PROFIT_PERCENTAGE */}
                                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    <>
                                                      {campaign.push_revType ===
                                                      "CPM" ? (
                                                        <>
                                                          {clients.map(
                                                            (client) =>
                                                              campaign.clientName ===
                                                              client.name ? (
                                                                <>
                                                                  {parseFloat(
                                                                    ((row.impressions *
                                                                      (campaign.push_unitRate /
                                                                        1000) *
                                                                      (1 -
                                                                        client.kickback_value /
                                                                          100) -
                                                                      row.cost) /
                                                                      (row.impressions *
                                                                        campaign.push_unitRate)) *
                                                                      100
                                                                  ).toFixed(2)}
                                                                </>
                                                              ) : (
                                                                <></>
                                                              )
                                                          )}

                                                          {" %"}
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}
                                                      {campaign.push_revType ===
                                                      "CPC" ? (
                                                        <>
                                                          {clients.map(
                                                            (client) =>
                                                              campaign.clientName ===
                                                              client.name ? (
                                                                <>
                                                                  {parseFloat(
                                                                    ((row.clicks *
                                                                      campaign.push_unitRate *
                                                                      (1 -
                                                                        client.kickback_value /
                                                                          100) -
                                                                      row.cost) /
                                                                      (row.clicks *
                                                                        campaign.push_unitRate)) *
                                                                      100
                                                                  ).toFixed(2)}
                                                                </>
                                                              ) : (
                                                                <></>
                                                              )
                                                          )}
                                                          {" %"}
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}
                                                      {campaign.push_revType ===
                                                      "CPCV" ? (
                                                        <>
                                                          {clients.map(
                                                            (client) =>
                                                              campaign.clientName ===
                                                              client.name ? (
                                                                <>
                                                                  {parseFloat(
                                                                    ((row.completed_views *
                                                                      campaign.push_unitRate *
                                                                      (1 -
                                                                        client.kickback_value /
                                                                          100) -
                                                                      row.cost) /
                                                                      (row.completed_views *
                                                                        campaign.push_unitRate)) *
                                                                      100
                                                                  ).toFixed(2)}
                                                                </>
                                                              ) : (
                                                                <></>
                                                              )
                                                          )}
                                                          {" %"}
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}
                                                      {campaign.push_revType ===
                                                      "CPL" ? (
                                                        <>
                                                          {clients.map(
                                                            (client) =>
                                                              campaign.clientName ===
                                                              client.name ? (
                                                                <>
                                                                  {parseFloat(
                                                                    ((row.conversions *
                                                                      campaign.push_unitRate *
                                                                      (1 -
                                                                        client.kickback_value /
                                                                          100) -
                                                                      row.cost) /
                                                                      (row.conversions *
                                                                        campaign.push_unitRate)) *
                                                                      100
                                                                  ).toFixed(2)}
                                                                </>
                                                              ) : (
                                                                <></>
                                                              )
                                                          )}
                                                          {" %"}
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}
                                                      {campaign.push_revType ===
                                                      "CPA" ? (
                                                        <>
                                                          {clients.map(
                                                            (client) =>
                                                              campaign.clientName ===
                                                              client.name ? (
                                                                <>
                                                                  {parseFloat(
                                                                    ((row.conversions *
                                                                      campaign.push_unitRate *
                                                                      (1 -
                                                                        client.kickback_value /
                                                                          100) -
                                                                      row.cost) /
                                                                      (row.conversions *
                                                                        campaign.push_unitRate)) *
                                                                      100
                                                                  ).toFixed(2)}
                                                                </>
                                                              ) : (
                                                                <></>
                                                              )
                                                          )}
                                                          {" %"}
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}
                                                      {campaign.push_revType ===
                                                      "CPViews" ? (
                                                        <>
                                                          {clients.map(
                                                            (client) =>
                                                              campaign.clientName ===
                                                              client.name ? (
                                                                <>
                                                                  {parseFloat(
                                                                    ((row.views *
                                                                      campaign.push_unitRate *
                                                                      (1 -
                                                                        client.kickback_value /
                                                                          100) -
                                                                      row.cost) /
                                                                      (row.views *
                                                                        campaign.push_unitRate)) *
                                                                      100
                                                                  ).toFixed(2)}
                                                                </>
                                                              ) : (
                                                                <></>
                                                              )
                                                          )}
                                                          {" %"}
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}
                                                      {campaign.push_revType ===
                                                      "CPVisit" ? (
                                                        <>
                                                          {clients.map(
                                                            (client) =>
                                                              campaign.clientName ===
                                                              client.name ? (
                                                                <>
                                                                  {parseFloat(
                                                                    ((row.visits *
                                                                      campaign.push_unitRate *
                                                                      (1 -
                                                                        client.kickback_value /
                                                                          100) -
                                                                      row.cost) /
                                                                      (row.visits *
                                                                        campaign.push_unitRate)) *
                                                                      100
                                                                  ).toFixed(2)}
                                                                </>
                                                              ) : (
                                                                <></>
                                                              )
                                                          )}
                                                          {" %"}
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}
                                                    </>
                                                  </td>

                                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {campaign.push_unitRate}
                                                  </td>
                                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {
                                                      <>
                                                        {campaign.push_revType ===
                                                        "CPM" ? (
                                                          <>
                                                            {parseFloat(
                                                              (row.cost *
                                                                1000) /
                                                                row.impressions
                                                            ).toFixed(2)}
                                                          </>
                                                        ) : (
                                                          <></>
                                                        )}
                                                        {campaign.push_revType ===
                                                        "CPC" ? (
                                                          <>
                                                            {parseFloat(
                                                              row.cost /
                                                                row.clicks
                                                            ).toFixed(2)}
                                                          </>
                                                        ) : (
                                                          <></>
                                                        )}
                                                        {campaign.push_revType ===
                                                        "CPCV" ? (
                                                          <>
                                                            {parseFloat(
                                                              row.cost /
                                                                row.completed_views
                                                            ).toFixed(2)}
                                                          </>
                                                        ) : (
                                                          <></>
                                                        )}
                                                        {campaign.push_revType ===
                                                        "CPL" ? (
                                                          <>
                                                            {parseFloat(
                                                              row.cost /
                                                                row.conversions
                                                            ).toFixed(2)}
                                                          </>
                                                        ) : (
                                                          <></>
                                                        )}
                                                        {campaign.push_revType ===
                                                        "CPA" ? (
                                                          <>
                                                            {parseFloat(
                                                              row.cost /
                                                                row.conversions
                                                            ).toFixed(2)}
                                                          </>
                                                        ) : (
                                                          <></>
                                                        )}
                                                        {campaign.push_revType ===
                                                        "CPViews" ? (
                                                          <>
                                                            {parseFloat(
                                                              row.cost /
                                                                row.views
                                                            ).toFixed(2)}
                                                          </>
                                                        ) : (
                                                          <></>
                                                        )}
                                                        {campaign.push_revType ===
                                                        "CPVisit" ? (
                                                          <>
                                                            {parseFloat(
                                                              row.cost /
                                                                row.visits
                                                            ).toFixed(2)}
                                                          </>
                                                        ) : (
                                                          <></>
                                                        )}
                                                      </>
                                                    }
                                                  </td>
                                                </tr>
                                              </>
                                            ) : (
                                              <></>
                                            )
                                          )}
                                        </>
                                      ) : (
                                        <></>
                                      )}

                                      {/* RICHMEDIA_CAMPAIGN */}
                                      {campaign.richMedia_endDate >
                                        selected.date &&
                                      campaign.richMedia_campaign === true ? (
                                        <>
                                          {JSON.parse(
                                            reports[reports.length - 1]
                                              .xlsxToJSONStr
                                          ).map((row) =>
                                            row.reference ===
                                            campaign.reference_id_richMedia_campaign ? (
                                              <>
                                                <tr>
                                                  {/* NAME */}
                                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {campaign.name}
                                                  </td>
                                                  {/* CLIENT */}
                                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {campaign.clientName}
                                                  </td>
                                                  {/* CAMPAIGN TYPE */}
                                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    Rich Media campaign
                                                  </td>
                                                  {/* REVENUE */}
                                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    $
                                                    {campaign.richMedia_revType ===
                                                    "CPM" ? (
                                                      <>
                                                        {parseFloat(
                                                          (row.impressions *
                                                            campaign.richMedia_unitRate) /
                                                            1000
                                                        )}
                                                      </>
                                                    ) : (
                                                      <></>
                                                    )}
                                                    {campaign.richMedia_revType ===
                                                    "CPC" ? (
                                                      <>
                                                        {parseFloat(
                                                          row.clicks *
                                                            campaign.richMedia_unitRate
                                                        )}
                                                      </>
                                                    ) : (
                                                      <></>
                                                    )}
                                                    {campaign.richMedia_revType ===
                                                    "CPCV" ? (
                                                      <>
                                                        {parseFloat(
                                                          row.completed_views *
                                                            campaign.richMedia_unitRate
                                                        )}
                                                      </>
                                                    ) : (
                                                      <></>
                                                    )}
                                                    {campaign.richMedia_revType ===
                                                    "CPL" ? (
                                                      <>
                                                        {parseFloat(
                                                          row.conversions *
                                                            campaign.richMedia_unitRate
                                                        )}
                                                      </>
                                                    ) : (
                                                      <></>
                                                    )}
                                                    {campaign.richMedia_revType ===
                                                    "CPA" ? (
                                                      <>
                                                        {parseFloat(
                                                          row.conversions *
                                                            campaign.richMedia_unitRate
                                                        )}
                                                      </>
                                                    ) : (
                                                      <></>
                                                    )}
                                                    {campaign.richMedia_revType ===
                                                    "CPViews" ? (
                                                      <>
                                                        {parseFloat(
                                                          row.views *
                                                            campaign.richMedia_unitRate
                                                        )}
                                                      </>
                                                    ) : (
                                                      <></>
                                                    )}
                                                    {campaign.richMedia_revType ===
                                                    "CPVisit" ? (
                                                      <>
                                                        {parseFloat(
                                                          row.visits *
                                                            campaign.richMedia_unitRate
                                                        )}
                                                      </>
                                                    ) : (
                                                      <></>
                                                    )}
                                                  </td>
                                                  {/* MEDIA_COST */}
                                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    <>{row.cost}</>
                                                  </td>
                                                  {/* REVENUE_TYPE */}
                                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {campaign.richMedia_revType}
                                                  </td>
                                                  {/* KICKBACK */}
                                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {
                                                      <>
                                                        {campaign.richMedia_revType ===
                                                        "CPM" ? (
                                                          <>
                                                            {clients.map(
                                                              (client) =>
                                                                campaign.clientName ===
                                                                client.name ? (
                                                                  <>
                                                                    {(parseFloat(
                                                                      row.impressions *
                                                                        campaign.richMedia_unitRate
                                                                    ) *
                                                                      client.kickback_value) /
                                                                      100 /
                                                                      1000}
                                                                  </>
                                                                ) : (
                                                                  <></>
                                                                )
                                                            )}
                                                          </>
                                                        ) : (
                                                          <></>
                                                        )}
                                                        {campaign.richMedia_revType ===
                                                        "CPC" ? (
                                                          <>
                                                            {clients.map(
                                                              (client) =>
                                                                campaign.clientName ===
                                                                client.name ? (
                                                                  <>
                                                                    {(parseFloat(
                                                                      row.clicks *
                                                                        campaign.richMedia_unitRate
                                                                    ) *
                                                                      client.kickback_value) /
                                                                      100}
                                                                  </>
                                                                ) : (
                                                                  <></>
                                                                )
                                                            )}
                                                          </>
                                                        ) : (
                                                          <></>
                                                        )}
                                                        {campaign.richMedia_revType ===
                                                        "CPCV" ? (
                                                          <>
                                                            {clients.map(
                                                              (client) =>
                                                                campaign.clientName ===
                                                                client.name ? (
                                                                  <>
                                                                    {(parseFloat(
                                                                      row.completed_views *
                                                                        campaign.richMedia_unitRate
                                                                    ) *
                                                                      client.kickback_value) /
                                                                      100}
                                                                  </>
                                                                ) : (
                                                                  <></>
                                                                )
                                                            )}
                                                          </>
                                                        ) : (
                                                          <></>
                                                        )}
                                                        {campaign.richMedia_revType ===
                                                        "CPL" ? (
                                                          <>
                                                            {clients.map(
                                                              (client) =>
                                                                campaign.clientName ===
                                                                client.name ? (
                                                                  <>
                                                                    {(parseFloat(
                                                                      row.conversions *
                                                                        campaign.richMedia_unitRate
                                                                    ) *
                                                                      client.kickback_value) /
                                                                      100}
                                                                  </>
                                                                ) : (
                                                                  <></>
                                                                )
                                                            )}
                                                          </>
                                                        ) : (
                                                          <></>
                                                        )}
                                                        {campaign.richMedia_revType ===
                                                        "CPA" ? (
                                                          <>
                                                            {clients.map(
                                                              (client) =>
                                                                campaign.clientName ===
                                                                client.name ? (
                                                                  <>
                                                                    {(parseFloat(
                                                                      row.conversions *
                                                                        campaign.richMedia_unitRate
                                                                    ) *
                                                                      client.kickback_value) /
                                                                      100}
                                                                  </>
                                                                ) : (
                                                                  <></>
                                                                )
                                                            )}
                                                          </>
                                                        ) : (
                                                          <></>
                                                        )}
                                                        {campaign.richMedia_revType ===
                                                        "CPViews" ? (
                                                          <>
                                                            {clients.map(
                                                              (client) =>
                                                                campaign.clientName ===
                                                                client.name ? (
                                                                  <>
                                                                    {(parseFloat(
                                                                      row.views *
                                                                        campaign.richMedia_unitRate
                                                                    ) *
                                                                      client.kickback_value) /
                                                                      100}
                                                                  </>
                                                                ) : (
                                                                  <></>
                                                                )
                                                            )}
                                                          </>
                                                        ) : (
                                                          <></>
                                                        )}
                                                        {campaign.richMedia_revType ===
                                                        "CPVisit" ? (
                                                          <>
                                                            {clients.map(
                                                              (client) =>
                                                                campaign.clientName ===
                                                                client.name ? (
                                                                  <>
                                                                    {(parseFloat(
                                                                      row.visits *
                                                                        campaign.richMedia_unitRate
                                                                    ) *
                                                                      client.kickback_value) /
                                                                      100}
                                                                  </>
                                                                ) : (
                                                                  <></>
                                                                )
                                                            )}
                                                          </>
                                                        ) : (
                                                          <></>
                                                        )}
                                                      </>
                                                    }
                                                  </td>
                                                  {/* PROFIT */}
                                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    <>
                                                      {campaign.richMedia_revType ===
                                                      "CPM" ? (
                                                        <>
                                                          {clients.map(
                                                            (client) =>
                                                              campaign.clientName ===
                                                              client.name ? (
                                                                <>
                                                                  {parseFloat(
                                                                    row.impressions *
                                                                      (campaign.richMedia_unitRate /
                                                                        1000) *
                                                                      (1 -
                                                                        client.kickback_value /
                                                                          100) -
                                                                      row.cost
                                                                  ).toFixed(2)}
                                                                </>
                                                              ) : (
                                                                <></>
                                                              )
                                                          )}
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}
                                                      {campaign.richMedia_revType ===
                                                      "CPC" ? (
                                                        <>
                                                          {clients.map(
                                                            (client) =>
                                                              campaign.clientName ===
                                                              client.name ? (
                                                                <>
                                                                  {parseFloat(
                                                                    row.clicks *
                                                                      campaign.richMedia_unitRate *
                                                                      (1 -
                                                                        client.kickback_value /
                                                                          100) -
                                                                      row.cost
                                                                  ).toFixed(2)}
                                                                </>
                                                              ) : (
                                                                <></>
                                                              )
                                                          )}
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}
                                                      {campaign.richMedia_revType ===
                                                      "CPCV" ? (
                                                        <>
                                                          {clients.map(
                                                            (client) =>
                                                              campaign.clientName ===
                                                              client.name ? (
                                                                <>
                                                                  {parseFloat(
                                                                    row.completed_views *
                                                                      campaign.richMedia_unitRate *
                                                                      (1 -
                                                                        client.kickback_value /
                                                                          100) -
                                                                      row.cost
                                                                  ).toFixed(2)}
                                                                </>
                                                              ) : (
                                                                <></>
                                                              )
                                                          )}
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}
                                                      {campaign.richMedia_revType ===
                                                      "CPL" ? (
                                                        <>
                                                          {clients.map(
                                                            (client) =>
                                                              campaign.clientName ===
                                                              client.name ? (
                                                                <>
                                                                  {parseFloat(
                                                                    row.conversions *
                                                                      campaign.richMedia_unitRate *
                                                                      (1 -
                                                                        client.kickback_value /
                                                                          100) -
                                                                      row.cost
                                                                  ).toFixed(2)}
                                                                </>
                                                              ) : (
                                                                <></>
                                                              )
                                                          )}
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}
                                                      {campaign.richMedia_revType ===
                                                      "CPA" ? (
                                                        <>
                                                          {clients.map(
                                                            (client) =>
                                                              campaign.clientName ===
                                                              client.name ? (
                                                                <>
                                                                  {parseFloat(
                                                                    row.conversions *
                                                                      campaign.richMedia_unitRate *
                                                                      (1 -
                                                                        client.kickback_value /
                                                                          100) -
                                                                      row.cost
                                                                  ).toFixed(2)}
                                                                </>
                                                              ) : (
                                                                <></>
                                                              )
                                                          )}
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}
                                                      {campaign.richMedia_revType ===
                                                      "CPViews" ? (
                                                        <>
                                                          {clients.map(
                                                            (client) =>
                                                              campaign.clientName ===
                                                              client.name ? (
                                                                <>
                                                                  {parseFloat(
                                                                    row.views *
                                                                      campaign.richMedia_unitRate *
                                                                      (1 -
                                                                        client.kickback_value /
                                                                          100) -
                                                                      row.cost
                                                                  ).toFixed(2)}
                                                                </>
                                                              ) : (
                                                                <></>
                                                              )
                                                          )}
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}
                                                      {campaign.richMedia_revType ===
                                                      "CPVisit" ? (
                                                        <>
                                                          {clients.map(
                                                            (client) =>
                                                              campaign.clientName ===
                                                              client.name ? (
                                                                <>
                                                                  {parseFloat(
                                                                    row.visits *
                                                                      campaign.richMedia_unitRate *
                                                                      (1 -
                                                                        client.kickback_value /
                                                                          100) -
                                                                      row.cost
                                                                  ).toFixed(2)}
                                                                </>
                                                              ) : (
                                                                <></>
                                                              )
                                                          )}
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}
                                                    </>
                                                  </td>
                                                  {/* PROFIT_PERCENTAGE */}
                                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    <>
                                                      {campaign.richMedia_revType ===
                                                      "CPM" ? (
                                                        <>
                                                          {clients.map(
                                                            (client) =>
                                                              campaign.clientName ===
                                                              client.name ? (
                                                                <>
                                                                  {parseFloat(
                                                                    ((row.impressions *
                                                                      (campaign.richMedia_unitRate /
                                                                        1000) *
                                                                      (1 -
                                                                        client.kickback_value /
                                                                          100) -
                                                                      row.cost) /
                                                                      (row.impressions *
                                                                        campaign.richMedia_unitRate)) *
                                                                      100
                                                                  ).toFixed(2)}
                                                                </>
                                                              ) : (
                                                                <></>
                                                              )
                                                          )}

                                                          {" %"}
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}
                                                      {campaign.richMedia_revType ===
                                                      "CPC" ? (
                                                        <>
                                                          {clients.map(
                                                            (client) =>
                                                              campaign.clientName ===
                                                              client.name ? (
                                                                <>
                                                                  {parseFloat(
                                                                    ((row.clicks *
                                                                      campaign.richMedia_unitRate *
                                                                      (1 -
                                                                        client.kickback_value /
                                                                          100) -
                                                                      row.cost) /
                                                                      (row.clicks *
                                                                        campaign.richMedia_unitRate)) *
                                                                      100
                                                                  ).toFixed(2)}
                                                                </>
                                                              ) : (
                                                                <></>
                                                              )
                                                          )}
                                                          {" %"}
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}
                                                      {campaign.richMedia_revType ===
                                                      "CPCV" ? (
                                                        <>
                                                          {clients.map(
                                                            (client) =>
                                                              campaign.clientName ===
                                                              client.name ? (
                                                                <>
                                                                  {parseFloat(
                                                                    ((row.completed_views *
                                                                      campaign.richMedia_unitRate *
                                                                      (1 -
                                                                        client.kickback_value /
                                                                          100) -
                                                                      row.cost) /
                                                                      (row.completed_views *
                                                                        campaign.richMedia_unitRate)) *
                                                                      100
                                                                  ).toFixed(2)}
                                                                </>
                                                              ) : (
                                                                <></>
                                                              )
                                                          )}
                                                          {" %"}
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}
                                                      {campaign.richMedia_revType ===
                                                      "CPL" ? (
                                                        <>
                                                          {clients.map(
                                                            (client) =>
                                                              campaign.clientName ===
                                                              client.name ? (
                                                                <>
                                                                  {parseFloat(
                                                                    ((row.conversions *
                                                                      campaign.richMedia_unitRate *
                                                                      (1 -
                                                                        client.kickback_value /
                                                                          100) -
                                                                      row.cost) /
                                                                      (row.conversions *
                                                                        campaign.richMedia_unitRate)) *
                                                                      100
                                                                  ).toFixed(2)}
                                                                </>
                                                              ) : (
                                                                <></>
                                                              )
                                                          )}
                                                          {" %"}
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}
                                                      {campaign.richMedia_revType ===
                                                      "CPA" ? (
                                                        <>
                                                          {clients.map(
                                                            (client) =>
                                                              campaign.clientName ===
                                                              client.name ? (
                                                                <>
                                                                  {parseFloat(
                                                                    ((row.conversions *
                                                                      campaign.richMedia_unitRate *
                                                                      (1 -
                                                                        client.kickback_value /
                                                                          100) -
                                                                      row.cost) /
                                                                      (row.conversions *
                                                                        campaign.richMedia_unitRate)) *
                                                                      100
                                                                  ).toFixed(2)}
                                                                </>
                                                              ) : (
                                                                <></>
                                                              )
                                                          )}
                                                          {" %"}
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}
                                                      {campaign.richMedia_revType ===
                                                      "CPViews" ? (
                                                        <>
                                                          {clients.map(
                                                            (client) =>
                                                              campaign.clientName ===
                                                              client.name ? (
                                                                <>
                                                                  {parseFloat(
                                                                    ((row.views *
                                                                      campaign.richMedia_unitRate *
                                                                      (1 -
                                                                        client.kickback_value /
                                                                          100) -
                                                                      row.cost) /
                                                                      (row.views *
                                                                        campaign.richMedia_unitRate)) *
                                                                      100
                                                                  ).toFixed(2)}
                                                                </>
                                                              ) : (
                                                                <></>
                                                              )
                                                          )}
                                                          {" %"}
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}
                                                      {campaign.richMedia_revType ===
                                                      "CPVisit" ? (
                                                        <>
                                                          {clients.map(
                                                            (client) =>
                                                              campaign.clientName ===
                                                              client.name ? (
                                                                <>
                                                                  {parseFloat(
                                                                    ((row.visits *
                                                                      campaign.richMedia_unitRate *
                                                                      (1 -
                                                                        client.kickback_value /
                                                                          100) -
                                                                      row.cost) /
                                                                      (row.visits *
                                                                        campaign.richMedia_unitRate)) *
                                                                      100
                                                                  ).toFixed(2)}
                                                                </>
                                                              ) : (
                                                                <></>
                                                              )
                                                          )}
                                                          {" %"}
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}
                                                    </>
                                                  </td>

                                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {
                                                      campaign.richMedia_unitRate
                                                    }
                                                  </td>
                                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {
                                                      <>
                                                        {campaign.richMedia_revType ===
                                                        "CPM" ? (
                                                          <>
                                                            {parseFloat(
                                                              (row.cost *
                                                                1000) /
                                                                row.impressions
                                                            ).toFixed(2)}
                                                          </>
                                                        ) : (
                                                          <></>
                                                        )}
                                                        {campaign.richMedia_revType ===
                                                        "CPC" ? (
                                                          <>
                                                            {parseFloat(
                                                              row.cost /
                                                                row.clicks
                                                            ).toFixed(2)}
                                                          </>
                                                        ) : (
                                                          <></>
                                                        )}
                                                        {campaign.richMedia_revType ===
                                                        "CPCV" ? (
                                                          <>
                                                            {parseFloat(
                                                              row.cost /
                                                                row.completed_views
                                                            ).toFixed(2)}
                                                          </>
                                                        ) : (
                                                          <></>
                                                        )}
                                                        {campaign.richMedia_revType ===
                                                        "CPL" ? (
                                                          <>
                                                            {parseFloat(
                                                              row.cost /
                                                                row.conversions
                                                            ).toFixed(2)}
                                                          </>
                                                        ) : (
                                                          <></>
                                                        )}
                                                        {campaign.richMedia_revType ===
                                                        "CPA" ? (
                                                          <>
                                                            {parseFloat(
                                                              row.cost /
                                                                row.conversions
                                                            ).toFixed(2)}
                                                          </>
                                                        ) : (
                                                          <></>
                                                        )}
                                                        {campaign.richMedia_revType ===
                                                        "CPViews" ? (
                                                          <>
                                                            {parseFloat(
                                                              row.cost /
                                                                row.views
                                                            ).toFixed(2)}
                                                          </>
                                                        ) : (
                                                          <></>
                                                        )}
                                                        {campaign.richMedia_revType ===
                                                        "CPVisit" ? (
                                                          <>
                                                            {parseFloat(
                                                              row.cost /
                                                                row.visits
                                                            ).toFixed(2)}
                                                          </>
                                                        ) : (
                                                          <></>
                                                        )}
                                                      </>
                                                    }
                                                  </td>
                                                </tr>
                                              </>
                                            ) : (
                                              <></>
                                            )
                                          )}
                                        </>
                                      ) : (
                                        <></>
                                      )}

                                      {/* SEARCH_CAMPAIGN */}
                                      {campaign.search_endDate >
                                        selected.date &&
                                      campaign.search_campaign === true ? (
                                        <>
                                          {JSON.parse(
                                            reports[reports.length - 1]
                                              .xlsxToJSONStr
                                          ).map((row) =>
                                            row.reference ===
                                            campaign.reference_id_search_campaign ? (
                                              <>
                                                <tr>
                                                  {/* NAME */}
                                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {campaign.name}
                                                  </td>
                                                  {/* CLIENT */}
                                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {campaign.clientName}
                                                  </td>
                                                  {/* CAMPAIGN TYPE */}
                                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    Search campaign
                                                  </td>
                                                  {/* REVENUE */}
                                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    $
                                                    {campaign.search_revType ===
                                                    "CPM" ? (
                                                      <>
                                                        {parseFloat(
                                                          (row.impressions *
                                                            campaign.search_unitRate) /
                                                            1000
                                                        )}
                                                      </>
                                                    ) : (
                                                      <></>
                                                    )}
                                                    {campaign.search_revType ===
                                                    "CPC" ? (
                                                      <>
                                                        {parseFloat(
                                                          row.clicks *
                                                            campaign.search_unitRate
                                                        )}
                                                      </>
                                                    ) : (
                                                      <></>
                                                    )}
                                                    {campaign.search_revType ===
                                                    "CPCV" ? (
                                                      <>
                                                        {parseFloat(
                                                          row.completed_views *
                                                            campaign.search_unitRate
                                                        )}
                                                      </>
                                                    ) : (
                                                      <></>
                                                    )}
                                                    {campaign.search_revType ===
                                                    "CPL" ? (
                                                      <>
                                                        {parseFloat(
                                                          row.conversions *
                                                            campaign.search_unitRate
                                                        )}
                                                      </>
                                                    ) : (
                                                      <></>
                                                    )}
                                                    {campaign.search_revType ===
                                                    "CPA" ? (
                                                      <>
                                                        {parseFloat(
                                                          row.conversions *
                                                            campaign.search_unitRate
                                                        )}
                                                      </>
                                                    ) : (
                                                      <></>
                                                    )}
                                                    {campaign.search_revType ===
                                                    "CPViews" ? (
                                                      <>
                                                        {parseFloat(
                                                          row.views *
                                                            campaign.search_unitRate
                                                        )}
                                                      </>
                                                    ) : (
                                                      <></>
                                                    )}
                                                    {campaign.search_revType ===
                                                    "CPVisit" ? (
                                                      <>
                                                        {parseFloat(
                                                          row.visits *
                                                            campaign.search_unitRate
                                                        )}
                                                      </>
                                                    ) : (
                                                      <></>
                                                    )}
                                                  </td>
                                                  {/* MEDIA_COST */}
                                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    <>{row.cost}</>
                                                  </td>
                                                  {/* REVENUE_TYPE */}
                                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {campaign.search_revType}
                                                  </td>
                                                  {/* KICKBACK */}
                                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {
                                                      <>
                                                        {campaign.search_revType ===
                                                        "CPM" ? (
                                                          <>
                                                            {clients.map(
                                                              (client) =>
                                                                campaign.clientName ===
                                                                client.name ? (
                                                                  <>
                                                                    {(parseFloat(
                                                                      row.impressions *
                                                                        campaign.search_unitRate
                                                                    ) *
                                                                      client.kickback_value) /
                                                                      100 /
                                                                      1000}
                                                                  </>
                                                                ) : (
                                                                  <></>
                                                                )
                                                            )}
                                                          </>
                                                        ) : (
                                                          <></>
                                                        )}
                                                        {campaign.search_revType ===
                                                        "CPC" ? (
                                                          <>
                                                            {clients.map(
                                                              (client) =>
                                                                campaign.clientName ===
                                                                client.name ? (
                                                                  <>
                                                                    {(parseFloat(
                                                                      row.clicks *
                                                                        campaign.search_unitRate
                                                                    ) *
                                                                      client.kickback_value) /
                                                                      100}
                                                                  </>
                                                                ) : (
                                                                  <></>
                                                                )
                                                            )}
                                                          </>
                                                        ) : (
                                                          <></>
                                                        )}
                                                        {campaign.search_revType ===
                                                        "CPCV" ? (
                                                          <>
                                                            {clients.map(
                                                              (client) =>
                                                                campaign.clientName ===
                                                                client.name ? (
                                                                  <>
                                                                    {(parseFloat(
                                                                      row.completed_views *
                                                                        campaign.search_unitRate
                                                                    ) *
                                                                      client.kickback_value) /
                                                                      100}
                                                                  </>
                                                                ) : (
                                                                  <></>
                                                                )
                                                            )}
                                                          </>
                                                        ) : (
                                                          <></>
                                                        )}
                                                        {campaign.search_revType ===
                                                        "CPL" ? (
                                                          <>
                                                            {clients.map(
                                                              (client) =>
                                                                campaign.clientName ===
                                                                client.name ? (
                                                                  <>
                                                                    {(parseFloat(
                                                                      row.conversions *
                                                                        campaign.search_unitRate
                                                                    ) *
                                                                      client.kickback_value) /
                                                                      100}
                                                                  </>
                                                                ) : (
                                                                  <></>
                                                                )
                                                            )}
                                                          </>
                                                        ) : (
                                                          <></>
                                                        )}
                                                        {campaign.search_revType ===
                                                        "CPA" ? (
                                                          <>
                                                            {clients.map(
                                                              (client) =>
                                                                campaign.clientName ===
                                                                client.name ? (
                                                                  <>
                                                                    {(parseFloat(
                                                                      row.conversions *
                                                                        campaign.search_unitRate
                                                                    ) *
                                                                      client.kickback_value) /
                                                                      100}
                                                                  </>
                                                                ) : (
                                                                  <></>
                                                                )
                                                            )}
                                                          </>
                                                        ) : (
                                                          <></>
                                                        )}
                                                        {campaign.search_revType ===
                                                        "CPViews" ? (
                                                          <>
                                                            {clients.map(
                                                              (client) =>
                                                                campaign.clientName ===
                                                                client.name ? (
                                                                  <>
                                                                    {(parseFloat(
                                                                      row.views *
                                                                        campaign.search_unitRate
                                                                    ) *
                                                                      client.kickback_value) /
                                                                      100}
                                                                  </>
                                                                ) : (
                                                                  <></>
                                                                )
                                                            )}
                                                          </>
                                                        ) : (
                                                          <></>
                                                        )}
                                                        {campaign.search_revType ===
                                                        "CPVisit" ? (
                                                          <>
                                                            {clients.map(
                                                              (client) =>
                                                                campaign.clientName ===
                                                                client.name ? (
                                                                  <>
                                                                    {(parseFloat(
                                                                      row.visits *
                                                                        campaign.search_unitRate
                                                                    ) *
                                                                      client.kickback_value) /
                                                                      100}
                                                                  </>
                                                                ) : (
                                                                  <></>
                                                                )
                                                            )}
                                                          </>
                                                        ) : (
                                                          <></>
                                                        )}
                                                      </>
                                                    }
                                                  </td>
                                                  {/* PROFIT */}
                                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    <>
                                                      {campaign.search_revType ===
                                                      "CPM" ? (
                                                        <>
                                                          {clients.map(
                                                            (client) =>
                                                              campaign.clientName ===
                                                              client.name ? (
                                                                <>
                                                                  {parseFloat(
                                                                    row.impressions *
                                                                      (campaign.search_unitRate /
                                                                        1000) *
                                                                      (1 -
                                                                        client.kickback_value /
                                                                          100) -
                                                                      row.cost
                                                                  ).toFixed(2)}
                                                                </>
                                                              ) : (
                                                                <></>
                                                              )
                                                          )}
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}
                                                      {campaign.search_revType ===
                                                      "CPC" ? (
                                                        <>
                                                          {clients.map(
                                                            (client) =>
                                                              campaign.clientName ===
                                                              client.name ? (
                                                                <>
                                                                  {parseFloat(
                                                                    row.clicks *
                                                                      campaign.search_unitRate *
                                                                      (1 -
                                                                        client.kickback_value /
                                                                          100) -
                                                                      row.cost
                                                                  ).toFixed(2)}
                                                                </>
                                                              ) : (
                                                                <></>
                                                              )
                                                          )}
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}
                                                      {campaign.search_revType ===
                                                      "CPCV" ? (
                                                        <>
                                                          {clients.map(
                                                            (client) =>
                                                              campaign.clientName ===
                                                              client.name ? (
                                                                <>
                                                                  {parseFloat(
                                                                    row.completed_views *
                                                                      campaign.search_unitRate *
                                                                      (1 -
                                                                        client.kickback_value /
                                                                          100) -
                                                                      row.cost
                                                                  ).toFixed(2)}
                                                                </>
                                                              ) : (
                                                                <></>
                                                              )
                                                          )}
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}
                                                      {campaign.search_revType ===
                                                      "CPL" ? (
                                                        <>
                                                          {clients.map(
                                                            (client) =>
                                                              campaign.clientName ===
                                                              client.name ? (
                                                                <>
                                                                  {parseFloat(
                                                                    row.conversions *
                                                                      campaign.search_unitRate *
                                                                      (1 -
                                                                        client.kickback_value /
                                                                          100) -
                                                                      row.cost
                                                                  ).toFixed(2)}
                                                                </>
                                                              ) : (
                                                                <></>
                                                              )
                                                          )}
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}
                                                      {campaign.search_revType ===
                                                      "CPA" ? (
                                                        <>
                                                          {clients.map(
                                                            (client) =>
                                                              campaign.clientName ===
                                                              client.name ? (
                                                                <>
                                                                  {parseFloat(
                                                                    row.conversions *
                                                                      campaign.search_unitRate *
                                                                      (1 -
                                                                        client.kickback_value /
                                                                          100) -
                                                                      row.cost
                                                                  ).toFixed(2)}
                                                                </>
                                                              ) : (
                                                                <></>
                                                              )
                                                          )}
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}
                                                      {campaign.search_revType ===
                                                      "CPViews" ? (
                                                        <>
                                                          {clients.map(
                                                            (client) =>
                                                              campaign.clientName ===
                                                              client.name ? (
                                                                <>
                                                                  {parseFloat(
                                                                    row.views *
                                                                      campaign.search_unitRate *
                                                                      (1 -
                                                                        client.kickback_value /
                                                                          100) -
                                                                      row.cost
                                                                  ).toFixed(2)}
                                                                </>
                                                              ) : (
                                                                <></>
                                                              )
                                                          )}
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}
                                                      {campaign.search_revType ===
                                                      "CPVisit" ? (
                                                        <>
                                                          {clients.map(
                                                            (client) =>
                                                              campaign.clientName ===
                                                              client.name ? (
                                                                <>
                                                                  {parseFloat(
                                                                    row.visits *
                                                                      campaign.search_unitRate *
                                                                      (1 -
                                                                        client.kickback_value /
                                                                          100) -
                                                                      row.cost
                                                                  ).toFixed(2)}
                                                                </>
                                                              ) : (
                                                                <></>
                                                              )
                                                          )}
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}
                                                    </>
                                                  </td>
                                                  {/* PROFIT_PERCENTAGE */}
                                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    <>
                                                      {campaign.search_revType ===
                                                      "CPM" ? (
                                                        <>
                                                          {clients.map(
                                                            (client) =>
                                                              campaign.clientName ===
                                                              client.name ? (
                                                                <>
                                                                  {parseFloat(
                                                                    ((row.impressions *
                                                                      (campaign.search_unitRate /
                                                                        1000) *
                                                                      (1 -
                                                                        client.kickback_value /
                                                                          100) -
                                                                      row.cost) /
                                                                      (row.impressions *
                                                                        campaign.search_unitRate)) *
                                                                      100
                                                                  ).toFixed(2)}
                                                                </>
                                                              ) : (
                                                                <></>
                                                              )
                                                          )}

                                                          {" %"}
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}
                                                      {campaign.search_revType ===
                                                      "CPC" ? (
                                                        <>
                                                          {clients.map(
                                                            (client) =>
                                                              campaign.clientName ===
                                                              client.name ? (
                                                                <>
                                                                  {parseFloat(
                                                                    ((row.clicks *
                                                                      campaign.search_unitRate *
                                                                      (1 -
                                                                        client.kickback_value /
                                                                          100) -
                                                                      row.cost) /
                                                                      (row.clicks *
                                                                        campaign.search_unitRate)) *
                                                                      100
                                                                  ).toFixed(2)}
                                                                </>
                                                              ) : (
                                                                <></>
                                                              )
                                                          )}
                                                          {" %"}
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}
                                                      {campaign.search_revType ===
                                                      "CPCV" ? (
                                                        <>
                                                          {clients.map(
                                                            (client) =>
                                                              campaign.clientName ===
                                                              client.name ? (
                                                                <>
                                                                  {parseFloat(
                                                                    ((row.completed_views *
                                                                      campaign.search_unitRate *
                                                                      (1 -
                                                                        client.kickback_value /
                                                                          100) -
                                                                      row.cost) /
                                                                      (row.completed_views *
                                                                        campaign.search_unitRate)) *
                                                                      100
                                                                  ).toFixed(2)}
                                                                </>
                                                              ) : (
                                                                <></>
                                                              )
                                                          )}
                                                          {" %"}
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}
                                                      {campaign.search_revType ===
                                                      "CPL" ? (
                                                        <>
                                                          {clients.map(
                                                            (client) =>
                                                              campaign.clientName ===
                                                              client.name ? (
                                                                <>
                                                                  {parseFloat(
                                                                    ((row.conversions *
                                                                      campaign.search_unitRate *
                                                                      (1 -
                                                                        client.kickback_value /
                                                                          100) -
                                                                      row.cost) /
                                                                      (row.conversions *
                                                                        campaign.search_unitRate)) *
                                                                      100
                                                                  ).toFixed(2)}
                                                                </>
                                                              ) : (
                                                                <></>
                                                              )
                                                          )}
                                                          {" %"}
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}
                                                      {campaign.search_revType ===
                                                      "CPA" ? (
                                                        <>
                                                          {clients.map(
                                                            (client) =>
                                                              campaign.clientName ===
                                                              client.name ? (
                                                                <>
                                                                  {parseFloat(
                                                                    ((row.conversions *
                                                                      campaign.search_unitRate *
                                                                      (1 -
                                                                        client.kickback_value /
                                                                          100) -
                                                                      row.cost) /
                                                                      (row.conversions *
                                                                        campaign.search_unitRate)) *
                                                                      100
                                                                  ).toFixed(2)}
                                                                </>
                                                              ) : (
                                                                <></>
                                                              )
                                                          )}
                                                          {" %"}
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}
                                                      {campaign.search_revType ===
                                                      "CPViews" ? (
                                                        <>
                                                          {clients.map(
                                                            (client) =>
                                                              campaign.clientName ===
                                                              client.name ? (
                                                                <>
                                                                  {parseFloat(
                                                                    ((row.views *
                                                                      campaign.search_unitRate *
                                                                      (1 -
                                                                        client.kickback_value /
                                                                          100) -
                                                                      row.cost) /
                                                                      (row.views *
                                                                        campaign.search_unitRate)) *
                                                                      100
                                                                  ).toFixed(2)}
                                                                </>
                                                              ) : (
                                                                <></>
                                                              )
                                                          )}
                                                          {" %"}
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}
                                                      {campaign.search_revType ===
                                                      "CPVisit" ? (
                                                        <>
                                                          {clients.map(
                                                            (client) =>
                                                              campaign.clientName ===
                                                              client.name ? (
                                                                <>
                                                                  {parseFloat(
                                                                    ((row.visits *
                                                                      campaign.search_unitRate *
                                                                      (1 -
                                                                        client.kickback_value /
                                                                          100) -
                                                                      row.cost) /
                                                                      (row.visits *
                                                                        campaign.search_unitRate)) *
                                                                      100
                                                                  ).toFixed(2)}
                                                                </>
                                                              ) : (
                                                                <></>
                                                              )
                                                          )}
                                                          {" %"}
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}
                                                    </>
                                                  </td>

                                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {campaign.search_unitRate}
                                                  </td>
                                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {
                                                      <>
                                                        {campaign.search_revType ===
                                                        "CPM" ? (
                                                          <>
                                                            {parseFloat(
                                                              (row.cost *
                                                                1000) /
                                                                row.impressions
                                                            ).toFixed(2)}
                                                          </>
                                                        ) : (
                                                          <></>
                                                        )}
                                                        {campaign.search_revType ===
                                                        "CPC" ? (
                                                          <>
                                                            {parseFloat(
                                                              row.cost /
                                                                row.clicks
                                                            ).toFixed(2)}
                                                          </>
                                                        ) : (
                                                          <></>
                                                        )}
                                                        {campaign.search_revType ===
                                                        "CPCV" ? (
                                                          <>
                                                            {parseFloat(
                                                              row.cost /
                                                                row.completed_views
                                                            ).toFixed(2)}
                                                          </>
                                                        ) : (
                                                          <></>
                                                        )}
                                                        {campaign.search_revType ===
                                                        "CPL" ? (
                                                          <>
                                                            {parseFloat(
                                                              row.cost /
                                                                row.conversions
                                                            ).toFixed(2)}
                                                          </>
                                                        ) : (
                                                          <></>
                                                        )}
                                                        {campaign.search_revType ===
                                                        "CPA" ? (
                                                          <>
                                                            {parseFloat(
                                                              row.cost /
                                                                row.conversions
                                                            ).toFixed(2)}
                                                          </>
                                                        ) : (
                                                          <></>
                                                        )}
                                                        {campaign.search_revType ===
                                                        "CPViews" ? (
                                                          <>
                                                            {parseFloat(
                                                              row.cost /
                                                                row.views
                                                            ).toFixed(2)}
                                                          </>
                                                        ) : (
                                                          <></>
                                                        )}
                                                        {campaign.search_revType ===
                                                        "CPVisit" ? (
                                                          <>
                                                            {parseFloat(
                                                              row.cost /
                                                                row.visits
                                                            ).toFixed(2)}
                                                          </>
                                                        ) : (
                                                          <></>
                                                        )}
                                                      </>
                                                    }
                                                  </td>
                                                </tr>
                                              </>
                                            ) : (
                                              <></>
                                            )
                                          )}
                                        </>
                                      ) : (
                                        <></>
                                      )}

                                      {/* SOCIAL_CAMPAIGN */}
                                      {campaign.social_endDate >
                                        selected.date &&
                                      campaign.social_campaign === true ? (
                                        <>
                                          {JSON.parse(
                                            reports[reports.length - 1]
                                              .xlsxToJSONStr
                                          ).map((row) =>
                                            row.reference ===
                                            campaign.reference_id_social_campaign ? (
                                              <>
                                                <tr>
                                                  {/* NAME */}
                                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {campaign.name}
                                                  </td>
                                                  {/* CLIENT */}
                                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {campaign.clientName}
                                                  </td>
                                                  {/* CAMPAIGN TYPE */}
                                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    Social campaign
                                                  </td>
                                                  {/* REVENUE */}
                                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    $
                                                    {campaign.social_revType ===
                                                    "CPM" ? (
                                                      <>
                                                        {parseFloat(
                                                          (row.impressions *
                                                            campaign.social_unitRate) /
                                                            1000
                                                        )}
                                                      </>
                                                    ) : (
                                                      <></>
                                                    )}
                                                    {campaign.social_revType ===
                                                    "CPC" ? (
                                                      <>
                                                        {parseFloat(
                                                          row.clicks *
                                                            campaign.social_unitRate
                                                        )}
                                                      </>
                                                    ) : (
                                                      <></>
                                                    )}
                                                    {campaign.social_revType ===
                                                    "CPCV" ? (
                                                      <>
                                                        {parseFloat(
                                                          row.completed_views *
                                                            campaign.social_unitRate
                                                        )}
                                                      </>
                                                    ) : (
                                                      <></>
                                                    )}
                                                    {campaign.social_revType ===
                                                    "CPL" ? (
                                                      <>
                                                        {parseFloat(
                                                          row.conversions *
                                                            campaign.social_unitRate
                                                        )}
                                                      </>
                                                    ) : (
                                                      <></>
                                                    )}
                                                    {campaign.social_revType ===
                                                    "CPA" ? (
                                                      <>
                                                        {parseFloat(
                                                          row.conversions *
                                                            campaign.social_unitRate
                                                        )}
                                                      </>
                                                    ) : (
                                                      <></>
                                                    )}
                                                    {campaign.social_revType ===
                                                    "CPViews" ? (
                                                      <>
                                                        {parseFloat(
                                                          row.views *
                                                            campaign.social_unitRate
                                                        )}
                                                      </>
                                                    ) : (
                                                      <></>
                                                    )}
                                                    {campaign.social_revType ===
                                                    "CPVisit" ? (
                                                      <>
                                                        {parseFloat(
                                                          row.visits *
                                                            campaign.social_unitRate
                                                        )}
                                                      </>
                                                    ) : (
                                                      <></>
                                                    )}
                                                  </td>
                                                  {/* MEDIA_COST */}
                                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    <>{row.cost}</>
                                                  </td>
                                                  {/* REVENUE_TYPE */}
                                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {campaign.social_revType}
                                                  </td>
                                                  {/* KICKBACK */}
                                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {
                                                      <>
                                                        {campaign.social_revType ===
                                                        "CPM" ? (
                                                          <>
                                                            {clients.map(
                                                              (client) =>
                                                                campaign.clientName ===
                                                                client.name ? (
                                                                  <>
                                                                    {(parseFloat(
                                                                      row.impressions *
                                                                        campaign.social_unitRate
                                                                    ) *
                                                                      client.kickback_value) /
                                                                      100 /
                                                                      1000}
                                                                  </>
                                                                ) : (
                                                                  <></>
                                                                )
                                                            )}
                                                          </>
                                                        ) : (
                                                          <></>
                                                        )}
                                                        {campaign.social_revType ===
                                                        "CPC" ? (
                                                          <>
                                                            {clients.map(
                                                              (client) =>
                                                                campaign.clientName ===
                                                                client.name ? (
                                                                  <>
                                                                    {(parseFloat(
                                                                      row.clicks *
                                                                        campaign.social_unitRate
                                                                    ) *
                                                                      client.kickback_value) /
                                                                      100}
                                                                  </>
                                                                ) : (
                                                                  <></>
                                                                )
                                                            )}
                                                          </>
                                                        ) : (
                                                          <></>
                                                        )}
                                                        {campaign.social_revType ===
                                                        "CPCV" ? (
                                                          <>
                                                            {clients.map(
                                                              (client) =>
                                                                campaign.clientName ===
                                                                client.name ? (
                                                                  <>
                                                                    {(parseFloat(
                                                                      row.completed_views *
                                                                        campaign.social_unitRate
                                                                    ) *
                                                                      client.kickback_value) /
                                                                      100}
                                                                  </>
                                                                ) : (
                                                                  <></>
                                                                )
                                                            )}
                                                          </>
                                                        ) : (
                                                          <></>
                                                        )}
                                                        {campaign.social_revType ===
                                                        "CPL" ? (
                                                          <>
                                                            {clients.map(
                                                              (client) =>
                                                                campaign.clientName ===
                                                                client.name ? (
                                                                  <>
                                                                    {(parseFloat(
                                                                      row.conversions *
                                                                        campaign.social_unitRate
                                                                    ) *
                                                                      client.kickback_value) /
                                                                      100}
                                                                  </>
                                                                ) : (
                                                                  <></>
                                                                )
                                                            )}
                                                          </>
                                                        ) : (
                                                          <></>
                                                        )}
                                                        {campaign.social_revType ===
                                                        "CPA" ? (
                                                          <>
                                                            {clients.map(
                                                              (client) =>
                                                                campaign.clientName ===
                                                                client.name ? (
                                                                  <>
                                                                    {(parseFloat(
                                                                      row.conversions *
                                                                        campaign.social_unitRate
                                                                    ) *
                                                                      client.kickback_value) /
                                                                      100}
                                                                  </>
                                                                ) : (
                                                                  <></>
                                                                )
                                                            )}
                                                          </>
                                                        ) : (
                                                          <></>
                                                        )}
                                                        {campaign.social_revType ===
                                                        "CPViews" ? (
                                                          <>
                                                            {clients.map(
                                                              (client) =>
                                                                campaign.clientName ===
                                                                client.name ? (
                                                                  <>
                                                                    {(parseFloat(
                                                                      row.views *
                                                                        campaign.social_unitRate
                                                                    ) *
                                                                      client.kickback_value) /
                                                                      100}
                                                                  </>
                                                                ) : (
                                                                  <></>
                                                                )
                                                            )}
                                                          </>
                                                        ) : (
                                                          <></>
                                                        )}
                                                        {campaign.social_revType ===
                                                        "CPVisit" ? (
                                                          <>
                                                            {clients.map(
                                                              (client) =>
                                                                campaign.clientName ===
                                                                client.name ? (
                                                                  <>
                                                                    {(parseFloat(
                                                                      row.visits *
                                                                        campaign.social_unitRate
                                                                    ) *
                                                                      client.kickback_value) /
                                                                      100}
                                                                  </>
                                                                ) : (
                                                                  <></>
                                                                )
                                                            )}
                                                          </>
                                                        ) : (
                                                          <></>
                                                        )}
                                                      </>
                                                    }
                                                  </td>
                                                  {/* PROFIT */}
                                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    <>
                                                      {campaign.social_revType ===
                                                      "CPM" ? (
                                                        <>
                                                          {clients.map(
                                                            (client) =>
                                                              campaign.clientName ===
                                                              client.name ? (
                                                                <>
                                                                  {parseFloat(
                                                                    row.impressions *
                                                                      (campaign.social_unitRate /
                                                                        1000) *
                                                                      (1 -
                                                                        client.kickback_value /
                                                                          100) -
                                                                      row.cost
                                                                  ).toFixed(2)}
                                                                </>
                                                              ) : (
                                                                <></>
                                                              )
                                                          )}
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}
                                                      {campaign.social_revType ===
                                                      "CPC" ? (
                                                        <>
                                                          {clients.map(
                                                            (client) =>
                                                              campaign.clientName ===
                                                              client.name ? (
                                                                <>
                                                                  {parseFloat(
                                                                    row.clicks *
                                                                      campaign.social_unitRate *
                                                                      (1 -
                                                                        client.kickback_value /
                                                                          100) -
                                                                      row.cost
                                                                  ).toFixed(2)}
                                                                </>
                                                              ) : (
                                                                <></>
                                                              )
                                                          )}
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}
                                                      {campaign.social_revType ===
                                                      "CPCV" ? (
                                                        <>
                                                          {clients.map(
                                                            (client) =>
                                                              campaign.clientName ===
                                                              client.name ? (
                                                                <>
                                                                  {parseFloat(
                                                                    row.completed_views *
                                                                      campaign.social_unitRate *
                                                                      (1 -
                                                                        client.kickback_value /
                                                                          100) -
                                                                      row.cost
                                                                  ).toFixed(2)}
                                                                </>
                                                              ) : (
                                                                <></>
                                                              )
                                                          )}
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}
                                                      {campaign.social_revType ===
                                                      "CPL" ? (
                                                        <>
                                                          {clients.map(
                                                            (client) =>
                                                              campaign.clientName ===
                                                              client.name ? (
                                                                <>
                                                                  {parseFloat(
                                                                    row.conversions *
                                                                      campaign.social_unitRate *
                                                                      (1 -
                                                                        client.kickback_value /
                                                                          100) -
                                                                      row.cost
                                                                  ).toFixed(2)}
                                                                </>
                                                              ) : (
                                                                <></>
                                                              )
                                                          )}
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}
                                                      {campaign.social_revType ===
                                                      "CPA" ? (
                                                        <>
                                                          {clients.map(
                                                            (client) =>
                                                              campaign.clientName ===
                                                              client.name ? (
                                                                <>
                                                                  {parseFloat(
                                                                    row.conversions *
                                                                      campaign.social_unitRate *
                                                                      (1 -
                                                                        client.kickback_value /
                                                                          100) -
                                                                      row.cost
                                                                  ).toFixed(2)}
                                                                </>
                                                              ) : (
                                                                <></>
                                                              )
                                                          )}
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}
                                                      {campaign.social_revType ===
                                                      "CPViews" ? (
                                                        <>
                                                          {clients.map(
                                                            (client) =>
                                                              campaign.clientName ===
                                                              client.name ? (
                                                                <>
                                                                  {parseFloat(
                                                                    row.views *
                                                                      campaign.social_unitRate *
                                                                      (1 -
                                                                        client.kickback_value /
                                                                          100) -
                                                                      row.cost
                                                                  ).toFixed(2)}
                                                                </>
                                                              ) : (
                                                                <></>
                                                              )
                                                          )}
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}
                                                      {campaign.social_revType ===
                                                      "CPVisit" ? (
                                                        <>
                                                          {clients.map(
                                                            (client) =>
                                                              campaign.clientName ===
                                                              client.name ? (
                                                                <>
                                                                  {parseFloat(
                                                                    row.visits *
                                                                      campaign.social_unitRate *
                                                                      (1 -
                                                                        client.kickback_value /
                                                                          100) -
                                                                      row.cost
                                                                  ).toFixed(2)}
                                                                </>
                                                              ) : (
                                                                <></>
                                                              )
                                                          )}
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}
                                                    </>
                                                  </td>
                                                  {/* PROFIT_PERCENTAGE */}
                                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    <>
                                                      {campaign.social_revType ===
                                                      "CPM" ? (
                                                        <>
                                                          {clients.map(
                                                            (client) =>
                                                              campaign.clientName ===
                                                              client.name ? (
                                                                <>
                                                                  {parseFloat(
                                                                    ((row.impressions *
                                                                      (campaign.social_unitRate /
                                                                        1000) *
                                                                      (1 -
                                                                        client.kickback_value /
                                                                          100) -
                                                                      row.cost) /
                                                                      (row.impressions *
                                                                        campaign.social_unitRate)) *
                                                                      100
                                                                  ).toFixed(2)}
                                                                </>
                                                              ) : (
                                                                <></>
                                                              )
                                                          )}

                                                          {" %"}
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}
                                                      {campaign.social_revType ===
                                                      "CPC" ? (
                                                        <>
                                                          {clients.map(
                                                            (client) =>
                                                              campaign.clientName ===
                                                              client.name ? (
                                                                <>
                                                                  {parseFloat(
                                                                    ((row.clicks *
                                                                      campaign.social_unitRate *
                                                                      (1 -
                                                                        client.kickback_value /
                                                                          100) -
                                                                      row.cost) /
                                                                      (row.clicks *
                                                                        campaign.social_unitRate)) *
                                                                      100
                                                                  ).toFixed(2)}
                                                                </>
                                                              ) : (
                                                                <></>
                                                              )
                                                          )}
                                                          {" %"}
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}
                                                      {campaign.social_revType ===
                                                      "CPCV" ? (
                                                        <>
                                                          {clients.map(
                                                            (client) =>
                                                              campaign.clientName ===
                                                              client.name ? (
                                                                <>
                                                                  {parseFloat(
                                                                    ((row.completed_views *
                                                                      campaign.social_unitRate *
                                                                      (1 -
                                                                        client.kickback_value /
                                                                          100) -
                                                                      row.cost) /
                                                                      (row.completed_views *
                                                                        campaign.social_unitRate)) *
                                                                      100
                                                                  ).toFixed(2)}
                                                                </>
                                                              ) : (
                                                                <></>
                                                              )
                                                          )}
                                                          {" %"}
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}
                                                      {campaign.social_revType ===
                                                      "CPL" ? (
                                                        <>
                                                          {clients.map(
                                                            (client) =>
                                                              campaign.clientName ===
                                                              client.name ? (
                                                                <>
                                                                  {parseFloat(
                                                                    ((row.conversions *
                                                                      campaign.social_unitRate *
                                                                      (1 -
                                                                        client.kickback_value /
                                                                          100) -
                                                                      row.cost) /
                                                                      (row.conversions *
                                                                        campaign.social_unitRate)) *
                                                                      100
                                                                  ).toFixed(2)}
                                                                </>
                                                              ) : (
                                                                <></>
                                                              )
                                                          )}
                                                          {" %"}
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}
                                                      {campaign.social_revType ===
                                                      "CPA" ? (
                                                        <>
                                                          {clients.map(
                                                            (client) =>
                                                              campaign.clientName ===
                                                              client.name ? (
                                                                <>
                                                                  {parseFloat(
                                                                    ((row.conversions *
                                                                      campaign.social_unitRate *
                                                                      (1 -
                                                                        client.kickback_value /
                                                                          100) -
                                                                      row.cost) /
                                                                      (row.conversions *
                                                                        campaign.social_unitRate)) *
                                                                      100
                                                                  ).toFixed(2)}
                                                                </>
                                                              ) : (
                                                                <></>
                                                              )
                                                          )}
                                                          {" %"}
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}
                                                      {campaign.social_revType ===
                                                      "CPViews" ? (
                                                        <>
                                                          {clients.map(
                                                            (client) =>
                                                              campaign.clientName ===
                                                              client.name ? (
                                                                <>
                                                                  {parseFloat(
                                                                    ((row.views *
                                                                      campaign.social_unitRate *
                                                                      (1 -
                                                                        client.kickback_value /
                                                                          100) -
                                                                      row.cost) /
                                                                      (row.views *
                                                                        campaign.social_unitRate)) *
                                                                      100
                                                                  ).toFixed(2)}
                                                                </>
                                                              ) : (
                                                                <></>
                                                              )
                                                          )}
                                                          {" %"}
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}
                                                      {campaign.social_revType ===
                                                      "CPVisit" ? (
                                                        <>
                                                          {clients.map(
                                                            (client) =>
                                                              campaign.clientName ===
                                                              client.name ? (
                                                                <>
                                                                  {parseFloat(
                                                                    ((row.visits *
                                                                      campaign.social_unitRate *
                                                                      (1 -
                                                                        client.kickback_value /
                                                                          100) -
                                                                      row.cost) /
                                                                      (row.visits *
                                                                        campaign.social_unitRate)) *
                                                                      100
                                                                  ).toFixed(2)}
                                                                </>
                                                              ) : (
                                                                <></>
                                                              )
                                                          )}
                                                          {" %"}
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}
                                                    </>
                                                  </td>

                                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {campaign.social_unitRate}
                                                  </td>
                                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {
                                                      <>
                                                        {campaign.social_revType ===
                                                        "CPM" ? (
                                                          <>
                                                            {parseFloat(
                                                              (row.cost *
                                                                1000) /
                                                                row.impressions
                                                            ).toFixed(2)}
                                                          </>
                                                        ) : (
                                                          <></>
                                                        )}
                                                        {campaign.social_revType ===
                                                        "CPC" ? (
                                                          <>
                                                            {parseFloat(
                                                              row.cost /
                                                                row.clicks
                                                            ).toFixed(2)}
                                                          </>
                                                        ) : (
                                                          <></>
                                                        )}
                                                        {campaign.social_revType ===
                                                        "CPCV" ? (
                                                          <>
                                                            {parseFloat(
                                                              row.cost /
                                                                row.completed_views
                                                            ).toFixed(2)}
                                                          </>
                                                        ) : (
                                                          <></>
                                                        )}
                                                        {campaign.social_revType ===
                                                        "CPL" ? (
                                                          <>
                                                            {parseFloat(
                                                              row.cost /
                                                                row.conversions
                                                            ).toFixed(2)}
                                                          </>
                                                        ) : (
                                                          <></>
                                                        )}
                                                        {campaign.social_revType ===
                                                        "CPA" ? (
                                                          <>
                                                            {parseFloat(
                                                              row.cost /
                                                                row.conversions
                                                            ).toFixed(2)}
                                                          </>
                                                        ) : (
                                                          <></>
                                                        )}
                                                        {campaign.social_revType ===
                                                        "CPViews" ? (
                                                          <>
                                                            {parseFloat(
                                                              row.cost /
                                                                row.views
                                                            ).toFixed(2)}
                                                          </>
                                                        ) : (
                                                          <></>
                                                        )}
                                                        {campaign.social_revType ===
                                                        "CPVisit" ? (
                                                          <>
                                                            {parseFloat(
                                                              row.cost /
                                                                row.visits
                                                            ).toFixed(2)}
                                                          </>
                                                        ) : (
                                                          <></>
                                                        )}
                                                      </>
                                                    }
                                                  </td>
                                                </tr>
                                              </>
                                            ) : (
                                              <></>
                                            )
                                          )}
                                        </>
                                      ) : (
                                        <></>
                                      )}

                                      {/* VIDEO_CAMPAIGN */}
                                      {campaign.video_endDate > selected.date &&
                                      campaign.video_campaign === true ? (
                                        <>
                                          {JSON.parse(
                                            reports[reports.length - 1]
                                              .xlsxToJSONStr
                                          ).map((row) =>
                                            row.reference ===
                                            campaign.reference_id_video_campaign ? (
                                              <>
                                                <tr>
                                                  {/* NAME */}
                                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {campaign.name}
                                                  </td>
                                                  {/* CLIENT */}
                                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {campaign.clientName}
                                                  </td>
                                                  {/* CAMPAIGN TYPE */}
                                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    video campaign
                                                  </td>
                                                  {/* REVENUE */}
                                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    $
                                                    {campaign.video_revType ===
                                                    "CPM" ? (
                                                      <>
                                                        {parseFloat(
                                                          (row.impressions *
                                                            campaign.video_unitRate) /
                                                            1000
                                                        )}
                                                      </>
                                                    ) : (
                                                      <></>
                                                    )}
                                                    {campaign.video_revType ===
                                                    "CPC" ? (
                                                      <>
                                                        {parseFloat(
                                                          row.clicks *
                                                            campaign.video_unitRate
                                                        )}
                                                      </>
                                                    ) : (
                                                      <></>
                                                    )}
                                                    {campaign.video_revType ===
                                                    "CPCV" ? (
                                                      <>
                                                        {parseFloat(
                                                          row.completed_views *
                                                            campaign.video_unitRate
                                                        )}
                                                      </>
                                                    ) : (
                                                      <></>
                                                    )}
                                                    {campaign.video_revType ===
                                                    "CPL" ? (
                                                      <>
                                                        {parseFloat(
                                                          row.conversions *
                                                            campaign.video_unitRate
                                                        )}
                                                      </>
                                                    ) : (
                                                      <></>
                                                    )}
                                                    {campaign.video_revType ===
                                                    "CPA" ? (
                                                      <>
                                                        {parseFloat(
                                                          row.conversions *
                                                            campaign.video_unitRate
                                                        )}
                                                      </>
                                                    ) : (
                                                      <></>
                                                    )}
                                                    {campaign.video_revType ===
                                                    "CPViews" ? (
                                                      <>
                                                        {parseFloat(
                                                          row.views *
                                                            campaign.video_unitRate
                                                        )}
                                                      </>
                                                    ) : (
                                                      <></>
                                                    )}
                                                    {campaign.video_revType ===
                                                    "CPVisit" ? (
                                                      <>
                                                        {parseFloat(
                                                          row.visits *
                                                            campaign.video_unitRate
                                                        )}
                                                      </>
                                                    ) : (
                                                      <></>
                                                    )}
                                                  </td>
                                                  {/* MEDIA_COST */}
                                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    <>{row.cost}</>
                                                  </td>
                                                  {/* REVENUE_TYPE */}
                                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {campaign.video_revType}
                                                  </td>
                                                  {/* KICKBACK */}
                                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {
                                                      <>
                                                        {campaign.video_revType ===
                                                        "CPM" ? (
                                                          <>
                                                            {clients.map(
                                                              (client) =>
                                                                campaign.clientName ===
                                                                client.name ? (
                                                                  <>
                                                                    {(parseFloat(
                                                                      row.impressions *
                                                                        campaign.video_unitRate
                                                                    ) *
                                                                      client.kickback_value) /
                                                                      100 /
                                                                      1000}
                                                                  </>
                                                                ) : (
                                                                  <></>
                                                                )
                                                            )}
                                                          </>
                                                        ) : (
                                                          <></>
                                                        )}
                                                        {campaign.video_revType ===
                                                        "CPC" ? (
                                                          <>
                                                            {clients.map(
                                                              (client) =>
                                                                campaign.clientName ===
                                                                client.name ? (
                                                                  <>
                                                                    {(parseFloat(
                                                                      row.clicks *
                                                                        campaign.video_unitRate
                                                                    ) *
                                                                      client.kickback_value) /
                                                                      100}
                                                                  </>
                                                                ) : (
                                                                  <></>
                                                                )
                                                            )}
                                                          </>
                                                        ) : (
                                                          <></>
                                                        )}
                                                        {campaign.video_revType ===
                                                        "CPCV" ? (
                                                          <>
                                                            {clients.map(
                                                              (client) =>
                                                                campaign.clientName ===
                                                                client.name ? (
                                                                  <>
                                                                    {(parseFloat(
                                                                      row.completed_views *
                                                                        campaign.video_unitRate
                                                                    ) *
                                                                      client.kickback_value) /
                                                                      100}
                                                                  </>
                                                                ) : (
                                                                  <></>
                                                                )
                                                            )}
                                                          </>
                                                        ) : (
                                                          <></>
                                                        )}
                                                        {campaign.video_revType ===
                                                        "CPL" ? (
                                                          <>
                                                            {clients.map(
                                                              (client) =>
                                                                campaign.clientName ===
                                                                client.name ? (
                                                                  <>
                                                                    {(parseFloat(
                                                                      row.conversions *
                                                                        campaign.video_unitRate
                                                                    ) *
                                                                      client.kickback_value) /
                                                                      100}
                                                                  </>
                                                                ) : (
                                                                  <></>
                                                                )
                                                            )}
                                                          </>
                                                        ) : (
                                                          <></>
                                                        )}
                                                        {campaign.video_revType ===
                                                        "CPA" ? (
                                                          <>
                                                            {clients.map(
                                                              (client) =>
                                                                campaign.clientName ===
                                                                client.name ? (
                                                                  <>
                                                                    {(parseFloat(
                                                                      row.conversions *
                                                                        campaign.video_unitRate
                                                                    ) *
                                                                      client.kickback_value) /
                                                                      100}
                                                                  </>
                                                                ) : (
                                                                  <></>
                                                                )
                                                            )}
                                                          </>
                                                        ) : (
                                                          <></>
                                                        )}
                                                        {campaign.video_revType ===
                                                        "CPViews" ? (
                                                          <>
                                                            {clients.map(
                                                              (client) =>
                                                                campaign.clientName ===
                                                                client.name ? (
                                                                  <>
                                                                    {(parseFloat(
                                                                      row.views *
                                                                        campaign.video_unitRate
                                                                    ) *
                                                                      client.kickback_value) /
                                                                      100}
                                                                  </>
                                                                ) : (
                                                                  <></>
                                                                )
                                                            )}
                                                          </>
                                                        ) : (
                                                          <></>
                                                        )}
                                                        {campaign.video_revType ===
                                                        "CPVisit" ? (
                                                          <>
                                                            {clients.map(
                                                              (client) =>
                                                                campaign.clientName ===
                                                                client.name ? (
                                                                  <>
                                                                    {(parseFloat(
                                                                      row.visits *
                                                                        campaign.video_unitRate
                                                                    ) *
                                                                      client.kickback_value) /
                                                                      100}
                                                                  </>
                                                                ) : (
                                                                  <></>
                                                                )
                                                            )}
                                                          </>
                                                        ) : (
                                                          <></>
                                                        )}
                                                      </>
                                                    }
                                                  </td>
                                                  {/* PROFIT */}
                                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    <>
                                                      {campaign.video_revType ===
                                                      "CPM" ? (
                                                        <>
                                                          {clients.map(
                                                            (client) =>
                                                              campaign.clientName ===
                                                              client.name ? (
                                                                <>
                                                                  {parseFloat(
                                                                    row.impressions *
                                                                      (campaign.video_unitRate /
                                                                        1000) *
                                                                      (1 -
                                                                        client.kickback_value /
                                                                          100) -
                                                                      row.cost
                                                                  ).toFixed(2)}
                                                                </>
                                                              ) : (
                                                                <></>
                                                              )
                                                          )}
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}
                                                      {campaign.video_revType ===
                                                      "CPC" ? (
                                                        <>
                                                          {clients.map(
                                                            (client) =>
                                                              campaign.clientName ===
                                                              client.name ? (
                                                                <>
                                                                  {parseFloat(
                                                                    row.clicks *
                                                                      campaign.video_unitRate *
                                                                      (1 -
                                                                        client.kickback_value /
                                                                          100) -
                                                                      row.cost
                                                                  ).toFixed(2)}
                                                                </>
                                                              ) : (
                                                                <></>
                                                              )
                                                          )}
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}
                                                      {campaign.video_revType ===
                                                      "CPCV" ? (
                                                        <>
                                                          {clients.map(
                                                            (client) =>
                                                              campaign.clientName ===
                                                              client.name ? (
                                                                <>
                                                                  {parseFloat(
                                                                    row.completed_views *
                                                                      campaign.video_unitRate *
                                                                      (1 -
                                                                        client.kickback_value /
                                                                          100) -
                                                                      row.cost
                                                                  ).toFixed(2)}
                                                                </>
                                                              ) : (
                                                                <></>
                                                              )
                                                          )}
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}
                                                      {campaign.video_revType ===
                                                      "CPL" ? (
                                                        <>
                                                          {clients.map(
                                                            (client) =>
                                                              campaign.clientName ===
                                                              client.name ? (
                                                                <>
                                                                  {parseFloat(
                                                                    row.conversions *
                                                                      campaign.video_unitRate *
                                                                      (1 -
                                                                        client.kickback_value /
                                                                          100) -
                                                                      row.cost
                                                                  ).toFixed(2)}
                                                                </>
                                                              ) : (
                                                                <></>
                                                              )
                                                          )}
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}
                                                      {campaign.video_revType ===
                                                      "CPA" ? (
                                                        <>
                                                          {clients.map(
                                                            (client) =>
                                                              campaign.clientName ===
                                                              client.name ? (
                                                                <>
                                                                  {parseFloat(
                                                                    row.conversions *
                                                                      campaign.video_unitRate *
                                                                      (1 -
                                                                        client.kickback_value /
                                                                          100) -
                                                                      row.cost
                                                                  ).toFixed(2)}
                                                                </>
                                                              ) : (
                                                                <></>
                                                              )
                                                          )}
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}
                                                      {campaign.video_revType ===
                                                      "CPViews" ? (
                                                        <>
                                                          {clients.map(
                                                            (client) =>
                                                              campaign.clientName ===
                                                              client.name ? (
                                                                <>
                                                                  {parseFloat(
                                                                    row.views *
                                                                      campaign.video_unitRate *
                                                                      (1 -
                                                                        client.kickback_value /
                                                                          100) -
                                                                      row.cost
                                                                  ).toFixed(2)}
                                                                </>
                                                              ) : (
                                                                <></>
                                                              )
                                                          )}
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}
                                                      {campaign.video_revType ===
                                                      "CPVisit" ? (
                                                        <>
                                                          {clients.map(
                                                            (client) =>
                                                              campaign.clientName ===
                                                              client.name ? (
                                                                <>
                                                                  {parseFloat(
                                                                    row.visits *
                                                                      campaign.video_unitRate *
                                                                      (1 -
                                                                        client.kickback_value /
                                                                          100) -
                                                                      row.cost
                                                                  ).toFixed(2)}
                                                                </>
                                                              ) : (
                                                                <></>
                                                              )
                                                          )}
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}
                                                    </>
                                                  </td>
                                                  {/* PROFIT_PERCENTAGE */}
                                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    <>
                                                      {campaign.video_revType ===
                                                      "CPM" ? (
                                                        <>
                                                          {clients.map(
                                                            (client) =>
                                                              campaign.clientName ===
                                                              client.name ? (
                                                                <>
                                                                  {parseFloat(
                                                                    ((row.impressions *
                                                                      (campaign.video_unitRate /
                                                                        1000) *
                                                                      (1 -
                                                                        client.kickback_value /
                                                                          100) -
                                                                      row.cost) /
                                                                      (row.impressions *
                                                                        campaign.video_unitRate)) *
                                                                      100
                                                                  ).toFixed(2)}
                                                                </>
                                                              ) : (
                                                                <></>
                                                              )
                                                          )}

                                                          {" %"}
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}
                                                      {campaign.video_revType ===
                                                      "CPC" ? (
                                                        <>
                                                          {clients.map(
                                                            (client) =>
                                                              campaign.clientName ===
                                                              client.name ? (
                                                                <>
                                                                  {parseFloat(
                                                                    ((row.clicks *
                                                                      campaign.video_unitRate *
                                                                      (1 -
                                                                        client.kickback_value /
                                                                          100) -
                                                                      row.cost) /
                                                                      (row.clicks *
                                                                        campaign.video_unitRate)) *
                                                                      100
                                                                  ).toFixed(2)}
                                                                </>
                                                              ) : (
                                                                <></>
                                                              )
                                                          )}
                                                          {" %"}
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}
                                                      {campaign.video_revType ===
                                                      "CPCV" ? (
                                                        <>
                                                          {clients.map(
                                                            (client) =>
                                                              campaign.clientName ===
                                                              client.name ? (
                                                                <>
                                                                  {parseFloat(
                                                                    ((row.completed_views *
                                                                      campaign.video_unitRate *
                                                                      (1 -
                                                                        client.kickback_value /
                                                                          100) -
                                                                      row.cost) /
                                                                      (row.completed_views *
                                                                        campaign.video_unitRate)) *
                                                                      100
                                                                  ).toFixed(2)}
                                                                </>
                                                              ) : (
                                                                <></>
                                                              )
                                                          )}
                                                          {" %"}
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}
                                                      {campaign.video_revType ===
                                                      "CPL" ? (
                                                        <>
                                                          {clients.map(
                                                            (client) =>
                                                              campaign.clientName ===
                                                              client.name ? (
                                                                <>
                                                                  {parseFloat(
                                                                    ((row.conversions *
                                                                      campaign.video_unitRate *
                                                                      (1 -
                                                                        client.kickback_value /
                                                                          100) -
                                                                      row.cost) /
                                                                      (row.conversions *
                                                                        campaign.video_unitRate)) *
                                                                      100
                                                                  ).toFixed(2)}
                                                                </>
                                                              ) : (
                                                                <></>
                                                              )
                                                          )}
                                                          {" %"}
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}
                                                      {campaign.video_revType ===
                                                      "CPA" ? (
                                                        <>
                                                          {clients.map(
                                                            (client) =>
                                                              campaign.clientName ===
                                                              client.name ? (
                                                                <>
                                                                  {parseFloat(
                                                                    ((row.conversions *
                                                                      campaign.video_unitRate *
                                                                      (1 -
                                                                        client.kickback_value /
                                                                          100) -
                                                                      row.cost) /
                                                                      (row.conversions *
                                                                        campaign.video_unitRate)) *
                                                                      100
                                                                  ).toFixed(2)}
                                                                </>
                                                              ) : (
                                                                <></>
                                                              )
                                                          )}
                                                          {" %"}
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}
                                                      {campaign.video_revType ===
                                                      "CPViews" ? (
                                                        <>
                                                          {clients.map(
                                                            (client) =>
                                                              campaign.clientName ===
                                                              client.name ? (
                                                                <>
                                                                  {parseFloat(
                                                                    ((row.views *
                                                                      campaign.video_unitRate *
                                                                      (1 -
                                                                        client.kickback_value /
                                                                          100) -
                                                                      row.cost) /
                                                                      (row.views *
                                                                        campaign.video_unitRate)) *
                                                                      100
                                                                  ).toFixed(2)}
                                                                </>
                                                              ) : (
                                                                <></>
                                                              )
                                                          )}
                                                          {" %"}
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}
                                                      {campaign.video_revType ===
                                                      "CPVisit" ? (
                                                        <>
                                                          {clients.map(
                                                            (client) =>
                                                              campaign.clientName ===
                                                              client.name ? (
                                                                <>
                                                                  {parseFloat(
                                                                    ((row.visits *
                                                                      campaign.video_unitRate *
                                                                      (1 -
                                                                        client.kickback_value /
                                                                          100) -
                                                                      row.cost) /
                                                                      (row.visits *
                                                                        campaign.video_unitRate)) *
                                                                      100
                                                                  ).toFixed(2)}
                                                                </>
                                                              ) : (
                                                                <></>
                                                              )
                                                          )}
                                                          {" %"}
                                                        </>
                                                      ) : (
                                                        <></>
                                                      )}
                                                    </>
                                                  </td>

                                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {campaign.video_unitRate}
                                                  </td>
                                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {
                                                      <>
                                                        {campaign.video_revType ===
                                                        "CPM" ? (
                                                          <>
                                                            {parseFloat(
                                                              (row.cost *
                                                                1000) /
                                                                row.impressions
                                                            ).toFixed(2)}
                                                          </>
                                                        ) : (
                                                          <></>
                                                        )}
                                                        {campaign.video_revType ===
                                                        "CPC" ? (
                                                          <>
                                                            {parseFloat(
                                                              row.cost /
                                                                row.clicks
                                                            ).toFixed(2)}
                                                          </>
                                                        ) : (
                                                          <></>
                                                        )}
                                                        {campaign.video_revType ===
                                                        "CPCV" ? (
                                                          <>
                                                            {parseFloat(
                                                              row.cost /
                                                                row.completed_views
                                                            ).toFixed(2)}
                                                          </>
                                                        ) : (
                                                          <></>
                                                        )}
                                                        {campaign.video_revType ===
                                                        "CPL" ? (
                                                          <>
                                                            {parseFloat(
                                                              row.cost /
                                                                row.conversions
                                                            ).toFixed(2)}
                                                          </>
                                                        ) : (
                                                          <></>
                                                        )}
                                                        {campaign.video_revType ===
                                                        "CPA" ? (
                                                          <>
                                                            {parseFloat(
                                                              row.cost /
                                                                row.conversions
                                                            ).toFixed(2)}
                                                          </>
                                                        ) : (
                                                          <></>
                                                        )}
                                                        {campaign.video_revType ===
                                                        "CPViews" ? (
                                                          <>
                                                            {parseFloat(
                                                              row.cost /
                                                                row.views
                                                            ).toFixed(2)}
                                                          </>
                                                        ) : (
                                                          <></>
                                                        )}
                                                        {campaign.video_revType ===
                                                        "CPVisit" ? (
                                                          <>
                                                            {parseFloat(
                                                              row.cost /
                                                                row.visits
                                                            ).toFixed(2)}
                                                          </>
                                                        ) : (
                                                          <></>
                                                        )}
                                                      </>
                                                    }
                                                  </td>
                                                </tr>
                                              </>
                                            ) : (
                                              <></>
                                            )
                                          )}
                                        </>
                                      ) : (
                                        <></>
                                      )}
                                    </>
                                  )}
                                </>
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
