import publicParsedEnv from "@env/publicEnv";
import { APP_NAME, DESCRIPTION, PREVIEW } from "@/constants/AppConstants";

const og = {
  type: "website",
  url: publicParsedEnv.NEXT_PUBLIC_CLIENT_URL,
  title: APP_NAME,
  description: DESCRIPTION,
  siteName: publicParsedEnv.NEXT_PUBLIC_CLIENT_URL,
  images: [
    {
      url: PREVIEW,
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
  metadataBase: new URL(publicParsedEnv.NEXT_PUBLIC_CLIENT_URL),
  title: og.title,
  description: og.description,
  openGraph: og,
  // twitter: twitter
};

export { Metadata };
