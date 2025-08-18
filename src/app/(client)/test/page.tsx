"use client";
import socket from "@/lib/socket";
import { useEffect, useState } from "react";

interface ChatMessage {
  senderId: string;
  receiverId: string;
  content: string;
}

export default function ChatPage() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [receiverId, setReceiverId] = useState<string | null>(null);
  const [onlineEmployees, setOnlineEmployees] = useState<string[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    socket.on("user_info", ({ userId, role }) => {
      setUserId(userId);
      setRole(role);
    });

    return () => {
      socket.off("user_info");
    };
  }, []);

  useEffect(() => {
    socket.on("receive_message", (data: ChatMessage) => {
      setMessages((prev) => [...prev, data]);
    });

    socket.on("online_employees", (list: string[]) => {
      setOnlineEmployees(list);
      setReceiverId(
        (prev) =>
          prev ??
          (list.length > 0 ? list[0] : "c78d9576-4ef3-45dc-a3de-dbe71a36f7a6")
      );
    });

    socket.on("new_customer_chat", (customerId: string) => {
      setReceiverId(customerId);
    });

    return () => {
      socket.off("receive_message");
      socket.off("online_employees");
      socket.off("new_customer_chat");
    };
  }, [receiverId]);

  const sendMessage = () => {
    if (!message) return;
    socket.emit("send_message", { receiverId, content: message });
    setMessage("");
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="font-bold text-lg">
        {" "}
        Chat {role === "EMPLOYEE" ? "với khách hàng" : "với nhân viên"}
      </h2>
      <div>
        <p>ID của bạn: {userId || "Đang lấy..."}</p>

        <p>Nhân viên online: {onlineEmployees.join(", ") || "Không có"}</p>
        <p>Đang chat với: {receiverId || "Chưa có"}</p>
      </div>

      <div className="border rounded p-2 h-60 overflow-y-auto">
        {messages.map((m, i) => (
          <p key={i}>
            <b>{m.senderId}</b>: {m.content}
          </p>
        ))}
      </div>

      <div className="flex space-x-2">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Nhập tin nhắn..."
          className="border p-2 flex-1"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Gửi
        </button>
      </div>
    </div>
  );
}
