"use client";

import {
  sendMensaje,
  TipoMensaje,
} from "@/services/mensajes/sendMensaje.client";
import { useRef, useState } from "react";
import EmojiPicker, { EmojiClickData, Theme } from "emoji-picker-react";

interface Props {
  conversacion_id: string;
  reply_to_id: string | null;
}

function InputType({ conversacion_id, reply_to_id }: Props) {
  const [contenido, setContenido] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSendMessage = async () => {
    if (!contenido.trim()) return;
    setContenido("");
    setShowEmojiPicker(false);
    await sendMensaje({
      contenido: contenido.trim(),
      conversacion_id,
      reply_to_id,
      tipo: "text" as TipoMensaje,
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    const input = inputRef.current;
    if (!input) {
      setContenido((prev) => prev + emojiData.emoji);
      return;
    }
    const start = input.selectionStart ?? contenido.length;
    const end = input.selectionEnd ?? contenido.length;
    const newValue =
      contenido.slice(0, start) + emojiData.emoji + contenido.slice(end);
    setContenido(newValue);
    // Restore cursor position after emoji insertion
    requestAnimationFrame(() => {
      input.focus();
      input.setSelectionRange(
        start + emojiData.emoji.length,
        start + emojiData.emoji.length
      );
    });
  };

  return (
    <footer className="p-3 md:p-12 md:pt-4">
      <div className="relative">
        {showEmojiPicker && (
          <>
            {/* Overlay to close picker when clicking outside */}
            <div
              className="fixed inset-0 z-10"
              onClick={() => setShowEmojiPicker(false)}
            />
            <div className="absolute bottom-full right-0 mb-2 z-20">
              <EmojiPicker
                theme={Theme.AUTO}
                onEmojiClick={handleEmojiClick}
                lazyLoadEmojis
              />
            </div>
          </>
        )}
        <div className="bg-surface-container-lowest rounded-2xl md:rounded-3xl p-2 md:p-3 flex items-center gap-2 md:gap-4 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-outline-variant/10">
          <button className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors">
            <span className="material-symbols-outlined">add_circle</span>
          </button>
          <input
            ref={inputRef}
            className="bg-transparent border-none focus:outline-none focus-visible:outline-none flex-1 text-on-surface placeholder:text-outline/60 font-medium text-sm md:text-base"
            placeholder="Type your message..."
            type="text"
            value={contenido}
            onChange={(e) => setContenido(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <div className="flex items-center gap-1 md:gap-2">
            <button
              className="hidden md:flex w-12 h-12 items-center justify-center text-on-surface-variant hover:text-secondary transition-colors"
              onClick={() => setShowEmojiPicker((prev) => !prev)}
              type="button"
            >
              <span className="material-symbols-outlined">
                sentiment_satisfied
              </span>
            </button>
            <button
              className="w-10 h-10 md:w-14 md:h-14 bg-gradient-to-br from-primary to-primary-container text-white rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20 transition-transform active:scale-95"
              onClick={handleSendMessage}
            >
              <span className="material-symbols-outlined text-xl">send</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default InputType;
