import { useState, useEffect } from "react";
import { Form, Field } from "react-final-form";
import Dropzone from "./Dropzone";
import { v4 as uuid } from "uuid";
import XLSX from "xlsx";
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
} from "@heroicons/react/solid";
import { UploadIcon } from "@heroicons/react/solid";

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
  {
    name: "Upload",
    href: "/reports/upload",
    icon: outlineUploadIcon,
    current: false,
  },
  { name: "Pacing", href: "#", icon: InboxInIcon, current: true },
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

export default function Content({
  setNavigation,
  setSidebarOpen,
  reports,
  todaysReport,
}) {
  setNavigation(navigation);
  console.log("todaysReport: ", todaysReport);

  // const submitFormFunc = async (values) => {
  //   let submissionObject = {
  //     uploadDate: new Date().toISOString().slice(0, 10),
  //   };

  //   function convertFile(input_File) {
  //     console.log("convert this: ", input_File);
  //     let fileReader = new FileReader();
  //     fileReader.readAsBinaryString(input_File);
  //     fileReader.onload = (event) => {
  //       console.log("convert excel file to binary: ", event.target.result);
  //       let data = event.target.result;
  //       let workbook = XLSX.read(data, { type: "binary" });
  //       console.log("converted workbook: ", workbook);
  //       workbook.SheetNames.forEach((sheet) => {
  //         let testObject = XLSX.utils.sheet_to_row_object_array(
  //           workbook.Sheets[sheet]
  //         );
  //         console.log("conversion test: ", testObject);
  //         submissionObject.string_field = JSON.stringify(testObject);
  //       });
  //     };
  //   }

  //   if (values.REPORT_file !== undefined) {
  //     convertFile(values.REPORT_file[0]);
  //     setReportExists(true);
  //   }

  //   console.log("Submission Object: ", submissionObject);
  //   await DataStore.save(new Rmodel(submissionObject));
  //   window.location.reload();
  // };

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
        <main className="m-2 flex-1 overflow-y-auto focus:outline-none">
          <div className="relative max-w-4xl mx-auto md:px-8 xl:px-0">
            <div className="md:pt-0 pt-10 pb-16">
              <div className="pb-5 border-b border-gray-200 flex items-center justify-between">
                <h1 className="text-3xl font-semibold text-gray-900">Report</h1>
              </div>
              <div className="mt-4">
                <div>
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
                      <nav className="-mb-px flex space-x-8" aria-label="Tabs">
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
                {todaysReport !== null ? (
                  <div className="mt-8 p-4 bg-yellow-100 rounded border border-yellow-500">
                    <p className="text-lg font-semibold text-gray-700">
                      Show report pacing here
                    </p>
                  </div>
                ) : (
                  <div className="mt-8 p-4 bg-yellow-100 rounded border border-yellow-500">
                    <p className="text-lg font-semibold text-gray-700">
                      Todays report not uploaded
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
