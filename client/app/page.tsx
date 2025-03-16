import ChatInterface from "@/components/chat-interface"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-white to-slate-100">
      <div className="container max-w-5xl px-4">
        <ChatInterface />
      </div>
    </main>
  )
}

