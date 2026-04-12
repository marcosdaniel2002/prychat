import { logout } from "@/actions/auth/logout.action";
import LinkSideBarDesktop from "./LinkSideBarDesktop";
import { useSolicitudes } from "@/contexts/SolicitudesContext";

interface Props {
  className?: string;
}

function SidebarDesktop({ className }: Props) {
  const pendingCount = useSolicitudes();
  return (
    <aside
      className={`${className || ""} left-0 top-0 h-full flex-col py-8 gap-2 bg-[#f1f5ea] dark:bg-slate-900 w-72 rounded-r-3xl shadow-[0_12px_32px_-4px_rgba(24,29,22,0.08)] z-50`}
    >
      <div className="px-8 mb-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container">
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
        <LinkSideBarDesktop href="/requests">
          <span className="material-symbols-outlined group-hover:scale-110 transition-transform">
            mark_as_unread
          </span>
          <span className="font-medium">
            Requests{" "}
            {pendingCount > 0 && (
              <span className="absolute top-2 left-5 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {pendingCount}
              </span>
            )}
          </span>
        </LinkSideBarDesktop>
        <LinkSideBarDesktop href="/">
          <span className="material-symbols-outlined group-hover:scale-110 transition-transform">
            chat
          </span>
          <span className="font-medium">Chats</span>
        </LinkSideBarDesktop>
        <LinkSideBarDesktop href="/friends">
          <span className="material-symbols-outlined">group</span>
          <span className="font-medium">Friends</span>
        </LinkSideBarDesktop>

        <LinkSideBarDesktop href="/settings">
          <span className="material-symbols-outlined group-hover:scale-110 transition-transform">
            settings
          </span>
          <span className="font-medium">Settings</span>
        </LinkSideBarDesktop>
        <LinkSideBarDesktop href="/profile">
          <span className="material-symbols-outlined group-hover:scale-110 transition-transform">
            account_circle
          </span>
          <span className="font-medium">Profile</span>
        </LinkSideBarDesktop>
      </nav>
      <div className="px-8 mt-auto">
        <button className="w-full py-4 px-6 bg-gradient-to-br from-primary to-primary-container text-white rounded-full font-bold shadow-lg shadow-primary/20 flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
          <span className="material-symbols-outlined">add</span>
          New Message
        </button>
      </div>
      <button
        onClick={() => logout()}
        className="flex items-center gap-4 px-8 py-4 text-[#41493c] dark:text-[#c0c9b8] hover:bg-[#e0e4d9] transition-all translate-x-1 duration-300 group"
      >
        <span className="material-symbols-outlined">logout</span>
        <span className="font-medium">Logout</span>
      </button>
    </aside>
  );
}

export default SidebarDesktop;
