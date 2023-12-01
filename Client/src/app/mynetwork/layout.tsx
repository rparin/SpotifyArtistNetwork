import { APP_NAME } from "@/constants";
import { ThemeToggle } from "@/components/UI/ThemeToggle";
import Footer from "@/components/Footer";
import { Home } from "lucide-react";
import Link from "next/link";

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen flex flex-col">
      <div className="flex-1">
        <div className="flex justify-between mx-5 pt-5">
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
      {/* Display footer at the bottom */}
      <Footer />
    </main>
  );
}
