import { render } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import SearchBar from "@/components/SearchBar";

test("it renders component unchanged", () => {
  const { container } = render(<SearchBar />);
  expect(container).toMatchSnapshot();
});

describe("testing Footer Accessibility", () => {
  expect.extend(toHaveNoViolations);

  test("it should have no accessibility violations", async () => {
    const { container } = render(<SearchBar />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
