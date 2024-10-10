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
  // useEffect(() => {
  //   console.error(error);
  // }, [error]);

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="text-2xl leading-none md:text-3xl">
        Sorry we could fulfill your request
      </h1>
      <h2 className="text-base leading-none md:text-xl">
        Returning to the home page in:
        <CountdownNavigateTo className="pl-1" href={"/"} countdown={5000} />
      </h2>
    </div>
  );
}
