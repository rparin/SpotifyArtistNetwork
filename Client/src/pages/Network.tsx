import ForceGraph from "@/components/Graph/GraphWrapper";
import { Searchbox } from "@/components/UI/Searchbox";
import { SEARCH_PLACEHOLDER } from "@/constants";
import Link from "next/link";

export default function Network(props: { query?: string; id?: string }) {
  return (
    <>
      <div className="flex flex-col w-full items-center absolute top-16 md:top-7 gap-1 z-40">
        <Link href={"/"}>
          <h1 className="text-base line-clamp-1">{`${props.query} Network`}</h1>
        </Link>
        <Searchbox
          placeholder={SEARCH_PLACEHOLDER}
          variant={"secondary"}
          size="sm"
          inputOnLoad={props.query}
        />
      </div>
      <ForceGraph query={props.query} id={props.id} />
    </>
  );
}
