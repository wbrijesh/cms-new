import { useState, Fragment } from "react";
import { Switch } from "@headlessui/react";
import Link from "next/link";
import { Auth } from "aws-amplify";
import moment from "moment";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/solid";

import {
  BriefcaseIcon,
  HomeIcon,
  DocumentReportIcon,
  MenuAlt2Icon,
  UserAddIcon,
} from "@heroicons/react/outline";

const navigation = [
  { name: "Home", href: "/", icon: HomeIcon, current: false },
  { name: "Clients", href: "/clients", icon: BriefcaseIcon, current: false },
  {
    name: "Campaigns",
    href: "/campaigns",
    icon: DocumentReportIcon,
    current: true,
  },
  { name: "Sales", href: "/sales-team", icon: UserAddIcon, current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const publishingOptions = [
  {
    title: "This Month",
    date: moment().subtract(1, "months").format("YYYY-MM-DD"),
    slug: "created this month: ",
    current: false,
  },
  {
    title: "This Quarter",
    date: moment().subtract(3, "months").format("YYYY-MM-DD"),
    slug: "created this quarter: ",
    current: false,
  },
  {
    title: "This Year",
    date: moment().subtract(12, "months").format("YYYY-MM-DD"),
    slug: "created this year: ",
    current: true,
  },
  {
    title: "Show All",
    date: moment().subtract(9999999, "months").format("YYYY-MM-DD"),
    slug: "created this anytime: ",
    current: true,
  },
];

const people = [
  {
    name: "Jane Cooper",
    title: "Regional Paradigm Technician",
    role: "Admin",
    email: "jane.cooper@example.com",
  },
  // More people...
];

export default function Content({
  setNavigation,
  setSidebarOpen,
  campaignList,
}) {
  setNavigation(navigation);

  const [selected, setSelected] = useState({
    title: "This Month",
    date: moment().subtract(1, "months").format("YYYY-MM-DD"),
    slug: "created this month: ",
    current: false,
  });
  const [filteredCampaigns, setFilteredCampaigns] = useState(null);

  var oneYearAgo = moment().subtract(12, "months").format("YYYY-MM-DD");

  async function checkIsAfter() {
    let toFilter = [];
    campaignList.map((campaign) =>
      campaign.date_created > selected.date ? toFilter.push(campaign) : null
    );
    console.log(toFilter);
  }
  checkIsAfter();

  const [permission, setPermission] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [createPermission, setCreatePermission] = useState(null);

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
      setCreatePermission(true);
    } else if (
      thisUser.signInUserSession.accessToken.payload["cognito:groups"][0] ===
      "adops"
    ) {
      console.log("Logged in as adops");
      setPermission(true);
      setCreatePermission(true);
    } else if (
      thisUser.attributes.email === thisCampaign.allowed_sales_manager_email
    ) {
      console.log("email matches");
      setPermission(true);
    } else {
      setPermission(false);
      setCreatePermission(false);
    }
    console.log("user email: ", thisUser.attributes.email);
    console.log(
      "campaign allowed...: ",
      thisCampaign.allowed_sales_manager_email
    );
  };
  verifyAccess();

  return (
    <>
      {
        (campaignList,
        userDetails && (
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
                  <div className="pb-5 border-b border-gray-200 flex items-center justify-between">
                    <h1 className="text-3xl font-semibold text-gray-900">
                      Campaigns
                    </h1>
                    <div className="mt-3 sm:mt-0 sm:ml-4 flex">
                      <Listbox value={selected} onChange={setSelected}>
                        {({ open }) => (
                          <>
                            <Listbox.Label className="sr-only">
                              Change published status
                            </Listbox.Label>
                            <div className="relative">
                              <div className="inline-flex shadow-sm rounded-md divide-x-2 divide-blue-500">
                                <div className="relative border-2 border-blue-500 rounded-md z-0 inline-flex shadow-sm rounded-md divide-x-2 divide-blue-500">
                                  <div className="relative inline-flex items-center bg-gray-50 py-2 pl-3 pr-4 rounded-l-md shadow-sm text-blue-600">
                                    <CheckIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                    <p className="ml-2.5 text-sm font-medium">
                                      {selected.title}
                                    </p>
                                  </div>
                                  <Listbox.Button className="relative inline-flex items-center bg-gray-50 p-2 rounded-l-none rounded-r-md text-sm font-medium text-blue-600 hover:bg-blue-gray-200 focus:outline-none">
                                    <span className="sr-only">
                                      Change published status
                                    </span>
                                    <ChevronDownIcon
                                      className="h-5 w-5 text-blue-600"
                                      aria-hidden="true"
                                    />
                                  </Listbox.Button>
                                </div>
                              </div>

                              <Transition
                                show={open}
                                as={Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                              >
                                <Listbox.Options
                                  static
                                  className="origin-top-right absolute z-10 right-0 mt-2 w-72 rounded-md shadow-lg overflow-hidden bg-white divide-y divide-gray-200 ring-1 ring-black ring-opacity-5 focus:outline-none"
                                >
                                  {publishingOptions.map((option) => (
                                    <Listbox.Option
                                      key={option.title}
                                      className={({ active }) =>
                                        classNames(
                                          active
                                            ? "cursor-copy text-white bg-blue-500"
                                            : "text-gray-900",
                                          "cursor-copy select-none relative p-2.5 pb-1 text-sm"
                                        )
                                      }
                                      value={option}
                                    >
                                      {({ selected, active }) => (
                                        <div className="flex flex-col">
                                          <div className="flex justify-between">
                                            <p
                                              className={
                                                selected
                                                  ? "font-semibold"
                                                  : "font-normal"
                                              }
                                            >
                                              {option.title}
                                            </p>
                                            {selected ? (
                                              <span
                                                className={
                                                  active
                                                    ? "text-white"
                                                    : "text-blue-500"
                                                }
                                              >
                                                <CheckIcon
                                                  className="h-5 w-5"
                                                  aria-hidden="true"
                                                />
                                              </span>
                                            ) : null}
                                          </div>
                                          <p
                                            className={classNames(
                                              active
                                                ? "text-blue-200"
                                                : "text-gray-500",
                                              "mt-2"
                                            )}
                                          >
                                            {option.description}
                                          </p>
                                        </div>
                                      )}
                                    </Listbox.Option>
                                  ))}
                                </Listbox.Options>
                              </Transition>
                            </div>
                          </>
                        )}
                      </Listbox>
                      {createPermission && (
                        <a
                          type="button"
                          href="/campaigns/new"
                          className="ml-2 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          Create new campaign
                        </a>
                      )}
                    </div>
                  </div>
                  <div className="px-4 sm:px-6 md:px-0">
                    <div className="py-6">
                      {/* Description list with inline editing */}
                      <div className="flex flex-col">
                        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                              <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                  <tr>
                                    <th
                                      scope="col"
                                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                      Reference
                                    </th>
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
                                      Client
                                    </th>
                                    <th
                                      scope="col"
                                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                      Type
                                    </th>
                                    <th
                                      scope="col"
                                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                      Revenue
                                    </th>
                                    <th
                                      scope="col"
                                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                      Budget
                                    </th>
                                    <th
                                      scope="col"
                                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                      Modified
                                    </th>
                                    <th
                                      scope="col"
                                      className="relative px-6 py-3"
                                    >
                                      <span className="sr-only">Edit</span>
                                    </th>
                                  </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                  {campaignList.map((campaign) => (
                                    <>
                                      {permission === true ? (
                                        <tr key={campaign.id}>
                                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
                                            {campaign.reference == null ? (
                                              ""
                                            ) : (
                                              <>{campaign.reference}</>
                                            )}
                                          </td>
                                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {campaign.name}
                                          </td>
                                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {campaign.clientName}
                                          </td>
                                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {campaign.video_campaign == true ? (
                                              <>Video, </>
                                            ) : (
                                              <></>
                                            )}
                                            {campaign.display_campaign ==
                                            true ? (
                                              <>Display, </>
                                            ) : (
                                              <></>
                                            )}
                                            {campaign.native_campaign ==
                                            true ? (
                                              <>Native, </>
                                            ) : (
                                              <></>
                                            )}
                                            {campaign.search_campaign ==
                                            true ? (
                                              <>Search, </>
                                            ) : (
                                              <></>
                                            )}
                                            {campaign.social_campaign ==
                                            true ? (
                                              <>Social, </>
                                            ) : (
                                              <></>
                                            )}
                                            {campaign.highImpact_campaign ==
                                            true ? (
                                              <>High impact, </>
                                            ) : (
                                              <></>
                                            )}
                                            {campaign.richMedia_campaign ==
                                            true ? (
                                              <>Rich media, </>
                                            ) : (
                                              <></>
                                            )}
                                            {campaign.pop_campaign == true ? (
                                              <>Pop, </>
                                            ) : (
                                              <></>
                                            )}
                                            {campaign.push_campaign == true ? (
                                              <>Push, </>
                                            ) : (
                                              <></>
                                            )}
                                          </td>
                                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {campaign.video_campaign == true &&
                                            campaign.video_revType !== null &&
                                            campaign.video_revType !== undefined
                                              ? campaign.video_revType + ", "
                                              : ""}
                                            {campaign.display_campaign ==
                                              true &&
                                            campaign.display_revType !== null &&
                                            campaign.display_revType !==
                                              undefined
                                              ? campaign.display_revType + ", "
                                              : ""}
                                            {campaign.native_campaign == true &&
                                            campaign.native_revType !== null &&
                                            campaign.native_revType !==
                                              undefined
                                              ? campaign.native_revType + ", "
                                              : ""}
                                            {campaign.search_campaign == true &&
                                            campaign.search_revType !== null &&
                                            campaign.search_revType !==
                                              undefined
                                              ? campaign.search_revType + ", "
                                              : ""}
                                            {campaign.social_campaign == true &&
                                            campaign.social_revType !== null &&
                                            campaign.social_revType !==
                                              undefined
                                              ? campaign.social_revType + ", "
                                              : ""}
                                            {campaign.highimpact_campaign ==
                                              true &&
                                            campaign.highimpact_revType !==
                                              null &&
                                            campaign.highimpact_revType !==
                                              undefined
                                              ? campaign.highimpact_revType +
                                                ", "
                                              : ""}
                                            {campaign.richmedia_campaign ==
                                              true &&
                                            campaign.richmedia_revType !==
                                              null &&
                                            campaign.richmedia_revType !==
                                              undefined
                                              ? campaign.richmedia_revType +
                                                ", "
                                              : ""}
                                            {campaign.pop_campaign == true &&
                                            campaign.pop_revType !== null &&
                                            campaign.pop_revType !== undefined
                                              ? campaign.pop_revType + ", "
                                              : ""}
                                            {campaign.push_campaign == true &&
                                            campaign.push_revType !== null &&
                                            campaign.push_revType !== undefined
                                              ? campaign.push_revType + ", "
                                              : ""}
                                          </td>
                                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {campaign.video_budget +
                                              campaign.display_budget +
                                              campaign.native_budget +
                                              campaign.search_budget +
                                              campaign.social_budget +
                                              campaign.highImpact_budget +
                                              campaign.richMedia_budget +
                                              campaign.pop_budget +
                                              campaign.push_budget !==
                                              0 &&
                                            campaign.video_budget +
                                              campaign.display_budget +
                                              campaign.native_budget +
                                              campaign.search_budget +
                                              campaign.social_budget +
                                              campaign.highImpact_budget +
                                              campaign.richMedia_budget +
                                              campaign.pop_budget +
                                              campaign.push_budget !==
                                              NaN ? (
                                              <>
                                                $
                                                {(
                                                  campaign.video_budget +
                                                  campaign.display_budget +
                                                  campaign.native_budget +
                                                  campaign.search_budget +
                                                  campaign.social_budget +
                                                  campaign.highImpact_budget +
                                                  campaign.richMedia_budget +
                                                  campaign.pop_budget +
                                                  campaign.push_budget
                                                ).toFixed(2)}
                                              </>
                                            ) : (
                                              <></>
                                            )}
                                          </td>
                                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {campaign.date_modified}
                                          </td>
                                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <Link
                                              href={`/campaigns/${campaign.id}`}
                                            >
                                              <a
                                                type="button"
                                                className="bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                              >
                                                Manage
                                              </a>
                                            </Link>
                                          </td>
                                        </tr>
                                      ) : (
                                        <>
                                          {campaign.allowed_sales_manager_email ===
                                          "brijesh1w@gmail.com" ? (
                                            <>
                                              <tr key={campaign.id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
                                                  {campaign.reference ==
                                                  null ? (
                                                    ""
                                                  ) : (
                                                    <>{campaign.reference}</>
                                                  )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                  {campaign.name}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                  {campaign.clientName}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                  {campaign.video_campaign ==
                                                  true ? (
                                                    <>Video, </>
                                                  ) : (
                                                    <></>
                                                  )}
                                                  {campaign.display_campaign ==
                                                  true ? (
                                                    <>Display, </>
                                                  ) : (
                                                    <></>
                                                  )}
                                                  {campaign.native_campaign ==
                                                  true ? (
                                                    <>Native, </>
                                                  ) : (
                                                    <></>
                                                  )}
                                                  {campaign.search_campaign ==
                                                  true ? (
                                                    <>Search, </>
                                                  ) : (
                                                    <></>
                                                  )}
                                                  {campaign.social_campaign ==
                                                  true ? (
                                                    <>Social, </>
                                                  ) : (
                                                    <></>
                                                  )}
                                                  {campaign.highImpact_campaign ==
                                                  true ? (
                                                    <>High impact, </>
                                                  ) : (
                                                    <></>
                                                  )}
                                                  {campaign.richMedia_campaign ==
                                                  true ? (
                                                    <>Rich media, </>
                                                  ) : (
                                                    <></>
                                                  )}
                                                  {campaign.pop_campaign ==
                                                  true ? (
                                                    <>Pop, </>
                                                  ) : (
                                                    <></>
                                                  )}
                                                  {campaign.push_campaign ==
                                                  true ? (
                                                    <>Push, </>
                                                  ) : (
                                                    <></>
                                                  )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                  {campaign.video_campaign ==
                                                    true &&
                                                  campaign.video_revType !==
                                                    null &&
                                                  campaign.video_revType !==
                                                    undefined
                                                    ? campaign.video_revType +
                                                      ", "
                                                    : ""}
                                                  {campaign.display_campaign ==
                                                    true &&
                                                  campaign.display_revType !==
                                                    null &&
                                                  campaign.display_revType !==
                                                    undefined
                                                    ? campaign.display_revType +
                                                      ", "
                                                    : ""}
                                                  {campaign.native_campaign ==
                                                    true &&
                                                  campaign.native_revType !==
                                                    null &&
                                                  campaign.native_revType !==
                                                    undefined
                                                    ? campaign.native_revType +
                                                      ", "
                                                    : ""}
                                                  {campaign.search_campaign ==
                                                    true &&
                                                  campaign.search_revType !==
                                                    null &&
                                                  campaign.search_revType !==
                                                    undefined
                                                    ? campaign.search_revType +
                                                      ", "
                                                    : ""}
                                                  {campaign.social_campaign ==
                                                    true &&
                                                  campaign.social_revType !==
                                                    null &&
                                                  campaign.social_revType !==
                                                    undefined
                                                    ? campaign.social_revType +
                                                      ", "
                                                    : ""}
                                                  {campaign.highimpact_campaign ==
                                                    true &&
                                                  campaign.highimpact_revType !==
                                                    null &&
                                                  campaign.highimpact_revType !==
                                                    undefined
                                                    ? campaign.highimpact_revType +
                                                      ", "
                                                    : ""}
                                                  {campaign.richmedia_campaign ==
                                                    true &&
                                                  campaign.richmedia_revType !==
                                                    null &&
                                                  campaign.richmedia_revType !==
                                                    undefined
                                                    ? campaign.richmedia_revType +
                                                      ", "
                                                    : ""}
                                                  {campaign.pop_campaign ==
                                                    true &&
                                                  campaign.pop_revType !==
                                                    null &&
                                                  campaign.pop_revType !==
                                                    undefined
                                                    ? campaign.pop_revType +
                                                      ", "
                                                    : ""}
                                                  {campaign.push_campaign ==
                                                    true &&
                                                  campaign.push_revType !==
                                                    null &&
                                                  campaign.push_revType !==
                                                    undefined
                                                    ? campaign.push_revType +
                                                      ", "
                                                    : ""}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                  {campaign.video_budget +
                                                    campaign.display_budget +
                                                    campaign.native_budget +
                                                    campaign.search_budget +
                                                    campaign.social_budget +
                                                    campaign.highImpact_budget +
                                                    campaign.richMedia_budget +
                                                    campaign.pop_budget +
                                                    campaign.push_budget !==
                                                    0 &&
                                                  campaign.video_budget +
                                                    campaign.display_budget +
                                                    campaign.native_budget +
                                                    campaign.search_budget +
                                                    campaign.social_budget +
                                                    campaign.highImpact_budget +
                                                    campaign.richMedia_budget +
                                                    campaign.pop_budget +
                                                    campaign.push_budget !==
                                                    NaN ? (
                                                    <>
                                                      $
                                                      {(
                                                        campaign.video_budget +
                                                        campaign.display_budget +
                                                        campaign.native_budget +
                                                        campaign.search_budget +
                                                        campaign.social_budget +
                                                        campaign.highImpact_budget +
                                                        campaign.richMedia_budget +
                                                        campaign.pop_budget +
                                                        campaign.push_budget
                                                      ).toFixed(2)}
                                                    </>
                                                  ) : (
                                                    <></>
                                                  )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                  {campaign.date_modified}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                  <Link
                                                    href={`/campaigns/${campaign.id}`}
                                                  >
                                                    <a
                                                      type="button"
                                                      className="bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                                    >
                                                      Manage
                                                    </a>
                                                  </Link>
                                                </td>
                                              </tr>
                                            </>
                                          ) : (
                                            <></>
                                          )}
                                        </>
                                      )}
                                    </>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        ))
      }
    </>
  );
}
