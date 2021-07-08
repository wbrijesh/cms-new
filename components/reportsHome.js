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
  { name: "Clients", href: "/clients", icon: BriefcaseIcon, current: false },
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
    current: true,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Content({ setNavigation, setSidebarOpen }) {
  setNavigation(navigation);

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
        <div>
          <p>reports page here</p>
        </div>
      </div>
    </>
  );
}
