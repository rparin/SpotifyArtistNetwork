import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { GRAPH_INSTRUCTIONS } from "@/constants";

export default function NetworkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen flex flex-col">
      <div className="flex-1">
        <Header className="absolute top-0 right-0 z-50 w-full" />
        {children}
      </div>
      {/* Display footer at the bottom */}
      <Footer className="absolute z-50 bottom-0 w-full" />
    </main>
  );
}
