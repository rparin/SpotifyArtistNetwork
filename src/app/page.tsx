import { APP_NAME, SEARCH_PLACEHOLDER } from "@/constants/AppConstants";
import { Searchbox } from "@/components/Searchbox";
import Link from "next/link";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function Home() {
  return (
    <main className="flex max-h-screen flex-col">
      <div className="flex-1">
        <Header />
        <div className="flex h-[70vh] flex-col items-center justify-center gap-7 text-center">
          <Link href={"/"}>
            <h1 className="text-xl font-bold leading-none md:text-3xl">
              {APP_NAME}
            </h1>
          </Link>
          <Searchbox placeholder={SEARCH_PLACEHOLDER} queryRoute={false} />
        </div>
      </div>
      {/* Display footer at the bottom */}
      <Footer />
    </main>
  );
}
