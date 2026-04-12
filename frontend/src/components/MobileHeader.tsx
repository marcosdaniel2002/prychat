interface Props {
  className?: string;
}

function MobileHeader({ className }: Props) {
  return (
    <header
      className={`${className || ""} w-full top-0 sticky z-40 bg-surface-container-low dark:bg-slate-900 justify-between items-center px-6 py-4`}
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container">
          <span className="material-symbols-outlined">waves</span>
        </div>
        <h1 className="font-manrope headline-sm font-semibold tracking-tight text-[#216a17] dark:text-[#a8f692]">
          The Fluid Exchange
        </h1>
      </div>
      <button className="text-[#216a17] dark:text-[#a8f692] hover:bg-[#e0e4d9] dark:hover:bg-slate-700 transition-colors p-2 rounded-full active:opacity-80">
        <span className="material-symbols-outlined">logout</span>
      </button>
    </header>
  );
}

export default MobileHeader;
