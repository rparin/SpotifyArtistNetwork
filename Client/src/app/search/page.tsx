import SearchResults from "@/components/PageComponents/SearchResults";

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
