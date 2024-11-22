import getMetadata from "./metadata";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Searchbox } from "@/components/Searchbox";
import {
  APP_NAME,
  SEARCH_PLACEHOLDER,
  SEARCH_RESULT_HELP,
} from "@/constants/AppConstants";

export async function generateMetadata({
  params,
}: {
  params: { query: string };
}) {
  return getMetadata(params.query);
}

export default function searchResultsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { query: string };
}) {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="flex-1">
        <Header />
        <div className="flex flex-col items-center gap-5 px-5 pt-10 text-center md:flex-row md:pt-5">
          <Link href={"/"}>
            <h1 className="text-xl font-bold md:pl-10 lg:text-2xl">
              {APP_NAME}
            </h1>
          </Link>
          <Searchbox
            placeholder={SEARCH_PLACEHOLDER}
            size="md"
            inputOnLoad={decodeURIComponent(params.query)}
            queryRoute={false}
            focus={true}
          />
        </div>
        <div className="mx-6 mb-10 mt-5 flex flex-wrap items-center justify-center gap-3 md:mx-12 lg:mx-28">
          <p className="w-full text-center font-semibold opacity-80">
            {SEARCH_RESULT_HELP}
          </p>
          {children}
        </div>
      </div>
      {/* Display footer at the bottom */}
      <Footer />
    </main>
  );
}
