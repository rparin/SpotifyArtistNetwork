import { publicParsedEnv } from "@env/publicEnv";
import { DESCRIPTION, PREVIEW } from "@/constants";

// const twitter =  {
//   card: 'Todo: summary_large_image',
//   site: 'Todo: site',
//   title: og.title,
//   description: og.description,
//   image: 'Todo: Image'
// }

export async function getMetadata(query: string) {
  const og = {
    type: "website",
    url: `${publicParsedEnv.NEXT_PUBLIC_CLIENT_URL}/search?q=${query}`,
    title: `Spotify Artist Network - Search - ${query}`,
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
