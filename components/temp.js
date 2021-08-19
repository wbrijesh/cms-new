{
  campaign.search_revType === "CPM" ? (
    <>{parseFloat((row.impressions * campaign.search_unitRate) / 1000)}</>
  ) : (
    <></>
  );
}
{
  campaign.search_revType === "CPC" ? (
    <>{parseFloat(row.clicks * campaign.search_unitRate)}</>
  ) : (
    <></>
  );
}
{
  campaign.search_revType === "CPCV" ? (
    <>{parseFloat(row.completed_views * campaign.search_unitRate)}</>
  ) : (
    <></>
  );
}
{
  campaign.search_revType === "CPL" ? (
    <>{parseFloat(row.conversions * campaign.search_unitRate)}</>
  ) : (
    <></>
  );
}
{
  campaign.search_revType === "CPA" ? (
    <>{parseFloat(row.conversions * campaign.search_unitRate)}</>
  ) : (
    <></>
  );
}
{
  campaign.search_revType === "CPViews" ? (
    <>{parseFloat(row.views * campaign.search_unitRate)}</>
  ) : (
    <></>
  );
}
{
  campaign.search_revType === "CPVisit" ? (
    <>{parseFloat(row.visits * campaign.search_unitRate)}</>
  ) : (
    <></>
  );
}
