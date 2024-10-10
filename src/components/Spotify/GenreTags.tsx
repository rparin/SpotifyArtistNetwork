"use client";
import React, { useRef, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import cn from "@/utils/cn";

export default function GenreTags({
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
        className={cn("rounded-xl bg-white px-3 dark:bg-black", className)}>
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
            className="invisible absolute left-[-0.12rem] top-[-2px] group-hover:visible">
            {arrows.left && <ChevronLeft />}
          </button>
          <button
            onClick={() => hScroll(hScrollAmt)}
            className="invisible absolute right-[-0.12rem] top-[-2px] group-hover:visible">
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
      <div className="no-scrollbar group relative w-full overflow-y-hidden px-4">
        {/* Display arrow buttons if more than 1 genre */}
        {getButtons()}
        <ul
          ref={ref}
          className={
            "no-scrollbar horizontal-mask flex gap-2 overflow-x-scroll whitespace-nowrap px-3 pl-7 text-sm text-black dark:text-white " +
            centerGenre
          }>
          {genres}
        </ul>
      </div>
    );
  };

  return <>{getGenreTags()}</>;
}
