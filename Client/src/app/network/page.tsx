export default function networkRoute({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  return (
    <main>
      <div>id: {searchParams?.id}</div>
    </main>
  );
}
