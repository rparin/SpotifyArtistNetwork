import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Landing from "@/components/PageComponents/Landing";

export default function Home() {
  return (
    <main className="max-h-screen flex flex-col">
      <div className="flex-1">
        <Header />
        <Landing />
      </div>
      {/* Display footer at the bottom */}
      <Footer />
    </main>
  );
}
