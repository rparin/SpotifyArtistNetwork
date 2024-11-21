import App from "@/app/page";
import { act, render } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";

describe("testing App Accessibility", () => {
  expect.extend(toHaveNoViolations);

  test("it (Landing Page) should have no accessibility violations", async () => {
    const { container } = render(<App />);
    const results = await act(async () => axe(container));
    expect(results).toHaveNoViolations();
  });
});
