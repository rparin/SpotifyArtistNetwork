import { CR, SOURCE_CODE } from "@/constants/AppConstants";
import { ExternalLink } from "lucide-react";
import cn from "@/utils/cn";

export default function Footer(props: { className?: string }) {
  return (
    <footer
      className={cn(
        "z-50 mx-auto flex w-full flex-row items-center justify-center gap-1 bg-black py-3 text-white",
        props.className
      )}>
      <p className="text-xs text-white/80">{CR}</p>
      <a
        href={SOURCE_CODE}
        aria-label="External link to source code"
        target="_blank"
        rel="noopener noreferrer">
        <ExternalLink className="mb-2 h-[.7rem] w-auto opacity-70" />
      </a>
    </footer>
  );
}
