import ForceGraph from "@/components/Graph/GraphWrapper";
export default function networkRoute({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  return (
    <main>
      <ForceGraph />
    </main>
  );
}
