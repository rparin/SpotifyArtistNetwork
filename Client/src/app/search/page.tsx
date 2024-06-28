import SearchResults from "@/components/PageComponents/SearchResults";
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
  var q = "";
  if (searchParams.q) {
    q = searchParams.q as string;
  }
  return getMetadata(q);
}

export default function searchRoute({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  return (
    <main>
      <SearchResults query={searchParams?.q} />
    </main>
  );
}
