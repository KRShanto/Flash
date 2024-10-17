import HomeNavbar from "@/components/HomeNavbar";
import HomeHero from "@/components/HomeHero";
import HomeContent from "@/components/HomeContent";

export default function HomePage() {
  return (
    <main className="h-full overflow-auto bg-[#111827]">
      <div className="mx-auto h-full w-full max-w-screen-xl">
        <HomeNavbar />
        <HomeHero />
        {/* <HomeContent /> */}
      </div>
    </main>
  );
}
