import { GRAPH_INSTRUCTIONS } from "@/constants";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="max-h-screen flex flex-col">
      <div className="flex-1">
        <Header className="absolute z-50 w-full" />
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
