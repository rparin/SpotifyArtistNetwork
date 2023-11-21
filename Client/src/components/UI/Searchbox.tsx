"use client";
import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

const searchVariants = cva(
  "rounded-[7rem] w-full px-4 text-sm md:text-base shadow-lg focus:shadow-xl dark:bg-background",
  {
    variants: {
      variant: {
        default: "outline outline-black outline-2 dark:outline-white",
        secondary: "bg-black dark:bg-white text-white dark:text-black",
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
      sm: "w-[60%] md:w-[50%] lg:w-[30%]",
      md: "w-[80%] md:w-[50%] lg:w-[40%]",
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
        default: "bg-white dark:bg-background",
        secondary: "invert bg-white dark:bg-black",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface SearchProps
  extends React.HtmlHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof searchVariants>,
    VariantProps<typeof sizeVariants> {
  placeholder?: string;
  inputOnLoad?: string | undefined | null;
  route?: string;
}

const Searchbox = ({
  className,
  variant,
  size,
  placeholder,
  inputOnLoad,
  route = "/search",
  ...props
}: SearchProps) => {
  // Hold search values
  const [searchValue, setSearch] = useState("");
  const [prevValue, setPrev] = useState("");

  //Values for page load
  const ref = useRef<HTMLInputElement>(null);

  // Values for search use
  const router = useRouter();

  // Input value into searchbox on page load
  useEffect(() => {
    if (ref.current && inputOnLoad) {
      ref.current.value = inputOnLoad;
    }

    if (ref.current) {
      ref.current.focus();
    }
  }, []);

  // Set search value on input
  const handleInputChange = (event: {
    target: EventTarget & HTMLInputElement;
  }) => {
    setSearch(event.target.value);
  };

  // Set query param and go to search page
  const handleClick = () => {
    if (searchValue == "" || prevValue == searchValue) return;
    router.push(`${route}?q=${searchValue}`);
    setPrev(searchValue);
  };

  const handleKeyDown = (event: { key: string }) => {
    if (event.key === "Enter") {
      handleClick();
    }
  };

  return (
    <div className={cn(sizeVariants({ size }))}>
      <input
        ref={ref}
        className={cn(searchVariants({ variant }), className)}
        type="text"
        placeholder={placeholder}
        onKeyDown={handleKeyDown}
        onChange={handleInputChange}
        {...props}
      />

      <button onClick={handleClick}>
        <Search className={searchIconVariants({ variant })} />
      </button>
    </div>
  );
};

export { Searchbox };
