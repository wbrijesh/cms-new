import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Link from "next/link";
import { DataStore } from "@aws-amplify/datastore";
import { Salesteam } from "../models";
import { Form, Field } from "react-final-form";
import {
  BriefcaseIcon,
  ChartSquareBarIcon,
  MenuAlt2Icon,
  HomeIcon,
  UserAddIcon,
  PresentationChartLineIcon,
} from "@heroicons/react/outline";
import { useRouter } from "next/router";

const navigation = [
  { name: "Home", href: "/", icon: HomeIcon, current: false },
  { name: "Clients", href: "/clients", icon: BriefcaseIcon, current: false },
  {
    name: "Campaigns",
    href: "/campaigns",
    icon: ChartSquareBarIcon,
    current: false,
  },
  { name: "Sales", href: "/sales-team", icon: UserAddIcon, current: true },
  {
    name: "Reports",
    href: "/reports",
    icon: PresentationChartLineIcon,
    current: false,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Content({ setNavigation, setSidebarOpen, salesTeam }) {
  setNavigation(navigation);

  console.log("SALES TEAM: ", salesTeam);

  const router = useRouter();
  const deleteTrigger = async (id) => {
    DataStore.delete(await DataStore.query(Salesteam, id));
    window.location.reload();
  };

  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);

  const newSalesPerson = async (values) => {
    await DataStore.save(
      new Salesteam({
        name: values.name,
        email: values.email,
      })
    );
    window.location.reload();
  };

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
                <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
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
                  <Form
                    onSubmit={(values) => newSalesPerson(values)}
                    render={({ handleSubmit }) => (
                      <form onSubmit={handleSubmit}>
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                          <div className="sm:flex sm:items-start">
                            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                              <UserAddIcon
                                className="h-6 w-6 text-green-600"
                                aria-hidden="true"
                              />
                            </div>
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                              <Dialog.Title
                                as="h3"
                                className="text-lg leading-6 font-medium text-gray-900"
                              >
                                New Salesperson
                              </Dialog.Title>

                              <div className="mt-2">
                                <div className="flex">
                                  <div>
                                    <label
                                      htmlFor="email"
                                      className="block text-sm font-medium text-gray-700"
                                    >
                                      Name
                                    </label>
                                    <div className="mt-1">
                                      <Field name="name">
                                        {({ input, meta }) => (
                                          <>
                                            <div className="mt-1">
                                              <input
                                                type="text"
                                                placeholder="name"
                                                {...input}
                                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                              />
                                            </div>
                                          </>
                                        )}
                                      </Field>
                                    </div>
                                  </div>
                                  <div className="ml-2">
                                    <label
                                      htmlFor="email"
                                      className="block text-sm font-medium text-gray-700"
                                    >
                                      Email
                                    </label>
                                    <div className="mt-1">
                                      <Field name="email">
                                        {({ input, meta }) => (
                                          <>
                                            <div className="mt-1">
                                              <input
                                                type="email"
                                                placeholder="you@example.com"
                                                {...input}
                                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                              />
                                            </div>
                                          </>
                                        )}
                                      </Field>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                          <button
                            type="submit"
                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                          >
                            Create
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
                      </form>
                    )}
                  />
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
                  Sales Team
                </h1>
                <div className="mt-3 sm:mt-0 sm:ml-4">
                  <button
                    type="button"
                    onClick={() => setOpen(true)}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Add new
                  </button>
                </div>
              </div>

              <div className="px-4 sm:px-6 md:px-0">
                <div className="py-6">
                  <div className="mt-10 divide-y divide-gray-200">
                    <div className="mt-6">
                      <dl className="divide-y divide-gray-200">
                        {salesTeam.map((sales) => (
                          <div
                            className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4"
                            key={sales.id}
                          >
                            <dt className="text-sm font-medium text-gray-500">
                              {sales.name}
                            </dt>
                            <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                              <span className="flex-grow">{sales.email}</span>
                              <span className="ml-4 flex-shrink-0">
                                <button
                                  onClick={() => deleteTrigger(sales.id)}
                                  className="bg-white rounded-md font-medium text-red-600 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                >
                                  Delete
                                </button>
                              </span>
                            </dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
