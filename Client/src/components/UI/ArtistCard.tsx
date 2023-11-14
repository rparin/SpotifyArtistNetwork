import { ExternalLink } from "lucide-react";
import Image from "next/image";

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
  const genres = props.genres.map((genre) => {
    return <li className="bg-white px-3 rounded-xl">{genre}</li>;
  });

  return (
    <section className="w-full max-w-[15rem]">
      {/* Artist Music Info */}
      <article className="bg-slate-800 rounded-t-md flex flex-col text-center items-center py-3 gap-2">
        <Image
          className="w-auto h-32 object-contain rounded-[50%]"
          width={100}
          height={100}
          src={props.img}
          alt={props.alt}
        />
        <h2 className="text-3xl font-medium">{props.name}</h2>
        <ul className="flex gap-2 px-5 w-full h-auto overflow-x-scroll whitespace-nowrap no-scrollbar text-black text-sm">
          {genres}
        </ul>
      </article>

      {/* Artist Social Info */}
      <article className="bg-slate-800 grid grid-cols-2 gap-1">
        <div className="bg-slate-600 flex flex-col justify-center items-center text-center py-2">
          <p>Followers</p>
          <p className="font-medium">{props.followers}</p>
        </div>
        <div className="bg-slate-600 flex flex-col justify-center items-center text-center py-2">
          <p>Popularity</p>
          <p className="font-medium">{props.pop}</p>
        </div>
      </article>

      {/* Spotify Link to Artist */}
      <article className="bg-emerald-800 flex justify-center items-center text-center gap-1 rounded-b-md">
        <p>Spotify</p>
        <a href={props.url} target="_blank" rel="noopener noreferrer">
          <ExternalLink className="w-auto h-[.7rem] mb-1" />
        </a>
      </article>
    </section>
  );
}
