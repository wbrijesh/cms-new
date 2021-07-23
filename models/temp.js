{
  campaign.social_campaign === true ? (
    <>
      <tr>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
          {campaign.name}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {campaign.clientName}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          social campaign
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {campaign.social_revType}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
          {campaign.social_goal}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
          {new Date(campaign.social_endDate) - new Date() < 0 ? (
            <>
              {campaign.social_goal}
              <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                Not In Flight
              </span>
            </>
          ) : (
            <>
              {Math.trunc(
                (Math.ceil(
                  Math.abs(new Date(campaign.social_endDate) - new Date()) /
                    (1000 * 60 * 60 * 24)
                ) *
                  campaign.social_goal) /
                  Math.ceil(
                    Math.abs(
                      new Date(campaign.social_endDate) -
                        new Date(campaign.social_startDate)
                    ) /
                      (1000 * 60 * 60 * 24)
                  )
              )}
            </>
          )}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
          {reports.map((report) =>
            JSON.parse(report.xlsxToJSONStr).map((row) =>
              row.reference === campaign.reference_id_social_campaign ? (
                <>{row.impressions}</>
              ) : (
                <></>
              )
            )
          )}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
          {campaign.social_endDate}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
          {parseFloat(
            (parseInt(
              reports.map((report) =>
                JSON.parse(report.xlsxToJSONStr).map((row) =>
                  row.reference === campaign.reference_id_social_campaign ? (
                    row.impressions
                  ) : (
                    <></>
                  )
                )
              )
            ) /
              Math.trunc(
                (Math.ceil(
                  Math.abs(new Date(campaign.social_endDate) - new Date()) /
                    (1000 * 60 * 60 * 24)
                ) *
                  campaign.social_goal) /
                  Math.ceil(
                    Math.abs(
                      new Date(campaign.social_endDate) -
                        new Date(campaign.social_startDate)
                    ) /
                      (1000 * 60 * 60 * 24)
                  )
              ) -
              1) *
              100
          ).toFixed(2)}
          %
        </td>
      </tr>
    </>
  ) : (
    <></>
  );
}
