import { render } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import GenreTags from "@/components/Spotify/GenreTags";

const PROPS = {
  id: "0bAsR2unSRpn6BQPEnNlZm",
  items: ["pop", "rock"],
};

test("it renders component unchanged", () => {
  const { container } = render(<GenreTags {...PROPS} />);
  expect(container).toMatchSnapshot();
});

describe("testing Genre Tags Accessibility", () => {
  expect.extend(toHaveNoViolations);

  test("it should have no accessibility violations", async () => {
    const { container } = render(<GenreTags {...PROPS} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
