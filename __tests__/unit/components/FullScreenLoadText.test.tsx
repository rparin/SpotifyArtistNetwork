import { render, screen } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import FullScreenLoadText from "@/components/FullScreenLoadText";

const PROPS = {
  text: "Loading...",
};

test("it renders component unchanged", () => {
  const { container } = render(<FullScreenLoadText {...PROPS} />);
  expect(container).toMatchSnapshot();
});

describe("testing Footer Accessibility", () => {
  expect.extend(toHaveNoViolations);

  test("it should have no accessibility violations", async () => {
    const { container } = render(<FullScreenLoadText {...PROPS} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

test("it should show the loading text", () => {
  render(<FullScreenLoadText {...PROPS} />);
  expect(screen.getByText(PROPS.text)).toBeInTheDocument();
});
