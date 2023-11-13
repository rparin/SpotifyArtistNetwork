import Searchbox from "@/components/Searchbox";
import { APP_NAME } from "@/constants";
export default function SearchResults() {
  return (
    <>
      <div className="flex flex-col md:flex-row items-center gap-5 pt-10 md:pt-5 px-5">
        <h1 className="text-2xl">{APP_NAME}</h1>
        <Searchbox className="w-[90%] md:w-[50%] h-10" />
      </div>
    </>
  );
}
