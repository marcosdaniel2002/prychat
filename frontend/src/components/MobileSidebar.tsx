interface Props {
  className?: string;
}

function MobileSidebar({ className }: Props) {
  return (
    <nav
      className={`${className || ""} fixed bottom-0 left-0 w-full justify-around items-center px-4 pb-2 pt-2 bg-[#ffffff]/85 dark:bg-stone-950/85 backdrop-blur-lg z-50 rounded-t-[32px] shadow-[0_-8px_32px_rgba(24,29,22,0.04)] dark:shadow-none`}
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
  );
}

export default MobileSidebar;
