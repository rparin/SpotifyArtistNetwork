import { act, render } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import ArtistCardVertical from "@/components/Spotify/ArtistCardVertical";
import ArtistCardHorizontal from "@/components/Spotify/ArtistCardHorizontal";
import { SpotifyArtistCard } from "@/dto/Spotify/SpotifyArtistCardDto";

const PROPS: SpotifyArtistCard = {
  url: "https://open.spotify.com/artist/0bAsR2unSRpn6BQPEnNlZm",
  id: "0bAsR2unSRpn6BQPEnNlZm",
  name: "Aimer",
  img: "https://i.scdn.co/image/ab6761610000e5eb23241889efb57a4ce8338932",
  followers: 100,
  pop: 67,
  genres: ["pop", "rock"],
  alt: "Aimer Spotify",
};

describe("testing Artist Card Snapshot", () => {
  test("it, Vertical Card, renders component unchanged", () => {
    const { container } = render(<ArtistCardVertical {...PROPS} />);
    expect(container).toMatchSnapshot();
  });

  test("it, Horizontal Card, renders component unchanged", () => {
    const { container } = render(<ArtistCardHorizontal {...PROPS} />);
    expect(container).toMatchSnapshot();
  });
});

describe("testing Artist Card Accessibility", () => {
  expect.extend(toHaveNoViolations);

  test("it, Vertical Card, should have no accessibility violations", async () => {
    const { container } = render(<ArtistCardVertical {...PROPS} />);
    const results = await act(async () => axe(container));
    expect(results).toHaveNoViolations();
  });

  test("it, Horizontal Card, should have no accessibility violations", async () => {
    const { container } = render(<ArtistCardHorizontal {...PROPS} />);
    const results = await act(async () => axe(container));
    expect(results).toHaveNoViolations();
  });
});
