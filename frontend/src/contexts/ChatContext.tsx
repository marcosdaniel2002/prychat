"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { Conversacion } from "@/services/conversacion/getConversaciones.services";

interface ChatContextType {
  chatOpen: boolean;
  setChatOpen: (open: boolean) => void;
  selectedConversacionId: string | null;
  setSelectedConversacionId: (id: string | null) => void;
  selectedConversacion: Conversacion | null;
  setSelectedConversacion: (c: Conversacion | null) => void;
}

const ChatContext = createContext<ChatContextType>({
  chatOpen: false,
  setChatOpen: () => {},
  selectedConversacionId: null,
  setSelectedConversacionId: () => {},
  selectedConversacion: null,
  setSelectedConversacion: () => {},
});

export function ChatProvider({ children }: { children: ReactNode }) {
  const [chatOpen, setChatOpen] = useState(false);
  const [selectedConversacionId, setSelectedConversacionId] = useState<
    string | null
  >(null);
  const [selectedConversacion, setSelectedConversacion] =
    useState<Conversacion | null>(null);
  return (
    <ChatContext.Provider
      value={{
        chatOpen,
        setChatOpen,
        selectedConversacionId,
        setSelectedConversacionId,
        setSelectedConversacion,
        selectedConversacion,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export const useChatContext = () => useContext(ChatContext);
