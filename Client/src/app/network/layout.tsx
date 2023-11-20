import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { GRAPH_INSTRUCTIONS } from "@/constants";

export default function NetworkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <Header className="absolute top-0 right-0 z-50" />
      {children}

      <div className="flex flex-col w-full text-center justify-center absolute bottom-0">
        <p className="text-xs dark:opacity-50 text-black dark:text-white">
          {GRAPH_INSTRUCTIONS}
        </p>
        <Footer />
      </div>
    </main>
  );
}
