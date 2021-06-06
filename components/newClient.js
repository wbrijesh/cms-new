import { useState } from "react";
import { DataStore } from "@aws-amplify/datastore";
import { Client } from "../models";
import { Form, Field } from "react-final-form";
import {
  BriefcaseIcon,
  HomeIcon,
  DocumentReportIcon,
  MenuAlt2Icon,
  ArrowCircleLeftIcon,
} from "@heroicons/react/outline";

const navigation = [
  { name: "Home", href: "#", icon: HomeIcon, current: false },
  { name: "Clients", href: "#", icon: BriefcaseIcon, current: true },
  { name: "Campaigns", href: "#", icon: DocumentReportIcon, current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

async function submitFormFunc(values) {
  await DataStore.save(new Client(values));
  window.location.reload();
  // alert(JSON.stringify(values));
}

const required = (value) => (value ? undefined : "Required");
const mustBeNumber = (value) => (isNaN(value) ? "Must be a number" : undefined);
const minValue = (min) => (value) =>
  isNaN(value) || value >= min ? undefined : `Should be greater than ${min}`;
const maxValue = (max) => (value) =>
  isNaN(value) || value <= max ? undefined : `Should be less than ${max}`;
const composeValidators =
  (...validators) =>
  (value) =>
    validators.reduce(
      (error, validator) => error || validator(value),
      undefined
    );

const NewClientForm = () => (
  <Form
    onSubmit={(values) => submitFormFunc(values)}
    render={({ handleSubmit }) => (
      <form
        onSubmit={handleSubmit}
        className="px-4 md:px-0 md:ml-0 md:mr-0 mt-10 space-y-8 divide-y divide-gray-200"
      >
        <div className="space-y-8 divide-y divide-gray-200">
          <div>
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Basic Details
              </h3>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              {/* NAME */}
              <div className="sm:col-span-3">
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <Field name="name">
                  {({ input, meta }) => (
                    <>
                      <div className="mt-1">
                        <input
                          type="text"
                          {...input}
                          className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </>
                  )}
                </Field>
              </div>

              {/* CLIENT TYPE */}
              <div className="sm:col-span-3">
                <label className="block text-sm font-medium text-gray-700">
                  Client Type
                </label>
                <Field
                  name="client_type"
                  component="select"
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                >
                  <option />
                  <option>Agency</option>
                  <option>Brand</option>
                </Field>
              </div>

              {/* COUNTRY */}
              <div className="sm:col-span-3">
                <label className="block text-sm font-medium text-gray-700">
                  Country
                </label>
                <Field name="country">
                  {({ input, meta }) => (
                    <>
                      <div className="mt-1">
                        <input
                          type="text"
                          {...input}
                          className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </>
                  )}
                </Field>
              </div>

              {/* WEBSITE */}
              <div className="sm:col-span-3">
                <label className="block text-sm font-medium text-gray-700">
                  Website
                </label>
                <Field name="website">
                  {({ input, meta }) => (
                    <>
                      <div className="mt-1 rounded-md shadow-sm">
                        <input
                          type="url"
                          {...input}
                          className="flex-1 focus:ring-blue-500 focus:border-blue-500 block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                        />
                      </div>
                    </>
                  )}
                </Field>
              </div>

              {/* ADDRESS */}
              <div className="sm:col-span-6">
                <label className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <Field name="address">
                  {({ input, meta }) => (
                    <>
                      <div className="mt-1">
                        <textarea
                          type="text"
                          {...input}
                          className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </>
                  )}
                </Field>
              </div>

              {/* NON PERSON EMAIL */}
              <div className="sm:col-span-3">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Non person email
                </label>
                <Field name="non_person_email">
                  {({ input, meta }) => (
                    <>
                      <div className="mt-1">
                        <input
                          type="email"
                          {...input}
                          className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </>
                  )}
                </Field>
              </div>

              {/* BILLING CONTACT NAME */}
              <div className="sm:col-span-3">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Billing contact name
                </label>
                <Field name="billing_contact_name">
                  {({ input, meta }) => (
                    <>
                      <div className="mt-1">
                        <input
                          type="text"
                          {...input}
                          className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </>
                  )}
                </Field>
              </div>

              {/* BILLING CONTACT EMAIL */}
              <div className="sm:col-span-3">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Billing contact email
                </label>
                <Field name="billing_contact_email">
                  {({ input, meta }) => (
                    <>
                      <div className="mt-1">
                        <input
                          type="email"
                          {...input}
                          className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </>
                  )}
                </Field>
              </div>

              {/* TAX ID */}
              <div className="sm:col-span-3">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Tax ID
                </label>
                <Field name="tax_id">
                  {({ input, meta }) => (
                    <>
                      <div className="mt-1">
                        <input
                          type="text"
                          {...input}
                          className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </>
                  )}
                </Field>
              </div>

              {/* MAIN CONTACT NAME */}
              <div className="sm:col-span-3">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Main contact name
                </label>
                <Field name="main_contact_name">
                  {({ input, meta }) => (
                    <>
                      <div className="mt-1">
                        <input
                          type="text"
                          {...input}
                          className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </>
                  )}
                </Field>
              </div>

              {/* MAIN CONTACT EMAIL */}
              <div className="sm:col-span-3">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Main contact email
                </label>
                <Field name="main_contact_email">
                  {({ input, meta }) => (
                    <>
                      <div className="mt-1">
                        <input
                          type="email"
                          {...input}
                          className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </>
                  )}
                </Field>
              </div>

              {/* MAIN CONTACT PHONE */}
              <div className="sm:col-span-3">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Main contact phone
                </label>
                <Field name="main_contact_phone">
                  {({ input, meta }) => (
                    <>
                      <div className="mt-1">
                        <input
                          type="tel"
                          {...input}
                          className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </>
                  )}
                </Field>
              </div>

              {/* SKYPE OR GMEET */}
              <div className="sm:col-span-3">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Skype or Gmeet
                </label>
                <Field name="skype_or_gmeet">
                  {({ input, meta }) => (
                    <>
                      <div className="mt-1">
                        <input
                          type="text"
                          {...input}
                          className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </>
                  )}
                </Field>
              </div>

              {/* SALES MANAGER EMAIL */}
              <div className="sm:col-span-3">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Sales manager email
                </label>
                <Field name="sales_manager_email">
                  {({ input, meta }) => (
                    <>
                      <div className="mt-1">
                        <input
                          type="email"
                          {...input}
                          className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </>
                  )}
                </Field>
              </div>

              {/* ACCOUNT MANAGER */}
              <div className="sm:col-span-3">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Account manager
                </label>
                <Field name="account_manager">
                  {({ input, meta }) => (
                    <>
                      <div className="mt-1">
                        <input
                          type="text"
                          {...input}
                          className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </>
                  )}
                </Field>
              </div>

              {/* KICKBACK TYPE */}
              <div className="sm:col-span-3">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Kickback type
                </label>
                <Field
                  name="kickback_type"
                  component="select"
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                >
                  <option />
                  <option>Revenue</option>
                  <option>Cost</option>
                </Field>
              </div>

              {/* KICKBACK VALUE */}
              <div className="sm:col-span-3">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Kickback value
                </label>
                <Field
                  name="kickback_value"
                  value="number"
                  validate={composeValidators(
                    mustBeNumber,
                    minValue(1),
                    maxValue(100)
                  )}
                >
                  {({ input, meta }) => (
                    <>
                      <div className="mt-1">
                        <input
                          type="number"
                          {...input}
                          className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                        {meta.error && meta.touched && (
                          <span className="text-red-500">{meta.error}</span>
                        )}
                      </div>
                    </>
                  )}
                </Field>
              </div>

              {/* BILLING ENTITY */}
              <div className="sm:col-span-3">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Billing entity
                </label>
                <Field name="billing_entity">
                  {({ input, meta }) => (
                    <>
                      <div className="mt-1">
                        <input
                          type="text"
                          {...input}
                          className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </>
                  )}
                </Field>
              </div>

              {/* END */}
            </div>
          </div>
        </div>

        <div className="pt-5">
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    )}
  />
);

export default function Content({ setNavigation, setSidebarOpen }) {
  setNavigation(navigation);
  const [automaticTimezoneEnabled, setAutomaticTimezoneEnabled] =
    useState(true);
  const [autoUpdateApplicantDataEnabled, setAutoUpdateApplicantDataEnabled] =
    useState(false);
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

        <main className="flex-1 overflow-y-auto focus:outline-none">
          <div className="relative max-w-4xl mx-auto md:px-8 xl:px-0">
            <div className="md:pt-0 pt-10 pb-16">
              <div className="px-4 sm:px-6 md:px-0">
                <a
                  type="button"
                  href="/clients"
                  className="mb-4 inline-flex items-center border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-gray-600 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <ArrowCircleLeftIcon className="h-8 w-8" aria-hidden="true" />
                </a>
                <h1 className="text-3xl font-semibold text-gray-900">
                  New Client
                </h1>
              </div>
              <NewClientForm />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
