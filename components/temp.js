// A

// function Filter(reportsData) {
//   result = [];

//   reportsData.forEach(function (a) {
//     if (!this[a.reference]) {
//       this[a.reference] = {
//         campaign: a.campaign,
//         reference: a.reference,
//         impressions: 0,
//         clicks: 0,
//         cost: 0,
//         conversions: 0,
//         visits: 0,
//         views: 0,
//         completed_views: 0,
//         viewability: 0,
//       };
//       result.push(this[a.reference]);
//     }
//     this[a.reference].impressions += a.impressions;
//     this[a.reference].clicks += a.clicks;
//     this[a.reference].cost += a.cost;
//     this[a.reference].conversions += a.conversions;
//     this[a.reference].visits += a.visits;
//     this[a.reference].views += a.views;
//     this[a.reference].completed_views += a.completed_views;
//     this[a.reference].viewability += a.viewability;
//   }, Object.create(null));

//   console.log("result: ", result);
//   return result;
// }

// export default Filter;

// B

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

// C

// const list = [
//   {
//     campaign: "a",
//     reference: "ABC-100",
//     value: 4,
//     date: "16/07/2021",
//     platform: "m, n",
//   },
//   {
//     campaign: "a",
//     reference: "ABC-200",
//     value: 6,
//     date: "16/07/2021",
//     platform: "l",
//   },
//   {
//     campaign: "b",
//     reference: "ABC-100",
//     value: 2,
//     date: "15/07/2021",
//     platform: "j, k",
//   },
//   {
//     campaign: "b",
//     reference: "ABC-100",
//     value: 5,
//     date: "14/07/2021",
//     platform: "j, k",
//   },
// ];

// function combineReports(num) {
//   //Calculate date
//   const today = new Date(
//     new Date().getFullYear() +
//       "-" +
//       new Date().getMonth() +
//       "-" +
//       (new Date().getDate() + 1)
//   );
//   const dayFrom = new Date(today.getTime() - num * 3600 * 24 * 1000);
//   const strToDate = (str) =>
//     new Date(
//       str.split("/")[2] + "-" + str.split("/")[1] + "-" + str.split("/")[0]
//     );

//   //Get compare keys
//   const keys = Object.keys(list[0]).filter(
//     (val) => val !== "value" && val !== "date"
//   );

//   //Get sub reports
//   const partList = list.filter(
//     (val) =>
//       strToDate(val.date).getTime() < today.getTime() &&
//       strToDate(val.date).getTime() >= dayFrom.getTime()
//   );

//   //Combine reports
//   const compare = (report1, report2) =>
//     keys.every((val) => report1[val] === report2[val]);
//   let result = [];
//   partList.forEach((val) => {
//     if (!result.some((value) => compare(value, val))) result.push(val);
//     else
//       result = result.map((obj) =>
//         compare(obj, val) ? { ...obj, value: obj["value"] + val["value"] } : obj
//       );
//   });
//   console.log(result);
// }

// combineReports(3);

// D

// let arr = [
//   {
//     platform: "Twitter",
//     reference: "CMP-2021-0001-1",
//     campaign: "CampType Ref_ID Test 1",
//     date: 2,
//     impressions: 94362,
//     clicks: 155,
//     visits: 0,
//     views: 0,
//     completed_views: 0,
//     conversions: 8,
//     viewability: 0.9154,
//     cost: 130.32,
//   },
//   {
//     platform: "Twitter",
//     reference: "CMP-2021-0001-2",
//     campaign: "CampType Ref_ID Test 1",
//     date: 2,
//     impressions: 94362,
//     clicks: 155,
//     visits: 0,
//     views: 0,
//     completed_views: 0,
//     conversions: 8,
//     viewability: 0.9154,
//     cost: 130.32,
//   },
//   {
//     platform: "Twitter",
//     reference: "CMP-2021-0001-2",
//     campaign: "CampType Ref_ID Test 1",
//     date: 2,
//     impressions: 94362,
//     clicks: 155,
//     visits: 0,
//     views: 0,
//     completed_views: 0,
//     conversions: 8,
//     viewability: 0.9154,
//     cost: 130.32,
//   },
// ];

// const combine = (data) => {
//   let combinedData = data.reduce((acc, curr) => {
//     delete curr.date;

//     if (acc.length == 0) {
//       acc.push(curr);
//       return acc;
//     }

//     let d = acc.find(
//       (x) =>
//         x.campaign == curr.campaign &&
//         x.reference == curr.reference &&
//         x.platform == curr.platform
//     );

//     if (d) {
//       d.impressions += curr.impressions;
//       d.clicks += curr.clicks;
//       d.visits += curr.visits;
//       d.views += curr.views;
//       d.completed_views += curr.completed_views;
//       d.conversions += curr.conversions;
//       d.viewability += curr.viewability;
//       d.cost += curr.cost;
//     } else {
//       acc.push(curr);
//     }

//     return acc;
//   }, []);

//   return combinedData;
// };

// let result = combine(arr);

// console.log(result);

// e

//One way is to try reduce

const list = [
  {
    campaign: "a",
    reference: "ABC-100",
    value: 4,
    date: "16/07/2021",
    platform: "m, n",
  },
  {
    campaign: "a",
    reference: "ABC-200",
    value: 6,
    date: "16/07/2021",
    platform: "l",
  },
  {
    campaign: "b",
    reference: "ABC-100",
    value: 2,
    date: "15/07/2021",
    platform: "j, k",
  },
  {
    campaign: "b",
    reference: "ABC-100",
    value: 5,
    date: "14/07/2021",
    platform: "j, k",
  },
];

function combineReports(num) {
  //Calculate date
  const today = new Date(
    new Date().getFullYear() +
      "-" +
      new Date().getMonth() +
      "-" +
      (new Date().getDate() + 1)
  );
  const dayFrom = new Date(today.getTime() - num * 3600 * 24 * 1000);
  const strToDate = (str) =>
    new Date(
      str.split("/")[2] + "-" + str.split("/")[1] + "-" + str.split("/")[0]
    );

  //Get compare keys
  const keys = Object.keys(list[0]).filter(
    (val) => val !== "value" && val !== "date"
  );

  //Get sub reports
  const partList = list.filter(
    (val) =>
      strToDate(val.date).getTime() < today.getTime() &&
      strToDate(val.date).getTime() >= dayFrom.getTime()
  );

  //Combine reports
  const compare = (report1, report2) =>
    keys.every((val) => report1[val] === report2[val]);
  let result = [];
  partList.forEach((val) => {
    if (!result.some((value) => compare(value, val))) result.push(val);
    else
      result = result.map((obj) =>
        compare(obj, val) ? { ...obj, value: obj["value"] + val["value"] } : obj
      );
  });
  console.log(result);
}

combineReports(4);
