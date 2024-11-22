import { render } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import { Searchbox } from "@/components/Searchbox";

test("it renders component unchanged", () => {
  const { container } = render(<Searchbox />);
  expect(container).toMatchSnapshot();
});

describe("testing Footer Accessibility", () => {
  expect.extend(toHaveNoViolations);

  test("it should have no accessibility violations", async () => {
    const { container } = render(<Searchbox />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
