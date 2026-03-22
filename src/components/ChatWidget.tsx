"use client";

import { useState, useRef, useEffect, useCallback, type FormEvent } from "react";
import { MessageCircle, X, Send, Loader2, Home, MapPin, Calculator, Calendar } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const QUICK_ACTIONS = [
  { icon: Home, label: "Find a home", prompt: "I'm looking for a home in Philadelphia. Can you help me find something?" },
  { icon: MapPin, label: "Neighborhoods", prompt: "Tell me about the best neighborhoods in Philadelphia for families." },
  { icon: Calculator, label: "Affordability", prompt: "Can you help me estimate what I can afford? My budget is around $500K." },
  { icon: Calendar, label: "Book a tour", prompt: "I'd like to schedule a showing." },
];

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  // Close on escape
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
                "I'm having trouble connecting right now. Please call us at (215) 839-4172 or visit our contact page.",
            },
          ]);
        }
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "I'm having trouble connecting right now. Please call us at (215) 839-4172 or visit our contact page.",
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

  if (!mounted) return null;

  return (
    <>
      {/* Chat bubble trigger */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-[9997] flex h-14 w-14 items-center justify-center rounded-full bg-gold text-near-black shadow-lg shadow-gold/30 transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-gold/40 active:scale-95"
          aria-label="Open chat"
        >
          <MessageCircle className="size-6" strokeWidth={2} />
          {/* Notification dot */}
          <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex h-4 w-4 rounded-full bg-green-500 border-2 border-white" />
          </span>
        </button>
      )}

      {/* Chat window */}
      {open && (
        <div className="fixed bottom-4 right-4 z-[9997] flex h-[min(600px,85vh)] w-[min(400px,92vw)] flex-col overflow-hidden rounded-2xl border border-border/30 bg-white shadow-2xl shadow-black/20 animate-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="flex items-center justify-between bg-midnight px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gold/20">
                <MessageCircle className="size-5 text-gold" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">Tauro Assistant</h3>
                <p className="text-xs text-white/50">
                  {loading ? "Typing..." : "Online — Ask me anything"}
                </p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="rounded-lg p-1.5 text-white/50 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Close chat"
            >
              <X className="size-5" />
            </button>
          </div>

          {/* Messages area */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-cream/30">
            {/* Welcome message */}
            {messages.length === 0 && (
              <div className="space-y-4">
                <div className="rounded-xl bg-white p-4 shadow-sm border border-border/30">
                  <p className="text-sm text-foreground">
                    Hi! I&apos;m Tauro&apos;s AI assistant. I can help you find properties, explore Philadelphia neighborhoods, estimate mortgage payments, or schedule a showing. What can I help with?
                  </p>
                </div>

                {/* Quick action buttons */}
                <div className="grid grid-cols-2 gap-2">
                  {QUICK_ACTIONS.map((action) => (
                    <button
                      key={action.label}
                      onClick={() => sendMessage(action.prompt)}
                      className="flex items-center gap-2 rounded-lg border border-border/50 bg-white p-3 text-left text-xs font-medium text-foreground/80 shadow-sm transition-all hover:border-gold/40 hover:shadow-md hover:text-foreground"
                    >
                      <action.icon className="size-4 shrink-0 text-gold" />
                      {action.label}
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
                <div
                  className={`max-w-[85%] rounded-xl px-4 py-2.5 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-midnight text-white rounded-br-sm"
                      : "bg-white text-foreground shadow-sm border border-border/30 rounded-bl-sm"
                  }`}
                >
                  {msg.content.split("\n").map((line, j) => (
                    <p key={j} className={j > 0 ? "mt-2" : ""}>
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {loading && (
              <div className="flex justify-start">
                <div className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 shadow-sm border border-border/30">
                  <Loader2 className="size-4 animate-spin text-gold" />
                  <span className="text-xs text-muted-foreground">Thinking...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 border-t border-border/30 bg-white px-3 py-3"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about properties, neighborhoods..."
              disabled={loading}
              className="flex-1 rounded-lg border border-border/50 bg-cream/30 px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors focus:border-gold/50 focus:outline-none focus:ring-2 focus:ring-gold/20 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gold text-near-black transition-all hover:bg-gold-light disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Send message"
            >
              <Send className="size-4" />
            </button>
          </form>

          {/* Footer */}
          <div className="border-t border-border/20 bg-cream/50 px-4 py-1.5 text-center">
            <p className="text-[10px] text-muted-foreground/50">
              AI assistant — not a licensed agent. For formal advice, contact our team.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
