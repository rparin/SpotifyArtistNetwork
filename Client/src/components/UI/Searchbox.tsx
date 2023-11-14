import React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { Search } from "lucide-react";

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

const searchIconVariants = cva(
  "absolute rounded-md z-50 top-1 right-3 w-auto h-8 p-1",
  {
    variants: {
      variant: {
        default: "bg-background",
        secondary: "invert bg-white dark:bg-black",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface SearchProps
  extends React.HtmlHTMLAttributes<HTMLDivElement>,
    VariantProps<typeof searchVariants>,
    VariantProps<typeof sizeVariants> {
  placeholder?: string;
}

const Searchbox = React.forwardRef<HTMLDivElement, SearchProps>(
  ({ className, variant, size, placeholder, ...props }, ref) => {
    return (
      <div ref={ref} className={cn(sizeVariants({ size }))}>
        <input
          className={cn(searchVariants({ variant }), className)}
          type="text"
          placeholder={placeholder}
        />

        <Search className={searchIconVariants({ variant })} />
      </div>
    );
  }
);

Searchbox.displayName = "Searchbox";
export { Searchbox };
