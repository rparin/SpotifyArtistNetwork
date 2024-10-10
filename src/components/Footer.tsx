import { CR } from "@/constants/AppConstants";
import { ExternalLink } from "lucide-react";
import cn from "@/utils/cn";

export default function Footer(props: { className?: string }) {
  return (
    <div
      className={cn(
        "z-50 mx-auto flex w-full flex-col items-center gap-2 bg-black py-2 text-white",
        props.className
      )}>
      <section className="flex">
        <p className="text-xs text-white/30">{CR}</p>
        <a
          href="https://github.com/rparin/SpotifyArtistNetwork/tree/Express"
          aria-label="External link to source code"
          target="_blank"
          rel="noopener noreferrer">
          <ExternalLink className="h-[.7rem] w-auto opacity-40" />
        </a>
      </section>
    </div>
  );
}
