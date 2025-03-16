import ChatInterface from "@/components/chat-interface";
import Aurora from "@/components/Aurora";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center relative">
      {/* Iridescence background */}
      <div className="absolute inset-0 w-full h-full -z-10">
        <Aurora
          colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
        />
      </div>
      <div className="flex items-center gap-4 mb-12">
        <h1 className="text-6xl font-bold text-white tracking-tight hover:scale-105 transition-transform duration-300 drop-shadow-glow animate-pulse-slow">
          DON'T DIE
        </h1>
        <span className="text-xl text-gray-200 tracking-wide font-light opacity-90 hover:opacity-100 transition-opacity border-l border-gray-500 pl-4">
          Your AI Health Oracle | Unlock Bryan Johnson's Longevity Secrets 🧬
        </span>
      </div>
      <div className="container max-w-5xl px-4 relative z-10">
        <ChatInterface />
      </div>
    </main>
  );
}
