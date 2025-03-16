"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Send, Mic, User, Bot, Sparkles, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

type Message = {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your Blueprint AI assistant. How can I help optimize your health and longevity today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [showWelcome, setShowWelcome] = useState(false)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return

    const newUserMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, newUserMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate bot response after a delay
    setTimeout(() => {
      const botResponses = [
        "Based on your biomarkers, I recommend increasing your daily protein intake to 1.6g per kg of body weight.",
        "Your sleep optimization could benefit from reducing blue light exposure 2 hours before bedtime.",
        "I've analyzed your data and suggest adding a NAD+ supplement to your regimen for cellular health.",
        "Your current exercise pattern shows good cardiovascular engagement, but could use more resistance training for longevity benefits.",
      ]

      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)]

      const newBotMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: randomResponse,
        sender: "bot",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, newBotMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  return (
    <div className="relative w-full h-[80vh] rounded-2xl bg-white shadow-xl border border-slate-200 overflow-hidden">
      <div className="absolute inset-0 opacity-10 z-0">
        <img
          src="https://i.pinimg.com/736x/ad/90/5c/ad905c46f299a8929d8622e7d0c872df.jpg"
          alt="Blueprint Tech Background"
          className="w-full h-full object-cover"
        />
      </div>
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 bg-navy-900 text-white p-4 flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Sparkles className="h-6 w-6 text-cyan-400" />
            <motion.div
              className="absolute -inset-1 rounded-full bg-cyan-400/20"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            />
          </div>
          <h1 className="text-xl font-bold">Blueprint Chat</h1>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-sm text-slate-300">AI Active</span>
        </div>
      </div>

      {/* Welcome overlay */}
      <AnimatePresence>
        {showWelcome && (
          <motion.div
            className="absolute inset-0 bg-navy-900/95 z-20 flex flex-col items-center justify-center p-6 text-white"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="relative mb-6"
            >
              <div className="h-24 w-24 rounded-full bg-gradient-to-r from-blue-600 to-cyan-400 flex items-center justify-center">
                <Sparkles className="h-12 w-12 text-white" />
              </div>
              <motion.div
                className="absolute -inset-2 rounded-full border-2 border-cyan-400/30"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              />
            </motion.div>

            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-3xl font-bold mb-3 text-center"
            >
              Welcome to Blueprint AI
            </motion.h2>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-center text-slate-300 max-w-md mb-8"
            >
              Your personal health optimization assistant powered by science and data-driven insights
            </motion.p>

            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.8 }}>
              <Button
                onClick={() => setShowWelcome(false)}
                className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white px-8 py-6 rounded-xl"
              >
                Start Optimizing
              </Button>
            </motion.div>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              onClick={() => setShowWelcome(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="h-6 w-6" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Messages container */}
      <div className="h-full pt-16 pb-20 overflow-y-auto px-4 bg-gradient-to-b from-slate-50 to-white/80 relative z-1">
        <div className="space-y-4 py-4">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={cn(
                "flex items-start gap-3",
                message.sender === "user" ? "ml-auto max-w-[85%] justify-end" : "mr-auto max-w-[85%]",
              )}
            >
              <div
                className={cn(
                  "flex items-center justify-center h-8 w-8 rounded-full shrink-0",
                  message.sender === "user" ? "bg-blue-600 order-2" : "bg-navy-900 order-1",
                )}
              >
                {message.sender === "user" ? (
                  <User className="h-5 w-5 text-white" />
                ) : (
                  <Bot className="h-5 w-5 text-cyan-400" />
                )}
              </div>
              <div
                className={cn(
                  "rounded-2xl px-4 py-3",
                  message.sender === "user" ? "bg-blue-600 text-white order-1" : "bg-slate-100 text-navy-900 order-2",
                )}
              >
                <p>{message.content}</p>
                <p className={cn("text-xs mt-1", message.sender === "user" ? "text-blue-200" : "text-slate-500")}>
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </motion.div>
          ))}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-3 max-w-[85%] mr-auto"
            >
              <div className="flex items-center justify-center h-8 w-8 rounded-full shrink-0 bg-navy-900">
                <Bot className="h-5 w-5 text-cyan-400" />
              </div>
              <div className="rounded-2xl px-4 py-3 bg-slate-100 text-navy-900">
                <div className="flex gap-1">
                  <motion.div
                    className="h-2 w-2 rounded-full bg-slate-400"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY, delay: 0 }}
                  />
                  <motion.div
                    className="h-2 w-2 rounded-full bg-slate-400"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY, delay: 0.2 }}
                  />
                  <motion.div
                    className="h-2 w-2 rounded-full bg-slate-400"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY, delay: 0.4 }}
                  />
                </div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input area */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4">
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about health optimization..."
            className="flex-1 bg-slate-100 border-slate-200 focus-visible:ring-blue-500"
          />
          <Button
            onClick={handleSendMessage}
            disabled={inputValue.trim() === ""}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Send className="h-5 w-5" />
          </Button>
          <Button variant="outline" className="border-slate-200">
            <Mic className="h-5 w-5 text-slate-500" />
          </Button>
        </div>
        <div className="mt-2 text-xs text-slate-500 flex items-center gap-1">
          <div className="h-1 w-1 rounded-full bg-cyan-500 animate-pulse" />
          <span>Blueprint AI is optimized for health and longevity insights</span>
        </div>
      </div>
    </div>
  )
}

