"use client";
import React, { useRef, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function HorizontalList({
  id,
  items,
  hScrollAmt = 40,
  className,
}: {
  id: string;
  items: Array<string>;
  hScrollAmt?: number;
  className?: string;
}) {
  const ref = useRef<HTMLUListElement>(null);
  const [arrows, setArrows] = useState({ left: false, right: true });
  const centerGenre = items.length == 1 ? "pl-3 justify-center" : "";

  const genres = items.map((item, index) => {
    return (
      <li
        key={`${id}-Genre-${index}`}
        className={cn("bg-white dark:bg-black px-3 rounded-xl", className)}>
        {item}
      </li>
    );
  });

  const hScroll = (amt: number) => {
    if (!ref.current) return;
    ref.current.scrollLeft += amt;
  };

  useEffect(() => {
    const refCurrent = ref.current;
    const handleScroll = () => {
      if (!refCurrent) return;
      const arrowOffset = 15;

      // Disable left arrow when no items to the left
      if (refCurrent.scrollLeft <= arrowOffset) {
        setArrows({
          left: false,
          right: true,
        });
      }

      // Show both arrows when in the middle of the list
      else if (
        refCurrent.scrollLeft <=
        refCurrent.scrollWidth - ref.current.offsetWidth
      ) {
        setArrows({
          left: true,
          right: true,
        });
      }

      // Disable right arrow when at the end of the list
      if (
        refCurrent.scrollLeft >=
        refCurrent.scrollWidth - refCurrent.offsetWidth - arrowOffset
      ) {
        setArrows({
          left: true,
          right: false,
        });
      }
    };

    if (refCurrent) {
      refCurrent.addEventListener("scroll", handleScroll);
    }

    // cleanup function to remove event listener on unmount
    return () => {
      if (refCurrent) {
        refCurrent.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const getButtons = () => {
    if (items.length > 1) {
      return (
        <>
          <button
            onClick={() => hScroll(-hScrollAmt)}
            className="absolute top-[-2px] left-[-0.12rem] invisible group-hover:visible">
            {arrows.left && <ChevronLeft />}
          </button>
          <button
            onClick={() => hScroll(hScrollAmt)}
            className="absolute top-[-2px] right-[-0.12rem] invisible group-hover:visible">
            {arrows.right && <ChevronRight />}
          </button>
        </>
      );
    }
  };

  const getGenreTags = () => {
    // No genres to show
    if (items.length == 0) {
      return <span className="py-3"></span>;
    }

    // Display list of genres
    return (
      <div className="relative no-scrollbar w-full px-4 overflow-y-hidden group">
        {/* Display arrow buttons if more than 1 genre */}
        {getButtons()}
        <ul
          ref={ref}
          className={
            "flex gap-2 px-3 pl-7 dark:text-white text-black text-sm overflow-x-scroll no-scrollbar whitespace-nowrap horizontal-mask " +
            centerGenre
          }>
          {genres}
        </ul>
      </div>
    );
  };

  return <>{getGenreTags()}</>;
}
