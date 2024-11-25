import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

describe("testing ThemeToggle Component Accessibility", () => {
  expect.extend(toHaveNoViolations);
  test("it should have no accessibility violations", async () => {
    const { container } = render(<ThemeToggle />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

test("it renders component unchanged", () => {
  const { container } = render(<ThemeToggle />);
  expect(container).toMatchSnapshot();
});

test("it should switch themes when button is clicked", async () => {
  const user = userEvent.setup();
  render(<ThemeToggle />);

  const themeToggle = screen.getByRole("switch");

  // Check if the checkbox is initially unchecked
  expect(themeToggle).toHaveAttribute("aria-checked", "false");

  //Click on theme toggle
  await user.click(themeToggle);

  expect(themeToggle).toHaveAttribute("aria-checked", "true");
});
