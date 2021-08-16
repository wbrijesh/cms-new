function Temp(reportsData) {
  result = [];

  reportsData &&
    reportsData.forEach(function (a) {
      if (!this[a.reference]) {
        this[a.reference] = {
          campaign: a.campaign,
          reference: a.reference,
          impressions: 0,
          clicks: 0,
          cost: 0,
          conversions: 0,
          visits: 0,
          views: 0,
          completed_views: 0,
          viewability: 0,
        };
        result.push(this[a.reference]);
      }
      this[a.reference].impressions += a.impressions;
      this[a.reference].clicks += a.clicks;
      this[a.reference].cost += a.cost;
      this[a.reference].conversions += a.conversions;
      this[a.reference].visits += a.visits;
      this[a.reference].views += a.views;
      this[a.reference].completed_views += a.completed_views;
      this[a.reference].viewability += a.viewability;
    }, Object.create(null));

  console.log("result: ", result);
  return result;
}

export default Temp;

// const arrayName = [
//   { campaign: "a", value: 3 },
//   { campaign: "b", value: 5 },
//   { campaign: "c", value: 7 },
//   { campaign: "a", value: 9 },
// ];

// const result = Object.entries(
//   arrayName.reduce(
//     (acc, { campaign, value }) => ({
//       ...acc,
//       [campaign]: (acc[campaign] || 0) + value,
//     }),
//     {}
//   )
// ).map(([campaign, value]) => ({ campaign, value }));

// console.log(result);
