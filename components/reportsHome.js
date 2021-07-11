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
  UserGroupIcon,
  PresentationChartLineIcon,
} from "@heroicons/react/outline";
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

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Content({
  setNavigation,
  setSidebarOpen,
  reports,
  reportExists,
}) {
  setNavigation(navigation);

  const submitFormFunc = async (values) => {
    let submissionObject = {
      uploadDate: new Date().toISOString().slice(0, 10),
    };

    function convertFile(input_File) {
      console.log("convert this: ", input_File);
      let fileReader = new FileReader();
      fileReader.readAsBinaryString(input_File);
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
          submissionObject.string_field = JSON.stringify(testObject);
        });
      };
    }

    if (values.REPORT_file !== undefined) {
      convertFile(values.REPORT_file[0]);
      setReportExists(true);
    }

    console.log("Submission Object: ", submissionObject);
    await DataStore.save(new Rmodel(submissionObject));
    window.location.reload();
  };

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
                {reportExists == true ? (
                  <p>
                    Already uploaded for the day? <br />
                    <text className="my-2">
                      Please contact{" "}
                      <a
                        className="mx-2 bg-gray-200 p-1 border-2 border-transparent hover:border-gray-400 rounded-xl text-text-gray-700"
                        href="mailto:tech@performena.com"
                      >
                        tech@performena.com
                      </a>
                      for help{" "}
                    </text>
                  </p>
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
    </>
  );
}
