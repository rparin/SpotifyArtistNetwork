import { ExternalLink } from "lucide-react";
import Image from "next/image";
import HorizontalList from "./UI/HorizontalList";

export type artistCardType = {
  name: string;
  img: string;
  alt: string;
  genres: Array<string>;
  followers: string;
  pop: string;
  url: string;
};

export default function ArtistCard(props: artistCardType) {
  return (
    <section className="relative  w-full max-w-[13rem] lg:max-w-[15rem] hover:mb-0 hover:bg-blue-950/20 dark:hover:bg-slate-400/20 rounded-md">
      {/* Artist Music Info */}
      <article className="rounded-t-md flex flex-col text-center items-center py-3 gap-2 backdrop-blur-md">
        <Image
          className="lg:h-32 lg:w-32 object-cover rounded-[50%]"
          width={100}
          height={100}
          src={props.img}
          alt={props.alt}
        />
        <h2 className="text-2xl lg:text-3xl font-medium">{props.name}</h2>
        <HorizontalList
          items={props.genres}
          className="dark:bg-slate-500/80 bg-slate-200/40"
        />
      </article>

      {/* Artist Social Info */}
      <article className="grid grid-cols-2 gap-1 backdrop-blur-md">
        <div className="bg-slate-200/40 dark:bg-slate-600/60 flex flex-col justify-center items-center text-center py-2">
          <h3 className="text-sm lg:text-base font-normal">Followers</h3>
          <p className="font-medium text-sm lg:text-base">{props.followers}</p>
        </div>
        <div className="bg-slate-200/40 dark:bg-slate-600/60 flex flex-col justify-center items-center text-center py-2">
          <h3 className="text-sm lg:text-base font-normal">Popularity</h3>
          <p className="font-medium text-sm lg:text-base">{props.pop}</p>
        </div>
      </article>

      {/* Spotify Link to Artist */}
      <article className="bg-[#1DB954] text-black rounded-b-md">
        <a
          href={props.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex gap-1 justify-center items-center text-center">
          Spotify
          <ExternalLink className="w-auto h-[.7rem] mb-2" />
        </a>
      </article>

      <Image
        className="absolute top-0 left-0 -z-10 h-full w-full opacity-80 dark:opacity-40 rounded-md"
        width={100}
        height={100}
        src={props.img}
        alt={props.alt}
      />
    </section>
  );
}
