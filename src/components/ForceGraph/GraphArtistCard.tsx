import React from "react";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import abbreviateNumber from "@/utils/abbreviateNumber";
import { SpotifyGraphArtistCard } from "@/dto/Spotify/SpotifyGraphArtistCardDto";
import { NO_IMAGE } from "@/constants/SpotifyConstants";

const GraphArtistCard = React.forwardRef<HTMLElement, SpotifyGraphArtistCard>(
  ({ name, img, alt, followers, url }, ref) => {
    return (
      <section ref={ref} className="relative w-96 rounded-md">
        <article className="flex items-center gap-2 rounded-md px-2 py-2 backdrop-blur-md">
          <Image
            className="h-24 w-24 rounded-[50%] object-cover"
            width={100}
            height={100}
            src={img ? img : NO_IMAGE}
            alt={alt}
          />
          <div className="flex w-64 flex-col gap-1">
            <h2 className="line-clamp-1 flex justify-center text-center text-xl font-medium">
              {name}
            </h2>
            <div className="flex justify-center gap-2 bg-slate-200/40 py-1 dark:bg-slate-600/60">
              <h3 className="text-xs font-normal">Followers</h3>
              <p className="text-xs font-medium">
                {abbreviateNumber(followers)}
              </p>
            </div>

            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="horizontal-mask flex w-full items-center justify-center gap-1 rounded-br-md bg-[#1DB954] text-center text-xs">
              Spotify
              <ExternalLink className="mb-2 h-[.7rem] w-auto" />
            </a>
          </div>
        </article>
        <Image
          className="absolute left-0 top-0 -z-10 h-full w-full rounded-md opacity-80 dark:opacity-40"
          width={100}
          height={100}
          src={img ? img : NO_IMAGE}
          alt={alt}
        />
      </section>
    );
  }
);

GraphArtistCard.displayName = "GraphArtistCard";

export default GraphArtistCard;
