import { APP_NAME } from "@/constants";
import { ThemeToggle } from "@/components/UI/ThemeToggle";
import Footer from "@/components/Footer";
import { Home } from "lucide-react";
import Link from "next/link";
import { GRAPH_INSTRUCTIONS } from "@/constants";

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="max-h-screen flex flex-col">
      <div className="flex-1">
        <div className="absolute z-50 flex w-full justify-between px-5 mt-5">
          <Link
            className="md:p-0 p-2 rounded-3xl md:rounded-none bg-primary text-primary-foreground md:text-primary md:bg-transparent"
            href={"/"}>
            <h1 className="text-lg hidden md:block py-2">{APP_NAME}</h1>
            <Home className="md:hidden" />
          </Link>
          <ThemeToggle className="rounded-[2rem]" />
        </div>
        {children}
      </div>
      <p className="absolute z-50 bottom-8 w-full text-xs hidden md:flex justify-center text-center ">
        {GRAPH_INSTRUCTIONS}
      </p>
      {/* Display footer at the bottom */}
      <Footer className="absolute z-50 bottom-0 w-full" />
    </main>
  );
}
