import MyNetwork from "@/pages/MyNetwork";

export default function myNetworkRoute({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const error = searchParams?.error;
  const status = searchParams?.status;
  return (
    <main>
      {error}
      {status}
      <MyNetwork />
    </main>
  );
}
