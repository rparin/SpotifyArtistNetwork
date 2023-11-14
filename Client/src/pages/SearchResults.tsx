import { Searchbox } from "@/components/UI/Searchbox";
import { APP_NAME } from "@/constants";
import { SEARCH_PLACEHOLDER } from "@/constants";
import { ExternalLink } from "lucide-react";

export default function SearchResults() {
  return (
    <>
      <div className="flex flex-col md:flex-row text-center items-center gap-5 pt-10 md:pt-5 px-5">
        <h1 className="text-2xl">{APP_NAME}</h1>
        <Searchbox placeholder={SEARCH_PLACEHOLDER} size="md" />
      </div>

      <div className="mt-5 grid auto-cols-auto md:grid-cols-4 xl:grid-cols-5 gap-2 mx-16 bg-red-950">
        <div className="bg-sky-950 w-auto h-64 grid grid-cols-1 grid-rows-[repeat(12,_minmax(0,_1fr));]">
          <div className="row-start-1 row-end-[9] bg-slate-800">Artist</div>
          <div className="row-span-4 bg-slate-600">info</div>
          <section className="row-span-1 bg-emerald-800 flex justify-center items-center text-center gap-1">
            <p>Spotify</p>
            <a href="" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-auto h-[.7rem] mb-1" />
            </a>
          </section>
        </div>
      </div>
    </>
  );
}
