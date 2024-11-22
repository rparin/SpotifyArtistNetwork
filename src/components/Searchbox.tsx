"use client";
import React, { useState, useRef, useEffect } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import cn from "@/utils/cn";

const searchVariants = cva(
  "rounded-[7rem] w-full px-5 text-sm md:text-base shadow-lg focus:shadow-xl dark:bg-background",
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
      default: "w-[80%] md:w-[60%] max-w-2xl",
      sm: "w-[60%] md:w-[40%] lg:w-[30%]",
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
  queryRoute?: boolean;
  focus?: boolean;
}

const Searchbox = ({
  className,
  variant,
  size,
  placeholder,
  inputOnLoad,
  route = "/search",
  queryRoute = true,
  focus = false,
  ...props
}: SearchProps) => {
  // Hold search values
  const [searchValue, setSearch] = useState("");
  const [prevValue, setPrev] = useState("");

  const setHelper = (setFunc: (arg0: string) => void, val: string) => {
    setFunc(val.toLowerCase());
  };

  //Values for page load
  const ref = useRef<HTMLInputElement>(null);

  // Values for search use
  const router = useRouter();

  const changeInput = (val: string, prev: string = searchValue) => {
    if (ref.current) {
      ref.current.value = val;
      if (focus) ref.current.focus();
    }
    setHelper(setPrev, prev);
    setHelper(setSearch, val);
  };

  // Input value into searchbox on page load
  useEffect(() => {
    if (inputOnLoad && ref.current) {
      ref.current.value = inputOnLoad;
      setHelper(setPrev, inputOnLoad);
      setHelper(setSearch, inputOnLoad);
    }
    if (ref.current) {
      ref.current.focus();
    }
  }, [inputOnLoad]);

  // Set search value on input
  const handleInputChange = (event: {
    target: EventTarget & HTMLInputElement;
  }) => {
    setHelper(setSearch, event.target.value);
  };

  // Go to search page
  const handleClick = () => {
    if (searchValue == "" || prevValue == searchValue) {
      if (ref.current) {
        ref.current.focus();
      }
      return;
    }
    if (queryRoute) {
      router.push(`${route}?q=${searchValue}`);
    } else {
      router.push(`${route}/${searchValue}`);
    }
    setHelper(setPrev, searchValue);
  };

  const handleKeyDown = (event: { key: string }) => {
    if (event.key === "Enter") {
      handleClick();
    }
  };

  const getButton = () => {
    if (prevValue == searchValue && searchValue != "") {
      return (
        <button title="Search button" onClick={() => changeInput("")}>
          <X className={searchIconVariants({ variant })} />
        </button>
      );
    }
    return (
      <button title="Search button" onClick={handleClick}>
        <Search className={searchIconVariants({ variant })} />
      </button>
    );
  };

  const handleOnSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleClick();
  };

  return (
    <form
      role="search"
      onSubmit={handleOnSubmit}
      className={cn(sizeVariants({ size }))}>
      <label
        htmlFor="searchbar"
        aria-label="Spotify Artist Network Search Bar"></label>
      <input
        name="searchbar"
        id="searchbar"
        className={cn(searchVariants({ variant }), className)}
        ref={ref}
        type="text"
        placeholder={placeholder}
        onChange={handleInputChange}
        {...props}
      />
      {getButton()}
    </form>
  );
};

export { Searchbox };
