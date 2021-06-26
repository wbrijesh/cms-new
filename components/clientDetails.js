import { useState, useEffect, Fragment, useRef } from "react";
import { useRouter } from "next/router";
import { DataStore } from "@aws-amplify/datastore";
import { Client } from "../models";
import { Auth } from "aws-amplify";

import Link from "next/link";
import {
  BriefcaseIcon,
  DocumentReportIcon,
  MenuAlt2Icon,
  HomeIcon,
  ExclamationIcon,
  UserAddIcon,
} from "@heroicons/react/outline";

import { Dialog, Transition } from "@headlessui/react";

const navigation = [
  { name: "Home", href: "/", icon: HomeIcon, current: false },
  { name: "Clients", href: "/clients", icon: BriefcaseIcon, current: true },
  {
    name: "Campaigns",
    href: "/campaigns",
    icon: DocumentReportIcon,
    current: false,
  },
  { name: "Sales", href: "/sales-team", icon: UserAddIcon, current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Content({ setNavigation, setSidebarOpen, thisClient }) {
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const deleteClient = async (id) => {
    DataStore.delete(await DataStore.query(Client, id));
    router.push("/clients");
  };

  const cancelButtonRef = useRef(null);
  setNavigation(navigation);

  console.log(thisClient.kickback_value);

  const [permission, setPermission] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [deletePermission, setDeletePermission] = useState(null);

  const newFunc = async () => {
    let thisUser = await Auth.currentAuthenticatedUser();
    setUserDetails(thisUser.attributes.email);
  };
  newFunc();

  const verifyAccess = async () => {
    let thisUser = await Auth.currentAuthenticatedUser();
    console.log(thisUser);
    if (
      thisUser.signInUserSession.accessToken.payload["cognito:groups"][0] ===
      "admin"
    ) {
      console.log("Logged in as admin, all permissions granted");
      setPermission(true);
      setDeletePermission(true);
    } else if (
      thisUser.signInUserSession.accessToken.payload["cognito:groups"][0] ===
      "adops"
    ) {
      console.log("Logged in as adops");
      setPermission(true);
      setDeletePermission(true);
    } else if (thisUser.attributes.email === thisClient.sales_manager_email) {
      console.log("email matches");
      setPermission(true);
      setDeletePermission(false);
    } else {
      setPermission(false);
    }
    console.log("user email: ", thisUser.attributes.email);
    console.log("campaign allowed...: ", thisClient.sales_manager_email);
  };
  verifyAccess();

  return (
    <>
      {setPermission === true ? (
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
                                Are you sure you want to delete this client? All
                                of your data and associated campaigns will be
                                permanently removed. This action cannot be
                                undone.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button
                          type="button"
                          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                          onClick={() => deleteClient(thisClient.id)}
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
                      {thisClient.name}
                    </h1>
                    <div className="mt-3 sm:mt-0 sm:ml-4">
                      <a
                        type="button"
                        href={`/clients/${thisClient.id}/edit`}
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                      >
                        Edit client
                      </a>
                    </div>
                  </div>

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
                                  {thisClient.name}
                                </span>
                              </dd>
                            </div>
                          </dl>
                          <dl className="divide-y divide-gray-200">
                            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                              <dt className="text-sm font-medium text-gray-500">
                                Client type
                              </dt>
                              <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                <span className="flex-grow">
                                  {thisClient.client_type}
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
                                  {thisClient.country}
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
                                  {thisClient.address}
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
                                  {thisClient.website}
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
                                  {thisClient.non_person_email}
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
                                  {thisClient.billing_contact_name}
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
                                  {thisClient.billing_contact_email}
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
                                  {thisClient.tax_id}
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
                                  {thisClient.main_contact_name}
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
                                  {thisClient.main_contact_email}
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
                                  {thisClient.main_contact_phone}
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
                                  {thisClient.skype_or_gmeet}
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
                                  {thisClient.sales_manager_email}
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
                                  {thisClient.account_manager}
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
                                  {thisClient.kickback_type}
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
                                  {thisClient.kickback_value}
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
                                  {thisClient.billing_entity}
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
                                  {thisClient.date_created}
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
                                  {thisClient.date_modified}
                                </span>
                              </dd>
                            </div>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-red-50 border border-red-100 my-12 rounded-xl px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Delete this client
                  </h3>
                  <div className="mt-2 sm:flex sm:items-start sm:justify-between">
                    <div className="max-w-xl text-sm text-gray-500">
                      <p>
                        All of your data and associated campaigns will be
                        permanently removed. This action cannot be undone.
                      </p>
                    </div>
                    <div className="mt-5 sm:mt-0 sm:ml-6 sm:flex-shrink-0 sm:flex sm:items-center">
                      <button
                        type="button"
                        onClick={() => setOpen(true)}
                        className="inline-flex items-center border-2 border-red-200 items-center justify-center px-4 py-2 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 hover:border-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm"
                      >
                        Delete client
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </>
      ) : (
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
                                Are you sure you want to delete this client? All
                                of your data and associated campaigns will be
                                permanently removed. This action cannot be
                                undone.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button
                          type="button"
                          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                          onClick={() => deleteClient(thisClient.id)}
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
                      You do not have access to this resource
                    </h1>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </>
      )}
    </>
  );
}
