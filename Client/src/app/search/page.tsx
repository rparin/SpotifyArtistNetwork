import SearchResults from "@/components/PageComponents/SearchResults";

export default function searchRoute({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  return (
    <main>
      <SearchResults query={searchParams?.q as string} />
    </main>
  );
}
