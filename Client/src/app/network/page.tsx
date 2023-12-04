import ArtistNetwork from "@/pages/ArtistNetwork";
import { APP_NAME } from "@/constants";
import Link from "next/link";
import { Home } from "lucide-react";

export default function networkRoute({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  return (
    <main>
      <Link
        className="absolute ml-5 p-2 rounded-3xl md:rounded-none md:ml-0 md:px-5 z-50 mt-6 md:mt-3 bg-primary text-primary-foreground md:text-primary md:bg-transparent"
        href={"/"}>
        <h1 className="text-lg hidden md:block py-2">{APP_NAME}</h1>
        <Home className="md:hidden" />
      </Link>
      <div className="flex flex-col w-full items-center absolute top-16 md:top-7 gap-1 z-40">
        <h1 className="text-xl line-clamp-1">{`${
          searchParams?.network as string
        } Network`}</h1>
      </div>
      <ArtistNetwork id={searchParams?.id as string} />
    </main>
  );
}
