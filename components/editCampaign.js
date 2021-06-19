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
    console.log(new Date().toISOString().slice(0, 10));
    const original = await DataStore.query(Campaign, thisCampaign.id);
    console.log(original[0]);

    if (field == "video_campaign" || field == "display_campaign") {
      await DataStore.save(
        Campaign.copyOf(thisCampaign, (updated) => {
          if (formik.values[field] == "true") {
            updated[field] = true;
          } else {
            updated[field] = false;
          }
          updated.date_modified = new Date().toISOString().slice(0, 10);
        })
      );
    } else {
      await DataStore.save(
        Campaign.copyOf(thisCampaign, (updated) => {
          updated[field] = formik.values[field];
          updated.date_modified = new Date().toISOString().slice(0, 10);
        })
      );
    }

    goBack();
  }

  const formik = useFormik({
    initialValues: {
      name: thisCampaign.name,
      booking_reference: thisCampaign.reference,
      booking_type: thisCampaign.booking_type,
      contact_person: thisCampaign.contact_person,
      add_comm_type: thisCampaign.add_comm_type,
      add_comm_value: thisCampaign.add_comm_value,
      instructions: thisCampaign.instructions,
      delivery_comments: thisCampaign.delivery_comments,
      date_created: thisCampaign.date_created,
      date_modified: thisCampaign.date_modified,
      status: thisCampaign.status,
      revenue_cpm: thisCampaign.revenue_cpm,
      revenue_cpc: thisCampaign.revenue_cpc,
      revenue_cpcv: thisCampaign.revenue_cpcv,
      revenue_cpview: thisCampaign.revenue_cpview,
      revenue_cpvisit: thisCampaign.revenue_cpvisit,
      revenue_cpl: thisCampaign.revenue_cpl,
      revenue_cpa: thisCampaign.revenue_cpa,
      revenue_cpi: thisCampaign.revenue_cpi,
      revenue_cps: thisCampaign.revenue_cps,
      video_campaign: thisCampaign.video_campaign,
      video_startDate: thisCampaign.video_startDate,
      video_endDate: thisCampaign.video_endDate,
      video_unitRate: thisCampaign.video_unitRate,
      video_goal: thisCampaign.video_goal,
      video_budget: thisCampaign.video_budget,
      video_revType: thisCampaign.video_revType,
      display_campaign: thisCampaign.display_campaign,
      display_startDate: thisCampaign.display_startDate,
      display_endDate: thisCampaign.display_endDate,
      display_unitRate: thisCampaign.display_unitRate,
      display_goal: thisCampaign.display_goal,
      display_budget: thisCampaign.display_budget,
      display_revType: thisCampaign.display_revType,
      native_campaign: thisCampaign.native_campaign,
      native_startDate: thisCampaign.native_startDate,
      native_endDate: thisCampaign.native_endDate,
      native_unitRate: thisCampaign.native_unitRate,
      native_goal: thisCampaign.native_goal,
      native_budget: thisCampaign.native_budget,
      native_revType: thisCampaign.native_revType,
      search_campaign: thisCampaign.search_campaign,
      search_startDate: thisCampaign.search_startDate,
      search_endDate: thisCampaign.search_endDate,
      search_unitRate: thisCampaign.search_unitRate,
      search_goal: thisCampaign.search_goal,
      search_budget: thisCampaign.search_budget,
      search_revType: thisCampaign.search_revType,
      social_campaign: thisCampaign.social_campaign,
      social_startDate: thisCampaign.social_startDate,
      social_endDate: thisCampaign.social_endDate,
      social_unitRate: thisCampaign.social_unitRate,
      social_goal: thisCampaign.social_goal,
      social_budget: thisCampaign.social_budget,
      social_revType: thisCampaign.social_revType,
      highImpact_campaign: thisCampaign.highImpact_campaign,
      highImpact_startDate: thisCampaign.highImpact_startDate,
      highImpact_endDate: thisCampaign.highImpact_endDate,
      highImpact_unitRate: thisCampaign.highImpact_unitRate,
      highImpact_goal: thisCampaign.highImpact_goal,
      highImpact_budget: thisCampaign.highImpact_budget,
      highImpact_revType: thisCampaign.highImpact_revType,
      richMedia_campaign: thisCampaign.richMedia_campaign,
      richMedia_startDate: thisCampaign.richMedia_startDate,
      richMedia_endDate: thisCampaign.richMedia_endDate,
      richMedia_unitRate: thisCampaign.richMedia_unitRate,
      richMedia_goal: thisCampaign.richMedia_goal,
      richMedia_budget: thisCampaign.richMedia_budget,
      nativrichMedia_revType: thisCampaign.nativnativrichMedia_revType,
      pop_campaign: thisCampaign.pop_campaign,
      pop_startDate: thisCampaign.pop_startDate,
      pop_endDate: thisCampaign.pop_endDate,
      pop_unitRate: thisCampaign.pop_unitRate,
      pop_goal: thisCampaign.pop_goal,
      pop_budget: thisCampaign.pop_budget,
      pop_revType: thisCampaign.pop_revType,
      push_campaign: thisCampaign.push_campaign,
      push_startDate: thisCampaign.push_startDate,
      push_endDate: thisCampaign.push_endDate,
      push_unitRate: thisCampaign.push_unitRate,
      push_goal: thisCampaign.push_goal,
      push_budget: thisCampaign.push_budget,
      push_revType: thisCampaign.push_revType,
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
                  Edit campaign
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
                          Booking type{" "}
                          <p className="text-gray-600">
                            previously: {thisCampaign.add_comm_type}
                          </p>
                        </label>
                        <div className="mt-1 flex">
                          <select
                            type="text"
                            name="booking_type"
                            id="booking_type"
                            onChange={formik.handleChange}
                            selected={formik.values.booking_type}
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          >
                            <option />
                            <option>BO</option>
                            <option>PMP</option>
                          </select>
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
                            name="contact_person"
                            id="contact_person"
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
                            type="number"
                            name="add_comm_value"
                            id="add_comm_value"
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
                          Additional commision type{" "}
                          <p className="text-gray-600"></p>previously:{" "}
                          {thisCampaign.add_comm_type}
                        </label>
                        <div className="mt-1 flex">
                          <select
                            type="text"
                            name="add_comm_type"
                            id="add_comm_type"
                            onChange={formik.handleChange}
                            selected={formik.values.add_comm_type}
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          >
                            <option />
                            <option>Revenue</option>
                            <option>Cost</option>
                          </select>
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
                            name="reference"
                            id="reference"
                            onChange={formik.handleChange}
                            placeholder={thisCampaign.reference}
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                          <button
                            onClick={(event) => asyncSubmit("reference")}
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
                            name="instructions"
                            id="instructions"
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
                            name="delivery_comments"
                            id="delivery_comments"
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
                            name="status"
                            id="status"
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
                  {/* VIDEO */}
                  <div className="bg-gray-50 border border-gray-200 overflow-hidden sm:rounded-lg mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    {/* VIDEO_CAMPAIGN */}
                    <form className="sm:col-span-3 px-4 sm:px-6 sm:pt-3">
                      <h1 className="text-md font-medium text-gray-700 mb-4">
                        Video Campaign
                      </h1>
                      <div classNames="a">
                        <label className="block text-sm font-medium text-gray-700">
                          Video campaign
                        </label>
                        <div className="mt-1 flex">
                          <input
                            type="radio"
                            name="video_campaign"
                            value={true}
                            onChange={formik.handleChange}
                            className="mr-2"
                          />
                          Active
                          <br />
                          <div className="mt-2"></div>
                          <input
                            type="radio"
                            name="video_campaign"
                            value={false}
                            onChange={formik.handleChange}
                            className="mr-2"
                          />
                          Inactive
                          <button
                            onClick={(event) => asyncSubmit("video_campaign")}
                            className="ml-3 -mt-2 mb-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </form>

                    {thisCampaign.video_campaign ? (
                      <>
                        {/* VIDEO_STARTDATE */}
                        <form className="sm:col-span-3 px-4 sm:px-6 sm:pt-6 mt-10">
                          <div classNames="a">
                            <label className="block text-sm font-medium text-gray-700">
                              Video start date
                            </label>
                            <div className="mt-1 flex">
                              <input
                                type="date"
                                name="video_startDate"
                                id="video_startDate"
                                onChange={formik.handleChange}
                                placeholder={thisCampaign.video_startDate}
                                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                              />
                              <button
                                onClick={(event) =>
                                  asyncSubmit("video_startDate")
                                }
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
                                type="date"
                                name="video_endDate"
                                id="video_endDate"
                                onChange={formik.handleChange}
                                placeholder={thisCampaign.video_endDate}
                                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                              />
                              <button
                                onClick={(event) =>
                                  asyncSubmit("video_endDate")
                                }
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
                                type="number"
                                name="video_unitRate"
                                id="video_unitRate"
                                onChange={formik.handleChange}
                                placeholder={thisCampaign.video_unitRate}
                                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                              />
                              <button
                                onClick={(event) =>
                                  asyncSubmit("video_unitRate")
                                }
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
                                type="number"
                                name="video_goal"
                                id="video_goal"
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
                                type="number"
                                name="video_budget"
                                id="video_budget"
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
                              <select
                                type="text"
                                name="video_revType"
                                id="video_revType"
                                onChange={formik.handleChange}
                                selected={formik.values.video_revType}
                                name="video_revType"
                                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                              >
                                <option />
                                <option>revenue_cpm</option>
                                <option>revenue_cpc</option>
                                <option>revenue_cpcv</option>
                                <option>revenue_cpview</option>
                                <option>revenue_cpvisit</option>
                                <option>revenue_cpl</option>
                                <option>revenue_cpa</option>
                                <option>revenue_cpi</option>
                                <option>revenue_cps</option>
                              </select>
                              <button
                                onClick={(event) =>
                                  asyncSubmit("video_revType")
                                }
                                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                              >
                                Save
                              </button>
                            </div>
                          </div>
                        </form>
                      </>
                    ) : (
                      <></>
                    )}

                    {/* END */}
                  </div>
                  {/* DISPLAY */}
                  <div className="bg-gray-50 border border-gray-200 overflow-hidden sm:rounded-lg mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    {/* DISPLAY_CAMPAIGN */}
                    <form className="sm:col-span-3 px-4 sm:px-6 sm:pt-3">
                      <h1 className="text-md font-medium text-gray-700 mb-4">
                        Display Campaign
                      </h1>
                      <div classNames="a">
                        <label className="block text-sm font-medium text-gray-700">
                          Display campaign
                        </label>
                        <div className="mt-1 flex">
                          <input
                            type="radio"
                            name="display_campaign"
                            value={true}
                            onChange={formik.handleChange}
                            className="mr-2"
                          />
                          Active
                          <br />
                          <div className="mt-2"></div>
                          <input
                            type="radio"
                            name="display_campaign"
                            value={false}
                            onChange={formik.handleChange}
                            className="mr-2"
                          />
                          Inactive
                          <button
                            onClick={(event) => asyncSubmit("display_campaign")}
                            className="ml-3 -mt-2 mb-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </form>

                    {thisCampaign.display_campaign ? (
                      <>
                        {/* DISPLAY_STARTDATE */}
                        <form className="sm:col-span-3 px-4 sm:px-6 sm:pt-6 mt-10">
                          <div classNames="a">
                            <label className="block text-sm font-medium text-gray-700">
                              Display start date
                            </label>
                            <div className="mt-1 flex">
                              <input
                                type="date"
                                name="display_startDate"
                                id="display_startDate"
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
                                type="date"
                                name="display_endDate"
                                id="display_endDate"
                                onChange={formik.handleChange}
                                placeholder={thisCampaign.display_endDate}
                                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                              />
                              <button
                                onClick={(event) =>
                                  asyncSubmit("display_endDate")
                                }
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
                                type="number"
                                name="display_unitRate"
                                id="display_unitRate"
                                onChange={formik.handleChange}
                                placeholder={thisCampaign.display_unitRate}
                                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                              />
                              <button
                                onClick={(event) =>
                                  asyncSubmit("display_unitRate")
                                }
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
                                type="number"
                                name="display_goal"
                                id="display_goal"
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
                                type="number"
                                name="display_budget"
                                id="display_budget"
                                onChange={formik.handleChange}
                                placeholder={thisCampaign.display_budget}
                                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                              />
                              <button
                                onClick={(event) =>
                                  asyncSubmit("display_budget")
                                }
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
                              <select
                                type="text"
                                name="display_revType"
                                id="display_revType"
                                onChange={formik.handleChange}
                                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                              >
                                <option />
                                <option>revenue_cpm</option>
                                <option>revenue_cpc</option>
                                <option>revenue_cpcv</option>
                                <option>revenue_cpview</option>
                                <option>revenue_cpvisit</option>
                                <option>revenue_cpl</option>
                                <option>revenue_cpa</option>
                                <option>revenue_cpi</option>
                                <option>revenue_cps</option>
                              </select>
                              <button
                                onClick={(event) =>
                                  asyncSubmit("display_revType")
                                }
                                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                              >
                                Save
                              </button>
                            </div>
                          </div>
                        </form>
                      </>
                    ) : (
                      <></>
                    )}

                    {/* END */}
                  </div>
                  {/* NATIVE */}
                  <div className="bg-gray-50 border border-gray-200 overflow-hidden sm:rounded-lg mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    {/* NATIVE_CAMPAIGN */}
                    <form className="sm:col-span-3 px-4 sm:px-6 sm:pt-3">
                      <h1 className="text-md font-medium text-gray-700 mb-3">
                        Native Campaign
                      </h1>
                      <div classNames="a">
                        <label className="block text-sm font-medium text-gray-700">
                          Native campaign
                        </label>
                        <div className="mt-1 flex">
                          <input
                            type="radio"
                            name="native_campaign"
                            value={true}
                            onChange={formik.handleChange}
                            className="mr-2"
                          />
                          Active
                          <br />
                          <div className="mt-2"></div>
                          <input
                            type="radio"
                            name="native_campaign"
                            value={false}
                            onChange={formik.handleChange}
                            className="mr-2"
                          />
                          Inactive
                          <button
                            onClick={(event) => asyncSubmit("native_campaign")}
                            className="ml-3 -mt-2 mb-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </form>

                    {thisCampaign.native_campaign ? (
                      <>
                        {/* NATIVE_STARTDATE */}
                        <form className="sm:col-span-3 px-4 sm:px-6 sm:pt-6 mt-10">
                          <div classNames="a">
                            <label className="block text-sm font-medium text-gray-700">
                              Native start date
                            </label>
                            <div className="mt-1 flex">
                              <input
                                type="date"
                                name="native_startDate"
                                id="native_startDate"
                                onChange={formik.handleChange}
                                placeholder={thisCampaign.native_startDate}
                                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                              />
                              <button
                                onClick={(event) =>
                                  asyncSubmit("native_startDate")
                                }
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
                                type="date"
                                name="native_endDate"
                                id="native_endDate"
                                onChange={formik.handleChange}
                                placeholder={thisCampaign.native_endDate}
                                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                              />
                              <button
                                onClick={(event) =>
                                  asyncSubmit("native_endDate")
                                }
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
                                type="number"
                                name="native_unitRate"
                                id="native_unitRate"
                                onChange={formik.handleChange}
                                placeholder={thisCampaign.native_unitRate}
                                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                              />
                              <button
                                onClick={(event) =>
                                  asyncSubmit("native_unitRate")
                                }
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
                                type="number"
                                name="native_goal"
                                id="native_goal"
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
                                type="number"
                                name="native_budget"
                                id="native_budget"
                                onChange={formik.handleChange}
                                placeholder={thisCampaign.native_budget}
                                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                              />
                              <button
                                onClick={(event) =>
                                  asyncSubmit("native_budget")
                                }
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
                              <select
                                type="text"
                                name="native_revType"
                                id="native_revType"
                                onChange={formik.handleChange}
                                selected={formik.values.native_revType}
                                name="native_revType"
                                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                              >
                                <option />
                                <option>revenue_cpm</option>
                                <option>revenue_cpc</option>
                                <option>revenue_cpcv</option>
                                <option>revenue_cpview</option>
                                <option>revenue_cpvisit</option>
                                <option>revenue_cpl</option>
                                <option>revenue_cpa</option>
                                <option>revenue_cpi</option>
                                <option>revenue_cps</option>
                              </select>
                              <button
                                onClick={(event) =>
                                  asyncSubmit("native_revType")
                                }
                                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                              >
                                Save
                              </button>
                            </div>
                          </div>
                        </form>
                      </>
                    ) : (
                      <></>
                    )}

                    {/* END */}
                  </div>
                  {/* SEARCH */}
                  <div className="bg-gray-50 border border-gray-200 overflow-hidden sm:rounded-lg mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    {/* SEARCH_CAMPAIGN */}
                    <form className="sm:col-span-3 px-4 sm:px-6 sm:pt-3">
                      <h1 className="text-md font-medium text-gray-700 mb-4">
                        Search Campaign
                      </h1>
                      <div classNames="a">
                        <label className="block text-sm font-medium text-gray-700">
                          Search campaign
                        </label>
                        <div className="mt-1 flex">
                          <input
                            type="radio"
                            name="search_campaign"
                            value={true}
                            onChange={formik.handleChange}
                            className="mr-2"
                          />
                          Active
                          <br />
                          <div className="mt-2"></div>
                          <input
                            type="radio"
                            name="search_campaign"
                            value={false}
                            onChange={formik.handleChange}
                            className="mr-2"
                          />
                          Inactive
                          <button
                            onClick={(event) => asyncSubmit("search_campaign")}
                            className="ml-3 -mt-2 mb-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </form>

                    {thisCampaign.search_campaign ? (
                      <>
                        {/* SEARCH_STARTDATE */}
                        <form className="sm:col-span-3 px-4 sm:px-6 sm:pt-6 mt-10">
                          <div classNames="a">
                            <label className="block text-sm font-medium text-gray-700">
                              Search start date
                            </label>
                            <div className="mt-1 flex">
                              <input
                                type="date"
                                name="search_startDate"
                                id="search_startDate"
                                onChange={formik.handleChange}
                                placeholder={thisCampaign.search_startDate}
                                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                              />
                              <button
                                onClick={(event) =>
                                  asyncSubmit("search_startDate")
                                }
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
                                type="date"
                                name="search_endDate"
                                id="search_endDate"
                                onChange={formik.handleChange}
                                placeholder={thisCampaign.search_endDate}
                                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                              />
                              <button
                                onClick={(event) =>
                                  asyncSubmit("search_endDate")
                                }
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
                                type="number"
                                name="search_unitRate"
                                id="search_unitRate"
                                onChange={formik.handleChange}
                                placeholder={thisCampaign.search_unitRate}
                                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                              />
                              <button
                                onClick={(event) =>
                                  asyncSubmit("search_unitRate")
                                }
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
                                type="number"
                                name="search_goal"
                                id="search_goal"
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
                                type="number"
                                name="search_budget"
                                id="search_budget"
                                onChange={formik.handleChange}
                                placeholder={thisCampaign.search_budget}
                                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                              />
                              <button
                                onClick={(event) =>
                                  asyncSubmit("search_budget")
                                }
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
                              <select
                                type="text"
                                name="search_revType"
                                id="search_revType"
                                onChange={formik.handleChange}
                                selected={formik.values.search_revType}
                                name="search_revType"
                                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                              >
                                <option />
                                <option>revenue_cpm</option>
                                <option>revenue_cpc</option>
                                <option>revenue_cpcv</option>
                                <option>revenue_cpview</option>
                                <option>revenue_cpvisit</option>
                                <option>revenue_cpl</option>
                                <option>revenue_cpa</option>
                                <option>revenue_cpi</option>
                                <option>revenue_cps</option>
                              </select>
                              <button
                                onClick={(event) =>
                                  asyncSubmit("search_revType")
                                }
                                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                              >
                                Save
                              </button>
                            </div>
                          </div>
                        </form>
                      </>
                    ) : (
                      <></>
                    )}

                    {/* END */}
                  </div>
                  {/* SOCIAL */}
                  <div className="bg-gray-50 border border-gray-200 overflow-hidden sm:rounded-lg mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    {/* SOCIAL_CAMPAIGN */}
                    <form className="sm:col-span-3 px-4 sm:px-6 sm:pt-3">
                      <h1 className="text-md font-medium text-gray-700 mb-4">
                        Social Campaign
                      </h1>
                      <div classNames="a">
                        <label className="block text-sm font-medium text-gray-700">
                          Social campaign
                        </label>
                        <div className="mt-1 flex">
                          <input
                            type="radio"
                            name="social_campaign"
                            value={true}
                            onChange={formik.handleChange}
                            className="mr-2"
                          />
                          Active
                          <br />
                          <div className="mt-2"></div>
                          <input
                            type="radio"
                            name="social_campaign"
                            value={false}
                            onChange={formik.handleChange}
                            className="mr-2"
                          />
                          Inactive
                          <button
                            onClick={(event) => asyncSubmit("social_campaign")}
                            className="ml-3 -mt-2 mb-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </form>

                    {thisCampaign.social_campaign ? (
                      <>
                        {/* SOCIAL_STARTDATE */}
                        <form className="sm:col-span-3 px-4 sm:px-6 sm:pt-6 mt-10">
                          <div classNames="a">
                            <label className="block text-sm font-medium text-gray-700">
                              Social start date
                            </label>
                            <div className="mt-1 flex">
                              <input
                                type="date"
                                name="social_startDate"
                                id="social_startDate"
                                onChange={formik.handleChange}
                                placeholder={thisCampaign.social_startDate}
                                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                              />
                              <button
                                onClick={(event) =>
                                  asyncSubmit("social_startDate")
                                }
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
                                type="date"
                                name="social_endDate"
                                id="social_endDate"
                                onChange={formik.handleChange}
                                placeholder={thisCampaign.social_endDate}
                                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                              />
                              <button
                                onClick={(event) =>
                                  asyncSubmit("social_endDate")
                                }
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
                                type="number"
                                name="social_unitRate"
                                id="social_unitRate"
                                onChange={formik.handleChange}
                                placeholder={thisCampaign.social_unitRate}
                                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                              />
                              <button
                                onClick={(event) =>
                                  asyncSubmit("social_unitRate")
                                }
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
                                type="number"
                                name="social_goal"
                                id="social_goal"
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
                                type="number"
                                name="social_budget"
                                id="social_budget"
                                onChange={formik.handleChange}
                                placeholder={thisCampaign.social_budget}
                                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                              />
                              <button
                                onClick={(event) =>
                                  asyncSubmit("social_budget")
                                }
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
                              <select
                                type="text"
                                name="social_revType"
                                id="social_revType"
                                onChange={formik.handleChange}
                                selected={formik.values.social_revType}
                                name="social_revType"
                                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                              >
                                <option />
                                <option>revenue_cpm</option>
                                <option>revenue_cpc</option>
                                <option>revenue_cpcv</option>
                                <option>revenue_cpview</option>
                                <option>revenue_cpvisit</option>
                                <option>revenue_cpl</option>
                                <option>revenue_cpa</option>
                                <option>revenue_cpi</option>
                                <option>revenue_cps</option>
                              </select>
                              <button
                                onClick={(event) =>
                                  asyncSubmit("social_revType")
                                }
                                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                              >
                                Save
                              </button>
                            </div>
                          </div>
                        </form>
                      </>
                    ) : (
                      <></>
                    )}

                    {/* END */}
                  </div>
                  {/* HIGHIMPACT */}
                  <div className="bg-gray-50 border border-gray-200 overflow-hidden sm:rounded-lg mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    {/* HIGHIMPACT_CAMPAIGN */}
                    <form className="sm:col-span-3 px-4 sm:px-6 sm:pt-3">
                      <h1 className="text-md font-medium text-gray-700 mb-4">
                        HighImpact Campaign
                      </h1>
                      <div classNames="a">
                        <label className="block text-sm font-medium text-gray-700">
                          HighImpact campaign
                        </label>
                        <div className="mt-1 flex">
                          <input
                            type="radio"
                            name="highImpact_campaign"
                            value={true}
                            onChange={formik.handleChange}
                            className="mr-2"
                          />
                          Active
                          <br />
                          <div className="mt-2"></div>
                          <input
                            type="radio"
                            name="highImpact_campaign"
                            value={false}
                            onChange={formik.handleChange}
                            className="mr-2"
                          />
                          Inactive
                          <button
                            onClick={(event) =>
                              asyncSubmit("highImpact_campaign")
                            }
                            className="ml-3 -mt-2 mb-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </form>

                    {thisCampaign.highImpact_campaign ? (
                      <>
                        {/* HIGHIMPACT_STARTDATE */}
                        <form className="sm:col-span-3 px-4 sm:px-6 sm:pt-6 mt-10">
                          <div classNames="a">
                            <label className="block text-sm font-medium text-gray-700">
                              HighImpact start date
                            </label>
                            <div className="mt-1 flex">
                              <input
                                type="date"
                                name="highImpact_startDate"
                                id="highImpact_startDate"
                                onChange={formik.handleChange}
                                placeholder={thisCampaign.highImpact_startDate}
                                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                              />
                              <button
                                onClick={(event) =>
                                  asyncSubmit("highImpact_startDate")
                                }
                                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                              >
                                Save
                              </button>
                            </div>
                          </div>
                        </form>

                        {/* HIGHIMPACT_ENDDATE */}
                        <form className="sm:col-span-3 px-4 sm:px-6">
                          <div classNames="a">
                            <label className="block text-sm font-medium text-gray-700">
                              HighImpact end date
                            </label>
                            <div className="mt-1 flex">
                              <input
                                type="date"
                                name="highImpact_endDate"
                                id="highImpact_endDate"
                                onChange={formik.handleChange}
                                placeholder={thisCampaign.highImpact_endDate}
                                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                              />
                              <button
                                onClick={(event) =>
                                  asyncSubmit("highImpact_endDate")
                                }
                                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                              >
                                Save
                              </button>
                            </div>
                          </div>
                        </form>

                        {/* HIGHIMPACT_UNITRATE */}
                        <form className="sm:col-span-3 px-4 sm:px-6">
                          <div classNames="a">
                            <label className="block text-sm font-medium text-gray-700">
                              HighImpact unit rate
                            </label>
                            <div className="mt-1 flex">
                              <input
                                type="number"
                                name="highImpact_unitRate"
                                id="highImpact_unitRate"
                                onChange={formik.handleChange}
                                placeholder={thisCampaign.highImpact_unitRate}
                                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                              />
                              <button
                                onClick={(event) =>
                                  asyncSubmit("highImpact_unitRate")
                                }
                                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                              >
                                Save
                              </button>
                            </div>
                          </div>
                        </form>

                        {/* HIGHIMPACT_GOAL */}
                        <form className="sm:col-span-3 px-4 sm:px-6">
                          <div classNames="a">
                            <label className="block text-sm font-medium text-gray-700">
                              HighImpact goal
                            </label>
                            <div className="mt-1 flex">
                              <input
                                type="number"
                                name="highImpact_goal"
                                id="highImpact_goal"
                                onChange={formik.handleChange}
                                placeholder={thisCampaign.highImpact_goal}
                                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                              />
                              <button
                                onClick={(event) =>
                                  asyncSubmit("highImpact_goal")
                                }
                                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                              >
                                Save
                              </button>
                            </div>
                          </div>
                        </form>

                        {/* HIGHIMPACT_BUDGET */}
                        <form className="sm:col-span-3 px-4 sm:px-6">
                          <div classNames="a">
                            <label className="block text-sm font-medium text-gray-700">
                              HighImpact budget
                            </label>
                            <div className="mt-1 flex">
                              <input
                                type="number"
                                name="highImpact_budget"
                                id="highImpact_budget"
                                onChange={formik.handleChange}
                                placeholder={thisCampaign.highImpact_budget}
                                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                              />
                              <button
                                onClick={(event) =>
                                  asyncSubmit("highImpact_budget")
                                }
                                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                              >
                                Save
                              </button>
                            </div>
                          </div>
                        </form>

                        {/* HIGHIMPACT_REVTYPE */}
                        <form className="sm:col-span-3 px-4 sm:px-6 sm:pb-6 ">
                          <div classNames="a">
                            <label className="block text-sm font-medium text-gray-700">
                              HighImpact rev type
                            </label>
                            <div className="mt-1 flex">
                              <select
                                type="text"
                                name="highImpact_revType"
                                id="highImpact_revType"
                                onChange={formik.handleChange}
                                selected={formik.values.highImpact_revType}
                                name="highImpact_revType"
                                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                              >
                                <option />
                                <option>revenue_cpm</option>
                                <option>revenue_cpc</option>
                                <option>revenue_cpcv</option>
                                <option>revenue_cpview</option>
                                <option>revenue_cpvisit</option>
                                <option>revenue_cpl</option>
                                <option>revenue_cpa</option>
                                <option>revenue_cpi</option>
                                <option>revenue_cps</option>
                              </select>
                              <button
                                onClick={(event) =>
                                  asyncSubmit("highImpact_revType")
                                }
                                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                              >
                                Save
                              </button>
                            </div>
                          </div>
                        </form>
                      </>
                    ) : (
                      <></>
                    )}

                    {/* END */}
                  </div>
                  {/* RICHMEDIA */}
                  <div className="bg-gray-50 border border-gray-200 overflow-hidden sm:rounded-lg mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    {/* RICHMEDIA_CAMPAIGN */}
                    <form className="sm:col-span-3 px-4 sm:px-6 sm:pt-3">
                      <h1 className="text-md font-medium text-gray-700 mb-4">
                        RichMedia Campaign
                      </h1>
                      <div classNames="a">
                        <label className="block text-sm font-medium text-gray-700">
                          RichMedia campaign
                        </label>
                        <div className="mt-1 flex">
                          <input
                            type="radio"
                            name="richMedia_campaign"
                            value={true}
                            onChange={formik.handleChange}
                            className="mr-2"
                          />
                          Active
                          <br />
                          <div className="mt-2"></div>
                          <input
                            type="radio"
                            name="richMedia_campaign"
                            value={false}
                            onChange={formik.handleChange}
                            className="mr-2"
                          />
                          Inactive
                          <button
                            onClick={(event) =>
                              asyncSubmit("richMedia_campaign")
                            }
                            className="ml-3 -mt-2 mb-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </form>

                    {thisCampaign.richMedia_campaign ? (
                      <>
                        {/* RICHMEDIA_STARTDATE */}
                        <form className="sm:col-span-3 px-4 sm:px-6 sm:pt-6 mt-10">
                          <div classNames="a">
                            <label className="block text-sm font-medium text-gray-700">
                              RichMedia start date
                            </label>
                            <div className="mt-1 flex">
                              <input
                                type="date"
                                name="richMedia_startDate"
                                id="richMedia_startDate"
                                onChange={formik.handleChange}
                                placeholder={thisCampaign.richMedia_startDate}
                                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                              />
                              <button
                                onClick={(event) =>
                                  asyncSubmit("richMedia_startDate")
                                }
                                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                              >
                                Save
                              </button>
                            </div>
                          </div>
                        </form>

                        {/* RICHMEDIA_ENDDATE */}
                        <form className="sm:col-span-3 px-4 sm:px-6">
                          <div classNames="a">
                            <label className="block text-sm font-medium text-gray-700">
                              RichMedia end date
                            </label>
                            <div className="mt-1 flex">
                              <input
                                type="date"
                                name="richMedia_endDate"
                                id="richMedia_endDate"
                                onChange={formik.handleChange}
                                placeholder={thisCampaign.richMedia_endDate}
                                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                              />
                              <button
                                onClick={(event) =>
                                  asyncSubmit("richMedia_endDate")
                                }
                                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                              >
                                Save
                              </button>
                            </div>
                          </div>
                        </form>

                        {/* RICHMEDIA_UNITRATE */}
                        <form className="sm:col-span-3 px-4 sm:px-6">
                          <div classNames="a">
                            <label className="block text-sm font-medium text-gray-700">
                              RichMedia unit rate
                            </label>
                            <div className="mt-1 flex">
                              <input
                                type="number"
                                name="richMedia_unitRate"
                                id="richMedia_unitRate"
                                onChange={formik.handleChange}
                                placeholder={thisCampaign.richMedia_unitRate}
                                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                              />
                              <button
                                onClick={(event) =>
                                  asyncSubmit("richMedia_unitRate")
                                }
                                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                              >
                                Save
                              </button>
                            </div>
                          </div>
                        </form>

                        {/* RICHMEDIA_GOAL */}
                        <form className="sm:col-span-3 px-4 sm:px-6">
                          <div classNames="a">
                            <label className="block text-sm font-medium text-gray-700">
                              RichMedia goal
                            </label>
                            <div className="mt-1 flex">
                              <input
                                type="number"
                                name="richMedia_goal"
                                id="richMedia_goal"
                                onChange={formik.handleChange}
                                placeholder={thisCampaign.richMedia_goal}
                                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                              />
                              <button
                                onClick={(event) =>
                                  asyncSubmit("richMedia_goal")
                                }
                                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                              >
                                Save
                              </button>
                            </div>
                          </div>
                        </form>

                        {/* RICHMEDIA_BUDGET */}
                        <form className="sm:col-span-3 px-4 sm:px-6">
                          <div classNames="a">
                            <label className="block text-sm font-medium text-gray-700">
                              RichMedia budget
                            </label>
                            <div className="mt-1 flex">
                              <input
                                type="number"
                                name="richMedia_budget"
                                id="richMedia_budget"
                                onChange={formik.handleChange}
                                placeholder={thisCampaign.richMedia_budget}
                                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                              />
                              <button
                                onClick={(event) =>
                                  asyncSubmit("richMedia_budget")
                                }
                                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                              >
                                Save
                              </button>
                            </div>
                          </div>
                        </form>

                        {/* nativrichMedia_revType */}
                        <form className="sm:col-span-3 px-4 sm:px-6 sm:pb-6 ">
                          <div classNames="a">
                            <label className="block text-sm font-medium text-gray-700">
                              RichMedia rev type
                            </label>
                            <div className="mt-1 flex">
                              <select
                                type="text"
                                name="nativrichMedia_revType"
                                id="nativrichMedia_revType"
                                onChange={formik.handleChange}
                                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                              >
                                <option />
                                <option>revenue_cpm</option>
                                <option>revenue_cpc</option>
                                <option>revenue_cpcv</option>
                                <option>revenue_cpview</option>
                                <option>revenue_cpvisit</option>
                                <option>revenue_cpl</option>
                                <option>revenue_cpa</option>
                                <option>revenue_cpi</option>
                                <option>revenue_cps</option>
                              </select>
                              <button
                                onClick={(event) =>
                                  asyncSubmit("nativrichMedia_revType")
                                }
                                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                              >
                                Save
                              </button>
                            </div>
                          </div>
                        </form>
                      </>
                    ) : (
                      <></>
                    )}

                    {/* END */}
                  </div>
                  {/* POP */}
                  <div className="bg-gray-50 border border-gray-200 overflow-hidden sm:rounded-lg mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    {/* POP_CAMPAIGN */}
                    <form className="sm:col-span-3 px-4 sm:px-6 sm:pt-3">
                      <h1 className="text-md font-medium text-gray-700 mb-4">
                        Pop Campaign
                      </h1>
                      <div classNames="a">
                        <label className="block text-sm font-medium text-gray-700">
                          Pop campaign
                        </label>
                        <div className="mt-1 flex">
                          <input
                            type="radio"
                            name="pop_campaign"
                            value={true}
                            onChange={formik.handleChange}
                            className="mr-2"
                          />
                          Active
                          <br />
                          <div className="mt-2"></div>
                          <input
                            type="radio"
                            name="pop_campaign"
                            value={false}
                            onChange={formik.handleChange}
                            className="mr-2"
                          />
                          Inactive
                          <button
                            onClick={(event) => asyncSubmit("pop_campaign")}
                            className="ml-3 -mt-2 mb-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </form>

                    {thisCampaign.pop_campaign ? (
                      <>
                        {/* POP_STARTDATE */}
                        <form className="sm:col-span-3 px-4 sm:px-6 sm:pt-6 mt-10">
                          <div classNames="a">
                            <label className="block text-sm font-medium text-gray-700">
                              Pop start date
                            </label>
                            <div className="mt-1 flex">
                              <input
                                type="date"
                                name="pop_startDate"
                                id="pop_startDate"
                                onChange={formik.handleChange}
                                placeholder={thisCampaign.pop_startDate}
                                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                              />
                              <button
                                onClick={(event) =>
                                  asyncSubmit("pop_startDate")
                                }
                                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                              >
                                Save
                              </button>
                            </div>
                          </div>
                        </form>

                        {/* POP_ENDDATE */}
                        <form className="sm:col-span-3 px-4 sm:px-6">
                          <div classNames="a">
                            <label className="block text-sm font-medium text-gray-700">
                              Pop end date
                            </label>
                            <div className="mt-1 flex">
                              <input
                                type="date"
                                name="pop_endDate"
                                id="pop_endDate"
                                onChange={formik.handleChange}
                                placeholder={thisCampaign.pop_endDate}
                                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                              />
                              <button
                                onClick={(event) => asyncSubmit("pop_endDate")}
                                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                              >
                                Save
                              </button>
                            </div>
                          </div>
                        </form>

                        {/* POP_UNITRATE */}
                        <form className="sm:col-span-3 px-4 sm:px-6">
                          <div classNames="a">
                            <label className="block text-sm font-medium text-gray-700">
                              Pop unit rate
                            </label>
                            <div className="mt-1 flex">
                              <input
                                type="number"
                                name="pop_unitRate"
                                id="pop_unitRate"
                                onChange={formik.handleChange}
                                placeholder={thisCampaign.pop_unitRate}
                                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                              />
                              <button
                                onClick={(event) => asyncSubmit("pop_unitRate")}
                                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                              >
                                Save
                              </button>
                            </div>
                          </div>
                        </form>

                        {/* POP_GOAL */}
                        <form className="sm:col-span-3 px-4 sm:px-6">
                          <div classNames="a">
                            <label className="block text-sm font-medium text-gray-700">
                              Pop goal
                            </label>
                            <div className="mt-1 flex">
                              <input
                                type="number"
                                name="pop_goal"
                                id="pop_goal"
                                onChange={formik.handleChange}
                                placeholder={thisCampaign.pop_goal}
                                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                              />
                              <button
                                onClick={(event) => asyncSubmit("pop_goal")}
                                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                              >
                                Save
                              </button>
                            </div>
                          </div>
                        </form>

                        {/* POP_BUDGET */}
                        <form className="sm:col-span-3 px-4 sm:px-6">
                          <div classNames="a">
                            <label className="block text-sm font-medium text-gray-700">
                              Pop budget
                            </label>
                            <div className="mt-1 flex">
                              <input
                                type="number"
                                name="pop_budget"
                                id="pop_budget"
                                onChange={formik.handleChange}
                                placeholder={thisCampaign.pop_budget}
                                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                              />
                              <button
                                onClick={(event) => asyncSubmit("pop_budget")}
                                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                              >
                                Save
                              </button>
                            </div>
                          </div>
                        </form>

                        {/* POP_REVTYPE */}
                        <form className="sm:col-span-3 px-4 sm:px-6 sm:pb-6 ">
                          <div classNames="a">
                            <label className="block text-sm font-medium text-gray-700">
                              Pop rev type
                            </label>
                            <div className="mt-1 flex">
                              <select
                                type="text"
                                name="pop_revType"
                                id="pop_revType"
                                onChange={formik.handleChange}
                                selected={formik.values.pop_revType}
                                name="pop_revType"
                                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                              >
                                <option />
                                <option>revenue_cpm</option>
                                <option>revenue_cpc</option>
                                <option>revenue_cpcv</option>
                                <option>revenue_cpview</option>
                                <option>revenue_cpvisit</option>
                                <option>revenue_cpl</option>
                                <option>revenue_cpa</option>
                                <option>revenue_cpi</option>
                                <option>revenue_cps</option>
                              </select>
                              <button
                                onClick={(event) => asyncSubmit("pop_revType")}
                                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                              >
                                Save
                              </button>
                            </div>
                          </div>
                        </form>
                      </>
                    ) : (
                      <></>
                    )}

                    {/* END */}
                  </div>
                  {/* PUSH */}
                  <div className="bg-gray-50 border border-gray-200 overflow-hidden sm:rounded-lg mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    {/* PUSH_CAMPAIGN */}
                    <form className="sm:col-span-3 px-4 sm:px-6 sm:pt-3">
                      <h1 className="text-md font-medium text-gray-700 mb-4">
                        Push Campaign
                      </h1>
                      <div classNames="a">
                        <label className="block text-sm font-medium text-gray-700">
                          Push campaign
                        </label>
                        <div className="mt-1 flex">
                          <input
                            type="radio"
                            name="push_campaign"
                            value={true}
                            onChange={formik.handleChange}
                            className="mr-2"
                          />
                          Active
                          <br />
                          <div className="mt-2"></div>
                          <input
                            type="radio"
                            name="push_campaign"
                            value={false}
                            onChange={formik.handleChange}
                            className="mr-2"
                          />
                          Inactive
                          <button
                            onClick={(event) => asyncSubmit("push_campaign")}
                            className="ml-3 -mt-2 mb-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </form>

                    {thisCampaign.push_campaign ? (
                      <>
                        {/* PUSH_STARTDATE */}
                        <form className="sm:col-span-3 px-4 sm:px-6 sm:pt-6 mt-10">
                          <div classNames="a">
                            <label className="block text-sm font-medium text-gray-700">
                              Push start date
                            </label>
                            <div className="mt-1 flex">
                              <input
                                type="date"
                                name="push_startDate"
                                id="push_startDate"
                                onChange={formik.handleChange}
                                placeholder={thisCampaign.push_startDate}
                                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                              />
                              <button
                                onClick={(event) =>
                                  asyncSubmit("push_startDate")
                                }
                                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                              >
                                Save
                              </button>
                            </div>
                          </div>
                        </form>

                        {/* PUSH_ENDDATE */}
                        <form className="sm:col-span-3 px-4 sm:px-6">
                          <div classNames="a">
                            <label className="block text-sm font-medium text-gray-700">
                              Push end date
                            </label>
                            <div className="mt-1 flex">
                              <input
                                type="date"
                                name="push_endDate"
                                id="push_endDate"
                                onChange={formik.handleChange}
                                placeholder={thisCampaign.push_endDate}
                                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                              />
                              <button
                                onClick={(event) => asyncSubmit("push_endDate")}
                                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                              >
                                Save
                              </button>
                            </div>
                          </div>
                        </form>

                        {/* PUSH_UNITRATE */}
                        <form className="sm:col-span-3 px-4 sm:px-6">
                          <div classNames="a">
                            <label className="block text-sm font-medium text-gray-700">
                              Push unit rate
                            </label>
                            <div className="mt-1 flex">
                              <input
                                type="number"
                                name="push_unitRate"
                                id="push_unitRate"
                                onChange={formik.handleChange}
                                placeholder={thisCampaign.push_unitRate}
                                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                              />
                              <button
                                onClick={(event) =>
                                  asyncSubmit("push_unitRate")
                                }
                                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                              >
                                Save
                              </button>
                            </div>
                          </div>
                        </form>

                        {/* PUSH_GOAL */}
                        <form className="sm:col-span-3 px-4 sm:px-6">
                          <div classNames="a">
                            <label className="block text-sm font-medium text-gray-700">
                              Push goal
                            </label>
                            <div className="mt-1 flex">
                              <input
                                type="number"
                                name="push_goal"
                                id="push_goal"
                                onChange={formik.handleChange}
                                placeholder={thisCampaign.push_goal}
                                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                              />
                              <button
                                onClick={(event) => asyncSubmit("push_goal")}
                                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                              >
                                Save
                              </button>
                            </div>
                          </div>
                        </form>

                        {/* PUSH_BUDGET */}
                        <form className="sm:col-span-3 px-4 sm:px-6">
                          <div classNames="a">
                            <label className="block text-sm font-medium text-gray-700">
                              Push budget
                            </label>
                            <div className="mt-1 flex">
                              <input
                                type="number"
                                name="push_budget"
                                id="push_budget"
                                onChange={formik.handleChange}
                                placeholder={thisCampaign.push_budget}
                                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                              />
                              <button
                                onClick={(event) => asyncSubmit("push_budget")}
                                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                              >
                                Save
                              </button>
                            </div>
                          </div>
                        </form>

                        {/* PUSH_REVTYPE */}
                        <form className="sm:col-span-3 px-4 sm:px-6 sm:pb-6 ">
                          <div classNames="a">
                            <label className="block text-sm font-medium text-gray-700">
                              Push rev type
                            </label>
                            <div className="mt-1 flex">
                              <select
                                type="text"
                                name="push_revType"
                                id="push_revType"
                                onChange={formik.handleChange}
                                selected={formik.values.push_revType}
                                name="push_revType"
                                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                              >
                                <option />
                                <option>revenue_cpm</option>
                                <option>revenue_cpc</option>
                                <option>revenue_cpcv</option>
                                <option>revenue_cpview</option>
                                <option>revenue_cpvisit</option>
                                <option>revenue_cpl</option>
                                <option>revenue_cpa</option>
                                <option>revenue_cpi</option>
                                <option>revenue_cps</option>
                              </select>
                              <button
                                onClick={(event) => asyncSubmit("push_revType")}
                                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                              >
                                Save
                              </button>
                            </div>
                          </div>
                        </form>
                      </>
                    ) : (
                      <></>
                    )}

                    {/* END */}
                  </div>
                  {/* FORM END */}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
