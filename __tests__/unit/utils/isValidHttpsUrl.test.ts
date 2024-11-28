import isValidHttpsUrl from "@/utils/isValidHttpsUrl";

const PARAMS = {
  VALID_URL: "https://stackoverflow.com",
  NON_HTTPS_URL: "http://stackoverflow.com",
  INVALID_URL: "stackoverflow.com",
};

test("it should be a valid url", () => {
  expect(isValidHttpsUrl(PARAMS.VALID_URL)).toBe(true);
});

test("it should not be valid url - not https", () => {
  expect(isValidHttpsUrl(PARAMS.NON_HTTPS_URL)).toBe(false);
});

test("it should not be valid url - incorrect format", () => {
  expect(isValidHttpsUrl(PARAMS.INVALID_URL)).toBe(false);
});
