import { Searchbox } from "@/components/UI/Searchbox";
import { APP_NAME } from "@/constants";
import { SEARCH_PLACEHOLDER } from "@/constants";
import Link from "next/link";
import QueryResultCards from "@/components/QueryResultCards";

export default function SearchResults(props: { query?: string }) {
  return (
    <>
      <div className="flex flex-col md:flex-row text-center items-center gap-5 pt-10 md:pt-5 px-5">
        <Link href={"/"}>
          <h1 className="text-3xl lg:text-4xl md:pl-10">{APP_NAME}</h1>
        </Link>
        <Searchbox
          placeholder={SEARCH_PLACEHOLDER}
          size="md"
          inputOnLoad={props.query}
        />
      </div>
      <div className="mt-10 flex flex-wrap justify-center items-center gap-3 mx-6 md:mx-12 lg:mx-28 mb-10">
        <QueryResultCards query={props.query} />
      </div>
    </>
  );
}
