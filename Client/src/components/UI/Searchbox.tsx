import React from "react";
import Image from "next/image";
import { SEARCH_PLACEHOLDER } from "@/constants";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import searchIco from "@icons/search.svg";

const searchVariants = cva(
  "rounded-[7rem] w-full px-4 text-sm md:text-base shadow-lg focus:shadow-xl dark:bg-background",
  {
    variants: {
      variant: {
        default: "outline outline-black outline-2 dark:outline-white",
        secondary: "bg-black dark:bg-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const sizeVariants = cva("relative h-10 flex justify-start", {
  variants: {
    size: {
      default: "w-5/6 md:w-9/12 lg:w-4/12",
      sm: "",
      md: "w-[90%] md:w-[50%]",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

export interface SearchProps
  extends React.HtmlHTMLAttributes<HTMLDivElement>,
    VariantProps<typeof searchVariants>,
    VariantProps<typeof sizeVariants> {}

const Searchbox = React.forwardRef<HTMLDivElement, SearchProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <div className={cn(sizeVariants({ size }))}>
        <input
          className={cn(searchVariants({ variant }), className)}
          type="text"
          placeholder={SEARCH_PLACEHOLDER}
        />

        <div
          className={
            "absolute bg-background rounded-md z-50 top-1 right-3" +
            (variant == "secondary" ? " bg-black dark:bg-white " : "")
          }>
          <Image
            className={
              "w-auto h-8 dark:invert p-1" +
              (variant == "secondary" ? " invert dark:invert-0 opacity-60" : "")
            }
            src={searchIco}
            alt="Icon of magnifying glass"
          />
        </div>
      </div>
    );
  }
);

Searchbox.displayName = "Searchbox";
export { Searchbox, searchVariants, sizeVariants };
