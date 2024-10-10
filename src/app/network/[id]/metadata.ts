import publicParsedEnv from "@env/publicEnv";
import { APP_NAME, DESCRIPTION, PREVIEW } from "@/constants/AppConstants";

// const twitter =  {
//   card: 'Todo: summary_large_image',
//   site: 'Todo: site',
//   title: og.title,
//   description: og.description,
//   image: 'Todo: Image'
// }

export default async function getMetadata(id: string) {
  const artistName = id.split("_")[0];
  const og = {
    type: "website",
    url: `${publicParsedEnv.NEXT_PUBLIC_CLIENT_URL}/network/${id}`,
    title: `${APP_NAME} - ${artistName}`,
    description: DESCRIPTION,
    siteName: `${publicParsedEnv.NEXT_PUBLIC_CLIENT_URL}`,
    images: [
      {
        url: PREVIEW,
      },
    ],
    // twitter: twitter
  };

  return {
    title: og.title,
    metadataBase: new URL(og.url),
    description: og.description,
    openGraph: og,
  };
}
