import MyNetwork from "@/pages/MyNetwork";
import Link from "next/link";
import CountdownNavigateTo from "@/components/CountdownNavigateTo";

export default function myNetworkRoute({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const error = searchParams?.error;
  const accessToken = searchParams?.access_token;

  //Reroute to home page
  if (error == "true" || !error) {
    return (
      <main className="flex flex-col justify-center items-center h-72">
        <h2 className="flex flex-wrap gap-2 text-base font-semibold justify-center text-center mt-3">
          <span>Authorization Error...</span>
          <span>Going back to the home page in:</span>
          {<CountdownNavigateTo href={"/"} countdown={5000} />}
        </h2>

        <div className="flex flex-wrap justify-center text-center mt-3 gap-2 text-sm md:text-base">
          <p>Click here to manually go back to the home page:</p>
          <Link
            className="underline hover:text-sky-500 dark:hover:text-blue-500"
            href={"/"}>
            Home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main>
      <MyNetwork accessToken={accessToken as string} />
    </main>
  );
}
