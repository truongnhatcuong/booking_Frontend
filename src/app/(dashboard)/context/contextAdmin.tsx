"use client";

import socket from "@/lib/socket";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

interface SidebarContextType {
  isCollapsed: boolean;
  toggleCollapse: () => void;
  countCustomer: number;
  setCountCustomer: (value: number) => void;
  waitingCustomers: string[];
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [countCustomer, setCountCustomer] = useState(0);
  const [waitingCustomers, setWaitingCustomers] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("waiting_customers") || "[]");
    } catch {
      return [];
    }
  });

  // thay đổi
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  // đếm
  useEffect(() => {
    const waitingCustomerStr = localStorage.getItem("waiting_customers");
    if (waitingCustomerStr) {
      try {
        const waitingCustomerArr: string[] = JSON.parse(waitingCustomerStr);
        setCountCustomer(waitingCustomerArr.length || 0);
      } catch {
        setCountCustomer(0);
      }
    }
  }, [waitingCustomers]);

  useEffect(() => {
    if (!socket.connected) socket.connect();

    const handleWaitingList = (customers: string[]) => {
      setWaitingCustomers((prev) => {
        const merged = Array.from(new Set([...prev, ...customers]));
        localStorage.setItem("waiting_customers", JSON.stringify(merged));
        return merged;
      });
    };

    const handleNewMessage = (msg: { senderId: string }) => {
      setWaitingCustomers((prev) => {
        if (prev.includes(msg.senderId)) return prev;
        const updated = [...prev, msg.senderId];
        localStorage.setItem("waiting_customers", JSON.stringify(updated));
        return updated;
      });
    };

    socket.on("waiting_customers", handleWaitingList);
    socket.on("receive_message", handleNewMessage);

    return () => {
      socket.off("waiting_customers", handleWaitingList);
      socket.off("receive_message", handleNewMessage);
    };
  }, []);

  return (
    <SidebarContext.Provider
      value={{
        isCollapsed,
        toggleCollapse,
        setCountCustomer,
        countCustomer,
        waitingCustomers,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}
