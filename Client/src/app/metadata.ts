const og = {
  type: "website",
  url: "Todo: add public url",
  title: "Spotify Artist Network",
  description: "Todo: Description",
  siteName: "Todo: SiteName",
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
  metadataBase: `${process.env.NEXT_PUBLIC_CLIENT_URL}`,
  title: og.title,
  description: og.description,
  openGraph: og,
  // twitter: twitter
};

export { Metadata };
