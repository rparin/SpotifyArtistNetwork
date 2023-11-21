import ForceGraph from "@/components/Graph/GraphWrapper";
import { Searchbox } from "@/components/UI/Searchbox";
import { APP_NAME } from "@/constants";
import { SEARCH_PLACEHOLDER } from "@/constants";
import Link from "next/link";

export default function Network(props: { query?: string; id?: string }) {
  return (
    <>
      <div className="absolute top-7 flex flex-col gap-3 w-full z-40 items-center">
        <Link href={"/"}>
          <h1 className="text-xl lg:text-2xl">{APP_NAME}</h1>
        </Link>
        <Searchbox
          placeholder={SEARCH_PLACEHOLDER}
          variant={"secondary"}
          size="sm"
          inputOnLoad={props.query}
        />
      </div>
      <ForceGraph />
    </>
  );
}
