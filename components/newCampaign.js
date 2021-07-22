import { useState, useRef, useEffect } from "react";
import { DataStore } from "@aws-amplify/datastore";
import { Storage } from "aws-amplify";
import { Campaign, Client } from "../models";
import { Form, Field } from "react-final-form";
import { FormSpy } from "react-final-form";
import { useRouter } from "next/router";
import Dropzone from "./Dropzone";
import Select from "react-select";
import Multiselect from "multiselect-react-dropdown";
import { v4 as uuid } from "uuid";
import moment from "moment";
// import Dropzone from "react-dropzone";
import {
  BriefcaseIcon,
  ChartSquareBarIcon,
  MenuAlt2Icon,
  HomeIcon,
  ArrowCircleLeftIcon,
  UserAddIcon,
  PresentationChartLineIcon,
} from "@heroicons/react/outline";

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
    icon: ChartSquareBarIcon,
    current: true,
  },
  { name: "Sales", href: "/sales-team", icon: UserAddIcon, current: false },
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

const parse = (value) => (isNaN(parseFloat(value)) ? "" : parseFloat(value));

console.log("Set date created to:", new Date().toISOString().slice(0, 10));

const Condition = ({ when, is, children }) => (
  <Field name={when} subscription={{ value: true }}>
    {({ input: { value } }) => (value === is ? children : null)}
  </Field>
);

