"use client";
import { useEffect } from "react";
import CountdownNavigateTo from "@/components/CountdownNavigateTo";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    // console.error(error);
  }, [error]);

  return (
    <div className="flex h-screen flex-col items-center gap-5">
      <h1 className="text-xl leading-none md:text-2xl">
        Sorry we could fulfill your request
      </h1>
      <h2 className="text-base leading-none md:text-xl">
        Returning to home page in:
        <CountdownNavigateTo className="pl-1" href={"/"} countdown={5000} />
      </h2>
      <h3 className="mb-60 text-sm md:text-base">(Internal Server Error)</h3>
    </div>
  );
}
