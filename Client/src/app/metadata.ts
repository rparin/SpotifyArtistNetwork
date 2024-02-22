import { publicParsedEnv } from "@env/publicEnv";

const og = {
  type: "website",
  url: "https://artistnetwork-sp.vercel.app",
  title: "Spotify Artist Network",
  description:
    "A website that utilizes the Spotify API to showcase a network of related artists for any given artist.",
  siteName: "artistnetwork-sp.vercel.app",
  images: [
    {
      url: "https://raw.githubusercontent.com/rparin/SpotifyArtistNetwork/public/_preview/Banner.png",
    },
  ],
};

// const twitter =  {
//   card: 'Todo: summary_large_image',
//   site: 'Todo: site',
//   title: og.title,
//   description: og.description,
//   image: 'Todo: Image'
// }

const Metadata = {
  metadataBase: new URL(`${publicParsedEnv.NEXT_PUBLIC_CLIENT_URL}`),
  title: og.title,
  description: og.description,
  openGraph: og,
  // twitter: twitter
};

export { Metadata };
