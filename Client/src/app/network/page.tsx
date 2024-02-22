import ArtistNetwork from "@/components/PageComponents/ArtistNetwork";

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
