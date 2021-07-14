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
    href: "/reports/performance",
    icon: TrendingUpIcon,
    current: false,
  },
  {
    name: "Profit",
    href: "#",
    icon: CurrencyRupeeIcon,
    current: true,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Content({ setNavigation, setSidebarOpen, reports }) {
  setNavigation(navigation);
  console.log("PAGE RELOAD");
  console.log(reports);
  return (
    <>
      {reports && (
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
                </div>
              </div>
            </div>
          </main>
        </div>
      )}
    </>
  );
}
