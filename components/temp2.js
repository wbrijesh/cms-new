const arrayName = [
  { campaign: "a", value: 3 },
  { campaign: "b", value: 5 },
  { campaign: "c", value: 7 },
  { campaign: "a", value: 9 },
];

const result = Object.entries(
  arrayName.reduce(
    (acc, { campaign, value }) => ({
      ...acc,
      [campaign]: (acc[campaign] || 0) + value,
    }),
    {}
  )
).map(([campaign, value]) => ({ campaign, value }));

console.log(result);