export default function Content({
  setNavigation,
  setSidebarOpen,
  clientList,
  campaignList,
}) {
  setNavigation(navigation);
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  console.log(campaignList);

  async function submitFormFunc(values) {
    setIsSubmitting(true);

    let submissionObject = {
      date_created: new Date().toISOString().slice(0, 10),
    };
    if (values.name !== undefined) {
      submissionObject.name = values.name;
    }
    if (values.booking_type !== undefined) {
      submissionObject.booking_type = values.booking_type;
    }
    if (values.contact_person !== undefined) {
      submissionObject.contact_person = values.contact_person;
    }
    if (values.video_campaign !== undefined) {
      submissionObject.video_campaign = values.video_campaign;
    }
    if (values.add_comm_type !== undefined) {
      submissionObject.add_comm_type = values.add_comm_type;
    }
    if (values.add_comm_value !== undefined) {
      submissionObject.add_comm_value = values.add_comm_value;
    }

    // if (values.reference !== undefined) {
    //   submissionObject.reference = values.reference;
    // }
    let year = moment().format("YYYY");
    submissionObject.reference = `CMP-${year}-${(campaignList.length + 1)
      .toString()
      .padStart(4, "0")}`;

    if (values.instructions !== undefined) {
      submissionObject.instructions = values.instructions;
    }
    if (values.delivery_comments !== undefined) {
      submissionObject.delivery_comments = values.delivery_comments;
    }
    if (values.status !== undefined) {
      submissionObject.status = values.status;
    }

    let campaignTypesAuto = "";

    if (values.video_campaign !== undefined) {
      submissionObject.video_campaign = values.video_campaign;
      campaignTypesAuto += ` Video campaign,`;
    } else {
      submissionObject.video_campaign = false;
    }
    if (values.display_campaign !== undefined) {
      submissionObject.display_campaign = values.display_campaign;
      campaignTypesAuto += ` Display campaign,`;
    } else {
      submissionObject.display_campaign = false;
    }
    if (values.native_campaign !== undefined) {
      submissionObject.native_campaign = values.native_campaign;
      campaignTypesAuto += ` Native campaign,`;
    } else {
      submissionObject.native_campaign = false;
    }
    if (values.search_campaign !== undefined) {
      submissionObject.search_campaign = values.search_campaign;
      campaignTypesAuto += ` Search campaign,`;
    } else {
      submissionObject.search_campaign = false;
    }
    if (values.social_campaign !== undefined) {
      submissionObject.social_campaign = values.social_campaign;
      campaignTypesAuto += ` Social campaign,`;
    } else {
      submissionObject.social_campaign = false;
    }
    if (values.highImpact_campaign !== undefined) {
      submissionObject.highImpact_campaign = values.highImpact_campaign;
      campaignTypesAuto += ` High impact campaign,`;
    } else {
      submissionObject.highImpact_campaign = false;
    }
    if (values.richMedia_campaign !== undefined) {
      submissionObject.richMedia_campaign = values.richMedia_campaign;
      campaignTypesAuto += ` Rich media campaign,`;
    } else {
      submissionObject.richMedia_campaign = false;
    }
    if (values.pop_campaign !== undefined) {
      submissionObject.pop_campaign = values.pop_campaign;
      campaignTypesAuto += ` Pop campaign,`;
    } else {
      submissionObject.pop_campaign = false;
    }

    if (values.push_campaign !== undefined) {
      submissionObject.push_campaign = values.push_campaign;
      campaignTypesAuto += ` ${submissionObject.video_campaign}`;
    } else {
      submissionObject.push_campaign = false;
    }
    if (values.video_startDate !== undefined) {
      submissionObject.video_startDate = values.video_startDate;
    }
    if (values.video_endDate !== undefined) {
      submissionObject.video_endDate = values.video_endDate;
    }
    if (values.video_unitRate !== undefined) {
      submissionObject.video_unitRate = values.video_unitRate;
    }
    if (values.video_goal !== undefined) {
      submissionObject.video_goal = values.video_goal;
    }
    if (values.video_budget !== undefined) {
      submissionObject.video_budget = values.video_budget;
    }
    if (values.video_revType !== undefined) {
      submissionObject.video_revType = values.video_revType;
    }
    if (values.display_startDate !== undefined) {
      submissionObject.display_startDate = values.display_startDate;
    }
    if (values.display_endDate !== undefined) {
      submissionObject.display_endDate = values.display_endDate;
    }
    if (values.display_unitRate !== undefined) {
      submissionObject.display_unitRate = values.display_unitRate;
    }
    if (values.display_goal !== undefined) {
      submissionObject.display_goal = values.display_goal;
    }
    if (values.display_budget !== undefined) {
      submissionObject.display_budget = values.display_budget;
    }
    if (values.display_revType !== undefined) {
      submissionObject.display_revType = values.display_revType;
    }
    if (values.native_startDate !== undefined) {
      submissionObject.native_startDate = values.native_startDate;
    }
    if (values.native_endDate !== undefined) {
      submissionObject.native_endDate = values.native_endDate;
    }
    if (values.native_unitRate !== undefined) {
      submissionObject.native_unitRate = values.native_unitRate;
    }
    if (values.native_goal !== undefined) {
      submissionObject.native_goal = values.native_goal;
    }
    if (values.native_budget !== undefined) {
      submissionObject.native_budget = values.native_budget;
    }
    if (values.native_revType !== undefined) {
      submissionObject.native_revType = values.native_revType;
    }
    if (values.search_startDate !== undefined) {
      submissionObject.search_startDate = values.search_startDate;
    }
    if (values.search_endDate !== undefined) {
      submissionObject.search_endDate = values.search_endDate;
    }
    if (values.search_unitRate !== undefined) {
      submissionObject.search_unitRate = values.search_unitRate;
    }
    if (values.search_goal !== undefined) {
      submissionObject.search_goal = values.search_goal;
    }
    if (values.search_budget !== undefined) {
      submissionObject.search_budget = values.search_budget;
    }
    if (values.search_revType !== undefined) {
      submissionObject.search_revType = values.search_revType;
    }
    if (values.social_startDate !== undefined) {
      submissionObject.social_startDate = values.social_startDate;
    }
    if (values.social_endDate !== undefined) {
      submissionObject.social_endDate = values.social_endDate;
    }
    if (values.social_unitRate !== undefined) {
      submissionObject.social_unitRate = values.social_unitRate;
    }
    if (values.social_goal !== undefined) {
      submissionObject.social_goal = values.social_goal;
    }
    if (values.social_budget !== undefined) {
      submissionObject.social_budget = values.social_budget;
    }
    if (values.social_revType !== undefined) {
      submissionObject.social_revType = values.social_revType;
    }
    if (values.highImpact_startDate !== undefined) {
      submissionObject.highImpact_startDate = values.highImpact_startDate;
    }
    if (values.highImpact_endDate !== undefined) {
      submissionObject.highImpact_endDate = values.highImpact_endDate;
    }
    if (values.highImpact_unitRate !== undefined) {
      submissionObject.highImpact_unitRate = values.highImpact_unitRate;
    }
    if (values.highImpact_goal !== undefined) {
      submissionObject.highImpact_goal = values.highImpact_goal;
    }
    if (values.highImpact_budget !== undefined) {
      submissionObject.highImpact_budget = values.highImpact_budget;
    }
    if (values.highImpact_revType !== undefined) {
      submissionObject.highImpact_revType = values.highImpact_revType;
    }
    if (values.richMedia_startDate !== undefined) {
      submissionObject.richMedia_startDate = values.richMedia_startDate;
    }
    if (values.richMedia_endDate !== undefined) {
      submissionObject.richMedia_endDate = values.richMedia_endDate;
    }
    if (values.richMedia_unitRate !== undefined) {
      submissionObject.richMedia_unitRate = values.richMedia_unitRate;
    }
    if (values.richMedia_goal !== undefined) {
      submissionObject.richMedia_goal = values.richMedia_goal;
    }
    if (values.richMedia_budget !== undefined) {
      submissionObject.richMedia_budget = values.richMedia_budget;
    }
    if (values.richMedia_revType !== undefined) {
      submissionObject.richMedia_revType = values.richMedia_revType;
    }
    if (values.pop_startDate !== undefined) {
      submissionObject.pop_startDate = values.pop_startDate;
    }
    if (values.pop_endDate !== undefined) {
      submissionObject.pop_endDate = values.pop_endDate;
    }
    if (values.pop_unitRate !== undefined) {
      submissionObject.pop_unitRate = values.pop_unitRate;
    }
    if (values.pop_goal !== undefined) {
      submissionObject.pop_goal = values.pop_goal;
    }
    if (values.pop_budget !== undefined) {
      submissionObject.pop_budget = values.pop_budget;
    }
    if (values.pop_revType !== undefined) {
      submissionObject.pop_revType = values.pop_revType;
    }
    if (values.push_startDate !== undefined) {
      submissionObject.push_startDate = values.push_startDate;
    }
    if (values.push_endDate !== undefined) {
      submissionObject.push_endDate = values.push_endDate;
    }
    if (values.push_unitRate !== undefined) {
      submissionObject.push_unitRate = values.push_unitRate;
    }
    if (values.push_goal !== undefined) {
      submissionObject.push_goal = values.push_goal;
    }
    if (values.push_budget !== undefined) {
      submissionObject.push_budget = values.push_budget;
    }
    if (values.push_revType !== undefined) {
      submissionObject.push_revType = values.push_revType;
    }
    if (values.clientName !== undefined) {
      submissionObject.clientName = JSON.parse(values.clientName).name;
      submissionObject.allowed_sales_manager_email = JSON.parse(
        values.clientName
      ).sales_manager_email;
      // console.log("Stringified Client: ", values.clientName);
      // console.log("JSON Client: ", JSON.parse(values.clientName));
    }
    if (values.platforms !== undefined) {
      let genCommaSepStr = "";
      for (const f in values.platforms) {
        genCommaSepStr += `${values.platforms[f].value},`;
      }
      console.log("GENEREATED PLATFORMS STRING: ", genCommaSepStr.slice(0, -1));
      submissionObject.platforms = genCommaSepStr.slice(0, -1);
      // submissionObject.platforms = JSON.stringify(
      //   Object.assign({}, values.platforms)
      // );
      // submissionObject.platforms = JSON.stringify(values.platforms);
      // submissionObject.platforms = Object.assign(
      //   {},
      //   values.platforms
      // ).toString();
    }
    if (values.BO_file !== undefined) {
      console.log(values.BO_file[0]);
      const fileName = `${uuid()}_${values.BO_file[0].name}`;
      submissionObject.BO_file = fileName;
      await Storage.put(fileName, values.BO_file[0]);
    }

    let campaign_names_array = [
      "display_campaign",
      "highImpact_campaign",
      "native_campaign",
      "pop_campaign",
      "push_campaign",
      "richMedia_campaign",
      "search_campaign",
      "social_campaign",
      "video_campaign",
    ];

    let give_Reference_ID_Array = [];

    for (let i = 0; i < campaign_names_array.length; i++) {
      if (values[campaign_names_array[i]] === undefined) {
        console.log(`${campaign_names_array[i]} is false`);
      } else {
        console.log(`${campaign_names_array[i]} is true`);
        give_Reference_ID_Array.push(campaign_names_array[i]);
      }
    }

    if (give_Reference_ID_Array.length > 0) {
      for (let i = 0; i < 8; i++) {
        if (give_Reference_ID_Array[i] === "video_campaign") {
          submissionObject.reference_id_video_campaign = `CMP-${year}-${(
            campaignList.length + 1
          )
            .toString()
            .padStart(4, "0")}-${i + 1}`;
        }

        if (give_Reference_ID_Array[i] === "display_campaign") {
          submissionObject.reference_id_display_campaign = `CMP-${year}-${(
            campaignList.length + 1
          )
            .toString()
            .padStart(4, "0")}-${i + 1}`;
        }

        if (give_Reference_ID_Array[i] === "social_campaign") {
          submissionObject.reference_id_social_campaign = `CMP-${year}-${(
            campaignList.length + 1
          )
            .toString()
            .padStart(4, "0")}-${i + 1}`;
        }

        if (give_Reference_ID_Array[i] === "richMedia_campaign") {
          submissionObject.reference_id_richMedia_campaign = `CMP-${year}-${(
            campaignList.length + 1
          )
            .toString()
            .padStart(4, "0")}-${i + 1}`;
        }

        if (give_Reference_ID_Array[i] === "pop_campaign") {
          submissionObject.reference_id_pop_campaign = `CMP-${year}-${(
            campaignList.length + 1
          )
            .toString()
            .padStart(4, "0")}-${i + 1}`;
        }

        if (give_Reference_ID_Array[i] === "push_campaign") {
          submissionObject.reference_id_push_campaign = `CMP-${year}-${(
            campaignList.length + 1
          )
            .toString()
            .padStart(4, "0")}-${i + 1}`;
        }

        if (give_Reference_ID_Array[i] === "highImpact_campaign") {
          submissionObject.reference_id_highImpact_campaign = `CMP-${year}-${(
            campaignList.length + 1
          )
            .toString()
            .padStart(4, "0")}-${i + 1}`;
        }

        if (give_Reference_ID_Array[i] === "search_campaign") {
          submissionObject.reference_id_search_campaign = `CMP-${year}-${(
            campaignList.length + 1
          )
            .toString()
            .padStart(4, "0")}-${i + 1}`;
        }

        if (give_Reference_ID_Array[i] === "native_campaign") {
          submissionObject.reference_id_native_campaign = `CMP-${year}-${(
            campaignList.length + 1
          )
            .toString()
            .padStart(4, "0")}-${i + 1}`;
        }
      }
    }

    console.log("reference array: ", give_Reference_ID_Array);
    console.log("submissionObject: ", submissionObject);
    console.log("campaignTypesAuto: ", campaignTypesAuto.substring(1));

    await DataStore.save(new Campaign(submissionObject));
    // window.location.reload();
    router.push("/campaigns");
  }

  console.log(clientList);

  const platformOptionsObject = [
    { value: "Target", label: "Target" },
    { value: "DV360", label: "DV360" },
    { value: "Google Search", label: "Google Search" },
    { value: "Google Display", label: "Google Display" },
    { value: "Taboola", label: "Taboola" },
    { value: "Outbrain", label: "Outbrain" },
    { value: "Facebook", label: "Facebook" },
    { value: "Twitter", label: "Twitter" },
    { value: "LinkedIn", label: "LinkedIn" },
    { value: "Voluum", label: "Voluum" },
    { value: "PM_BDV", label: "PM_BDV" },
    { value: "PM_ZP", label: "PM_ZP" },
    { value: "PM_T2", label: "PM_T2" },
    { value: "Other", label: "Other" },
  ];

  const ReactSelectAdapter = ({ input, ...rest }) => (
    <Select {...input} {...rest} />
  );

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
                  New Campaign
                </h1>
              </div>
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
                          {/* REFERENCE */}
                          {/* <div className="sm:col-span-3">
                            <label className="block text-sm font-medium text-gray-700">
                              Reference
                            </label>
                            <Field name="reference">
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
                          </div> */}

                          {/* NAME */}
                          <div className="sm:col-span-3">
                            <label className="block text-sm font-medium text-gray-700">
                              Name
                            </label>
                            <Field
                              name="name"
                              validate={composeValidators(required)}
                            >
                              {({ input, meta }) => (
                                <>
                                  <div className="mt-1">
                                    <input
                                      type="text"
                                      {...input}
                                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    />
                                    {(meta.error || meta.submitError) &&
                                      meta.touched && (
                                        <span className="text-red-500">
                                          {meta.error || meta.submitError}
                                        </span>
                                      )}
                                  </div>
                                </>
                              )}
                            </Field>
                          </div>

                          {/* CLIENT */}
                          <div className="sm:col-span-3">
                            <label className="block text-sm font-medium text-gray-700">
                              Client
                            </label>

                            {/* <Field
                              name="clientName"
                              component="select"
                              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            >
                              <option />
                              {clientList.map((client) => (
                                <option value={JSON.stringify(client)}>
                                  {client.name}
                                </option>
                              ))}
                            </Field> */}
                            <Field
                              name="clientName"
                              validate={composeValidators(required)}
                              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            >
                              {({ input, meta }) => (
                                <>
                                  <div className="mt-1">
                                    <select
                                      {...input}
                                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    >
                                      <option />
                                      {clientList.map((client) => (
                                        <option value={JSON.stringify(client)}>
                                          {client.name}
                                        </option>
                                      ))}
                                    </select>
                                    {(meta.error || meta.submitError) &&
                                      meta.touched && (
                                        <span className="text-red-500">
                                          {meta.error || meta.submitError}
                                        </span>
                                      )}
                                  </div>
                                </>
                              )}
                            </Field>
                          </div>

                          {/* BOOKING_TYPE */}
                          <div className="sm:col-span-3">
                            <label className="block text-sm font-medium text-gray-700">
                              Booking type
                            </label>
                            {/* <Field
                              name="booking_type"
                              component="select"
                              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            >
                              <option />
                              <option>BO</option>
                              <option>PMP</option>
                            </Field> */}
                            <Field
                              name="booking_type"
                              validate={composeValidators(required)}
                              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            >
                              {({ input, meta }) => (
                                <>
                                  <div className="mt-1">
                                    <select
                                      {...input}
                                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    >
                                      <option />
                                      <option>BO</option>
                                      <option>PMP</option>
                                    </select>
                                    {(meta.error || meta.submitError) &&
                                      meta.touched && (
                                        <span className="text-red-500">
                                          {meta.error || meta.submitError}
                                        </span>
                                      )}
                                  </div>
                                </>
                              )}
                            </Field>
                          </div>

                          {/* CONTACT_PERSON */}
                          <div className="sm:col-span-3">
                            <label className="block text-sm font-medium text-gray-700">
                              Contact person
                            </label>
                            <Field name="contact_person">
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
                        </div>
                        <div className="bg-gray-50 border border-gray-200 p-4 mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                          {/* DISPLAY_CAMPAIGN */}
                          <div className="sm:col-span-3">
                            <Field name="display_campaign">
                              {({ input, meta }) => (
                                <>
                                  <div className="mt-1 flex">
                                    <input
                                      type="checkbox"
                                      {...input}
                                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-400 rounded"
                                    />
                                    <label className="ml-3 block text-sm font-medium text-gray-700">
                                      Display campaign
                                    </label>
                                  </div>
                                </>
                              )}
                            </Field>
                          </div>

                          {/* HIGHIMPACT_CAMPAIGN */}
                          <div className="sm:col-span-3">
                            <Field name="highImpact_campaign">
                              {({ input, meta }) => (
                                <>
                                  <div className="mt-1 flex">
                                    <input
                                      type="checkbox"
                                      {...input}
                                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-400 rounded"
                                    />
                                    <label className="ml-3 block text-sm font-medium text-gray-700">
                                      High impact campaign
                                    </label>
                                  </div>
                                </>
                              )}
                            </Field>
                          </div>

                          {/* NATIVE_CAMPAIGN */}
                          <div className="sm:col-span-3">
                            <Field name="native_campaign">
                              {({ input, meta }) => (
                                <>
                                  <div className="mt-1 flex">
                                    <input
                                      type="checkbox"
                                      {...input}
                                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-400 rounded"
                                    />
                                    <label className="ml-3 block text-sm font-medium text-gray-700">
                                      Native campaign
                                    </label>
                                  </div>
                                </>
                              )}
                            </Field>
                          </div>

                          {/* POP_CAMPAIGN */}
                          <div className="sm:col-span-3">
                            <Field name="pop_campaign">
                              {({ input, meta }) => (
                                <>
                                  <div className="mt-1 flex">
                                    <input
                                      type="checkbox"
                                      {...input}
                                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-400 rounded"
                                    />
                                    <label className="ml-3 block text-sm font-medium text-gray-700">
                                      Pop campaign
                                    </label>
                                  </div>
                                </>
                              )}
                            </Field>
                          </div>

                          {/* PUSH_CAMPAIGN */}
                          <div className="sm:col-span-3">
                            <Field name="push_campaign">
                              {({ input, meta }) => (
                                <>
                                  <div className="mt-1 flex">
                                    <input
                                      type="checkbox"
                                      {...input}
                                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-400 rounded"
                                    />
                                    <label className="ml-3 block text-sm font-medium text-gray-700">
                                      Push campaign
                                    </label>
                                  </div>
                                </>
                              )}
                            </Field>
                          </div>

                          {/* SEARCH_CAMPAIGN */}
                          <div className="sm:col-span-3">
                            <Field name="search_campaign">
                              {({ input, meta }) => (
                                <>
                                  <div className="mt-1 flex">
                                    <input
                                      type="checkbox"
                                      {...input}
                                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-400 rounded"
                                    />
                                    <label className="ml-3 block text-sm font-medium text-gray-700">
                                      Search campaign
                                    </label>
                                  </div>
                                </>
                              )}
                            </Field>
                          </div>

                          {/* SOCIAL_CAMPAIGN */}
                          <div className="sm:col-span-3">
                            <Field name="social_campaign">
                              {({ input, meta }) => (
                                <>
                                  <div className="mt-1 flex">
                                    <input
                                      type="checkbox"
                                      {...input}
                                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-400 rounded"
                                    />
                                    <label className="ml-3 block text-sm font-medium text-gray-700">
                                      Social campaign
                                    </label>
                                  </div>
                                </>
                              )}
                            </Field>
                          </div>

                          {/* RICHMEDIA_CAMPAIGN */}
                          <div className="sm:col-span-3">
                            <Field name="richMedia_campaign">
                              {({ input, meta }) => (
                                <>
                                  <div className="mt-1 flex">
                                    <input
                                      type="checkbox"
                                      {...input}
                                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-400 rounded"
                                    />
                                    <label className="ml-3 block text-sm font-medium text-gray-700">
                                      Rich media campaign
                                    </label>
                                  </div>
                                </>
                              )}
                            </Field>
                          </div>

                          {/* VIDEO_CAMPAIGN */}
                          <div className="sm:col-span-3">
                            <Field name="video_campaign">
                              {({ input, meta }) => (
                                <>
                                  <div className="mt-1 flex">
                                    <input
                                      type="checkbox"
                                      {...input}
                                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-400 rounded"
                                    />
                                    <label className="ml-3 block text-sm font-medium text-gray-700">
                                      Video campaign
                                    </label>
                                  </div>
                                </>
                              )}
                            </Field>
                          </div>
                        </div>
                        <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                          {/* PLATFORMS */}
                          <div className="sm:col-span-3">
                            <label className="block text-sm font-medium text-gray-700">
                              Platforms
                            </label>
                            <Field
                              name="platforms"
                              validate={composeValidators(required)}
                              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            >
                              {({ input, meta }) => (
                                <>
                                  <div className="mt-1">
                                    <ReactSelectAdapter
                                      {...input}
                                      options={platformOptionsObject}
                                      isMulti
                                    />
                                    {(meta.error || meta.submitError) &&
                                      meta.touched && (
                                        <span className="text-red-500">
                                          {meta.error || meta.submitError}
                                        </span>
                                      )}
                                  </div>
                                </>
                              )}
                            </Field>
                          </div>

                          {/* ADD_COMM_TYPE */}
                          <div className="sm:col-span-3">
                            <label className="block text-sm font-medium text-gray-700">
                              Add comm type
                            </label>
                            <Field
                              name="add_comm_type"
                              component="select"
                              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            >
                              <option />
                              <option>Revenue</option>
                              <option>Cost</option>
                            </Field>
                          </div>

                          {/* ADD_COMM_VALUE */}
                          <div className="sm:col-span-3">
                            <label className="block text-sm font-medium text-gray-700">
                              Add comm value
                            </label>
                            <Field name="add_comm_value" parse={parse}>
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

                          {/* BO_UPLOAD */}
                          <div className="sm:col-span-3">
                            <label
                              htmlFor="cover_photo"
                              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                            >
                              BO File
                            </label>
                            <div className="mt-1 sm:mt-0 sm:col-span-2">
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
                                      className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                    >
                                      {/* <span>Upload a file</span> */}
                                      <Field
                                        name="BO_file"
                                        component={Dropzone}
                                      />
                                    </label>
                                  </div>
                                  <p className="text-xs text-gray-500">
                                    PDF XLS or DOC
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* INSTRUCTIONS */}
                          <div className="sm:col-span-3">
                            <label className="block text-sm font-medium text-gray-700">
                              Instructions
                            </label>
                            <Field name="instructions">
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

                          {/* DELIVERY_COMMENTS */}
                          <div className="sm:col-span-3">
                            <label className="block text-sm font-medium text-gray-700">
                              Delivery comments
                            </label>
                            <Field name="delivery_comments">
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

                          {/* STATUS */}
                          <div className="sm:col-span-3">
                            <label className="block text-sm font-medium text-gray-700">
                              Status
                            </label>
                            <Field
                              name="status"
                              component="select"
                              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            >
                              <option />
                              <option>In Progress</option>
                              <option>Paused</option>
                              <option>Completed Success</option>
                              <option>Completed Part Fail</option>
                            </Field>
                          </div>

                          {/* END */}
                        </div>
                      </div>
                    </div>

                    <Condition when="video_campaign" is={true}>
                      {/* VIDEO */}
                      <div className="bg-gray-50 p-6 border border-gray-300">
                        <h3 className="text-lg font-medium mb-4 text-gray-500">
                          Video
                        </h3>
                        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                          {/* VIDEO_STARTDATE */}
                          <div className="sm:col-span-3">
                            <label className="block text-sm font-medium text-gray-700">
                              Video start date
                            </label>
                            <Field name="video_startDate">
                              {({ input, meta }) => (
                                <>
                                  <div className="mt-1">
                                    <input
                                      type="date"
                                      {...input}
                                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    />
                                  </div>
                                </>
                              )}
                            </Field>
                          </div>

                          {/* VIDEO_ENDDATE */}
                          <div className="sm:col-span-3">
                            <label className="block text-sm font-medium text-gray-700">
                              Video end date
                            </label>
                            <Field name="video_endDate">
                              {({ input, meta }) => (
                                <>
                                  <div className="mt-1">
                                    <input
                                      type="date"
                                      {...input}
                                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    />
                                  </div>
                                </>
                              )}
                            </Field>
                          </div>

                          {/* VIDEO_UNITRATE */}
                          <div className="sm:col-span-3">
                            <label className="block text-sm font-medium text-gray-700">
                              Video unit rate
                            </label>
                            <Field name="video_unitRate" parse={parse}>
                              {({ input, meta }) => (
                                <>
                                  <div className="mt-1">
                                    <input
                                      type="number"
                                      {...input}
                                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    />
                                  </div>
                                </>
                              )}
                            </Field>
                          </div>

                          {/* VIDEO_GOAL */}
                          <div className="sm:col-span-3">
                            <label className="block text-sm font-medium text-gray-700">
                              Video goal
                            </label>
                            <Field name="video_goal" parse={parse}>
                              {({ input, meta }) => (
                                <>
                                  <div className="mt-1">
                                    <input
                                      type="number"
                                      {...input}
                                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    />
                                  </div>
                                </>
                              )}
                            </Field>
                          </div>

                          {/* VIDEO_BUDGET */}
                          <div className="sm:col-span-3">
                            <label className="block text-sm font-medium text-gray-700">
                              Video budget
                            </label>
                            <Field name="video_budget" parse={parse}>
                              {({ input, meta }) => (
                                <>
                                  <div className="mt-1">
                                    <input
                                      type="number"
                                      {...input}
                                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    />
                                  </div>
                                </>
                              )}
                            </Field>
                          </div>

                          {/* VIDEO_REVTYPE */}
                          <div className="sm:col-span-3">
                            <label className="block text-sm font-medium text-gray-700">
                              Video rev type
                            </label>
                            <Field
                              name="video_revType"
                              component="select"
                              className="shadow-sm mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            >
                              <option />
                              <option>CPM</option>
                              <option>CPC</option>
                              <option>CPCV</option>
                              <option>CPVIEW</option>
                              <option>CPVISIT</option>
                              <option>CPL</option>
                              <option>CPA</option>
                              <option>CPI</option>
                              <option>CPS</option>
                            </Field>
                          </div>

                          {/* VIDEO END */}
                        </div>
                      </div>
                    </Condition>
                    <Condition when="display_campaign" is={true}>
                      {/* DISPLAY */}
                      <div className="bg-gray-50 p-6 border border-gray-300">
                        <h3 className="text-lg font-medium mb-4 text-gray-500">
                          Display
                        </h3>
                        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                          {/* DISPLAY_STARTDATE */}
                          <div className="sm:col-span-3">
                            <label className="block text-sm font-medium text-gray-700">
                              Display start date
                            </label>
                            <Field name="display_startDate">
                              {({ input, meta }) => (
                                <>
                                  <div className="mt-1">
                                    <input
                                      type="date"
                                      {...input}
                                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    />
                                  </div>
                                </>
                              )}
                            </Field>
                          </div>

                          {/* DISPLAY_ENDDATE */}
                          <div className="sm:col-span-3">
                            <label className="block text-sm font-medium text-gray-700">
                              Display end date
                            </label>
                            <Field name="display_endDate">
                              {({ input, meta }) => (
                                <>
                                  <div className="mt-1">
                                    <input
                                      type="date"
                                      {...input}
                                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    />
                                  </div>
                                </>
                              )}
                            </Field>
                          </div>

                          {/* DISPLAY_UNITRATE */}
                          <div className="sm:col-span-3">
                            <label className="block text-sm font-medium text-gray-700">
                              Display unit rate
                            </label>
                            <Field name="display_unitRate" parse={parse}>
                              {({ input, meta }) => (
                                <>
                                  <div className="mt-1">
                                    <input
                                      type="number"
                                      {...input}
                                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    />
                                  </div>
                                </>
                              )}
                            </Field>
                          </div>

                          {/* DISPLAY_GOAL */}
                          <div className="sm:col-span-3">
                            <label className="block text-sm font-medium text-gray-700">
                              Display goal
                            </label>
                            <Field name="display_goal" parse={parse}>
                              {({ input, meta }) => (
                                <>
                                  <div className="mt-1">
                                    <input
                                      type="number"
                                      {...input}
                                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    />
                                  </div>
                                </>
                              )}
                            </Field>
                          </div>

                          {/* DISPLAY_BUDGET */}
                          <div className="sm:col-span-3">
                            <label className="block text-sm font-medium text-gray-700">
                              Display budget
                            </label>
                            <Field name="display_budget" parse={parse}>
                              {({ input, meta }) => (
                                <>
                                  <div className="mt-1">
                                    <input
                                      type="number"
                                      {...input}
                                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    />
                                  </div>
                                </>
                              )}
                            </Field>
                          </div>

                          {/* DISPLAY_REVTYPE */}
                          <div className="sm:col-span-3">
                            <label className="block text-sm font-medium text-gray-700">
                              Display rev type
                            </label>
                            <Field
                              name="display_revType"
                              component="select"
                              className="shadow-sm mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            >
                              <option />
                              <option>CPM</option>
                              <option>CPC</option>
                              <option>CPCV</option>
                              <option>CPVIEW</option>
                              <option>CPVISIT</option>
                              <option>CPL</option>
                              <option>CPA</option>
                              <option>CPI</option>
                              <option>CPS</option>
                            </Field>
                          </div>

                          {/* DISPLAY END */}
                        </div>
                      </div>
                    </Condition>
                    <Condition when="native_campaign" is={true}>
                      {/* NATIVE */}
                      <div className="bg-gray-50 p-6 border border-gray-300">
                        <h3 className="text-lg font-medium mb-4 text-gray-500">
                          Native
                        </h3>
                        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                          {/* NATIVE_STARTDATE */}
                          <div className="sm:col-span-3">
                            <label className="block text-sm font-medium text-gray-700">
                              Native start date
                            </label>
                            <Field name="native_startDate">
                              {({ input, meta }) => (
                                <>
                                  <div className="mt-1">
                                    <input
                                      type="date"
                                      {...input}
                                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    />
                                  </div>
                                </>
                              )}
                            </Field>
                          </div>

                          {/* NATIVE_ENDDATE */}
                          <div className="sm:col-span-3">
                            <label className="block text-sm font-medium text-gray-700">
                              Native end date
                            </label>
                            <Field name="native_endDate">
                              {({ input, meta }) => (
                                <>
                                  <div className="mt-1">
                                    <input
                                      type="date"
                                      {...input}
                                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    />
                                  </div>
                                </>
                              )}
                            </Field>
                          </div>

                          {/* NATIVE_UNITRATE */}
                          <div className="sm:col-span-3">
                            <label className="block text-sm font-medium text-gray-700">
                              Native unit rate
                            </label>
                            <Field name="native_unitRate" parse={parse}>
                              {({ input, meta }) => (
                                <>
                                  <div className="mt-1">
                                    <input
                                      type="number"
                                      {...input}
                                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    />
                                  </div>
                                </>
                              )}
                            </Field>
                          </div>

                          {/* NATIVE_GOAL */}
                          <div className="sm:col-span-3">
                            <label className="block text-sm font-medium text-gray-700">
                              Native goal
                            </label>
                            <Field name="native_goal" parse={parse}>
                              {({ input, meta }) => (
                                <>
                                  <div className="mt-1">
                                    <input
                                      type="number"
                                      {...input}
                                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    />
                                  </div>
                                </>
                              )}
                            </Field>
                          </div>

                          {/* NATIVE_BUDGET */}
                          <div className="sm:col-span-3">
                            <label className="block text-sm font-medium text-gray-700">
                              Native budget
                            </label>
                            <Field name="native_budget" parse={parse}>
                              {({ input, meta }) => (
                                <>
                                  <div className="mt-1">
                                    <input
                                      type="number"
                                      {...input}
                                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    />
                                  </div>
                                </>
                              )}
                            </Field>
                          </div>

                          {/* NATIVE_REVTYPE */}
                          <div className="sm:col-span-3">
                            <label className="block text-sm font-medium text-gray-700">
                              Native rev type
                            </label>
                            <Field
                              name="native_revType"
                              component="select"
                              className="shadow-sm mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            >
                              <option />
                              <option>CPM</option>
                              <option>CPC</option>
                              <option>CPCV</option>
                              <option>CPVIEW</option>
                              <option>CPVISIT</option>
                              <option>CPL</option>
                              <option>CPA</option>
                              <option>CPI</option>
                              <option>CPS</option>
                            </Field>
                          </div>

                          {/* NATIVE END */}
                        </div>
                      </div>
                    </Condition>
                    <Condition when="search_campaign" is={true}>
                      {/* SEARCH */}
                      <div className="bg-gray-50 p-6 border border-gray-300">
                        <h3 className="text-lg font-medium mb-4 text-gray-500">
                          Search
                        </h3>
                        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                          {/* SEARCH_STARTDATE */}
                          <div className="sm:col-span-3">
                            <label className="block text-sm font-medium text-gray-700">
                              Search start date
                            </label>
                            <Field name="search_startDate">
                              {({ input, meta }) => (
                                <>
                                  <div className="mt-1">
                                    <input
                                      type="date"
                                      {...input}
                                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    />
                                  </div>
                                </>
                              )}
                            </Field>
                          </div>

                          {/* SEARCH_ENDDATE */}
                          <div className="sm:col-span-3">
                            <label className="block text-sm font-medium text-gray-700">
                              Search end date
                            </label>
                            <Field name="search_endDate">
                              {({ input, meta }) => (
                                <>
                                  <div className="mt-1">
                                    <input
                                      type="date"
                                      {...input}
                                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    />
                                  </div>
                                </>
                              )}
                            </Field>
                          </div>

                          {/* SEARCH_UNITRATE */}
                          <div className="sm:col-span-3">
                            <label className="block text-sm font-medium text-gray-700">
                              Search unit rate
                            </label>
                            <Field name="search_unitRate" parse={parse}>
                              {({ input, meta }) => (
                                <>
                                  <div className="mt-1">
                                    <input
                                      type="number"
                                      {...input}
                                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    />
                                  </div>
                                </>
                              )}
                            </Field>
                          </div>

                          {/* SEARCH_GOAL */}
                          <div className="sm:col-span-3">
                            <label className="block text-sm font-medium text-gray-700">
                              Search goal
                            </label>
                            <Field name="search_goal" parse={parse}>
                              {({ input, meta }) => (
                                <>
                                  <div className="mt-1">
                                    <input
                                      type="number"
                                      {...input}
                                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    />
                                  </div>
                                </>
                              )}
                            </Field>
                          </div>

                          {/* SEARCH_BUDGET */}
                          <div className="sm:col-span-3">
                            <label className="block text-sm font-medium text-gray-700">
                              Search budget
                            </label>
                            <Field name="search_budget" parse={parse}>
                              {({ input, meta }) => (
                                <>
                                  <div className="mt-1">
                                    <input
                                      type="number"
                                      {...input}
                                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    />
                                  </div>
                                </>
                              )}
                            </Field>
                          </div>

                          {/* SEARCH_REVTYPE */}
                          <div className="sm:col-span-3">
                            <label className="block text-sm font-medium text-gray-700">
                              Search rev type
                            </label>
                            <Field
                              name="search_revType"
                              component="select"
                              className="shadow-sm mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            >
                              <option />
                              <option>CPM</option>
                              <option>CPC</option>
                              <option>CPCV</option>
                              <option>CPVIEW</option>
                              <option>CPVISIT</option>
                              <option>CPL</option>
                              <option>CPA</option>
                              <option>CPI</option>
                              <option>CPS</option>
                            </Field>
                          </div>

                          {/* SEARCH END */}
                        </div>
                      </div>
                    </Condition>
                    <Condition when="social_campaign" is={true}>
                      {/* SOCIAL */}
                      <div className="bg-gray-50 p-6 border border-gray-300">
                        <h3 className="text-lg font-medium mb-4 text-gray-500">
                          Social
                        </h3>
                        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                          {/* SOCIAL_STARTDATE */}
                          <div className="sm:col-span-3">
                            <label className="block text-sm font-medium text-gray-700">
                              Social start date
                            </label>
                            <Field name="social_startDate">
                              {({ input, meta }) => (
                                <>
                                  <div className="mt-1">
                                    <input
                                      type="date"
                                      {...input}
                                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    />
                                  </div>
                                </>
                              )}
                            </Field>
                          </div>

                          {/* SOCIAL_ENDDATE */}
                          <div className="sm:col-span-3">
                            <label className="block text-sm font-medium text-gray-700">
                              Social end date
                            </label>
                            <Field name="social_endDate">
                              {({ input, meta }) => (
                                <>
                                  <div className="mt-1">
                                    <input
                                      type="date"
                                      {...input}
                                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    />
                                  </div>
                                </>
                              )}
                            </Field>
                          </div>

                          {/* SOCIAL_UNITRATE */}
                          <div className="sm:col-span-3">
                            <label className="block text-sm font-medium text-gray-700">
                              Social unit rate
                            </label>
                            <Field name="social_unitRate" parse={parse}>
                              {({ input, meta }) => (
                                <>
                                  <div className="mt-1">
                                    <input
                                      type="number"
                                      {...input}
                                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    />
                                  </div>
                                </>
                              )}
                            </Field>
                          </div>

                          {/* SOCIAL_GOAL */}
                          <div className="sm:col-span-3">
                            <label className="block text-sm font-medium text-gray-700">
                              Social goal
                            </label>
                            <Field name="social_goal" parse={parse}>
                              {({ input, meta }) => (
                                <>
                                  <div className="mt-1">
                                    <input
                                      type="number"
                                      {...input}
                                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    />
                                  </div>
                                </>
                              )}
                            </Field>
                          </div>

                          {/* SOCIAL_BUDGET */}
                          <div className="sm:col-span-3">
                            <label className="block text-sm font-medium text-gray-700">
                              Social budget
                            </label>
                            <Field name="social_budget" parse={parse}>
                              {({ input, meta }) => (
                                <>
                                  <div className="mt-1">
                                    <input
                                      type="number"
                                      {...input}
                                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    />
                                  </div>
                                </>
                              )}
                            </Field>
                          </div>

                          {/* SOCIAL_REVTYPE */}
                          <div className="sm:col-span-3">
                            <label className="block text-sm font-medium text-gray-700">
                              Social rev type
                            </label>
                            <Field
                              name="social_revType"
                              component="select"
                              className="shadow-sm mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            >
                              <option />
                              <option>CPM</option>
                              <option>CPC</option>
                              <option>CPCV</option>
                              <option>CPVIEW</option>
                              <option>CPVISIT</option>
                              <option>CPL</option>
                              <option>CPA</option>
                              <option>CPI</option>
                              <option>CPS</option>
                            </Field>
                          </div>

                          {/* SOCIAL END */}
                        </div>
                      </div>
                    </Condition>
                    <Condition when="highImpact_campaign" is={true}>
                      {/* HIGHIMPACT */}
                      <div className="bg-gray-50 p-6 border border-gray-300">
                        <h3 className="text-lg font-medium mb-4 text-gray-500">
                          HighImpact
                        </h3>
                        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                          {/* HIGHIMPACT_STARTDATE */}
                          <div className="sm:col-span-3">
                            <label className="block text-sm font-medium text-gray-700">
                              HighImpact start date
                            </label>
                            <Field name="highImpact_startDate">
                              {({ input, meta }) => (
                                <>
                                  <div className="mt-1">
                                    <input
                                      type="date"
                                      {...input}
                                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    />
                                  </div>
                                </>
                              )}
                            </Field>
                          </div>

                          {/* HIGHIMPACT_ENDDATE */}
                          <div className="sm:col-span-3">
                            <label className="block text-sm font-medium text-gray-700">
                              HighImpact end date
                            </label>
                            <Field name="highImpact_endDate">
                              {({ input, meta }) => (
                                <>
                                  <div className="mt-1">
                                    <input
                                      type="date"
                                      {...input}
                                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    />
                                  </div>
                                </>
                              )}
                            </Field>
                          </div>

                          {/* HIGHIMPACT_UNITRATE */}
                          <div className="sm:col-span-3">
                            <label className="block text-sm font-medium text-gray-700">
                              HighImpact unit rate
                            </label>
                            <Field name="highImpact_unitRate" parse={parse}>
                              {({ input, meta }) => (
                                <>
                                  <div className="mt-1">
                                    <input
                                      type="number"
                                      {...input}
                                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    />
                                  </div>
                                </>
                              )}
                            </Field>
                          </div>

                          {/* HIGHIMPACT_GOAL */}
                          <div className="sm:col-span-3">
                            <label className="block text-sm font-medium text-gray-700">
                              HighImpact goal
                            </label>
                            <Field name="highImpact_goal" parse={parse}>
                              {({ input, meta }) => (
                                <>
                                  <div className="mt-1">
                                    <input
                                      type="number"
                                      {...input}
                                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    />
                                  </div>
                                </>
                              )}
                            </Field>
                          </div>

                          {/* HIGHIMPACT_BUDGET */}
                          <div className="sm:col-span-3">
                            <label className="block text-sm font-medium text-gray-700">
                              HighImpact budget
                            </label>
                            <Field name="highImpact_budget" parse={parse}>
                              {({ input, meta }) => (
                                <>
                                  <div className="mt-1">
                                    <input
                                      type="number"
                                      {...input}
                                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    />
                                  </div>
                                </>
                              )}
                            </Field>
                          </div>

                          {/* HIGHIMPACT_REVTYPE */}
                          <div className="sm:col-span-3">
                            <label className="block text-sm font-medium text-gray-700">
                              HighImpact rev type
                            </label>
                            <Field
                              name="highImpact_revType"
                              component="select"
                              className="shadow-sm mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            >
                              <option />
                              <option>CPM</option>
                              <option>CPC</option>
                              <option>CPCV</option>
                              <option>CPVIEW</option>
                              <option>CPVISIT</option>
                              <option>CPL</option>
                              <option>CPA</option>
                              <option>CPI</option>
                              <option>CPS</option>
                            </Field>
                          </div>

                          {/* HIGHIMPACT END */}
                        </div>
                      </div>
                    </Condition>
                    <Condition when="richMedia_campaign" is={true}>
                      {/* RICHMEDIA */}
                      <div className="bg-gray-50 p-6 border border-gray-300">
                        <h3 className="text-lg font-medium mb-4 text-gray-500">
                          RichMedia
                        </h3>
                        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                          {/* RICHMEDIA_STARTDATE */}
                          <div className="sm:col-span-3">
                            <label className="block text-sm font-medium text-gray-700">
                              RichMedia start date
                            </label>
                            <Field name="richMedia_startDate">
                              {({ input, meta }) => (
                                <>
                                  <div className="mt-1">
                                    <input
                                      type="date"
                                      {...input}
                                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    />
                                  </div>
                                </>
                              )}
                            </Field>
                          </div>

                          {/* RICHMEDIA_ENDDATE */}
                          <div className="sm:col-span-3">
                            <label className="block text-sm font-medium text-gray-700">
                              RichMedia end date
                            </label>
                            <Field name="richMedia_endDate">
                              {({ input, meta }) => (
                                <>
                                  <div className="mt-1">
                                    <input
                                      type="date"
                                      {...input}
                                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    />
                                  </div>
                                </>
                              )}
                            </Field>
                          </div>

                          {/* RICHMEDIA_UNITRATE */}
                          <div className="sm:col-span-3">
                            <label className="block text-sm font-medium text-gray-700">
                              RichMedia unit rate
                            </label>
                            <Field name="richMedia_unitRate" parse={parse}>
                              {({ input, meta }) => (
                                <>
                                  <div className="mt-1">
                                    <input
                                      type="number"
                                      {...input}
                                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    />
                                  </div>
                                </>
                              )}
                            </Field>
                          </div>

                          {/* RICHMEDIA_GOAL */}
                          <div className="sm:col-span-3">
                            <label className="block text-sm font-medium text-gray-700">
                              RichMedia goal
                            </label>
                            <Field name="richMedia_goal" parse={parse}>
                              {({ input, meta }) => (
                                <>
                                  <div className="mt-1">
                                    <input
                                      type="number"
                                      {...input}
                                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    />
                                  </div>
                                </>
                              )}
                            </Field>
                          </div>

                          {/* RICHMEDIA_BUDGET */}
                          <div className="sm:col-span-3">
                            <label className="block text-sm font-medium text-gray-700">
                              RichMedia budget
                            </label>
                            <Field name="richMedia_budget" parse={parse}>
                              {({ input, meta }) => (
                                <>
                                  <div className="mt-1">
                                    <input
                                      type="number"
                                      {...input}
                                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    />
                                  </div>
                                </>
                              )}
                            </Field>
                          </div>

                          {/* RICHMEDIA_REVTYPE */}
                          <div className="sm:col-span-3">
                            <label className="block text-sm font-medium text-gray-700">
                              RichMedia rev type
                            </label>
                            <Field
                              name="richMedia_revType"
                              component="select"
                              className="shadow-sm mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            >
                              <option />
                              <option>CPM</option>
                              <option>CPC</option>
                              <option>CPCV</option>
                              <option>CPVIEW</option>
                              <option>CPVISIT</option>
                              <option>CPL</option>
                              <option>CPA</option>
                              <option>CPI</option>
                              <option>CPS</option>
                            </Field>
                          </div>

                          {/* RICHMEDIA END */}
                        </div>
                      </div>
                    </Condition>
                    <Condition when="pop_campaign" is={true}>
                      {/* POP */}
                      <div className="bg-gray-50 p-6 border border-gray-300">
                        <h3 className="text-lg font-medium mb-4 text-gray-500">
                          Pop
                        </h3>
                        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                          {/* POP_STARTDATE */}
                          <div className="sm:col-span-3">
                            <label className="block text-sm font-medium text-gray-700">
                              Pop start date
                            </label>
                            <Field name="pop_startDate">
                              {({ input, meta }) => (
                                <>
                                  <div className="mt-1">
                                    <input
                                      type="date"
                                      {...input}
                                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    />
                                  </div>
                                </>
                              )}
                            </Field>
                          </div>

                          {/* POP_ENDDATE */}
                          <div className="sm:col-span-3">
                            <label className="block text-sm font-medium text-gray-700">
                              Pop end date
                            </label>
                            <Field name="pop_endDate">
                              {({ input, meta }) => (
                                <>
                                  <div className="mt-1">
                                    <input
                                      type="date"
                                      {...input}
                                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    />
                                  </div>
                                </>
                              )}
                            </Field>
                          </div>

                          {/* POP_UNITRATE */}
                          <div className="sm:col-span-3">
                            <label className="block text-sm font-medium text-gray-700">
                              Pop unit rate
                            </label>
                            <Field name="pop_unitRate" parse={parse}>
                              {({ input, meta }) => (
                                <>
                                  <div className="mt-1">
                                    <input
                                      type="number"
                                      {...input}
                                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    />
                                  </div>
                                </>
                              )}
                            </Field>
                          </div>

                          {/* POP_GOAL */}
                          <div className="sm:col-span-3">
                            <label className="block text-sm font-medium text-gray-700">
                              Pop goal
                            </label>
                            <Field name="pop_goal" parse={parse}>
                              {({ input, meta }) => (
                                <>
                                  <div className="mt-1">
                                    <input
                                      type="number"
                                      {...input}
                                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    />
                                  </div>
                                </>
                              )}
                            </Field>
                          </div>

                          {/* POP_BUDGET */}
                          <div className="sm:col-span-3">
                            <label className="block text-sm font-medium text-gray-700">
                              Pop budget
                            </label>
                            <Field name="pop_budget" parse={parse}>
                              {({ input, meta }) => (
                                <>
                                  <div className="mt-1">
                                    <input
                                      type="number"
                                      {...input}
                                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    />
                                  </div>
                                </>
                              )}
                            </Field>
                          </div>

                          {/* POP_REVTYPE */}
                          <div className="sm:col-span-3">
                            <label className="block text-sm font-medium text-gray-700">
                              Pop rev type
                            </label>
                            <Field
                              name="pop_revType"
                              component="select"
                              className="shadow-sm mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            >
                              <option />
                              <option>CPM</option>
                              <option>CPC</option>
                              <option>CPCV</option>
                              <option>CPVIEW</option>
                              <option>CPVISIT</option>
                              <option>CPL</option>
                              <option>CPA</option>
                              <option>CPI</option>
                              <option>CPS</option>
                            </Field>
                          </div>

                          {/* POP END */}
                        </div>
                      </div>
                    </Condition>
                    <Condition when="push_campaign" is={true}>
                      {/* PUSH */}
                      <div className="bg-gray-50 p-6 border border-gray-300">
                        <h3 className="text-lg font-medium mb-4 text-gray-500">
                          Push
                        </h3>
                        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                          {/* PUSH_STARTDATE */}
                          <div className="sm:col-span-3">
                            <label className="block text-sm font-medium text-gray-700">
                              Push start date
                            </label>
                            <Field name="push_startDate">
                              {({ input, meta }) => (
                                <>
                                  <div className="mt-1">
                                    <input
                                      type="date"
                                      {...input}
                                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    />
                                  </div>
                                </>
                              )}
                            </Field>
                          </div>

                          {/* PUSH_ENDDATE */}
                          <div className="sm:col-span-3">
                            <label className="block text-sm font-medium text-gray-700">
                              Push end date
                            </label>
                            <Field name="push_endDate">
                              {({ input, meta }) => (
                                <>
                                  <div className="mt-1">
                                    <input
                                      type="date"
                                      {...input}
                                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    />
                                  </div>
                                </>
                              )}
                            </Field>
                          </div>

                          {/* PUSH_UNITRATE */}
                          <div className="sm:col-span-3">
                            <label className="block text-sm font-medium text-gray-700">
                              Push unit rate
                            </label>
                            <Field name="push_unitRate" parse={parse}>
                              {({ input, meta }) => (
                                <>
                                  <div className="mt-1">
                                    <input
                                      type="number"
                                      {...input}
                                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    />
                                  </div>
                                </>
                              )}
                            </Field>
                          </div>

                          {/* PUSH_GOAL */}
                          <div className="sm:col-span-3">
                            <label className="block text-sm font-medium text-gray-700">
                              Push goal
                            </label>
                            <Field name="push_goal" parse={parse}>
                              {({ input, meta }) => (
                                <>
                                  <div className="mt-1">
                                    <input
                                      type="number"
                                      {...input}
                                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    />
                                  </div>
                                </>
                              )}
                            </Field>
                          </div>

                          {/* PUSH_BUDGET */}
                          <div className="sm:col-span-3">
                            <label className="block text-sm font-medium text-gray-700">
                              Push budget
                            </label>
                            <Field name="push_budget" parse={parse}>
                              {({ input, meta }) => (
                                <>
                                  <div className="mt-1">
                                    <input
                                      type="number"
                                      {...input}
                                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    />
                                  </div>
                                </>
                              )}
                            </Field>
                          </div>

                          {/* PUSH_REVTYPE */}
                          <div className="sm:col-span-3">
                            <label className="block text-sm font-medium text-gray-700">
                              Push rev type
                            </label>
                            <Field
                              name="push_revType"
                              component="select"
                              className="shadow-sm mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            >
                              <option />
                              <option>CPM</option>
                              <option>CPC</option>
                              <option>CPCV</option>
                              <option>CPVIEW</option>
                              <option>CPVISIT</option>
                              <option>CPL</option>
                              <option>CPA</option>
                              <option>CPI</option>
                              <option>CPS</option>
                            </Field>
                          </div>

                          {/* PUSH END */}
                        </div>
                      </div>
                    </Condition>

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
                          {isSubmitting == true ? (
                            <>
                              <svg
                                class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  class="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  stroke-width="4"
                                ></circle>
                                <path
                                  class="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                              </svg>
                              Submitting form and uploading BO
                            </>
                          ) : (
                            <>Save</>
                          )}
                        </button>
                      </div>
                    </div>
                  </form>
                )}
              />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
