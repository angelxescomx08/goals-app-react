export type ChatMessage = {
  type: "user" | "assistant";
  content: string;
};

export type StreamChunk =
  | { type: "text"; content: string }
  | { type: "final"; content: string };

export async function sendMessage(
  message: { type: string; content: string },
  onChunk: (chunk: StreamChunk) => void
) {
  const res = await fetch(`${import.meta.env.VITE_URL_SERVER}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ message }),
  });

  if (!res.body) throw new Error("No response body");

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });

    const lines = buffer.split("\n");
    buffer = lines.pop() || "";

    for (const line of lines) {
      if (!line.trim()) continue;
      try {
        const parsed = JSON.parse(line);
        onChunk(parsed);
      } catch (error) {
        console.error(error);
      }
    }
  }

  if (buffer.trim()) {
    try {
      onChunk(JSON.parse(buffer));
    } catch (error) {
      console.error(error);
    }
  }
}