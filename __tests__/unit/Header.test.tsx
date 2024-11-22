import { render } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import Header from "@/components/Header";

test("it renders component unchanged", () => {
  const { container } = render(<Header />);
  expect(container).toMatchSnapshot();
});

describe("testing Footer Accessibility", () => {
  expect.extend(toHaveNoViolations);

  test("it should have no accessibility violations", async () => {
    const { container } = render(<Header />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
