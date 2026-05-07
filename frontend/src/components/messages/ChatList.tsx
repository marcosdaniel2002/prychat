import { Suspense } from "react";
import ChatScrollList from "./ChatScrollList";
import Loading from "../shared/Loading";
import ChatListLayoutClient from "./ChatListLayoutClient";

function ChatList() {
  return (
    <ChatListLayoutClient>
      <header className="p-6 md:p-8 flex items-center justify-between">
        <h2 className="headline-sm font-headline font-bold text-on-surface tracking-tight">
          Messages
        </h2>
        <span className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-primary transition-colors">
          tune
        </span>
      </header>
      {/* <!-- Search Bar --> */}
      <div className="px-4 md:px-8 mb-4 md:mb-6">
        <div className="relative">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm">
            search
          </span>
          <input
            className="w-full bg-surface-container-highest border-none rounded-xl pl-12 pr-4 py-3 focus:ring-2 focus:ring-secondary-fixed transition-all text-sm outline-none"
            placeholder="Search conversations..."
            type="text"
          />
        </div>
      </div>
      {/* <!-- Chat Scroll List --> */}
      <Suspense fallback={<Loading />}>
        <ChatScrollList />
      </Suspense>
    </ChatListLayoutClient>
  );
}

export default ChatList;
