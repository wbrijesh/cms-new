import { DataStore } from "@aws-amplify/datastore";
import { Client } from "../models";
import { useFormik } from "formik";
import {
  BriefcaseIcon,
  HomeIcon,
  DocumentReportIcon,
  MenuAlt2Icon,
  ArrowCircleLeftIcon,
} from "@heroicons/react/outline";
import { useRouter } from "next/router";

const navigation = [
  { name: "Home", href: "/", icon: HomeIcon, current: false },
  { name: "Clients", href: "/clients", icon: BriefcaseIcon, current: true },
  {
    name: "Campaigns",
    href: "/campaigns",
    icon: DocumentReportIcon,
    current: false,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
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

console.log("Set date modified to: ", new Date().toISOString().slice(0, 10));

export default function Content({ setNavigation, setSidebarOpen, thisClient }) {
  setNavigation(navigation);
  const router = useRouter();

  const goBack = () => {
    router.push(`/clients/${thisClient.id}`);
  };

  async function asyncSubmit(field) {
    event.preventDefault();
    console.log(`${field}: `, formik.values[field]);
    console.log(new Date().toISOString().slice(0, 10));
    const original = await DataStore.query(Client, thisClient.id);

    await DataStore.save(
      Client.copyOf(original, (updated) => {
        updated[field] = formik.values[field];
        updated.date_modified = new Date().toISOString().slice(0, 10);
      })
    );
    await DataStore.save(
      Campaign.copyOf(original, (updated) => {
        updated[field] = formik.values[field];
        updated.date_modified = new Date().toISOString().slice(0, 10);
      })
    );
    goBack();
  }

  const formik = useFormik({
    initialValues: {
      name: thisClient.name,
      client_type: thisClient.client_type,
      country: thisClient.country,
      address: thisClient.address,
      website: thisClient.website,
      non_person_email: thisClient.non_person_email,
      billing_contact_name: thisClient.billing_contact_name,
      billing_contact_email: thisClient.billing_contact_email,
      tax_id: thisClient.tax_id,
      main_contact_name: thisClient.main_contact_name,
      main_contact_email: thisClient.main_contact_email,
      main_contact_phone: thisClient.main_contact_phone,
      skype_or_gmeet: thisClient.skype_or_gmeet,
      sales_manager_email: thisClient.sales_manager_email,
      account_manager: thisClient.account_manager,
      kickback_type: thisClient.kickback_type,
      kickback_value: thisClient.kickback_value,
      billing_entity: thisClient.billing_entity,
      date_created: "1970-01-01T12:30:23.999Z",
      date_modified: new Date().toISOString().slice(0, 10),
      Campaigns: [],
    },
    // onSubmit: (values) => {
    //   asyncSubmit();
    // },
  });

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
                  Edit client (formik version)
                </h1>
              </div>
              <div className="space-y-8 divide-y divide-gray-200">
                <div>
                  <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      {thisClient.name}
                    </h3>
                  </div>

                  <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    {/* FORM: NAME */}
                    <form className="sm:col-span-3">
                      <input
                        type="date"
                        value={formik.values.date_modified}
                        className="hidden"
                      />

                      {/* NAME */}
                      <div classNames="a">
                        <label className="block text-sm font-medium text-gray-700">
                          Name
                        </label>
                        <div className="mt-1 flex">
                          <input
                            type="text"
                            name="name"
                            id="name"
                            onChange={formik.handleChange}
                            placeholder={thisClient.name}
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                          <button
                            onClick={(event) => asyncSubmit("name")}
                            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </form>

                    {/* CLIENT_TYPE */}
                    <form className="sm:col-span-3">
                      <div classNames="a">
                        <label className="block text-sm font-medium text-gray-700">
                          Client Type (previously: {thisClient.client_type})
                        </label>
                        <div className="mt-1 flex">
                          <select
                            type="text"
                            name="client_type"
                            id="client_type"
                            onChange={formik.handleChange}
                            selected={formik.values.client_type}
                            name="client_type"
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          >
                            <option />
                            <option>Agency</option>
                            <option>Brand</option>
                          </select>
                          <button
                            onClick={(event) => asyncSubmit("client_type")}
                            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </form>

                    {/* COUNTRY */}
                    <form className="sm:col-span-3">
                      <div classNames="a">
                        <label className="block text-sm font-medium text-gray-700">
                          Country
                        </label>
                        <div className="mt-1 flex">
                          <input
                            type="text"
                            name="country"
                            id="country"
                            onChange={formik.handleChange}
                            placeholder={thisClient.country}
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                          <button
                            onClick={(event) => asyncSubmit("country")}
                            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </form>

                    {/* WEBSITE */}
                    <form className="sm:col-span-3">
                      <div classNames="a">
                        <label className="block text-sm font-medium text-gray-700">
                          Website
                        </label>
                        <div className="mt-1 flex">
                          <input
                            type="text"
                            name="website"
                            id="website"
                            onChange={formik.handleChange}
                            placeholder={thisClient.website}
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                          <button
                            onClick={(event) => asyncSubmit("website")}
                            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </form>

                    {/* ADDRESS */}
                    <form className="sm:col-span-6">
                      <div classNames="a">
                        <label className="block text-sm font-medium text-gray-700">
                          Address
                        </label>
                        <div className="mt-1 flex">
                          <textarea
                            type="text"
                            name="address"
                            id="address"
                            onChange={formik.handleChange}
                            placeholder={thisClient.address}
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                          <button
                            onClick={(event) => asyncSubmit("address")}
                            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </form>

                    {/* NON_PERSON_EMAIL */}
                    <form className="sm:col-span-3">
                      <div classNames="a">
                        <label className="block text-sm font-medium text-gray-700">
                          Non person email
                        </label>
                        <div className="mt-1 flex">
                          <input
                            type="text"
                            name="non_person_email"
                            id="non_person_email"
                            onChange={formik.handleChange}
                            placeholder={thisClient.non_person_email}
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                          <button
                            onClick={(event) => asyncSubmit("non_person_email")}
                            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </form>

                    {/* BILLING_CONTACT_NAME */}
                    <form className="sm:col-span-3">
                      <div classNames="a">
                        <label className="block text-sm font-medium text-gray-700">
                          Billing contact name
                        </label>
                        <div className="mt-1 flex">
                          <input
                            type="text"
                            name="billing_contact_name"
                            id="billing_contact_name"
                            onChange={formik.handleChange}
                            placeholder={thisClient.billing_contact_name}
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                          <button
                            onClick={(event) =>
                              asyncSubmit("billing_contact_name")
                            }
                            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </form>

                    {/* BILLING_CONTACT_EMAIL */}
                    <form className="sm:col-span-3">
                      <div classNames="a">
                        <label className="block text-sm font-medium text-gray-700">
                          Billing contact email
                        </label>
                        <div className="mt-1 flex">
                          <input
                            type="text"
                            name="billing_contact_email"
                            id="billing_contact_email"
                            onChange={formik.handleChange}
                            placeholder={thisClient.billing_contact_email}
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                          <button
                            onClick={(event) =>
                              asyncSubmit("billing_contact_email")
                            }
                            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </form>

                    {/* TAX_ID */}
                    <form className="sm:col-span-3">
                      <div classNames="a">
                        <label className="block text-sm font-medium text-gray-700">
                          Tax
                        </label>
                        <div className="mt-1 flex">
                          <input
                            type="text"
                            name="tax_id"
                            id="tax_id"
                            onChange={formik.handleChange}
                            placeholder={thisClient.tax_id}
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                          <button
                            onClick={(event) => asyncSubmit("tax_id")}
                            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </form>

                    {/* MAIN_CONTACT_NAME */}
                    <form className="sm:col-span-3">
                      <div classNames="a">
                        <label className="block text-sm font-medium text-gray-700">
                          Main contact name
                        </label>
                        <div className="mt-1 flex">
                          <input
                            type="text"
                            name="main_contact_name"
                            id="main_contact_name"
                            onChange={formik.handleChange}
                            placeholder={thisClient.main_contact_name}
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                          <button
                            onClick={(event) =>
                              asyncSubmit("main_contact_name")
                            }
                            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </form>

                    {/* MAIN_CONTACT_EMAIL */}
                    <form className="sm:col-span-3">
                      <div classNames="a">
                        <label className="block text-sm font-medium text-gray-700">
                          Main contact email
                        </label>
                        <div className="mt-1 flex">
                          <input
                            type="text"
                            name="main_contact_email"
                            id="main_contact_email"
                            onChange={formik.handleChange}
                            placeholder={thisClient.main_contact_email}
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                          <button
                            onClick={(event) =>
                              asyncSubmit("main_contact_email")
                            }
                            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </form>

                    {/* MAIN_CONTACT_PHONE */}
                    <form className="sm:col-span-3">
                      <div classNames="a">
                        <label className="block text-sm font-medium text-gray-700">
                          Main contact phone
                        </label>
                        <div className="mt-1 flex">
                          <input
                            type="text"
                            name="main_contact_phone"
                            id="main_contact_phone"
                            onChange={formik.handleChange}
                            placeholder={thisClient.main_contact_phone}
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                          <button
                            onClick={(event) =>
                              asyncSubmit("main_contact_phone")
                            }
                            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </form>

                    {/* SKYPE_OR_GMEET */}
                    <form className="sm:col-span-3">
                      <div classNames="a">
                        <label className="block text-sm font-medium text-gray-700">
                          Skype or Gmeet
                        </label>
                        <div className="mt-1 flex">
                          <input
                            type="text"
                            name="skype_or_gmeet"
                            id="skype_or_gmeet"
                            onChange={formik.handleChange}
                            placeholder={thisClient.skype_or_gmeet}
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                          <button
                            onClick={(event) => asyncSubmit("skype_or_gmeet")}
                            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </form>

                    {/* SALES_MANAGER_EMAIL */}
                    <form className="sm:col-span-3">
                      <div classNames="a">
                        <label className="block text-sm font-medium text-gray-700">
                          Sales manager email
                        </label>
                        <div className="mt-1 flex">
                          <input
                            type="text"
                            name="sales_manager_email"
                            id="sales_manager_email"
                            onChange={formik.handleChange}
                            placeholder={thisClient.sales_manager_email}
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                          <button
                            onClick={(event) =>
                              asyncSubmit("sales_manager_email")
                            }
                            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </form>

                    {/* ACCOUNT_MANAGER */}
                    <form className="sm:col-span-3">
                      <div classNames="a">
                        <label className="block text-sm font-medium text-gray-700">
                          Account manager
                        </label>
                        <div className="mt-1 flex">
                          <input
                            type="text"
                            name="account_manager"
                            id="account_manager"
                            onChange={formik.handleChange}
                            placeholder={thisClient.account_manager}
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                          <button
                            onClick={(event) => asyncSubmit("account_manager")}
                            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </form>

                    {/* KICKBACK_TYPE */}
                    <form className="sm:col-span-3">
                      <div classNames="a">
                        <label className="block text-sm font-medium text-gray-700">
                          Kickback Type (previously: {thisClient.kickback_type})
                        </label>
                        <div className="mt-1 flex">
                          <select
                            type="text"
                            name="kickback_type"
                            id="kickback_type"
                            onChange={formik.handleChange}
                            selected={formik.values.kickback_type}
                            name="kickback_type"
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          >
                            <option />
                            <option>Revenue</option>
                            <option>Cost</option>
                          </select>
                          <button
                            onClick={(event) => asyncSubmit("kickback_type")}
                            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </form>

                    {/* KICKBACK_VALUE */}
                    <form className="sm:col-span-3">
                      <div classNames="a">
                        <label className="block text-sm font-medium text-gray-700">
                          Kickback value
                        </label>
                        <div className="mt-1 flex">
                          <input
                            type="text"
                            name="kickback_value"
                            id="kickback_value"
                            onChange={formik.handleChange}
                            placeholder={thisClient.kickback_value}
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                          <button
                            onClick={(event) => asyncSubmit("kickback_value")}
                            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </form>

                    {/* BILLING_ENTITY */}
                    <form className="sm:col-span-3">
                      <div classNames="a">
                        <label className="block text-sm font-medium text-gray-700">
                          Billing entity
                        </label>
                        <div className="mt-1 flex">
                          <input
                            type="text"
                            name="billing_entity"
                            id="billing_entity"
                            onChange={formik.handleChange}
                            placeholder={thisClient.billing_entity}
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                          <button
                            onClick={(event) => asyncSubmit("billing_entity")}
                            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </form>

                    {/* END */}
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
