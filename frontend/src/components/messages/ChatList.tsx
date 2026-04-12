interface Props {
  setChatOpen: (open: boolean) => void;
  className?: string;
}

function ChatList({ setChatOpen, className }: Props) {
  return (
    <section
      className={`flex-col bg-surface-container-low h-full ${className ? className : ""}`}
    >
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
      <div className="flex-1 overflow-y-auto hide-scrollbar px-2 md:px-4 space-y-1 md:space-y-2 pb-28 md:pb-0">
        {/* <!-- Active Chat Item --> */}
        <div
          onClick={() => setChatOpen(true)}
          className="relative flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-surface-container-highest rounded-2xl group cursor-pointer"
        >
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-secondary rounded-r-full"></div>
          <img
            className="w-12 h-12 md:w-14 md:h-14 rounded-2xl object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCzWK8S9NVRaB4oDb-f6ZXTpuNniTNt1m4nUUzo6NR1KOTj_E1fQCOEfX3W0ejQ0lB8cSM60U76EK_h2Sj4rY794i49NJpaCb50R1NIOj4xiku0OI-8spx4i3BisyDaK3hOprPaCnNExS-rg0Fxc8MV74n5qhQg1E8zi5UfG37xBfvzAJb9rrS6RLLtactbNwJh1-InRyVQLFMR13vLxAxr7aMTjuJdWm1DTu9PGjGt0ywXJ1f7r37h4aqo1qlgYxVGAFPQLx8w4jqS"
          />
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-baseline mb-1">
              <h3 className="title-md font-semibold text-on-surface truncate">
                Elena Vance
              </h3>
              <span className="label-sm text-on-surface-variant font-bold">
                12:45 PM
              </span>
            </div>
            <p className="body-lg text-on-surface-variant truncate opacity-80 text-sm">
              The new proposal looks incredible! Let's touch base soon...
            </p>
          </div>
        </div>
        {/* <!-- Chat Item 2 --> */}
        <div
          onClick={() => setChatOpen(true)}
          className="flex items-center gap-3 md:gap-4 p-3 md:p-4 hover:bg-surface-container-highest/50 rounded-2xl transition-colors cursor-pointer group"
        >
          <img
            className="w-12 h-12 md:w-14 md:h-14 rounded-2xl object-cover grayscale group-hover:grayscale-0 transition-all"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCzgtKYah5f9vYlziyb8P7HYtpjn2BT8II5EXRyQdIT8KsXxUXnS9UvTqc0UMcOzEL0zpu_NAjjgPfFh3jBuyK3GkXCCkUUnJgDEwhMlz5urhr-u_Nm43tlD0zRE7khx5gjn_a4X465jSB3yJb-CLn-99S0qD-psUo5LBWSCvN9dL0O9IJZFXZ2Uulm2TuI2BWp4gDD9y9PMlKEfnSBqTUHDAZUoVx7VkBpbuc6qVIQ81OjZDgcXwbgk1GPN0rEMibUqnd_dKr8q7sL"
          />
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-baseline mb-1">
              <h3 className="title-md font-semibold text-on-surface truncate">
                Marcus Chen
              </h3>
              <span className="label-sm text-on-surface-variant">
                YESTERDAY
              </span>
            </div>
            <p className="body-lg text-on-surface-variant truncate opacity-60 text-sm">
              Did you manage to see the draft I sent over?
            </p>
          </div>
        </div>
        {/* <!-- Chat Item 3 --> */}
        <div
          onClick={() => setChatOpen(true)}
          className="flex items-center gap-3 md:gap-4 p-3 md:p-4 hover:bg-surface-container-highest/50 rounded-2xl transition-colors cursor-pointer group"
        >
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed-variant font-bold text-xl">
            DS
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-baseline mb-1">
              <h3 className="title-md font-semibold text-on-surface truncate">
                Design Squad
              </h3>
              <span className="label-sm text-on-surface-variant">TUE</span>
            </div>
            <p className="body-lg text-primary font-medium truncate text-sm">
              Sarah: We need to finalize the lichens...
            </p>
          </div>
        </div>
        {/* <!-- Chat Item 4 --> */}
        <div
          onClick={() => setChatOpen(true)}
          className="flex items-center gap-3 md:gap-4 p-3 md:p-4 hover:bg-surface-container-highest/50 rounded-2xl transition-colors cursor-pointer group"
        >
          <img
            className="w-12 h-12 md:w-14 md:h-14 rounded-2xl object-cover grayscale group-hover:grayscale-0 transition-all"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4FK3cM9iM_BvASqK0YBz0S0zIY-WdZL0fvUede6smXkj4td95T7NaeJ5OpIELhoNUADZJhnJhhZRxiTyK6w3KYFiE6xpZp0wOTCLEBnWPpCF3M3-6AVz0FwRWLZ98eAE-rfg0hV1NCOKWhB7T_Hehrnfu9tLCHDLBXUXUtVSeC9XVjv4iaEB4M_B-Knqg4gueC_3HRHgL65J0bOh_6BLBPMoKH7tEJ1oTJmFiLkHSUGAtSiJyAytJrFZEzykA0M_pmjLX2SZwLyyV"
          />
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-baseline mb-1">
              <h3 className="title-md font-semibold text-on-surface truncate">
                Sloane Parker
              </h3>
              <span className="label-sm text-on-surface-variant">MON</span>
            </div>
            <p className="body-lg text-on-surface-variant truncate opacity-60 text-sm">
              The Atmospheric Clarity guide is complete.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ChatList;
