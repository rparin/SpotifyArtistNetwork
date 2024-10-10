import getMetadata from "./metadata";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { GRAPH_INSTRUCTIONS } from "@/constants/GraphConstants";

export async function generateMetadata({ params }: { params: { id: string } }) {
  return getMetadata(params.id);
}

export default function networkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex max-h-screen flex-col">
      <div className="flex-1">
        <Header
          className="absolute top-0 z-50 m-0 w-full px-7"
          showHomeBtn={true}
        />
        {children}
      </div>
      <p className="absolute bottom-8 z-50 hidden w-full justify-center text-center text-xs md:flex">
        {GRAPH_INSTRUCTIONS}
      </p>
      {/* Display footer at the bottom */}
      <Footer className="absolute bottom-0 z-50 w-full" />
    </main>
  );
}
