"use client";

import React, { useState } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages: Message[] = [
      ...messages,
      { role: "user", content: input },
    ];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer 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`,
          "HTTP-Referer": "http://localhost:3000", // đổi URL của bạn
          "X-Title": "My Chat App",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "deepseek/deepseek-r1-0528:free",
          messages: newMessages,
        }),
      });

      const data = await res.json();

      // Lấy nội dung phản hồi
      const reply = data?.choices?.[0]?.message?.content || "No response";

      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Error: could not fetch response." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col max-w-lg mx-auto h-screen p-4">
      <div className="flex-1 overflow-y-auto border p-2 rounded bg-white">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`my-2 p-2 rounded ${
              m.role === "user"
                ? "bg-blue-100 self-end"
                : "bg-gray-100 self-start"
            }`}
          >
            <strong>{m.role === "user" ? "You" : "AI"}: </strong>
            {m.content}
          </div>
        ))}
        {loading && <div className="text-gray-500 italic">AI is typing...</div>}
      </div>

      <div className="mt-2 flex">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 border rounded p-2"
          placeholder="Type your message..."
        />
        <button
          onClick={sendMessage}
          className="ml-2 bg-blue-500 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          Send
        </button>
      </div>
    </div>
  );
}
