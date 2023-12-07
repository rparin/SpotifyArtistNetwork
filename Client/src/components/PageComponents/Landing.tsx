import { APP_NAME, LOAD_WARNING } from "@/constants";
import { Searchbox } from "@/components/UI/Searchbox";
import { SEARCH_PLACEHOLDER } from "@/constants";
import Link from "next/link";

export default function Landing() {
  return (
    <>
      <div className="h-[70vh] flex flex-col justify-center items-center text-center gap-7">
        <Link href={"/"}>
          <h1 className="text-3xl md:text-5xl">{APP_NAME}</h1>
        </Link>
        <Searchbox placeholder={SEARCH_PLACEHOLDER} />
        <p className="w-full text-sm hidden md:flex justify-center text-center opacity-75">
          {LOAD_WARNING}
        </p>
      </div>
    </>
  );
}
