import { useState } from "react";
import Dropzone from "./Dropzone";
import { Report } from "../models";
import { DataStore } from "@aws-amplify/datastore";
import { Form, Field } from "react-final-form";
import XLSX from "xlsx";
import moment from "moment";
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
  { name: "Upload", href: "#", icon: outlineUploadIcon, current: true },
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
    href: "/reports/profit",
    icon: CurrencyRupeeIcon,
    current: false,
  },
];

const submitFormFunc = async (values) => {
  let submissionObject = {
    uploadDate: new Date().toISOString().slice(0, 10),
  };

  const uploadFormData = async (formData) => {
    console.log("FORM DATA:", formData);
    await DataStore.save(new Report(formData));
    window.location.reload();
  };

  if (values.REPORT_file !== undefined) {
    console.log("report file found");
    let fileReader = new FileReader();
    fileReader.readAsBinaryString(values.REPORT_file[0]);
    fileReader.onload = (event) => {
      console.log("convert excel file to binary: ", event.target.result);
      let data = event.target.result;
      let workbook = XLSX.read(data, { type: "binary" });
      console.log("converted workbook: ", workbook);
      workbook.SheetNames.forEach((sheet) => {
        let testObject = XLSX.utils.sheet_to_row_object_array(
          workbook.Sheets[sheet]
        );
        console.log("conversion test: ", testObject);
        submissionObject.xlsxToJSONStr = JSON.stringify(testObject);
        submissionObject.xlsxToJSONObj = JSON.stringify(testObject);
        submissionObject.upload_date = moment();
        console.log("Submission Oject: ", submissionObject);
        uploadFormData(submissionObject);
      });
    };
  } else {
    alert("report file not found");
  }
};

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
  console.log("PAGE RELOAD");
  console.log(reports);
  console.log("TODAYS REPORT: ", todaysReport);
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
                  {todaysReport ? (
                    <>
                      <div className="mt-8 p-4 bg-yellow-100 rounded border border-yellow-500">
                        <p className="text-lg font-semibold text-gray-700">
                          Already uploaded for the day
                        </p>
                        <br />
                        <div className="-mt-4">
                          Please contact
                          <a
                            className="mx-2 bg-yellow-50 p-1 border-2 border-yellow-200 hover:border-gray-400 rounded-xl text-text-gray-700"
                            href="mailto:tech@performena.com"
                          >
                            tech@performena.com
                          </a>
                          for help
                        </div>
                      </div>
                      <h3 className="text-lg my-8 text-red-700">
                        remove this before pushing
                      </h3>
                      <Form
                        onSubmit={(values) => submitFormFunc(values)}
                        render={({ handleSubmit }) => (
                          <form
                            onSubmit={handleSubmit}
                            className="px-4 md:px-0 md:ml-0 md:mr-0 mt-10 space-y-8 divide-y divide-gray-200"
                          >
                            <div className="sm:mt-0 sm:col-span-2">
                              <div className="max-w-lg flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                <div className="space-y-1 text-center">
                                  <svg
                                    className="mx-auto h-12 w-12 text-gray-400"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 48 48"
                                    aria-hidden="true"
                                  >
                                    <path
                                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                      strokeWidth={2}
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                  <div className="flex text-sm text-gray-600">
                                    <label
                                      htmlFor="file-upload"
                                      className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                                    >
                                      <Field
                                        name="REPORT_file"
                                        component={Dropzone}
                                      />
                                    </label>
                                  </div>
                                  <p className="text-xs text-gray-500">
                                    File format: CSV, XLSX
                                  </p>
                                  <button
                                    type="submit"
                                    className="mt-2 inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                  >
                                    <UploadIcon
                                      className="-ml-0.5 mr-2 h-4 w-4"
                                      aria-hidden="true"
                                    />
                                    Upload Report
                                  </button>
                                </div>
                              </div>
                            </div>
                          </form>
                        )}
                      />
                    </>
                  ) : (
                    <Form
                      onSubmit={(values) => submitFormFunc(values)}
                      render={({ handleSubmit }) => (
                        <form
                          onSubmit={handleSubmit}
                          className="px-4 md:px-0 md:ml-0 md:mr-0 mt-10 space-y-8 divide-y divide-gray-200"
                        >
                          <div className="sm:mt-0 sm:col-span-2">
                            <div className="max-w-lg flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                              <div className="space-y-1 text-center">
                                <svg
                                  className="mx-auto h-12 w-12 text-gray-400"
                                  stroke="currentColor"
                                  fill="none"
                                  viewBox="0 0 48 48"
                                  aria-hidden="true"
                                >
                                  <path
                                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                                <div className="flex text-sm text-gray-600">
                                  <label
                                    htmlFor="file-upload"
                                    className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                                  >
                                    <Field
                                      name="REPORT_file"
                                      component={Dropzone}
                                    />
                                  </label>
                                </div>
                                <p className="text-xs text-gray-500">
                                  File format: CSV, XLSX
                                </p>
                                <button
                                  type="submit"
                                  className="mt-2 inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                  <UploadIcon
                                    className="-ml-0.5 mr-2 h-4 w-4"
                                    aria-hidden="true"
                                  />
                                  Upload Report
                                </button>
                              </div>
                            </div>
                          </div>
                        </form>
                      )}
                    />
                  )}
                </div>
              </div>
            </div>
          </main>
        </div>
      )}
    </>
  );
}
