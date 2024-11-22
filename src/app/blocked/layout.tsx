import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="flex-1">
        <Header showHomeLink={true} />
        {children}
      </div>
      {/* Display footer at the bottom */}
      <Footer />
    </main>
  );
}
