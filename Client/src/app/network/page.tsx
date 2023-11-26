import Network from "@/pages/Network";
export default function networkRoute({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  return (
    <main>
      <Network
        network={searchParams?.network as string}
        id={searchParams?.id as string}
      />
    </main>
  );
}
