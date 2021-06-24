const fieldOutput = {
  0: { value: "abc" },
  1: { value: "lmn" },
  2: { value: "xyz" },
};
const commaSepStr = "abc,lmn,xyz";

let genCommaSepStr = "";

for (const f in fieldOutput) {
  genCommaSepStr += `${fieldOutput[f].value},`;
}

console.log("GENEREATED: ", genCommaSepStr.slice(0, -1));

// console.log(commaSepStr.split(","));
// let numbers = [1, 2, 3];
// numbers.map(
//   (number) =>
//     console.log(
//       `Array Positiion : ${number} = `,
//       commaSepStr.split(",")[number - 1]
//     ),
// );
