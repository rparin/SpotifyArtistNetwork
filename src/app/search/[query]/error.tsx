"use client";
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
    <div className="mx-14 flex h-screen flex-col items-center justify-center gap-4 text-center">
      <h1 className="text-lg font-bold leading-tight">
        Sorry we could not fulfill your request
      </h1>
      <h2 className="text-base leading-none">
        Returning to the home page in:
        <CountdownNavigateTo className="pl-1" href={"/"} countdown={5000} />
      </h2>
    </div>
  );
}
