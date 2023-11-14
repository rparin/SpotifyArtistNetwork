import { APP_NAME } from "@/constants";
import { Searchbox } from "@/components/UI/Searchbox";
import { SEARCH_PLACEHOLDER } from "@/constants";

export default function Search() {
  return (
    <>
      <div className="h-[70vh] flex flex-col justify-center items-center text-center gap-7">
        <h1 className="text-3xl md:text-5xl">{APP_NAME}</h1>
        <Searchbox placeholder={SEARCH_PLACEHOLDER} />
      </div>
    </>
  );
}
