import { useState, useEffect, Fragment, useRef } from "react";
import { DataStore } from "@aws-amplify/datastore";
import { Campaign } from "../models";
import { useRouter } from "next/router";

import Link from "next/link";
import {
  BriefcaseIcon,
  DocumentReportIcon,
  MenuAlt2Icon,
  HomeIcon,
  ExclamationIcon,
} from "@heroicons/react/outline";

import { Dialog, Transition } from "@headlessui/react";
import { JS } from "@aws-amplify/core";

const navigation = [
  { name: "Home", href: "/", icon: HomeIcon, current: false },
  {
    name: "Clients",
    href: "/clients",
    icon: BriefcaseIcon,
    current: false,
  },
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

export default function Content({
  setNavigation,
  setSidebarOpen,
  thisCampaign,
  clientName,
}) {
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const { id } = router.query;

  const deleteCampaign = async (id) => {
    DataStore.delete(await DataStore.query(Campaign, id));
    router.push("/campaigns");
  };

  console.log("client: ", clientName);

  let revenueTypesObject = [];

  if (thisCampaign.revenue_cpm == true) {
    revenueTypesObject.push("Revenue CPM");
  }
  if (thisCampaign.revenue_cpc == true) {
    revenueTypesObject.push("Revenue CPC");
  }
  if (thisCampaign.revenue_cpcv == true) {
    revenueTypesObject.push("Revenue CPCV");
  }
  if (thisCampaign.revenue_cpview == true) {
    revenueTypesObject.push("Revenue CPVIEW");
  }
  if (thisCampaign.revenue_cpvisit == true) {
    revenueTypesObject.push("Revenue CPVISIT");
  }
  if (thisCampaign.revenue_cpl == true) {
    revenueTypesObject.push("Revenue CPL");
  }
  if (thisCampaign.revenue_cpa == true) {
    revenueTypesObject.push("Revenue CPA");
  }
  if (thisCampaign.revenue_cpi == true) {
    revenueTypesObject.push("Revenue CPI");
  }
  if (thisCampaign.revenue_cps == true) {
    revenueTypesObject.push("Revenue CPS");
  }

  let campaignTypesObject = [];

  if (thisCampaign.video_campaign == true) {
    campaignTypesObject.push("Video campaign");
  }
  if (thisCampaign.display_campaign == true) {
    campaignTypesObject.push("Display campaign");
  }
  if (thisCampaign.native_campaign == true) {
    campaignTypesObject.push("Native campaign");
  }
  if (thisCampaign.search_campaign == true) {
    campaignTypesObject.push("Search campaign");
  }
  if (thisCampaign.social_campaign == true) {
    campaignTypesObject.push("Social campaign");
  }
  if (thisCampaign.highImpact_campaign == true) {
    campaignTypesObject.push("High impact campaign");
  }
  if (thisCampaign.richMedia_campaign == true) {
    campaignTypesObject.push("Rich media campaign");
  }
  if (thisCampaign.pop_campaign == true) {
    campaignTypesObject.push("Pop campaign");
  }
  if (thisCampaign.push_campaign == true) {
    campaignTypesObject.push("Push campaign");
  }

  const cancelButtonRef = useRef(null);
  setNavigation(navigation);

  return (
    <>
      <div className="flex-1 flex flex-col">
        <Transition.Root show={open} as={Fragment}>
          <Dialog
            as="div"
            static
            className="fixed z-10 inset-0 overflow-y-auto"
            initialFocus={cancelButtonRef}
            open={open}
            onClose={setOpen}
          >
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0 bg-red-50 bg-opacity-60 transition-opacity" />
              </Transition.Child>

              {/* This element is to trick the browser into centering the modal contents. */}
              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <ExclamationIcon
                          className="h-6 w-6 text-red-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-lg leading-6 font-medium text-gray-900"
                        >
                          Are you sure?
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Are you sure you want to delete this campaign? All
                            of your data and associated campaigns will be
                            permanently removed. This action cannot be undone.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                      type="button"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => deleteCampaign(thisCampaign.id)}
                    >
                      Delete
                    </button>
                    <button
                      type="button"
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>
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
                <h1 className="text-3xl font-semibold text-gray-900">
                  {thisCampaign.name}
                </h1>
                <div className="mt-3 sm:mt-0 sm:ml-4">
                  <a
                    type="button"
                    href={`/campaigns/${thisCampaign.id}/edit`}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                  >
                    Edit campaign
                  </a>
                </div>
              </div>

              {/* "clientID": "a3f4095e-39de-43d2-baf4-f8c16f0f6f4d", 
              "name": "Lorem
              ipsum dolor sit amet", 
              "reference": "Lorem ipsum dolor sit amet",
              "booking_type": "Lorem ipsum dolor sit amet", 
              "contact_person":
              "Lorem ipsum dolor sit amet", 
              "add_comm_type": "Lorem ipsum dolor
              sit amet", 
              "add_comm_value": 1020, 
              "instructions": "Lorem ipsum
              dolor sit amet", 
              "delivery_comments": "Lorem ipsum dolor sit
              amet", 
              "date_created": "1970-01-01Z", 
              "date_modified":
              "1970-01-01Z", 
              "status": "Lorem ipsum dolor sit amet",
              "revenue_cpm": true, 
              "revenue_cpc": true, 
              "revenue_cpcv": true,
              "revenue_cpview": true, 
              "revenue_cpvisit": true, 
              "revenue_cpl":
              true, 
              "revenue_cpa": true, 
              "revenue_cpi": true, 
              "revenue_cps":
              true, 
              "video_campaign": true, 
              "video_startDate": "1970-01-01Z",
              "video_endDate": "1970-01-01Z", 
              "video_unitRate": 123.45,
              "video_goal": 1020, 
              "video_budget": 123.45, 
              "video_revType":
              "Lorem ipsum dolor sit amet", 
              "display_campaign": true,
              "display_startDate": "1970-01-01Z", 
              "display_endDate":
              "1970-01-01Z", 
              "display_unitRate": 123.45, 
              "display_goal": 1020,
              "display_budget": 123.45, 
              "display_revType": "Lorem ipsum dolor
              sit amet", 
              "native_campaign": true, 
              "native_startDate":
              "1970-01-01Z", 
              "native_endDate": "1970-01-01Z", 
              "native_unitRate":
              123.45, 
              "native_goal": 1020, 
              "native_budget": 123.45,
              "native_revType": "Lorem ipsum dolor sit amet", 
              "search_campaign":
              true, 
              "search_startDate": "1970-01-01Z", 
              "search_endDate":
              "1970-01-01Z", 
              "search_unitRate": 123.45, 
              "search_goal": 1020,
              "search_budget": 123.45, 
              "search_revType": "Lorem ipsum dolor sit
              amet", 
              "social_campaign": true, 
              "social_startDate": "1970-01-01Z",
              "social_endDate": "1970-01-01Z", 
              "social_unitRate": 123.45,
              "social_goal": 1020, 
              "social_budget": 123.45, 
              "social_revType":
              "Lorem ipsum dolor sit amet", 
              "highImpact_campaign": true,
              "highImpact_startDate": "1970-01-01Z", 
              "highImpact_endDate":
              "1970-01-01Z", 
              "highImpact_unitRate": 123.45, 
              "highImpact_goal":
              1020, 
              "highImpact_budget": 123.45, 
              "highImpact_revType": "Lorem
              ipsum dolor sit amet", 
              "richMedia_campaign": true,
              "richMedia_startDate": "1970-01-01Z", 
              "richMedia_endDate":
              "1970-01-01Z", 
              "richMedia_unitRate": 123.45, 
              "richMedia_goal":
              1020, 
              "richMedia_budget": 123.45, 
              "nativrichMedia_revType": "Lorem
              ipsum dolor sit amet", 
              "pop_campaign": true, 
              "pop_startDate":
              "1970-01-01Z", 
              "pop_endDate": "1970-01-01Z", 
              "pop_unitRate":
              123.45, 
              "pop_goal": 1020, 
              "pop_budget": 123.45, 
              "pop_revType":
              "Lorem ipsum dolor sit amet", 
              "push_campaign": true,
              "push_startDate": "1970-01-01Z", 
              "push_endDate": "1970-01-01Z",
              "push_unitRate": 123.45, 
              "push_goal": 1020, 
              "push_budget": 123.45,
              "push_revType": "Lorem ipsum dolor sit amet" */}

              <div className="px-4 sm:px-6 md:px-0">
                <div className="py-6">
                  {/* Description list with inline editing */}
                  <div className="mt-10 divide-y divide-gray-200">
                    <div className="mt-6">
                      <dl className="divide-y divide-gray-200">
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                          <dt className="text-sm font-medium text-gray-500">
                            Name
                          </dt>
                          <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <span className="flex-grow">
                              {thisCampaign.name}
                            </span>
                          </dd>
                        </div>
                      </dl>
                      <dl className="divide-y divide-gray-200">
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                          <dt className="text-sm font-medium text-gray-500">
                            Client
                          </dt>
                          <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <span className="flex-grow">{clientName.name}</span>
                          </dd>
                        </div>
                      </dl>
                      <dl className="divide-y divide-gray-200">
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                          <dt className="text-sm font-medium text-gray-500">
                            Booking type
                          </dt>
                          <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <span className="flex-grow">
                              {thisCampaign.booking_type}
                            </span>
                          </dd>
                        </div>
                      </dl>
                      <dl className="divide-y divide-gray-200">
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                          <dt className="text-sm font-medium text-gray-500">
                            Contact person
                          </dt>
                          <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <span className="flex-grow">
                              {thisCampaign.contact_person}
                            </span>
                          </dd>
                        </div>
                      </dl>
                      <dl className="divide-y divide-gray-200">
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                          <dt className="text-sm font-medium text-gray-500">
                            Add comm value
                          </dt>
                          <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <span className="flex-grow">
                              {thisCampaign.add_comm_value}
                            </span>
                          </dd>
                        </div>
                      </dl>
                      <dl className="divide-y divide-gray-200">
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                          <dt className="text-sm font-medium text-gray-500">
                            Add comm type
                          </dt>
                          <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <span className="flex-grow">
                              {thisCampaign.add_comm_type}
                            </span>
                          </dd>
                        </div>
                      </dl>
                      <dl className="divide-y divide-gray-200">
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                          <dt className="text-sm font-medium text-gray-500">
                            Booking reference
                          </dt>
                          <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <span className="flex-grow">
                              {thisCampaign.reference}
                            </span>
                          </dd>
                        </div>
                      </dl>
                      <dl className="divide-y divide-gray-200">
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                          <dt className="text-sm font-medium text-gray-500">
                            Instructions
                          </dt>
                          <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <span className="flex-grow">
                              {thisCampaign.instructions}
                            </span>
                          </dd>
                        </div>
                      </dl>
                      <dl className="divide-y divide-gray-200">
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                          <dt className="text-sm font-medium text-gray-500">
                            Delivery comments
                          </dt>
                          <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <span className="flex-grow">
                              {thisCampaign.delivery_comments}
                            </span>
                          </dd>
                        </div>
                      </dl>
                      <dl className="divide-y divide-gray-200">
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                          <dt className="text-sm font-medium text-gray-500">
                            Date created
                          </dt>
                          <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <span className="flex-grow">
                              {thisCampaign.date_created}
                            </span>
                          </dd>
                        </div>
                      </dl>
                      <dl className="divide-y divide-gray-200">
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                          <dt className="text-sm font-medium text-gray-500">
                            Date modified
                          </dt>
                          <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <span className="flex-grow">
                              {thisCampaign.date_modified}
                            </span>
                          </dd>
                        </div>
                      </dl>
                      <dl className="divide-y divide-gray-200">
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                          <dt className="text-sm font-medium text-gray-500">
                            Status
                          </dt>
                          <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <span className="flex-grow">
                              {thisCampaign.status}
                            </span>
                          </dd>
                        </div>
                      </dl>
                      <dl className="divide-y divide-gray-200">
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                          <dt className="text-sm font-medium text-gray-500">
                            Revenue types
                          </dt>
                          <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <span className="flex-grow">
                              {revenueTypesObject.map((revType) => {
                                return (
                                  <span className="mr-3 mb-1.5 inline-flex items-center px-2.5 py-0.5 border border-gray-300 rounded-md text-sm font-medium bg-gray-100 text-gray-800">
                                    {revType}
                                  </span>
                                );
                              })}
                            </span>
                          </dd>
                        </div>
                      </dl>
                      {/* campaignTypesObject */}
                      <dl className="divide-y divide-gray-200">
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                          <dt className="text-sm font-medium text-gray-500">
                            Campaign types
                          </dt>
                          <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <span className="flex-grow">
                              {campaignTypesObject.map((campaignType) => {
                                return (
                                  <span className="mr-3 mb-1.5 inline-flex items-center px-2.5 py-0.5 border border-gray-300 rounded-md text-sm font-medium bg-gray-100 text-gray-800">
                                    {campaignType}
                                  </span>
                                );
                              })}
                            </span>
                          </dd>
                        </div>
                      </dl>
                      <div className="flex flex-col">
                        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                              <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-200">
                                  <tr>
                                    <th
                                      scope="col"
                                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                      Name
                                    </th>
                                    <th
                                      scope="col"
                                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                      Revenue type
                                    </th>
                                    <th
                                      scope="col"
                                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                      Start date
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
                                      Rate
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
                                      Budget
                                    </th>
                                  </tr>
                                </thead>
                                <tbody className="bg-gray-50 divide-y divide-gray-200">
                                  <>
                                    {thisCampaign.video_campaign ? (
                                      <tr key={thisCampaign.video_goal}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                          Video
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                          {thisCampaign.video_revType}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                          {thisCampaign.video_startDate}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                          {thisCampaign.video_endDate}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                          {thisCampaign.video_unitRate}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                          {thisCampaign.video_goal}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                          {thisCampaign.video_budget}
                                        </td>
                                      </tr>
                                    ) : null}
                                    {thisCampaign.display_campaign ? (
                                      <tr key={thisCampaign.display_goal}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                          Display
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                          {thisCampaign.display_revType}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                          {thisCampaign.display_startDate}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                          {thisCampaign.display_endDate}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                          {thisCampaign.display_unitRate}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                          {thisCampaign.display_goal}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                          {thisCampaign.display_budget}
                                        </td>
                                      </tr>
                                    ) : null}
                                    {thisCampaign.native_campaign ? (
                                      <tr key={thisCampaign.native_goal}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                          Native
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                          {thisCampaign.native_revType}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                          {thisCampaign.native_startDate}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                          {thisCampaign.native_endDate}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                          {thisCampaign.native_unitRate}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                          {thisCampaign.native_goal}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                          {thisCampaign.native_budget}
                                        </td>
                                      </tr>
                                    ) : null}
                                    {thisCampaign.search_campaign ? (
                                      <tr key={thisCampaign.search_goal}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                          Search
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                          {thisCampaign.search_revType}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                          {thisCampaign.search_startDate}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                          {thisCampaign.search_endDate}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                          {thisCampaign.search_unitRate}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                          {thisCampaign.search_goal}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                          {thisCampaign.search_budget}
                                        </td>
                                      </tr>
                                    ) : null}
                                    {thisCampaign.social_campaign ? (
                                      <tr key={thisCampaign.social_goal}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                          Social
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                          {thisCampaign.social_revType}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                          {thisCampaign.social_startDate}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                          {thisCampaign.social_endDate}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                          {thisCampaign.social_unitRate}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                          {thisCampaign.social_goal}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                          {thisCampaign.social_budget}
                                        </td>
                                      </tr>
                                    ) : null}
                                    {thisCampaign.highImpact_campaign ? (
                                      <tr key={thisCampaign.highImpact_goal}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                          High impact
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                          {thisCampaign.highImpact_revType}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                          {thisCampaign.highImpact_startDate}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                          {thisCampaign.highImpact_endDate}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                          {thisCampaign.highImpact_unitRate}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                          {thisCampaign.highImpact_goal}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                          {thisCampaign.highImpact_budget}
                                        </td>
                                      </tr>
                                    ) : null}
                                    {thisCampaign.richMedia_campaign ? (
                                      <tr key={thisCampaign.richMedia_goal}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                          Rich media
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                          {thisCampaign.nativrichMedia_revType}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                          {thisCampaign.richMedia_startDate}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                          {thisCampaign.richMedia_endDate}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                          {thisCampaign.richMedia_unitRate}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                          {thisCampaign.richMedia_goal}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                          {thisCampaign.richMedia_budget}
                                        </td>
                                      </tr>
                                    ) : null}
                                    {thisCampaign.pop_campaign ? (
                                      <tr key={thisCampaign.pop_goal}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                          Pop
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                          {thisCampaign.pop_revType}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                          {thisCampaign.pop_startDate}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                          {thisCampaign.pop_endDate}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                          {thisCampaign.pop_unitRate}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                          {thisCampaign.pop_goal}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                          {thisCampaign.pop_budget}
                                        </td>
                                      </tr>
                                    ) : null}
                                    {thisCampaign.push_campaign ? (
                                      <tr key={thisCampaign.push_goal}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                          Push
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                          {thisCampaign.push_revType}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                          {thisCampaign.push_startDate}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                          {thisCampaign.push_endDate}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                          {thisCampaign.push_unitRate}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                          {thisCampaign.push_goal}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                          {thisCampaign.push_budget}
                                        </td>
                                      </tr>
                                    ) : null}
                                  </>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* <dl className="divide-y divide-gray-200">
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                          <dt className="text-sm font-medium text-gray-500">
                            Campaign type
                          </dt>
                          <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <span className="flex-grow">
                              {thisCampaign.campaign_type}
                            </span>
                          </dd>
                        </div>
                      </dl>
                      <dl className="divide-y divide-gray-200">
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                          <dt className="text-sm font-medium text-gray-500">
                            Country
                          </dt>
                          <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <span className="flex-grow">
                              {thisCampaign.country}
                            </span>
                          </dd>
                        </div>
                      </dl>
                      <dl className="divide-y divide-gray-200">
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                          <dt className="text-sm font-medium text-gray-500">
                            Address
                          </dt>
                          <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <span className="flex-grow">
                              {thisCampaign.address}
                            </span>
                          </dd>
                        </div>
                      </dl>
                      <dl className="divide-y divide-gray-200">
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                          <dt className="text-sm font-medium text-gray-500">
                            Website
                          </dt>
                          <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <span className="flex-grow">
                              {thisCampaign.website}
                            </span>
                          </dd>
                        </div>
                      </dl>
                      <dl className="divide-y divide-gray-200">
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                          <dt className="text-sm font-medium text-gray-500">
                            Non person email
                          </dt>
                          <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <span className="flex-grow">
                              {thisCampaign.non_person_email}
                            </span>
                          </dd>
                        </div>
                      </dl>
                      <dl className="divide-y divide-gray-200">
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                          <dt className="text-sm font-medium text-gray-500">
                            Billing contact name
                          </dt>
                          <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <span className="flex-grow">
                              {thisCampaign.billing_contact_name}
                            </span>
                          </dd>
                        </div>
                      </dl>
                      <dl className="divide-y divide-gray-200">
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                          <dt className="text-sm font-medium text-gray-500">
                            Billing contact email
                          </dt>
                          <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <span className="flex-grow">
                              {thisCampaign.billing_contact_email}
                            </span>
                          </dd>
                        </div>
                      </dl>
                      <dl className="divide-y divide-gray-200">
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                          <dt className="text-sm font-medium text-gray-500">
                            Tax id
                          </dt>
                          <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <span className="flex-grow">
                              {thisCampaign.tax_id}
                            </span>
                          </dd>
                        </div>
                      </dl>
                      <dl className="divide-y divide-gray-200">
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                          <dt className="text-sm font-medium text-gray-500">
                            Main contact name
                          </dt>
                          <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <span className="flex-grow">
                              {thisCampaign.main_contact_name}
                            </span>
                          </dd>
                        </div>
                      </dl>
                      <dl className="divide-y divide-gray-200">
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                          <dt className="text-sm font-medium text-gray-500">
                            Main contact email
                          </dt>
                          <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <span className="flex-grow">
                              {thisCampaign.main_contact_email}
                            </span>
                          </dd>
                        </div>
                      </dl>
                      <dl className="divide-y divide-gray-200">
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                          <dt className="text-sm font-medium text-gray-500">
                            Main contact phone
                          </dt>
                          <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <span className="flex-grow">
                              {thisCampaign.main_contact_phone}
                            </span>
                          </dd>
                        </div>
                      </dl>
                      <dl className="divide-y divide-gray-200">
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                          <dt className="text-sm font-medium text-gray-500">
                            Skype or gmeet
                          </dt>
                          <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <span className="flex-grow">
                              {thisCampaign.skype_or_gmeet}
                            </span>
                          </dd>
                        </div>
                      </dl>
                      <dl className="divide-y divide-gray-200">
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                          <dt className="text-sm font-medium text-gray-500">
                            Sales manager email
                          </dt>
                          <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <span className="flex-grow">
                              {thisCampaign.sales_manager_email}
                            </span>
                          </dd>
                        </div>
                      </dl>
                      <dl className="divide-y divide-gray-200">
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                          <dt className="text-sm font-medium text-gray-500">
                            Account manager
                          </dt>
                          <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <span className="flex-grow">
                              {thisCampaign.account_manager}
                            </span>
                          </dd>
                        </div>
                      </dl>
                      <dl className="divide-y divide-gray-200">
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                          <dt className="text-sm font-medium text-gray-500">
                            Kickback type
                          </dt>
                          <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <span className="flex-grow">
                              {thisCampaign.kickback_type}
                            </span>
                          </dd>
                        </div>
                      </dl>
                      <dl className="divide-y divide-gray-200">
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                          <dt className="text-sm font-medium text-gray-500">
                            Kickback value
                          </dt>
                          <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <span className="flex-grow">
                              {thisCampaign.kickback_value}
                            </span>
                          </dd>
                        </div>
                      </dl>
                      <dl className="divide-y divide-gray-200">
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                          <dt className="text-sm font-medium text-gray-500">
                            Billing entity
                          </dt>
                          <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <span className="flex-grow">
                              {thisCampaign.billing_entity}
                            </span>
                          </dd>
                        </div>
                      </dl>
                      <dl className="divide-y divide-gray-200">
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                          <dt className="text-sm font-medium text-gray-500">
                            Date created
                          </dt>
                          <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <span className="flex-grow">
                              {thisCampaign.date_created}
                            </span>
                          </dd>
                        </div>
                      </dl>
                      <dl className="divide-y divide-gray-200">
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                          <dt className="text-sm font-medium text-gray-500">
                            Date modified
                          </dt>
                          <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <span className="flex-grow">
                              {thisCampaign.date_modified}
                            </span>
                          </dd>
                        </div>
                      </dl> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-red-50 border border-red-100 my-12 rounded-xl px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Delete this campaign
              </h3>
              <div className="mt-2 sm:flex sm:items-start sm:justify-between">
                <div className="max-w-xl text-sm text-gray-500">
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Recusandae voluptatibus corrupti atque repudiandae nam.
                  </p>
                </div>
                <div className="mt-5 sm:mt-0 sm:ml-6 sm:flex-shrink-0 sm:flex sm:items-center">
                  <button
                    type="button"
                    onClick={() => setOpen(true)}
                    className="inline-flex items-center border-2 border-red-200 items-center justify-center px-4 py-2 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 hover:border-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm"
                  >
                    Delete campaign
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
