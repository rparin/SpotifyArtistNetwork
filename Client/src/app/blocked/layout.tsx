import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen flex flex-col">
      <div className="flex-1">
        <Header showHomeBtn={true} />
        {children}
      </div>
      {/* Display footer at the bottom */}
      <Footer />
    </main>
  );
}
