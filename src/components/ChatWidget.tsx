"use client";

import { useState, useRef, useEffect, useCallback, type FormEvent } from "react";
import {
  MessageCircle,
  X,
  Send,
  Home,
  MapPin,
  Calculator,
  Calendar,
  Sparkles,
  RotateCcw,
} from "lucide-react";
import Image from "next/image";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const QUICK_ACTIONS = [
  {
    icon: Home,
    label: "Find a home",
    prompt:
      "I'm looking for a home in Philadelphia. What do you have available right now?",
  },
  {
    icon: MapPin,
    label: "Explore neighborhoods",
    prompt:
      "Tell me about the best neighborhoods in Philadelphia — what are the vibes, prices, and walkability?",
  },
  {
    icon: Calculator,
    label: "Mortgage estimate",
    prompt:
      "Can you estimate my monthly mortgage payment if I buy a $500K home?",
  },
  {
    icon: Calendar,
    label: "Schedule a tour",
    prompt: "I'd like to schedule a property showing this week.",
  },
];

/** Render markdown-lite: bold, links, line breaks */
function renderContent(text: string) {
  return text.split("\n").map((line, i) => {
    // Bold: **text**
    const parts = line.split(/(\*\*[^*]+\*\*)/g).map((part, j) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={j} className="font-semibold">
            {part.slice(2, -2)}
          </strong>
        );
      }
      // Links: convert /path references to clickable links
      return part.split(/(\/(?:properties|agents|contact|neighborhoods|sell|about|home-value)(?:\/\S*)?)/g).map((seg, k) => {
        if (seg.startsWith("/")) {
          return (
            <a
              key={k}
              href={seg}
              className="text-gold underline underline-offset-2 hover:text-gold-dark"
            >
              {seg}
            </a>
          );
        }
        return seg;
      });
    });

    if (!line.trim()) return <br key={i} />;

    // Bullet points
    if (line.trim().startsWith("- ") || line.trim().startsWith("• ")) {
      return (
        <p key={i} className={`flex gap-1.5 ${i > 0 ? "mt-1" : ""}`}>
          <span className="shrink-0 text-gold">•</span>
          <span>{parts}</span>
        </p>
      );
    }

    return (
      <p key={i} className={i > 0 ? "mt-1.5" : ""}>
        {parts}
      </p>
    );
  });
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open]);

  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim() || loading) return;

      const userMessage: Message = { role: "user", content: content.trim() };
      const updatedMessages = [...messages, userMessage];
      setMessages(updatedMessages);
      setInput("");
      setLoading(true);

      // Reset textarea height
      if (inputRef.current) inputRef.current.style.height = "auto";

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: updatedMessages.map((m) => ({
              role: m.role,
              content: m.content,
            })),
          }),
        });

        const data = await res.json();

        if (res.ok && data.reply) {
          setMessages((prev) => [
            ...prev,
            { role: "assistant", content: data.reply },
          ]);
        } else {
          setMessages((prev) => [
            ...prev,
            {
              role: "assistant",
              content:
                "I'm having trouble connecting right now. Please call us at **(215) 839-4172** or visit /contact.",
            },
          ]);
        }
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "I'm having trouble connecting right now. Please call us at **(215) 839-4172** or visit /contact.",
          },
        ]);
      } finally {
        setLoading(false);
      }
    },
    [messages, loading]
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const resetChat = () => {
    setMessages([]);
    setInput("");
  };

  if (!mounted) return null;

  return (
    <>
      {/* Floating chat trigger — subtle icon */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-[9997] flex h-12 w-12 items-center justify-center rounded-full bg-midnight text-gold shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
          aria-label="Chat with Tauro AI"
        >
          <MessageCircle className="size-5" strokeWidth={2} />
        </button>
      )}

      {/* Chat window */}
      {open && (
        <div className="fixed bottom-4 right-4 z-[9997] flex h-[min(640px,88vh)] w-[min(420px,93vw)] flex-col overflow-hidden rounded-2xl border border-white/10 bg-white shadow-2xl shadow-black/25">
          {/* Header */}
          <div className="relative flex items-center justify-between bg-gradient-to-r from-midnight to-[#252545] px-4 py-4">
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-gold/30 bg-midnight">
                <Image
                  src="/tauro-logo-white.png"
                  alt="Tauro"
                  fill
                  className="object-contain p-1"
                  sizes="40px"
                />
              </div>
              <div>
                <h3 className="flex items-center gap-1.5 text-sm font-semibold text-white">
                  Tauro AI
                  <span className="inline-flex items-center rounded-full bg-gold/20 px-1.5 py-0.5 text-[10px] font-medium text-gold">
                    PRO
                  </span>
                </h3>
                <div className="flex items-center gap-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                  </span>
                  <p className="text-[11px] text-white/50">
                    {loading ? "Typing a response..." : "Online now"}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              {messages.length > 0 && (
                <button
                  onClick={resetChat}
                  className="rounded-lg p-2 text-white/40 transition-colors hover:bg-white/10 hover:text-white"
                  aria-label="New conversation"
                  title="New conversation"
                >
                  <RotateCcw className="size-4" />
                </button>
              )}
              <button
                onClick={() => setOpen(false)}
                className="rounded-lg p-2 text-white/40 transition-colors hover:bg-white/10 hover:text-white"
                aria-label="Close chat"
              >
                <X className="size-5" />
              </button>
            </div>
          </div>

          {/* Messages area */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-gradient-to-b from-cream/40 to-white">
            {/* Welcome state */}
            {messages.length === 0 && (
              <div className="space-y-4">
                {/* Welcome card */}
                <div className="rounded-2xl bg-gradient-to-br from-midnight to-[#252545] p-5 text-white">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="size-4 text-gold" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-gold">
                      AI-Powered
                    </span>
                  </div>
                  <p className="text-[15px] font-medium leading-snug">
                    Hi! I&apos;m your Philadelphia real estate expert.
                  </p>
                  <p className="mt-1.5 text-sm text-white/60 leading-relaxed">
                    I know every listing, neighborhood, and market trend. How can I help you today?
                  </p>
                </div>

                {/* Quick actions */}
                <div className="grid grid-cols-2 gap-2">
                  {QUICK_ACTIONS.map((action) => (
                    <button
                      key={action.label}
                      onClick={() => sendMessage(action.prompt)}
                      className="group flex items-center gap-2.5 rounded-xl border border-border/40 bg-white p-3.5 text-left transition-all hover:border-gold/50 hover:shadow-md hover:shadow-gold/5 hover:-translate-y-0.5"
                    >
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gold/10 transition-colors group-hover:bg-gold/20">
                        <action.icon className="size-4 text-gold" />
                      </div>
                      <span className="text-xs font-medium text-foreground/70 group-hover:text-foreground">
                        {action.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Message history */}
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "assistant" && (
                  <div className="mr-2 mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold/10">
                    <Sparkles className="size-3.5 text-gold" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 text-[13px] leading-relaxed ${
                    msg.role === "user"
                      ? "bg-midnight text-white rounded-br-md"
                      : "bg-white text-foreground shadow-sm border border-border/20 rounded-bl-md"
                  }`}
                >
                  {renderContent(msg.content)}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {loading && (
              <div className="flex justify-start">
                <div className="mr-2 mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold/10">
                  <Sparkles className="size-3.5 text-gold" />
                </div>
                <div className="flex items-center gap-1.5 rounded-2xl bg-white px-4 py-3 shadow-sm border border-border/20">
                  <div className="flex gap-1">
                    <span className="h-2 w-2 rounded-full bg-gold/60 animate-bounce [animation-delay:0ms]" />
                    <span className="h-2 w-2 rounded-full bg-gold/60 animate-bounce [animation-delay:150ms]" />
                    <span className="h-2 w-2 rounded-full bg-gold/60 animate-bounce [animation-delay:300ms]" />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <div className="border-t border-border/20 bg-white px-3 py-3">
            <form
              onSubmit={handleSubmit}
              className="flex items-end gap-2 rounded-xl border border-border/40 bg-cream/30 px-3 py-2 transition-colors focus-within:border-gold/50 focus-within:ring-2 focus-within:ring-gold/10"
            >
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  // Auto-resize
                  e.target.style.height = "auto";
                  e.target.style.height = Math.min(e.target.scrollHeight, 80) + "px";
                }}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything about Philly real estate..."
                disabled={loading}
                rows={1}
                className="flex-1 resize-none bg-transparent text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none disabled:opacity-50"
                style={{ maxHeight: "80px" }}
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gold text-near-black transition-all hover:bg-gold-light active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Send message"
              >
                <Send className="size-3.5" />
              </button>
            </form>
            <p className="mt-1.5 text-center text-[10px] text-muted-foreground/40">
              AI assistant — for formal advice, contact our team directly
            </p>
          </div>
        </div>
      )}
    </>
  );
}
