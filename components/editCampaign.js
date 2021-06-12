import { DataStore } from "@aws-amplify/datastore";
import { Campaign } from "../models";
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
  { name: "Campaigns", href: "/campaigns", icon: BriefcaseIcon, current: true },
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

export default function Content({
  setNavigation,
  setSidebarOpen,
  thisCampaign,
}) {
  setNavigation(navigation);
  const router = useRouter();

  const goBack = () => {
    router.push(`/campaigns/${thisCampaign.id}`);
  };

  async function asyncSubmit(field) {
    event.preventDefault();
    console.log(`${field}: `, formik.values[field]);
    // console.log(new Date().toISOString().slice(0, 10));
    const original = await DataStore.query(Campaign, thisCampaign.id);
    console.log(original[0]);

    await DataStore.save(
      Campaign.copyOf(original[0], (updated) => {
        updated[field] = formik.values[field];
        updated.date_modified = new Date().toISOString().slice(0, 10);
      })
    );
    // goBack();
  }

  const formik = useFormik({
    initialValues: {
      name: thisCampaign.name,
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
                  href="/campaigns"
                  className="mb-4 inline-flex items-center border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-gray-600 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <ArrowCircleLeftIcon className="h-8 w-8" aria-hidden="true" />
                </a>
                <h1 className="text-3xl font-semibold text-gray-900">
                  Edit campaign (formik version)
                </h1>
              </div>
              <div className="space-y-8 divide-y divide-gray-200">
                <div>
                  <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      {thisCampaign.name}
                    </h3>
                  </div>
                  <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    {/* NAME */}
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
                            placeholder={thisCampaign.name}
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

                    {/* booking_type */}
                    <form className="sm:col-span-3">
                      <div classNames="a">
                        <label className="block text-sm font-medium text-gray-700">
                          Booking type
                        </label>
                        <div className="mt-1 flex">
                          <input
                            type="text"
                            name="name"
                            id="name"
                            onChange={formik.handleChange}
                            placeholder={thisCampaign.booking_type}
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                          <button
                            onClick={(event) => asyncSubmit("booking_type")}
                            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </form>

                    {/* CONTACT_PERSON */}
                    <form className="sm:col-span-3">
                      <div classNames="a">
                        <label className="block text-sm font-medium text-gray-700">
                          Contact person
                        </label>
                        <div className="mt-1 flex">
                          <input
                            type="text"
                            name="name"
                            id="name"
                            onChange={formik.handleChange}
                            placeholder={thisCampaign.contact_person}
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                          <button
                            onClick={(event) => asyncSubmit("contact_person")}
                            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </form>

                    {/* ADDITIONAL_COMMISION_VALUE */}
                    <form className="sm:col-span-3">
                      <div classNames="a">
                        <label className="block text-sm font-medium text-gray-700">
                          Additional commision value
                        </label>
                        <div className="mt-1 flex">
                          <input
                            type="text"
                            name="name"
                            id="name"
                            onChange={formik.handleChange}
                            placeholder={thisCampaign.add_comm_value}
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                          <button
                            onClick={(event) => asyncSubmit("add_comm_value")}
                            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </form>

                    {/* ADDITIONAL_COMMISION_TYPE */}
                    <form className="sm:col-span-3">
                      <div classNames="a">
                        <label className="block text-sm font-medium text-gray-700">
                          Additional commision type
                        </label>
                        <div className="mt-1 flex">
                          <input
                            type="text"
                            name="name"
                            id="name"
                            onChange={formik.handleChange}
                            placeholder={thisCampaign.add_comm_type}
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                          <button
                            onClick={(event) => asyncSubmit("add_comm_type")}
                            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </form>

                    {/* BOOKING_REFERENCE */}
                    <form className="sm:col-span-3">
                      <div classNames="a">
                        <label className="block text-sm font-medium text-gray-700">
                          Booking reference
                        </label>
                        <div className="mt-1 flex">
                          <input
                            type="text"
                            name="name"
                            id="name"
                            onChange={formik.handleChange}
                            placeholder={thisCampaign.booking_reference}
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                          <button
                            onClick={(event) =>
                              asyncSubmit("booking_reference")
                            }
                            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </form>

                    {/* INSTRUCTIONS */}
                    <form className="sm:col-span-3">
                      <div classNames="a">
                        <label className="block text-sm font-medium text-gray-700">
                          Instructions
                        </label>
                        <div className="mt-1 flex">
                          <input
                            type="text"
                            name="name"
                            id="name"
                            onChange={formik.handleChange}
                            placeholder={thisCampaign.instructions}
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                          <button
                            onClick={(event) => asyncSubmit("instructions")}
                            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </form>

                    {/* DELIVERY_COMMENTS */}
                    <form className="sm:col-span-3">
                      <div classNames="a">
                        <label className="block text-sm font-medium text-gray-700">
                          Delivery comments
                        </label>
                        <div className="mt-1 flex">
                          <input
                            type="text"
                            name="name"
                            id="name"
                            onChange={formik.handleChange}
                            placeholder={thisCampaign.delivery_comments}
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                          <button
                            onClick={(event) =>
                              asyncSubmit("delivery_comments")
                            }
                            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </form>

                    {/* STATUS */}
                    <form className="sm:col-span-3">
                      <div classNames="a">
                        <label className="block text-sm font-medium text-gray-700">
                          Status
                        </label>
                        <div className="mt-1 flex">
                          <input
                            type="text"
                            name="name"
                            id="name"
                            onChange={formik.handleChange}
                            placeholder={thisCampaign.status}
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                          <button
                            onClick={(event) => asyncSubmit("status")}
                            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </form>

                    {/* END */}
                  </div>
                  {/*  */}
                  {/*  */}
                  {/*  */}
                  {/*  */}
                  {/*  */}
                  {/*  */}
                  {/*  */}
                  <div className="bg-gray-50 border border-gray-200 overflow-hidden sm:rounded-lg mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    {/* VIDEO_CAMPAIGN */}
                    <form className="sm:col-span-3 px-4 sm:px-6 sm:pt-6">
                      <h1 className="text-md font-medium text-gray-700 mb-4">
                        Video Campaign
                      </h1>
                      <div classNames="a">
                        <label className="block text-sm font-medium text-gray-700">
                          Video campaign
                        </label>
                        <div className="mt-1 flex">
                          <input
                            type="text"
                            name="name"
                            id="name"
                            onChange={formik.handleChange}
                            placeholder={thisCampaign.video_campaign}
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                          <button
                            onClick={(event) => asyncSubmit("video_campaign")}
                            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </form>

                    {/* VIDEO_STARTDATE */}
                    <form className="sm:col-span-3 px-4 sm:px-6 sm:pt-6 mt-10">
                      <div classNames="a">
                        <label className="block text-sm font-medium text-gray-700">
                          Video start date
                        </label>
                        <div className="mt-1 flex">
                          <input
                            type="text"
                            name="name"
                            id="name"
                            onChange={formik.handleChange}
                            placeholder={thisCampaign.video_startDate}
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                          <button
                            onClick={(event) => asyncSubmit("video_startDate")}
                            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </form>

                    {/* VIDEO_ENDDATE */}
                    <form className="sm:col-span-3 px-4 sm:px-6">
                      <div classNames="a">
                        <label className="block text-sm font-medium text-gray-700">
                          Video end date
                        </label>
                        <div className="mt-1 flex">
                          <input
                            type="text"
                            name="name"
                            id="name"
                            onChange={formik.handleChange}
                            placeholder={thisCampaign.video_endDate}
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                          <button
                            onClick={(event) => asyncSubmit("video_endDate")}
                            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </form>

                    {/* VIDEO_UNITRATE */}
                    <form className="sm:col-span-3 px-4 sm:px-6">
                      <div classNames="a">
                        <label className="block text-sm font-medium text-gray-700">
                          Video unit rate
                        </label>
                        <div className="mt-1 flex">
                          <input
                            type="text"
                            name="name"
                            id="name"
                            onChange={formik.handleChange}
                            placeholder={thisCampaign.video_unitRate}
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                          <button
                            onClick={(event) => asyncSubmit("video_unitRate")}
                            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </form>

                    {/* VIDEO_GOAL */}
                    <form className="sm:col-span-3 px-4 sm:px-6">
                      <div classNames="a">
                        <label className="block text-sm font-medium text-gray-700">
                          Video goal
                        </label>
                        <div className="mt-1 flex">
                          <input
                            type="text"
                            name="name"
                            id="name"
                            onChange={formik.handleChange}
                            placeholder={thisCampaign.video_goal}
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                          <button
                            onClick={(event) => asyncSubmit("video_goal")}
                            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </form>

                    {/* VIDEO_BUDGET */}
                    <form className="sm:col-span-3 px-4 sm:px-6">
                      <div classNames="a">
                        <label className="block text-sm font-medium text-gray-700">
                          Video budget
                        </label>
                        <div className="mt-1 flex">
                          <input
                            type="text"
                            name="name"
                            id="name"
                            onChange={formik.handleChange}
                            placeholder={thisCampaign.video_budget}
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                          <button
                            onClick={(event) => asyncSubmit("video_budget")}
                            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </form>

                    {/* VIDEO_REVTYPE */}
                    <form className="sm:col-span-3 px-4 sm:px-6 sm:pb-6 ">
                      <div classNames="a">
                        <label className="block text-sm font-medium text-gray-700">
                          Video rev type
                        </label>
                        <div className="mt-1 flex">
                          <input
                            type="text"
                            name="name"
                            id="name"
                            onChange={formik.handleChange}
                            placeholder={thisCampaign.video_revType}
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                          <button
                            onClick={(event) => asyncSubmit("video_revType")}
                            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </form>

                    {/* END */}
                  </div>
                  {/* DISPALY CAMPAIGN */}
                  <div className="bg-gray-50 border border-gray-200 overflow-hidden sm:rounded-lg mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    {/* DISPLAY_CAMPAIGN */}
                    <form className="sm:col-span-3 px-4 sm:px-6 sm:pt-6">
                      <h1 className="text-md font-medium text-gray-700 mb-4">
                        Display Campaign
                      </h1>
                      <div classNames="a">
                        <label className="block text-sm font-medium text-gray-700">
                          Display campaign
                        </label>
                        <div className="mt-1 flex">
                          <input
                            type="text"
                            name="name"
                            id="name"
                            onChange={formik.handleChange}
                            placeholder={thisCampaign.display_campaign}
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                          <button
                            onClick={(event) => asyncSubmit("display_campaign")}
                            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </form>

                    {/* DISPLAY_STARTDATE */}
                    <form className="sm:col-span-3 px-4 sm:px-6 sm:pt-6 mt-10">
                      <div classNames="a">
                        <label className="block text-sm font-medium text-gray-700">
                          Display start date
                        </label>
                        <div className="mt-1 flex">
                          <input
                            type="text"
                            name="name"
                            id="name"
                            onChange={formik.handleChange}
                            placeholder={thisCampaign.display_startDate}
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                          <button
                            onClick={(event) =>
                              asyncSubmit("display_startDate")
                            }
                            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </form>

                    {/* DISPLAY_ENDDATE */}
                    <form className="sm:col-span-3 px-4 sm:px-6">
                      <div classNames="a">
                        <label className="block text-sm font-medium text-gray-700">
                          Display end date
                        </label>
                        <div className="mt-1 flex">
                          <input
                            type="text"
                            name="name"
                            id="name"
                            onChange={formik.handleChange}
                            placeholder={thisCampaign.display_endDate}
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                          <button
                            onClick={(event) => asyncSubmit("display_endDate")}
                            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </form>

                    {/* DISPLAY_UNITRATE */}
                    <form className="sm:col-span-3 px-4 sm:px-6">
                      <div classNames="a">
                        <label className="block text-sm font-medium text-gray-700">
                          Display unit rate
                        </label>
                        <div className="mt-1 flex">
                          <input
                            type="text"
                            name="name"
                            id="name"
                            onChange={formik.handleChange}
                            placeholder={thisCampaign.display_unitRate}
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                          <button
                            onClick={(event) => asyncSubmit("display_unitRate")}
                            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </form>

                    {/* DISPLAY_GOAL */}
                    <form className="sm:col-span-3 px-4 sm:px-6">
                      <div classNames="a">
                        <label className="block text-sm font-medium text-gray-700">
                          Display goal
                        </label>
                        <div className="mt-1 flex">
                          <input
                            type="text"
                            name="name"
                            id="name"
                            onChange={formik.handleChange}
                            placeholder={thisCampaign.display_goal}
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                          <button
                            onClick={(event) => asyncSubmit("display_goal")}
                            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </form>

                    {/* DISPLAY_BUDGET */}
                    <form className="sm:col-span-3 px-4 sm:px-6">
                      <div classNames="a">
                        <label className="block text-sm font-medium text-gray-700">
                          Display budget
                        </label>
                        <div className="mt-1 flex">
                          <input
                            type="text"
                            name="name"
                            id="name"
                            onChange={formik.handleChange}
                            placeholder={thisCampaign.display_budget}
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                          <button
                            onClick={(event) => asyncSubmit("display_budget")}
                            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </form>

                    {/* DISPLAY_REVTYPE */}
                    <form className="sm:col-span-3 px-4 sm:px-6 sm:pb-6 ">
                      <div classNames="a">
                        <label className="block text-sm font-medium text-gray-700">
                          Display rev type
                        </label>
                        <div className="mt-1 flex">
                          <input
                            type="text"
                            name="name"
                            id="name"
                            onChange={formik.handleChange}
                            placeholder={thisCampaign.display_revType}
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                          <button
                            onClick={(event) => asyncSubmit("display_revType")}
                            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </form>

                    {/* END */}
                  </div>
                  {/* NATIVE */}
                  <div className="bg-gray-50 border border-gray-200 overflow-hidden sm:rounded-lg mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    {/* NATIVE_CAMPAIGN */}
                    <form className="sm:col-span-3 px-4 sm:px-6 sm:pt-6">
                      <h1 className="text-md font-medium text-gray-700 mb-4">
                        Native Campaign
                      </h1>
                      <div classNames="a">
                        <label className="block text-sm font-medium text-gray-700">
                          Native campaign
                        </label>
                        <div className="mt-1 flex">
                          <input
                            type="text"
                            name="name"
                            id="name"
                            onChange={formik.handleChange}
                            placeholder={thisCampaign.native_campaign}
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                          <button
                            onClick={(event) => asyncSubmit("native_campaign")}
                            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </form>

                    {/* NATIVE_STARTDATE */}
                    <form className="sm:col-span-3 px-4 sm:px-6 sm:pt-6 mt-10">
                      <div classNames="a">
                        <label className="block text-sm font-medium text-gray-700">
                          Native start date
                        </label>
                        <div className="mt-1 flex">
                          <input
                            type="text"
                            name="name"
                            id="name"
                            onChange={formik.handleChange}
                            placeholder={thisCampaign.native_startDate}
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                          <button
                            onClick={(event) => asyncSubmit("native_startDate")}
                            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </form>

                    {/* NATIVE_ENDDATE */}
                    <form className="sm:col-span-3 px-4 sm:px-6">
                      <div classNames="a">
                        <label className="block text-sm font-medium text-gray-700">
                          Native end date
                        </label>
                        <div className="mt-1 flex">
                          <input
                            type="text"
                            name="name"
                            id="name"
                            onChange={formik.handleChange}
                            placeholder={thisCampaign.native_endDate}
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                          <button
                            onClick={(event) => asyncSubmit("native_endDate")}
                            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </form>

                    {/* NATIVE_UNITRATE */}
                    <form className="sm:col-span-3 px-4 sm:px-6">
                      <div classNames="a">
                        <label className="block text-sm font-medium text-gray-700">
                          Native unit rate
                        </label>
                        <div className="mt-1 flex">
                          <input
                            type="text"
                            name="name"
                            id="name"
                            onChange={formik.handleChange}
                            placeholder={thisCampaign.native_unitRate}
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                          <button
                            onClick={(event) => asyncSubmit("native_unitRate")}
                            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </form>

                    {/* NATIVE_GOAL */}
                    <form className="sm:col-span-3 px-4 sm:px-6">
                      <div classNames="a">
                        <label className="block text-sm font-medium text-gray-700">
                          Native goal
                        </label>
                        <div className="mt-1 flex">
                          <input
                            type="text"
                            name="name"
                            id="name"
                            onChange={formik.handleChange}
                            placeholder={thisCampaign.native_goal}
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                          <button
                            onClick={(event) => asyncSubmit("native_goal")}
                            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </form>

                    {/* NATIVE_BUDGET */}
                    <form className="sm:col-span-3 px-4 sm:px-6">
                      <div classNames="a">
                        <label className="block text-sm font-medium text-gray-700">
                          Native budget
                        </label>
                        <div className="mt-1 flex">
                          <input
                            type="text"
                            name="name"
                            id="name"
                            onChange={formik.handleChange}
                            placeholder={thisCampaign.native_budget}
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                          <button
                            onClick={(event) => asyncSubmit("native_budget")}
                            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </form>

                    {/* NATIVE_REVTYPE */}
                    <form className="sm:col-span-3 px-4 sm:px-6 sm:pb-6 ">
                      <div classNames="a">
                        <label className="block text-sm font-medium text-gray-700">
                          Native rev type
                        </label>
                        <div className="mt-1 flex">
                          <input
                            type="text"
                            name="name"
                            id="name"
                            onChange={formik.handleChange}
                            placeholder={thisCampaign.native_revType}
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                          <button
                            onClick={(event) => asyncSubmit("native_revType")}
                            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </form>

                    {/* END */}
                  </div>
                  {/* SEARCH */}
                  <div className="bg-gray-50 border border-gray-200 overflow-hidden sm:rounded-lg mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    {/* SEARCH_CAMPAIGN */}
                    <form className="sm:col-span-3 px-4 sm:px-6 sm:pt-6">
                      <h1 className="text-md font-medium text-gray-700 mb-4">
                        Search Campaign
                      </h1>
                      <div classNames="a">
                        <label className="block text-sm font-medium text-gray-700">
                          Search campaign
                        </label>
                        <div className="mt-1 flex">
                          <input
                            type="text"
                            name="name"
                            id="name"
                            onChange={formik.handleChange}
                            placeholder={thisCampaign.search_campaign}
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                          <button
                            onClick={(event) => asyncSubmit("search_campaign")}
                            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </form>

                    {/* SEARCH_STARTDATE */}
                    <form className="sm:col-span-3 px-4 sm:px-6 sm:pt-6 mt-10">
                      <div classNames="a">
                        <label className="block text-sm font-medium text-gray-700">
                          Search start date
                        </label>
                        <div className="mt-1 flex">
                          <input
                            type="text"
                            name="name"
                            id="name"
                            onChange={formik.handleChange}
                            placeholder={thisCampaign.search_startDate}
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                          <button
                            onClick={(event) => asyncSubmit("search_startDate")}
                            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </form>

                    {/* SEARCH_ENDDATE */}
                    <form className="sm:col-span-3 px-4 sm:px-6">
                      <div classNames="a">
                        <label className="block text-sm font-medium text-gray-700">
                          Search end date
                        </label>
                        <div className="mt-1 flex">
                          <input
                            type="text"
                            name="name"
                            id="name"
                            onChange={formik.handleChange}
                            placeholder={thisCampaign.search_endDate}
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                          <button
                            onClick={(event) => asyncSubmit("search_endDate")}
                            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </form>

                    {/* SEARCH_UNITRATE */}
                    <form className="sm:col-span-3 px-4 sm:px-6">
                      <div classNames="a">
                        <label className="block text-sm font-medium text-gray-700">
                          Search unit rate
                        </label>
                        <div className="mt-1 flex">
                          <input
                            type="text"
                            name="name"
                            id="name"
                            onChange={formik.handleChange}
                            placeholder={thisCampaign.search_unitRate}
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                          <button
                            onClick={(event) => asyncSubmit("search_unitRate")}
                            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </form>

                    {/* SEARCH_GOAL */}
                    <form className="sm:col-span-3 px-4 sm:px-6">
                      <div classNames="a">
                        <label className="block text-sm font-medium text-gray-700">
                          Search goal
                        </label>
                        <div className="mt-1 flex">
                          <input
                            type="text"
                            name="name"
                            id="name"
                            onChange={formik.handleChange}
                            placeholder={thisCampaign.search_goal}
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                          <button
                            onClick={(event) => asyncSubmit("search_goal")}
                            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </form>

                    {/* SEARCH_BUDGET */}
                    <form className="sm:col-span-3 px-4 sm:px-6">
                      <div classNames="a">
                        <label className="block text-sm font-medium text-gray-700">
                          Search budget
                        </label>
                        <div className="mt-1 flex">
                          <input
                            type="text"
                            name="name"
                            id="name"
                            onChange={formik.handleChange}
                            placeholder={thisCampaign.search_budget}
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                          <button
                            onClick={(event) => asyncSubmit("search_budget")}
                            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </form>

                    {/* SEARCH_REVTYPE */}
                    <form className="sm:col-span-3 px-4 sm:px-6 sm:pb-6 ">
                      <div classNames="a">
                        <label className="block text-sm font-medium text-gray-700">
                          Search rev type
                        </label>
                        <div className="mt-1 flex">
                          <input
                            type="text"
                            name="name"
                            id="name"
                            onChange={formik.handleChange}
                            placeholder={thisCampaign.search_revType}
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                          <button
                            onClick={(event) => asyncSubmit("search_revType")}
                            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </form>

                    {/* END */}
                  </div>
                  {/* SOCIAL */}
                  <div className="bg-gray-50 border border-gray-200 overflow-hidden sm:rounded-lg mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    {/* SOCIAL_CAMPAIGN */}
                    <form className="sm:col-span-3 px-4 sm:px-6 sm:pt-6">
                      <h1 className="text-md font-medium text-gray-700 mb-4">
                        Social Campaign
                      </h1>
                      <div classNames="a">
                        <label className="block text-sm font-medium text-gray-700">
                          Social campaign
                        </label>
                        <div className="mt-1 flex">
                          <input
                            type="text"
                            name="name"
                            id="name"
                            onChange={formik.handleChange}
                            placeholder={thisCampaign.social_campaign}
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                          <button
                            onClick={(event) => asyncSubmit("social_campaign")}
                            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </form>

                    {/* SOCIAL_STARTDATE */}
                    <form className="sm:col-span-3 px-4 sm:px-6 sm:pt-6 mt-10">
                      <div classNames="a">
                        <label className="block text-sm font-medium text-gray-700">
                          Social start date
                        </label>
                        <div className="mt-1 flex">
                          <input
                            type="text"
                            name="name"
                            id="name"
                            onChange={formik.handleChange}
                            placeholder={thisCampaign.social_startDate}
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                          <button
                            onClick={(event) => asyncSubmit("social_startDate")}
                            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </form>

                    {/* SOCIAL_ENDDATE */}
                    <form className="sm:col-span-3 px-4 sm:px-6">
                      <div classNames="a">
                        <label className="block text-sm font-medium text-gray-700">
                          Social end date
                        </label>
                        <div className="mt-1 flex">
                          <input
                            type="text"
                            name="name"
                            id="name"
                            onChange={formik.handleChange}
                            placeholder={thisCampaign.social_endDate}
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                          <button
                            onClick={(event) => asyncSubmit("social_endDate")}
                            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </form>

                    {/* SOCIAL_UNITRATE */}
                    <form className="sm:col-span-3 px-4 sm:px-6">
                      <div classNames="a">
                        <label className="block text-sm font-medium text-gray-700">
                          Social unit rate
                        </label>
                        <div className="mt-1 flex">
                          <input
                            type="text"
                            name="name"
                            id="name"
                            onChange={formik.handleChange}
                            placeholder={thisCampaign.social_unitRate}
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                          <button
                            onClick={(event) => asyncSubmit("social_unitRate")}
                            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </form>

                    {/* SOCIAL_GOAL */}
                    <form className="sm:col-span-3 px-4 sm:px-6">
                      <div classNames="a">
                        <label className="block text-sm font-medium text-gray-700">
                          Social goal
                        </label>
                        <div className="mt-1 flex">
                          <input
                            type="text"
                            name="name"
                            id="name"
                            onChange={formik.handleChange}
                            placeholder={thisCampaign.social_goal}
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                          <button
                            onClick={(event) => asyncSubmit("social_goal")}
                            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </form>

                    {/* SOCIAL_BUDGET */}
                    <form className="sm:col-span-3 px-4 sm:px-6">
                      <div classNames="a">
                        <label className="block text-sm font-medium text-gray-700">
                          Social budget
                        </label>
                        <div className="mt-1 flex">
                          <input
                            type="text"
                            name="name"
                            id="name"
                            onChange={formik.handleChange}
                            placeholder={thisCampaign.social_budget}
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                          <button
                            onClick={(event) => asyncSubmit("social_budget")}
                            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </form>

                    {/* SOCIAL_REVTYPE */}
                    <form className="sm:col-span-3 px-4 sm:px-6 sm:pb-6 ">
                      <div classNames="a">
                        <label className="block text-sm font-medium text-gray-700">
                          Social rev type
                        </label>
                        <div className="mt-1 flex">
                          <input
                            type="text"
                            name="name"
                            id="name"
                            onChange={formik.handleChange}
                            placeholder={thisCampaign.social_revType}
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                          <button
                            onClick={(event) => asyncSubmit("social_revType")}
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
