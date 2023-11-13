import { SEARCH_PLACEHOLDER } from "@/constants";
import { cn } from "@/lib/utils";

export default function Searchbox({ className }: { className?: string }) {
  const defaultStyle =
    "rounded-[7rem] h-14 px-7 w-[80%] lg:w-[50%] text-sm md:text-base shadow-lg focus:shadow-xl outline outline-black outline-2 dark:outline-white dark:bg-background";
  return (
    <input
      className={cn(defaultStyle, className)}
      type="text"
      placeholder={SEARCH_PLACEHOLDER}
    />
  );
}
