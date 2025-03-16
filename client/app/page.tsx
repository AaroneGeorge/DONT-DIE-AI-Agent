import ChatInterface from "@/components/chat-interface";
import Iridescence from "@/components/Iridescence";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center relative">
      {/* Iridescence background */}
      <div className="absolute inset-0 w-full h-full -z-10">
        <Iridescence
          color={[1, 1, 1]}
          mouseReact={false}
          amplitude={0.1}
          speed={1.0}
        />
      </div>

      <div className="container max-w-5xl px-4 relative z-10">
        <ChatInterface />
      </div>
    </main>
  );
}
