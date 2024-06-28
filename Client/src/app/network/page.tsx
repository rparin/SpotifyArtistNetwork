import ArtistNetwork from "@/components/PageComponents/ArtistNetwork";

import type { Metadata, ResolvingMetadata } from "next";
import { getMetadata } from "./metadata";

type Props = {
  params: { q: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  var id = "";
  var artist = "";
  if (searchParams.id) {
    id = searchParams.id as string;
    artist = searchParams.network as string;
  }
  return getMetadata(id, artist);
}

export default function networkRoute({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  return (
    <main>
      <div className="flex flex-col w-full items-center absolute top-16 md:top-7 gap-1 z-40">
        <h1 className="text-xl line-clamp-1 mr-7">{`${searchParams?.network} Network`}</h1>
      </div>
      <ArtistNetwork id={searchParams?.id} />
    </main>
  );
}
