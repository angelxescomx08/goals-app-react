import { useState } from "react";
import { sendMessage, type StreamChunk } from "../actions/chatActions";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage, { role: "assistant", content: "" }]);
    
    setInput("");
    setIsLoading(true);

    try {
      await sendMessage(
        { type: "user", content: userMessage.content },
        (chunk: StreamChunk) => {
          if (chunk.type === "text") {
            setMessages((prev) => {
              const newMessages = [...prev];
              const lastMessage = newMessages[newMessages.length - 1];
              if (lastMessage && lastMessage.role === "assistant") {
                lastMessage.content += chunk.content;
              }
              return newMessages;
            });
          }
        }
      );
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-100px)] max-w-3xl mx-auto p-4">
      <div className="flex-1 overflow-y-auto space-y-4 mb-4 border p-4 rounded bg-gray-50">
        {messages.map((msg, i) => (
          <div key={i} className={msg.role === "assistant" ? "text-blue-700" : "text-gray-900"}>
            <div className="font-bold">{msg.role === "assistant" ? "AI" : "Tú"}</div>
            <div className="whitespace-pre-wrap">{msg.content}</div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe un mensaje..."
          className="flex-1 border rounded px-3 py-2"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 text-white px-6 py-2 rounded disabled:opacity-50"
        >
          {isLoading ? "..." : "Enviar"}
        </button>
      </form>
    </div>
  );
}