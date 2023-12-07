const og = {
  type: "website",
  url: "https://spotify-artist-network.vercel.app",
  title: "Spotify Artist Network",
  description:
    "A website that utilizes the Spotify API to showcase a network of related artists for any given artist.",
  siteName: "Spotify Artist Network",
  images: [
    {
      url: "Todo: Image",
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
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_CLIENT_URL}`),
  title: og.title,
  description: og.description,
  openGraph: og,
  // twitter: twitter
};

export { Metadata };
