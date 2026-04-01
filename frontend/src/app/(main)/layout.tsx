"use client";
import { ChatProvider, useChatContext } from "@/contexts/ChatContext";
import { ReactNode } from "react";

function LayoutInner({ children }: { children: ReactNode }) {
  const { chatOpen } = useChatContext();

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:fixed md:flex left-0 top-0 h-full flex-col py-8 gap-2 bg-[#f1f5ea] dark:bg-slate-900 w-72 rounded-r-3xl shadow-[0_12px_32px_-4px_rgba(24,29,22,0.08)] z-50">
        <div className="px-8 mb-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-on-primary-container">
              <span className="material-symbols-outlined">waves</span>
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-[#216a17]">
                The Fluid Exchange
              </h1>
              <p className="text-[0.6875rem] uppercase tracking-[0.05em] text-on-surface-variant">
                Atmospheric Clarity
              </p>
            </div>
          </div>
        </div>
        <nav className="flex-1 space-y-1">
          <a
            className="flex items-center gap-4 px-8 py-4 text-[#41493c] dark:text-[#c0c9b8] hover:bg-[#e0e4d9] transition-all translate-x-1 duration-300 group"
            href="#"
          >
            <span className="material-symbols-outlined group-hover:scale-110 transition-transform">
              mark_as_unread
            </span>
            <span className="font-medium">Requests</span>
          </a>
          <a
            className="flex items-center gap-4 px-8 py-4 text-[#41493c] dark:text-[#c0c9b8] hover:bg-[#e0e4d9] transition-all translate-x-1 duration-300 group"
            href="#"
          >
            <span className="material-symbols-outlined group-hover:scale-110 transition-transform">
              chat
            </span>
            <span className="font-medium">Chats</span>
          </a>
          <a
            className="flex items-center gap-4 px-8 py-4 bg-[#a8f692] text-[#012200] rounded-r-[1.5rem] font-semibold transition-all translate-x-1 duration-300"
            href="#"
          >
            <span className="material-symbols-outlined">group</span>
            <span className="font-medium">Friends</span>
          </a>
          <a
            className="flex items-center gap-4 px-8 py-4 text-[#41493c] dark:text-[#c0c9b8] hover:bg-[#e0e4d9] transition-all translate-x-1 duration-300 group"
            href="#"
          >
            <span className="material-symbols-outlined group-hover:scale-110 transition-transform">
              settings
            </span>
            <span className="font-medium">Settings</span>
          </a>
          <a
            className="flex items-center gap-4 px-8 py-4 text-[#41493c] dark:text-[#c0c9b8] hover:bg-[#e0e4d9] transition-all translate-x-1 duration-300 group"
            href="#"
          >
            <span className="material-symbols-outlined group-hover:scale-110 transition-transform">
              account_circle
            </span>
            <span className="font-medium">Profile</span>
          </a>
        </nav>
        <div className="px-8 mt-auto">
          <button className="w-full py-4 px-6 bg-gradient-to-br from-primary to-primary-container text-white rounded-full font-bold shadow-lg shadow-primary/20 flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
            <span className="material-symbols-outlined">add</span>
            New Message
          </button>
        </div>
        <a
          className="flex items-center gap-4 px-8 py-4 text-[#41493c] dark:text-[#c0c9b8] hover:bg-[#e0e4d9] transition-all translate-x-1 duration-300 group"
          href="#"
        >
          <span className="material-symbols-outlined">logout</span>
          <span className="font-medium">Logout</span>
        </a>
      </aside>

      <div className="flex flex-col h-full w-full">
        {/* Mobile Header - hidden when chat is open */}
        <header
          className={`${chatOpen ? "hidden" : "flex"} md:hidden w-full top-0 sticky z-40 bg-[#f7fbef] dark:bg-slate-900 justify-between items-center px-6 py-4`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary-fixed">
              <img
                alt="Profile"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA1zGn2JAIbR8yMMTqcYFP4bsUWT1g3J1Cxlo1sdjBxA0ZOSbtJe2ck5rrvGg8Zs0jns_EC4EzfEJ9kgOz_UrPJxmhKGRyrMA3BgsTPKBPVdNvUKasinLDXHHosBPyIv_J8EIkDCBtjrB8F-U69qDeHcsapKVjWY9HDomyi2Kzd9Zj5VWVr_YsbRmuFCqlz7OSXCry3hoRFw8F2QKud6ABKZxPY4gtKHm5GVw1HMHZ8ocR8TEcR6PSy4NryEV6XbUqG8NuTCysrFhQu"
              />
            </div>
            <h1 className="font-manrope headline-sm font-semibold tracking-tight text-[#216a17] dark:text-[#a8f692]">
              The Fluid Exchange
            </h1>
          </div>
          <button className="text-[#216a17] dark:text-[#a8f692] hover:bg-[#e0e4d9] dark:hover:bg-slate-700 transition-colors p-2 rounded-full active:opacity-80">
            <span className="material-symbols-outlined">logout</span>
          </button>
        </header>

        {children}
      </div>

      {/* Mobile Bottom Navbar - hidden when chat is open */}
      <nav
        className={`${chatOpen ? "hidden" : "flex"} md:hidden fixed bottom-0 left-0 w-full justify-around items-center px-4 pb-4 pt-4 bg-[#ffffff]/85 dark:bg-stone-950/85 backdrop-blur-lg z-50 rounded-t-[32px] shadow-[0_-8px_32px_rgba(24,29,22,0.04)] dark:shadow-none`}
      >
        <a
          className="flex flex-col items-center justify-center text-[#41493c] dark:text-[#c0c9b8] opacity-60 hover:opacity-100 transition-opacity active:scale-90 duration-300 ease-out"
          href="#"
        >
          <span className="material-symbols-outlined mb-1">inbox</span>
          <span className="font-manrope label-sm uppercase tracking-widest font-bold text-xs">
            Requests
          </span>
        </a>
        <a
          className="flex flex-col items-center justify-center bg-[#a8f692] dark:bg-[#216a17] text-[#012200] dark:text-[#f1f5ea] rounded-2xl px-5 py-2 transition-all active:scale-90 duration-300 ease-out"
          href="#"
        >
          <span className="material-symbols-outlined mb-1">chat_bubble</span>
          <span className="font-manrope label-sm uppercase tracking-widest font-bold text-xs">
            Chats
          </span>
        </a>
        <a
          className="flex flex-col items-center justify-center text-[#41493c] dark:text-[#c0c9b8] opacity-60 hover:opacity-100 transition-opacity active:scale-90 duration-300 ease-out"
          href="#"
        >
          <span className="material-symbols-outlined mb-1">settings</span>
          <span className="font-manrope label-sm uppercase tracking-widest font-bold text-xs">
            Settings
          </span>
        </a>
        <a
          className="flex flex-col items-center justify-center text-[#41493c] dark:text-[#c0c9b8] opacity-60 hover:opacity-100 transition-opacity active:scale-90 duration-300 ease-out"
          href="#"
        >
          <span className="material-symbols-outlined mb-1">person</span>
          <span className="font-manrope label-sm uppercase tracking-widest font-bold text-xs">
            Profile
          </span>
        </a>
      </nav>
    </>
  );
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <ChatProvider>
      <LayoutInner>{children}</LayoutInner>
    </ChatProvider>
  );
}
