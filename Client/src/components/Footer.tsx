import { FOOTER_PRIVACY, FOOTER_SEARCH_TEXT, CR } from "@/constants";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Footer(props: { className?: string }) {
  return (
    <div
      className={cn(
        "bg-black text-white mx-auto flex flex-col items-center gap-2 py-2 w-full z-50",
        props.className
      )}>
      {/* <section className="flex gap-5 text-sm">
        <a
          href=""
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline underline-offset-2">
          <p>{FOOTER_SEARCH_TEXT}</p>
        </a>
        <a
          href=""
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline underline-offset-2">
          <p>{FOOTER_PRIVACY}</p>
        </a>
      </section> */}
      <section className="flex">
        <p className="text-white/30 text-xs">{CR}</p>
        <a
          href="https://rparin.github.io"
          aria-label="External link to rparin portfolio website"
          target="_blank"
          rel="noopener noreferrer">
          <ExternalLink className="opacity-40 w-auto h-[.7rem]" />
        </a>
      </section>
    </div>
  );
}
