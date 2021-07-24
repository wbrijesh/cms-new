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
import moment from "moment";

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

let localReportsArray = [];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Content({
  setNavigation,
  setSidebarOpen,
  reports,
  campaigns,
}) {
  setNavigation(navigation);
  console.log("PAGE RELOAD");
  console.log("CAMPAIGNS HERE: ", campaigns);

  // function ComposeContainer() {
  //   reports &&
  //     reports.map((report) =>
  //       console.log(
  //         JSON.stringify(
  //           JSON.parse(report.xlsxToJSONStr).map(
  //             (row) => console.log(row.platform)
  //             // localReportsArray.push(row)
  //           )
  //         )
  //       )
  //     );
  // }
  // ComposeContainer();

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
                  <div className="mt-2 flex flex-col">
                    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                      <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="mt-12 shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
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
                                  Rev Type
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  Goal
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  Expected
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  Delivered
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  End date
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  Pacing
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
                                      {campaign.display_campaign === true ? (
                                        <>
                                          <tr>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                              {campaign.name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                              {campaign.clientName}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                              Display campaign
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                              {campaign.display_revType}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                              {campaign.display_goal}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                              {new Date(
                                                campaign.display_endDate
                                              ) -
                                                new Date() <
                                              0 ? (
                                                <>
                                                  {campaign.display_goal}
                                                  <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                                                    Not In Flight
                                                  </span>
                                                </>
                                              ) : (
                                                <>
                                                  {(Math.ceil(
                                                    Math.abs(
                                                      new Date(
                                                        campaign.display_endDate
                                                      ) - new Date()
                                                    ) /
                                                      (1000 * 60 * 60 * 24)
                                                  ) *
                                                    campaign.display_goal) /
                                                    Math.ceil(
                                                      Math.abs(
                                                        new Date(
                                                          campaign.display_endDate
                                                        ) -
                                                          new Date(
                                                            campaign.display_startDate
                                                          )
                                                      ) /
                                                        (1000 * 60 * 60 * 24)
                                                    )}
                                                </>
                                              )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                              {reports.map((report) =>
                                                JSON.parse(
                                                  report.xlsxToJSONStr
                                                ).map((row) =>
                                                  row.reference ===
                                                  campaign.reference_id_display_campaign ? (
                                                    <>{row.impressions}</>
                                                  ) : (
                                                    <></>
                                                  )
                                                )
                                              )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                              {campaign.display_endDate}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                              {reports.map((report) =>
                                                JSON.parse(
                                                  report.xlsxToJSONStr
                                                ).map((row) =>
                                                  row.reference ===
                                                  campaign.reference_id_display_campaign ? (
                                                    <>
                                                      {parseFloat(
                                                        (row.impressions /
                                                          Math.trunc(
                                                            (Math.ceil(
                                                              Math.abs(
                                                                new Date(
                                                                  campaign.display_endDate
                                                                ) - new Date()
                                                              ) /
                                                                (1000 *
                                                                  60 *
                                                                  60 *
                                                                  24)
                                                            ) *
                                                              campaign.display_goal) /
                                                              Math.ceil(
                                                                Math.abs(
                                                                  new Date(
                                                                    campaign.display_endDate
                                                                  ) -
                                                                    new Date(
                                                                      campaign.display_startDate
                                                                    )
                                                                ) /
                                                                  (1000 *
                                                                    60 *
                                                                    60 *
                                                                    24)
                                                              )
                                                          ) -
                                                          1) *
                                                          100
                                                      ).toFixed(2)}
                                                    </>
                                                  ) : (
                                                    <></>
                                                  )
                                                )
                                              )}
                                              %
                                            </td>
                                          </tr>
                                        </>
                                      ) : (
                                        <></>
                                      )}
                                      {/* HIGHIMPACT_CAMPAIGN */}
                                      {campaign.highImpact_campaign === true ? (
                                        <>
                                          <tr>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                              {campaign.name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                              {campaign.clientName}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                              High impact campaign
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                              {campaign.highImpact_revType}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                              {campaign.highImpact_goal}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                              {new Date(
                                                campaign.highImpact_endDate
                                              ) -
                                                new Date() <
                                              0 ? (
                                                <>
                                                  {campaign.highImpact_goal}
                                                  <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                                                    Not In Flight
                                                  </span>
                                                </>
                                              ) : (
                                                <>
                                                  {(Math.ceil(
                                                    Math.abs(
                                                      new Date(
                                                        campaign.highImpact_endDate
                                                      ) - new Date()
                                                    ) /
                                                      (1000 * 60 * 60 * 24)
                                                  ) *
                                                    campaign.highImpact_goal) /
                                                    Math.ceil(
                                                      Math.abs(
                                                        new Date(
                                                          campaign.highImpact_endDate
                                                        ) -
                                                          new Date(
                                                            campaign.highImpact_startDate
                                                          )
                                                      ) /
                                                        (1000 * 60 * 60 * 24)
                                                    )}
                                                </>
                                              )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                              {reports.map((report) =>
                                                JSON.parse(
                                                  report.xlsxToJSONStr
                                                ).map((row) =>
                                                  row.reference ===
                                                  campaign.reference_id_highImpact_campaign ? (
                                                    <>{row.impressions}</>
                                                  ) : (
                                                    <></>
                                                  )
                                                )
                                              )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                              {campaign.highImpact_endDate}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                              {reports.map((report) =>
                                                JSON.parse(
                                                  report.xlsxToJSONStr
                                                ).map((row) =>
                                                  row.reference ===
                                                  campaign.reference_id_highImpact_campaign ? (
                                                    <>
                                                      {parseFloat(
                                                        (row.impressions /
                                                          Math.trunc(
                                                            (Math.ceil(
                                                              Math.abs(
                                                                new Date(
                                                                  campaign.highImpact_endDate
                                                                ) - new Date()
                                                              ) /
                                                                (1000 *
                                                                  60 *
                                                                  60 *
                                                                  24)
                                                            ) *
                                                              campaign.highImpact_goal) /
                                                              Math.ceil(
                                                                Math.abs(
                                                                  new Date(
                                                                    campaign.highImpact_endDate
                                                                  ) -
                                                                    new Date(
                                                                      campaign.highImpact_startDate
                                                                    )
                                                                ) /
                                                                  (1000 *
                                                                    60 *
                                                                    60 *
                                                                    24)
                                                              )
                                                          ) -
                                                          1) *
                                                          100
                                                      ).toFixed(2)}
                                                    </>
                                                  ) : (
                                                    <></>
                                                  )
                                                )
                                              )}
                                              %
                                            </td>
                                          </tr>
                                        </>
                                      ) : (
                                        <></>
                                      )}
                                      {/* NATIVE_CAMPAIGN */}
                                      {campaign.native_campaign === true ? (
                                        <>
                                          <tr>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                              {campaign.name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                              {campaign.clientName}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                              Native campaign
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                              {campaign.native_revType}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                              {campaign.native_goal}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                              {new Date(
                                                campaign.native_endDate
                                              ) -
                                                new Date() <
                                              0 ? (
                                                <>
                                                  {campaign.native_goal}
                                                  <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                                                    Not In Flight
                                                  </span>
                                                </>
                                              ) : (
                                                <>
                                                  {(Math.ceil(
                                                    Math.abs(
                                                      new Date(
                                                        campaign.native_endDate
                                                      ) - new Date()
                                                    ) /
                                                      (1000 * 60 * 60 * 24)
                                                  ) *
                                                    campaign.native_goal) /
                                                    Math.ceil(
                                                      Math.abs(
                                                        new Date(
                                                          campaign.native_endDate
                                                        ) -
                                                          new Date(
                                                            campaign.native_startDate
                                                          )
                                                      ) /
                                                        (1000 * 60 * 60 * 24)
                                                    )}
                                                </>
                                              )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                              {reports.map((report) =>
                                                JSON.parse(
                                                  report.xlsxToJSONStr
                                                ).map((row) =>
                                                  row.reference ===
                                                  campaign.reference_id_native_campaign ? (
                                                    <>{row.impressions}</>
                                                  ) : (
                                                    <></>
                                                  )
                                                )
                                              )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                              {campaign.native_endDate}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                              {reports.map((report) =>
                                                JSON.parse(
                                                  report.xlsxToJSONStr
                                                ).map((row) =>
                                                  row.reference ===
                                                  campaign.reference_id_native_campaign ? (
                                                    <>
                                                      {parseFloat(
                                                        (row.impressions /
                                                          Math.trunc(
                                                            (Math.ceil(
                                                              Math.abs(
                                                                new Date(
                                                                  campaign.native_endDate
                                                                ) - new Date()
                                                              ) /
                                                                (1000 *
                                                                  60 *
                                                                  60 *
                                                                  24)
                                                            ) *
                                                              campaign.native_goal) /
                                                              Math.ceil(
                                                                Math.abs(
                                                                  new Date(
                                                                    campaign.native_endDate
                                                                  ) -
                                                                    new Date(
                                                                      campaign.native_startDate
                                                                    )
                                                                ) /
                                                                  (1000 *
                                                                    60 *
                                                                    60 *
                                                                    24)
                                                              )
                                                          ) -
                                                          1) *
                                                          100
                                                      ).toFixed(2)}
                                                    </>
                                                  ) : (
                                                    <></>
                                                  )
                                                )
                                              )}
                                              %
                                            </td>
                                          </tr>
                                        </>
                                      ) : (
                                        <></>
                                      )}
                                      {/* POP_CAMPAIGN */}
                                      {campaign.pop_campaign === true ? (
                                        <>
                                          <tr>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                              {campaign.name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                              {campaign.clientName}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                              Pop campaign
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                              {campaign.pop_revType}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                              {campaign.pop_goal}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                              {new Date(campaign.pop_endDate) -
                                                new Date() <
                                              0 ? (
                                                <>
                                                  {campaign.pop_goal}
                                                  <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                                                    Not In Flight
                                                  </span>
                                                </>
                                              ) : (
                                                <>
                                                  {(Math.ceil(
                                                    Math.abs(
                                                      new Date(
                                                        campaign.pop_endDate
                                                      ) - new Date()
                                                    ) /
                                                      (1000 * 60 * 60 * 24)
                                                  ) *
                                                    campaign.pop_goal) /
                                                    Math.ceil(
                                                      Math.abs(
                                                        new Date(
                                                          campaign.pop_endDate
                                                        ) -
                                                          new Date(
                                                            campaign.pop_startDate
                                                          )
                                                      ) /
                                                        (1000 * 60 * 60 * 24)
                                                    )}
                                                </>
                                              )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                              {reports.map((report) =>
                                                JSON.parse(
                                                  report.xlsxToJSONStr
                                                ).map((row) =>
                                                  row.reference ===
                                                  campaign.reference_id_pop_campaign ? (
                                                    <>{row.impressions}</>
                                                  ) : (
                                                    <></>
                                                  )
                                                )
                                              )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                              {campaign.pop_endDate}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                              {reports.map((report) =>
                                                JSON.parse(
                                                  report.xlsxToJSONStr
                                                ).map((row) =>
                                                  row.reference ===
                                                  campaign.reference_id_pop_campaign ? (
                                                    <>
                                                      {parseFloat(
                                                        (row.impressions /
                                                          Math.trunc(
                                                            (Math.ceil(
                                                              Math.abs(
                                                                new Date(
                                                                  campaign.pop_endDate
                                                                ) - new Date()
                                                              ) /
                                                                (1000 *
                                                                  60 *
                                                                  60 *
                                                                  24)
                                                            ) *
                                                              campaign.pop_goal) /
                                                              Math.ceil(
                                                                Math.abs(
                                                                  new Date(
                                                                    campaign.pop_endDate
                                                                  ) -
                                                                    new Date(
                                                                      campaign.pop_startDate
                                                                    )
                                                                ) /
                                                                  (1000 *
                                                                    60 *
                                                                    60 *
                                                                    24)
                                                              )
                                                          ) -
                                                          1) *
                                                          100
                                                      ).toFixed(2)}
                                                    </>
                                                  ) : (
                                                    <></>
                                                  )
                                                )
                                              )}
                                              %
                                            </td>
                                          </tr>
                                        </>
                                      ) : (
                                        <></>
                                      )}
                                      {/* PUSH_CAMPAIGN */}
                                      {campaign.push_campaign === true ? (
                                        <>
                                          <tr>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                              {campaign.name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                              {campaign.clientName}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                              Push campaign
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                              {campaign.push_revType}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                              {campaign.push_goal}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                              {new Date(campaign.push_endDate) -
                                                new Date() <
                                              0 ? (
                                                <>
                                                  {campaign.push_goal}
                                                  <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                                                    Not In Flight
                                                  </span>
                                                </>
                                              ) : (
                                                <>
                                                  {(Math.ceil(
                                                    Math.abs(
                                                      new Date(
                                                        campaign.push_endDate
                                                      ) - new Date()
                                                    ) /
                                                      (1000 * 60 * 60 * 24)
                                                  ) *
                                                    campaign.push_goal) /
                                                    Math.ceil(
                                                      Math.abs(
                                                        new Date(
                                                          campaign.push_endDate
                                                        ) -
                                                          new Date(
                                                            campaign.push_startDate
                                                          )
                                                      ) /
                                                        (1000 * 60 * 60 * 24)
                                                    )}
                                                </>
                                              )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                              {reports.map((report) =>
                                                JSON.parse(
                                                  report.xlsxToJSONStr
                                                ).map((row) =>
                                                  row.reference ===
                                                  campaign.reference_id_push_campaign ? (
                                                    <>{row.impressions}</>
                                                  ) : (
                                                    <></>
                                                  )
                                                )
                                              )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                              {campaign.push_endDate}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                              {reports.map((report) =>
                                                JSON.parse(
                                                  report.xlsxToJSONStr
                                                ).map((row) =>
                                                  row.reference ===
                                                  campaign.reference_id_push_campaign ? (
                                                    <>
                                                      {parseFloat(
                                                        (row.impressions /
                                                          Math.trunc(
                                                            (Math.ceil(
                                                              Math.abs(
                                                                new Date(
                                                                  campaign.push_endDate
                                                                ) - new Date()
                                                              ) /
                                                                (1000 *
                                                                  60 *
                                                                  60 *
                                                                  24)
                                                            ) *
                                                              campaign.push_goal) /
                                                              Math.ceil(
                                                                Math.abs(
                                                                  new Date(
                                                                    campaign.push_endDate
                                                                  ) -
                                                                    new Date(
                                                                      campaign.push_startDate
                                                                    )
                                                                ) /
                                                                  (1000 *
                                                                    60 *
                                                                    60 *
                                                                    24)
                                                              )
                                                          ) -
                                                          1) *
                                                          100
                                                      ).toFixed(2)}
                                                    </>
                                                  ) : (
                                                    <></>
                                                  )
                                                )
                                              )}
                                              %
                                            </td>
                                          </tr>
                                        </>
                                      ) : (
                                        <></>
                                      )}
                                      {/* RICHMEDIA_CAMPAIGN */}
                                      {campaign.richMedia_campaign === true ? (
                                        <>
                                          <tr>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                              {campaign.name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                              {campaign.clientName}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                              Rich media campaign
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                              {campaign.richMedia_revType}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                              {campaign.richMedia_goal}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                              {new Date(
                                                campaign.richMedia_endDate
                                              ) -
                                                new Date() <
                                              0 ? (
                                                <>
                                                  {campaign.richMedia_goal}
                                                  <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                                                    Not In Flight
                                                  </span>
                                                </>
                                              ) : (
                                                <>
                                                  {(Math.ceil(
                                                    Math.abs(
                                                      new Date(
                                                        campaign.richMedia_endDate
                                                      ) - new Date()
                                                    ) /
                                                      (1000 * 60 * 60 * 24)
                                                  ) *
                                                    campaign.richMedia_goal) /
                                                    Math.ceil(
                                                      Math.abs(
                                                        new Date(
                                                          campaign.richMedia_endDate
                                                        ) -
                                                          new Date(
                                                            campaign.richMedia_startDate
                                                          )
                                                      ) /
                                                        (1000 * 60 * 60 * 24)
                                                    )}
                                                </>
                                              )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                              {reports.map((report) =>
                                                JSON.parse(
                                                  report.xlsxToJSONStr
                                                ).map((row) =>
                                                  row.reference ===
                                                  campaign.reference_id_richMedia_campaign ? (
                                                    <>{row.impressions}</>
                                                  ) : (
                                                    <></>
                                                  )
                                                )
                                              )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                              {campaign.richMedia_endDate}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                              {reports.map((report) =>
                                                JSON.parse(
                                                  report.xlsxToJSONStr
                                                ).map((row) =>
                                                  row.reference ===
                                                  campaign.reference_id_richMedia_campaign ? (
                                                    <>
                                                      {parseFloat(
                                                        (row.impressions /
                                                          Math.trunc(
                                                            (Math.ceil(
                                                              Math.abs(
                                                                new Date(
                                                                  campaign.richMedia_endDate
                                                                ) - new Date()
                                                              ) /
                                                                (1000 *
                                                                  60 *
                                                                  60 *
                                                                  24)
                                                            ) *
                                                              campaign.richMedia_goal) /
                                                              Math.ceil(
                                                                Math.abs(
                                                                  new Date(
                                                                    campaign.richMedia_endDate
                                                                  ) -
                                                                    new Date(
                                                                      campaign.richMedia_startDate
                                                                    )
                                                                ) /
                                                                  (1000 *
                                                                    60 *
                                                                    60 *
                                                                    24)
                                                              )
                                                          ) -
                                                          1) *
                                                          100
                                                      ).toFixed(2)}
                                                    </>
                                                  ) : (
                                                    <></>
                                                  )
                                                )
                                              )}
                                              %
                                            </td>
                                          </tr>
                                        </>
                                      ) : (
                                        <></>
                                      )}
                                      {/* SEARCH_CAMPAIGN */}
                                      {campaign.search_campaign === true ? (
                                        <>
                                          <tr>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                              {campaign.name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                              {campaign.clientName}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                              Search campaign
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                              {campaign.search_revType}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                              {campaign.search_goal}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                              {new Date(
                                                campaign.search_endDate
                                              ) -
                                                new Date() <
                                              0 ? (
                                                <>
                                                  {campaign.search_goal}
                                                  <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                                                    Not In Flight
                                                  </span>
                                                </>
                                              ) : (
                                                <>
                                                  {Math.trunc(
                                                    (Math.ceil(
                                                      Math.abs(
                                                        new Date(
                                                          campaign.search_endDate
                                                        ) - new Date()
                                                      ) /
                                                        (1000 * 60 * 60 * 24)
                                                    ) *
                                                      campaign.search_goal) /
                                                      Math.ceil(
                                                        Math.abs(
                                                          new Date(
                                                            campaign.search_endDate
                                                          ) -
                                                            new Date(
                                                              campaign.search_startDate
                                                            )
                                                        ) /
                                                          (1000 * 60 * 60 * 24)
                                                      )
                                                  )}
                                                </>
                                              )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                              {reports.map((report) =>
                                                JSON.parse(
                                                  report.xlsxToJSONStr
                                                ).map((row) =>
                                                  row.reference ===
                                                  campaign.reference_id_search_campaign ? (
                                                    <>{row.impressions}</>
                                                  ) : (
                                                    <></>
                                                  )
                                                )
                                              )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                              {campaign.search_endDate}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                              {reports.map((report) =>
                                                JSON.parse(
                                                  report.xlsxToJSONStr
                                                ).map((row) =>
                                                  row.reference ===
                                                  campaign.reference_id_search_campaign ? (
                                                    <>
                                                      {parseFloat(
                                                        (row.impressions /
                                                          Math.trunc(
                                                            (Math.ceil(
                                                              Math.abs(
                                                                new Date(
                                                                  campaign.search_endDate
                                                                ) - new Date()
                                                              ) /
                                                                (1000 *
                                                                  60 *
                                                                  60 *
                                                                  24)
                                                            ) *
                                                              campaign.search_goal) /
                                                              Math.ceil(
                                                                Math.abs(
                                                                  new Date(
                                                                    campaign.search_endDate
                                                                  ) -
                                                                    new Date(
                                                                      campaign.search_startDate
                                                                    )
                                                                ) /
                                                                  (1000 *
                                                                    60 *
                                                                    60 *
                                                                    24)
                                                              )
                                                          ) -
                                                          1) *
                                                          100
                                                      ).toFixed(2)}
                                                    </>
                                                  ) : (
                                                    <></>
                                                  )
                                                )
                                              )}
                                              %
                                            </td>
                                          </tr>
                                        </>
                                      ) : (
                                        <></>
                                      )}
                                      {/* SOCIAL_CAMPAIGN */}
                                      {campaign.social_campaign === true ? (
                                        <>
                                          <tr>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                              {campaign.name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                              {campaign.clientName}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                              Social campaign
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                              {campaign.social_revType}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                              {campaign.social_goal}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                              {new Date(
                                                campaign.social_endDate
                                              ) -
                                                new Date() <
                                              0 ? (
                                                <>
                                                  {campaign.social_goal}
                                                  <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                                                    Not In Flight
                                                  </span>
                                                </>
                                              ) : (
                                                <>
                                                  {Math.trunc(
                                                    (Math.ceil(
                                                      Math.abs(
                                                        new Date(
                                                          campaign.social_endDate
                                                        ) - new Date()
                                                      ) /
                                                        (1000 * 60 * 60 * 24)
                                                    ) *
                                                      campaign.social_goal) /
                                                      Math.ceil(
                                                        Math.abs(
                                                          new Date(
                                                            campaign.social_endDate
                                                          ) -
                                                            new Date(
                                                              campaign.social_startDate
                                                            )
                                                        ) /
                                                          (1000 * 60 * 60 * 24)
                                                      )
                                                  )}
                                                </>
                                              )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                              {reports.map((report) =>
                                                JSON.parse(
                                                  report.xlsxToJSONStr
                                                ).map((row) =>
                                                  row.reference ===
                                                  campaign.reference_id_social_campaign ? (
                                                    <>{row.impressions}</>
                                                  ) : (
                                                    <></>
                                                  )
                                                )
                                              )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                              {campaign.social_endDate}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                              {reports.map((report) =>
                                                JSON.parse(
                                                  report.xlsxToJSONStr
                                                ).map((row) =>
                                                  row.reference ===
                                                  campaign.reference_id_social_campaign ? (
                                                    <>
                                                      {parseFloat(
                                                        (row.impressions /
                                                          Math.trunc(
                                                            (Math.ceil(
                                                              Math.abs(
                                                                new Date(
                                                                  campaign.social_endDate
                                                                ) - new Date()
                                                              ) /
                                                                (1000 *
                                                                  60 *
                                                                  60 *
                                                                  24)
                                                            ) *
                                                              campaign.social_goal) /
                                                              Math.ceil(
                                                                Math.abs(
                                                                  new Date(
                                                                    campaign.social_endDate
                                                                  ) -
                                                                    new Date(
                                                                      campaign.social_startDate
                                                                    )
                                                                ) /
                                                                  (1000 *
                                                                    60 *
                                                                    60 *
                                                                    24)
                                                              )
                                                          ) -
                                                          1) *
                                                          100
                                                      ).toFixed(2)}
                                                    </>
                                                  ) : (
                                                    <></>
                                                  )
                                                )
                                              )}
                                              %
                                            </td>
                                          </tr>
                                        </>
                                      ) : (
                                        <></>
                                      )}

                                      {/* VIDEO_CAMPAIGN */}
                                      {campaign.video_campaign === true ? (
                                        <>
                                          <tr>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                              {campaign.name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                              {campaign.clientName}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                              Video campaign
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                              {campaign.video_revType}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                              {campaign.video_goal}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                              {new Date(
                                                campaign.video_endDate
                                              ) -
                                                new Date() <
                                              0 ? (
                                                <>
                                                  {campaign.video_goal}
                                                  <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                                                    Not In Flight
                                                  </span>
                                                </>
                                              ) : (
                                                <>
                                                  {(Math.ceil(
                                                    Math.abs(
                                                      new Date(
                                                        campaign.video_endDate
                                                      ) - new Date()
                                                    ) /
                                                      (1000 * 60 * 60 * 24)
                                                  ) *
                                                    campaign.video_goal) /
                                                    Math.ceil(
                                                      Math.abs(
                                                        new Date(
                                                          campaign.video_endDate
                                                        ) -
                                                          new Date(
                                                            campaign.video_startDate
                                                          )
                                                      ) /
                                                        (1000 * 60 * 60 * 24)
                                                    )}
                                                </>
                                              )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                              {reports.map((report) =>
                                                JSON.parse(
                                                  report.xlsxToJSONStr
                                                ).map((row) =>
                                                  row.reference ===
                                                  campaign.reference_id_video_campaign ? (
                                                    <>{row.impressions}</>
                                                  ) : (
                                                    <></>
                                                  )
                                                )
                                              )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                              {campaign.video_endDate}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                              {reports.map((report) =>
                                                JSON.parse(
                                                  report.xlsxToJSONStr
                                                ).map((row) =>
                                                  row.reference ===
                                                  campaign.reference_id_video_campaign ? (
                                                    <>
                                                      {parseFloat(
                                                        (row.impressions /
                                                          Math.trunc(
                                                            (Math.ceil(
                                                              Math.abs(
                                                                new Date(
                                                                  campaign.video_endDate
                                                                ) - new Date()
                                                              ) /
                                                                (1000 *
                                                                  60 *
                                                                  60 *
                                                                  24)
                                                            ) *
                                                              campaign.video_goal) /
                                                              Math.ceil(
                                                                Math.abs(
                                                                  new Date(
                                                                    campaign.video_endDate
                                                                  ) -
                                                                    new Date(
                                                                      campaign.video_startDate
                                                                    )
                                                                ) /
                                                                  (1000 *
                                                                    60 *
                                                                    60 *
                                                                    24)
                                                              )
                                                          ) -
                                                          1) *
                                                          100
                                                      ).toFixed(2)}
                                                    </>
                                                  ) : (
                                                    <></>
                                                  )
                                                )
                                              )}
                                              %
                                            </td>
                                          </tr>
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
