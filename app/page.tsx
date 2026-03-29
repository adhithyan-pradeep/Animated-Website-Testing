import MatchaAnimation from "@/components/MatchaAnimation";

export const metadata = {
  title: "Artisan Iced Matcha Latte",
  description: "Experience the ultimate cold brew with our scrollytelling visual journey.",
};

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-white/30">
      <MatchaAnimation />
      
      {/* Optional extra section footer */}
      <footer className="py-24 flex items-center justify-center text-white/40 bg-black border-t border-white/10 font-light text-sm tracking-[0.2em]">
        <p>© {new Date().getFullYear()} ARTISAN MATCHA. EVERY DROP COUNTS.</p>
      </footer>
    </main>
  );
}
