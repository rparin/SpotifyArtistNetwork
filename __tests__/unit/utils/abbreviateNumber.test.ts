// export default function abbreviateNumber(num: number) {
//   const precision = 2;
//   const map = [
//     { suffix: "T", threshold: 1e12 },
//     { suffix: "B", threshold: 1e9 },
//     { suffix: "M", threshold: 1e6 },
//     { suffix: "K", threshold: 1e3 },
//     { suffix: "", threshold: 1 },
//   ];

//   const found = map.find((x) => Math.abs(num) >= x.threshold);
//   if (found) {
//     const formatted = (num / found.threshold).toFixed(precision) + found.suffix;
//     return formatted.replace(".00", "");
//   }

//   return num;
// }

import abbreviateNumber from "@/utils/abbreviateNumber";

const PARAMS = {
  ONES: 1,
  TENS: 10,
  HUNDREDS: 100,
  THOUSANDS: 1_000,
  MILLIONS: 1_000_000,
  BILLIONS: 1_000_000_000,
  TRILLIONS: 1_000_000_000_000,
};

test("it should return the number (ONES)", () => {
  expect(abbreviateNumber(PARAMS.ONES)).toBe("1");
});

test("it should return the number (TENS)", () => {
  expect(abbreviateNumber(PARAMS.TENS)).toBe("10");
});

test("it should return the number (HUNDREDS)", () => {
  expect(abbreviateNumber(PARAMS.HUNDREDS)).toBe("100");
});

test("it should format the number (THOUSANDS)", () => {
  expect(abbreviateNumber(PARAMS.THOUSANDS)).toBe("1K");
});

test("it should format the number (MILLIONS)", () => {
  expect(abbreviateNumber(PARAMS.MILLIONS)).toBe("1M");
});

test("it should format the number (BILLIONS)", () => {
  expect(abbreviateNumber(PARAMS.BILLIONS)).toBe("1B");
});

test("it should format the number (TRILLIONS)", () => {
  expect(abbreviateNumber(PARAMS.TRILLIONS)).toBe("1T");
});
