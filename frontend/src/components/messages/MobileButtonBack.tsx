"use client";

import { useChatContext } from "@/contexts/ChatContext";

function MobileButtonBack() {
  const { setChatOpen } = useChatContext();
  return (
    <button
      onClick={() => setChatOpen(false)}
      className="md:hidden w-9 h-9 rounded-xl bg-surface-container-low text-on-surface-variant flex items-center justify-center active:scale-90 transition-transform"
    >
      <span className="material-symbols-outlined text-xl">arrow_back</span>
    </button>
  );
}

export default MobileButtonBack;
