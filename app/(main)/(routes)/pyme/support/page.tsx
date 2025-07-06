"use client";

import { useState, useRef, useEffect } from "react";
import { Bot, Send } from "lucide-react";

export default function FixedChatSupport() {
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Hi 👋 I'm here to help your business. Ask me anything!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showQuickReplies, setShowQuickReplies] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async (text?: string) => {
    const userInput = text || input.trim();
    if (!userInput) return;

    setMessages((prev) => [...prev, { from: "user", text: userInput }]);
    setInput("");
    setLoading(true);
    setShowQuickReplies(false);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            {
              role: "system",
              content:
                "You are a helpful assistant that supports small businesses (PYMEs) with managing their profiles and posting projects.",
            },
            ...messages.map((msg) => ({
              role: msg.from === "bot" ? "assistant" : "user",
              content: msg.text,
            })),
            { role: "user", content: userInput },
          ],
        }),
      });

      const data = await res.json();
      const reply = data.reply || "Sorry, I didn't understand. Can you try again?";
      setMessages((prev) => [...prev, { from: "bot", text: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Oops, something went wrong. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const quickReplies = [
    "How do I register my business?",
    "Where can I see applications?",
    "How can I post a new project?",
    "How do I edit my company profile?",
  ];

  return (
    <div className="max-w-lg mx-auto h-[90vh] bg-white border border-gray-200 rounded-xl shadow-md flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2 text-[#0a2342] font-semibold text-lg px-4 py-3 border-b">
        <Bot className="w-6 h-6" />
        <span>Business Support</span>
      </div>

      {/* Chat scrollable area */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`transition-opacity duration-300 ${
              msg.from === "bot"
                ? "bg-gray-100 text-gray-800 self-start shadow-sm"
                : "bg-[#0a2342] text-white self-end ml-auto"
            } px-4 py-2 rounded-2xl text-sm max-w-[85%] whitespace-pre-wrap`}
          >
            {msg.text}
          </div>
        ))}
        {loading && (
          <p className="text-xs text-gray-400 italic">Typing...</p>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick replies + input (fixed bottom inside container) */}
      <div className="px-4 pb-4 pt-2 space-y-2 border-t bg-white">
        {showQuickReplies && (
          <div className="flex flex-wrap gap-2">
            {quickReplies.map((text, i) => (
              <button
                key={i}
                onClick={() => handleSend(text)}
                className="bg-zinc-100 text-gray-700 text-sm px-4 py-1.5 rounded-full hover:bg-zinc-200 hover:scale-105 transition-transform duration-200"
              >
                {text}
              </button>
            ))}
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex gap-2"
        >
          <input
            type="text"
            placeholder="Type your question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 px-4 py-2 rounded-full border text-gray-700 border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0a2342]"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-[#0a2342] text-white px-4 py-2 rounded-full hover:bg-[#081b34] transition disabled:opacity-50"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}
