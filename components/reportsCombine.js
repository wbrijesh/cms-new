import { useState, useEffect, Fragment } from "react";
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
import combineReportsFunction from "./temp.js";

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
      {
        (reports,
        combinedArray && (
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
                    {JSON.stringify(combinedArray)}
                  </div>
                </div>
              </div>
            </main>
          </div>
        ))
      }
    </>
  );
}
