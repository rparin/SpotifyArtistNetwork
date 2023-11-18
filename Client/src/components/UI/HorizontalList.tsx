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
    const handleScroll = () => {
      if (!ref.current) return;
      const arrowOffset = 15;

      // Disable left arrow when no items to the left
      if (ref.current.scrollLeft <= arrowOffset) {
        setArrows({
          left: false,
          right: true,
        });
      }

      // Show both arrows when in the middle of the list
      else if (
        ref.current.scrollLeft <=
        ref.current.scrollWidth - ref.current.offsetWidth
      ) {
        setArrows({
          left: true,
          right: true,
        });
      }

      // Disable right arrow when at the end of the list
      if (
        ref.current.scrollLeft >=
        ref.current.scrollWidth - ref.current.offsetWidth - arrowOffset
      ) {
        setArrows({
          left: true,
          right: false,
        });
      }
    };

    if (ref && ref.current) {
      ref.current.addEventListener("scroll", handleScroll);
    }

    // cleanup function to remove event listener on unmount
    return () => {
      if (ref.current) {
        ref.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <>
      {/* No Genres */}
      {items.length == 0 ? (
        <span className="py-3 block bg-white"></span>
      ) : (
        // Display genre list
        <div className="relative no-scrollbar w-full px-4 overflow-y-hidden group">
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
          <ul
            ref={ref}
            className="flex gap-2 px-3 dark:text-white text-black text-sm overflow-x-scroll no-scrollbar whitespace-nowrap horizontal-mask">
            {genres}
          </ul>
        </div>
      )}
    </>
  );
}
