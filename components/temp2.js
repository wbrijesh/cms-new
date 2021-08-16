{
  campaign.richMedia_campaign === true ? (
    <>
      <tr>
        {new Date(campaign.richMedia_endDate) - new Date() < 0 ? (
          <></>
        ) : (
          <>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              {campaign.name}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {campaign.clientName}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              RichMedia campaign
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {campaign.richMedia_revType}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              {campaign.richMedia_goal}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              <>
                {(Math.ceil(
                  Math.abs(new Date(campaign.richMedia_endDate) - new Date()) /
                    (1000 * 60 * 60 * 24)
                ) *
                  campaign.richMedia_goal) /
                  Math.ceil(
                    Math.abs(
                      new Date(campaign.richMedia_endDate) -
                        new Date(campaign.richMedia_startDate)
                    ) /
                      (1000 * 60 * 60 * 24)
                  )}
              </>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              {reports.map((report) =>
                JSON.parse(report.xlsxToJSONStr).map((row) =>
                  row.reference === campaign.reference_id_richMedia_campaign ? (
                    <>
                      {campaign.richMedia_revType === "CPM" ? (
                        row.impressions
                      ) : (
                        <></>
                      )}
                      {campaign.richMedia_revType === "CPC" ? (
                        row.clicks
                      ) : (
                        <></>
                      )}
                      {campaign.richMedia_revType === "CPCV" ? (
                        row.completed_views
                      ) : (
                        <></>
                      )}
                      {campaign.richMedia_revType === "CPL" ? (
                        row.conversions
                      ) : (
                        <></>
                      )}
                      {campaign.richMedia_revType === "CPA" ? (
                        row.conversions
                      ) : (
                        <></>
                      )}
                      {campaign.richMedia_revType === "CPViews" ? (
                        row.views
                      ) : (
                        <></>
                      )}
                      {campaign.richMedia_revType === "CPVisit" ? (
                        row.visits
                      ) : (
                        <></>
                      )}
                    </>
                  ) : (
                    <></>
                  )
                )
              )}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              {campaign.richMedia_endDate}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              {reports.map((report) =>
                JSON.parse(report.xlsxToJSONStr).map((row) =>
                  row.reference === campaign.reference_id_richMedia_campaign ? (
                    <>
                      {campaign.richMedia_revType === "CPM" ? (
                        <>
                          {parseFloat(
                            (row.impressions /
                              Math.trunc(
                                (Math.ceil(
                                  Math.abs(
                                    new Date(campaign.richMedia_endDate) -
                                      new Date()
                                  ) /
                                    (1000 * 60 * 60 * 24)
                                ) *
                                  campaign.richMedia_goal) /
                                  Math.ceil(
                                    Math.abs(
                                      new Date(campaign.richMedia_endDate) -
                                        new Date(campaign.richMedia_startDate)
                                    ) /
                                      (1000 * 60 * 60 * 24)
                                  )
                              ) -
                              1) *
                              100
                          ).toFixed(2)}{" "}
                        </>
                      ) : (
                        <></>
                      )}
                      {campaign.richMedia_revType === "CPC" ? (
                        <>
                          {parseFloat(
                            (row.clicks /
                              Math.trunc(
                                (Math.ceil(
                                  Math.abs(
                                    new Date(campaign.richMedia_endDate) -
                                      new Date()
                                  ) /
                                    (1000 * 60 * 60 * 24)
                                ) *
                                  campaign.richMedia_goal) /
                                  Math.ceil(
                                    Math.abs(
                                      new Date(campaign.richMedia_endDate) -
                                        new Date(campaign.richMedia_startDate)
                                    ) /
                                      (1000 * 60 * 60 * 24)
                                  )
                              ) -
                              1) *
                              100
                          ).toFixed(2)}{" "}
                        </>
                      ) : (
                        <></>
                      )}
                      {campaign.richMedia_revType === "CPCV" ? (
                        <>
                          {parseFloat(
                            (row.completed_views /
                              Math.trunc(
                                (Math.ceil(
                                  Math.abs(
                                    new Date(campaign.richMedia_endDate) -
                                      new Date()
                                  ) /
                                    (1000 * 60 * 60 * 24)
                                ) *
                                  campaign.richMedia_goal) /
                                  Math.ceil(
                                    Math.abs(
                                      new Date(campaign.richMedia_endDate) -
                                        new Date(campaign.richMedia_startDate)
                                    ) /
                                      (1000 * 60 * 60 * 24)
                                  )
                              ) -
                              1) *
                              100
                          ).toFixed(2)}{" "}
                        </>
                      ) : (
                        <></>
                      )}
                      {campaign.richMedia_revType === "CPL" ? (
                        <>
                          {parseFloat(
                            (row.conversions /
                              Math.trunc(
                                (Math.ceil(
                                  Math.abs(
                                    new Date(campaign.richMedia_endDate) -
                                      new Date()
                                  ) /
                                    (1000 * 60 * 60 * 24)
                                ) *
                                  campaign.richMedia_goal) /
                                  Math.ceil(
                                    Math.abs(
                                      new Date(campaign.richMedia_endDate) -
                                        new Date(campaign.richMedia_startDate)
                                    ) /
                                      (1000 * 60 * 60 * 24)
                                  )
                              ) -
                              1) *
                              100
                          ).toFixed(2)}{" "}
                        </>
                      ) : (
                        <></>
                      )}
                      {campaign.richMedia_revType === "CPA" ? (
                        <>
                          {parseFloat(
                            (row.conversions /
                              Math.trunc(
                                (Math.ceil(
                                  Math.abs(
                                    new Date(campaign.richMedia_endDate) -
                                      new Date()
                                  ) /
                                    (1000 * 60 * 60 * 24)
                                ) *
                                  campaign.richMedia_goal) /
                                  Math.ceil(
                                    Math.abs(
                                      new Date(campaign.richMedia_endDate) -
                                        new Date(campaign.richMedia_startDate)
                                    ) /
                                      (1000 * 60 * 60 * 24)
                                  )
                              ) -
                              1) *
                              100
                          ).toFixed(2)}{" "}
                        </>
                      ) : (
                        <></>
                      )}
                      {campaign.richMedia_revType === "CPViews" ? (
                        <>
                          {parseFloat(
                            (row.views /
                              Math.trunc(
                                (Math.ceil(
                                  Math.abs(
                                    new Date(campaign.richMedia_endDate) -
                                      new Date()
                                  ) /
                                    (1000 * 60 * 60 * 24)
                                ) *
                                  campaign.richMedia_goal) /
                                  Math.ceil(
                                    Math.abs(
                                      new Date(campaign.richMedia_endDate) -
                                        new Date(campaign.richMedia_startDate)
                                    ) /
                                      (1000 * 60 * 60 * 24)
                                  )
                              ) -
                              1) *
                              100
                          ).toFixed(2)}{" "}
                        </>
                      ) : (
                        <></>
                      )}
                      {campaign.richMedia_revType === "CPVisit" ? (
                        <>
                          {parseFloat(
                            (row.visits /
                              Math.trunc(
                                (Math.ceil(
                                  Math.abs(
                                    new Date(campaign.richMedia_endDate) -
                                      new Date()
                                  ) /
                                    (1000 * 60 * 60 * 24)
                                ) *
                                  campaign.richMedia_goal) /
                                  Math.ceil(
                                    Math.abs(
                                      new Date(campaign.richMedia_endDate) -
                                        new Date(campaign.richMedia_startDate)
                                    ) /
                                      (1000 * 60 * 60 * 24)
                                  )
                              ) -
                              1) *
                              100
                          ).toFixed(2)}{" "}
                        </>
                      ) : (
                        <></>
                      )}
                    </>
                  ) : (
                    <></>
                  )
                )
              )}
              %
            </td>
          </>
        )}
      </tr>
    </>
  ) : (
    <></>
  );
}
