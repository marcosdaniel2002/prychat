import { useChatContext } from "@/contexts/ChatContext";

interface Props {
  className?: string;
}

function ConversationView({ className }: Props) {
  const { chatOpen, setChatOpen } = useChatContext();
  return (
    <section
      className={`flex-1 flex-col bg-surface relative ${className ? className : ""}`}
    >
      {/* <!-- Conversation Header --> */}
      <header className="px-4 md:px-12 h-20 md:h-24 flex items-center justify-between bg-surface/80 backdrop-blur-md z-10 border-b border-outline-variant/10">
        <div className="flex items-center gap-3 md:gap-5">
          {/* Back button - mobile only */}
          <button
            onClick={() => setChatOpen(false)}
            className="md:hidden w-9 h-9 rounded-xl bg-surface-container-low text-on-surface-variant flex items-center justify-center active:scale-90 transition-transform"
          >
            <span className="material-symbols-outlined text-xl">
              arrow_back
            </span>
          </button>
          <div className="relative">
            <img
              className="w-10 h-10 md:w-12 md:h-12 rounded-2xl object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBtyLLuYoW4AdMoFSo_jzgvd5LolspIzLBEQohr4xkrStv7MJIPd0AMYrlJB2cank1EcxIslVif0IWSk5IviTP5EbTSzrSIh-UBkjEc2T5KgbLiD7m8AYsunKPAZVAYzyRgUzyA7kcyKYYool1u5rssi6fEYpzdbMO-4AlLIw1Uy2uJFUW5zI-6uQOC9CT-0Wi8dPePNPDMG-Er0Xxh9rZRaspZ_iwQ6pRAN-wsVUKhc0scicBVWZ3Z_4xwY-2SbN-aO7fK9ZuPlyi5"
            />
            <span className="absolute -bottom-1 -right-1 w-3 h-3 md:w-3.5 md:h-3.5 bg-primary border-2 border-surface rounded-full"></span>
          </div>
          <div>
            <h2 className="text-base md:headline-sm font-bold text-on-surface">
              Elena Vance
            </h2>
            <span className="label-sm text-secondary uppercase font-bold tracking-widest flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
              Online Now
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 md:gap-6">
          <button className="w-9 h-9 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-surface-container-low text-on-surface-variant hover:bg-surface-container-highest transition-colors flex items-center justify-center">
            <span className="material-symbols-outlined text-xl">call</span>
          </button>
          <button className="w-9 h-9 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-surface-container-low text-on-surface-variant hover:bg-surface-container-highest transition-colors flex items-center justify-center">
            <span className="material-symbols-outlined text-xl">videocam</span>
          </button>
          <button className="hidden md:flex w-12 h-12 rounded-2xl bg-surface-container-low text-on-surface-variant hover:bg-surface-container-highest transition-colors items-center justify-center">
            <span className="material-symbols-outlined">info</span>
          </button>
        </div>
      </header>

      {/* <!-- Message Area --> */}
      <div className="flex-1 overflow-y-auto px-4 md:px-12 py-6 md:py-8 space-y-8 md:space-y-12 hide-scrollbar">
        {/* <!-- Date Separator --> */}
        <div className="flex justify-center">
          <span className="px-4 py-1.5 bg-surface-container-low rounded-full label-sm text-on-surface-variant font-bold opacity-60">
            TODAY, MAY 24
          </span>
        </div>
        {/* <!-- Received Message Cluster --> */}
        <div className="flex items-end gap-2 md:gap-4 max-w-[85%] md:max-w-[70%]">
          <img
            className="w-7 h-7 md:w-8 md:h-8 rounded-xl object-cover mb-2 shrink-0"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuALhlAcUhXAX1dETjiaM9T9N9cKfb8yKQBCPm9ZE-NgCdoaPjlirW_Ftvw62_f4pNJNSrml7Cdk1_wgCKEldDar0txh-sqbWbIKfE6sZHJoUDIF7MPwRi4i_rOlTK4yyo_hMR2FEP67-yXkX8knDOK60wIxiGp5tDJ9lmOC27OAoHzkURrERWkBxZ7u3Lso1hx9G2SvoOEAFJKojaO0hRwGD5y93gnucJhibOGasD7ZDAxOXKP8pU2wavgcgiLmfouK7ULMG9AxtXzs"
          />
          <div className="space-y-2">
            <div className="px-4 py-3 md:p-6 bg-surface-container-low rounded-t-3xl rounded-br-3xl text-on-surface-variant body-lg leading-relaxed shadow-sm text-sm md:text-base">
              Hey Alex! I just finished reviewing the brand anchors for "The
              Fluid Exchange". The lichen color palette is perfectly
              atmospheric.
            </div>
            <div className="px-4 py-3 md:p-6 bg-surface-container-low rounded-3xl rounded-bl-none text-on-surface-variant body-lg leading-relaxed shadow-sm text-sm md:text-base">
              Are we still on for the walkthrough at 3:00 PM today? I want to
              show you the glassmorphism effects we've integrated.
            </div>
            <span className="label-sm text-on-surface-variant opacity-40 ml-2">
              12:42 PM
            </span>
          </div>
        </div>
        {/* <!-- Sent Message Cluster --> */}
        <div className="flex flex-col items-end gap-2 md:gap-4 ml-auto max-w-[85%] md:max-w-[70%]">
          <div className="space-y-2 flex flex-col items-end">
            <div className="px-4 py-3 md:p-6 bg-gradient-to-br from-primary to-primary-container text-on-primary rounded-t-3xl rounded-bl-3xl body-lg leading-relaxed shadow-lg shadow-primary/10 text-sm md:text-base">
              Absolutely! I'm really looking forward to seeing the "Atmospheric
              Clarity" vision come to life. The no-line rule is already making
              everything feel so much lighter.
            </div>
            <div className="flex items-center gap-2">
              <span className="label-sm text-on-surface-variant opacity-40">
                12:45 PM
              </span>
              <span className="material-symbols-outlined text-secondary-fixed-dim text-sm">
                done_all
              </span>
            </div>
          </div>
        </div>
        {/* <!-- Media Message Received --> */}
        <div className="flex items-end gap-2 md:gap-4 max-w-[85%] md:max-w-[70%]">
          <img
            className="w-7 h-7 md:w-8 md:h-8 rounded-xl object-cover mb-2 shrink-0"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCMit1D8odFg35heEG7oAKEH4piscMjH0fP48i3RODJWj46dwFf5144Xs5YNsdUTQMIUV1IvLt1_sW1-fcHtqXSyQZ7GaQzccj7vQ_lIBm5gIDAhRE8vFatHbyQfe5BLmpCTqICz_p6W91JvaR3o0QSChP7DEO1iFcy8eod4JPQjlAj--j6ffHVSeJe7u1uo7CoN9tkBXBPIS87Z1JkP2xzLgy-dD8LtP9KemIyIq6kM2jP_VOMma4ndUeMYGyRP64KwIDcy7TXWyi4"
          />
          <div className="space-y-3">
            <div className="rounded-3xl overflow-hidden shadow-xl border-4 border-surface-container-low">
              <img
                className="w-full h-40 md:h-48 object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDtAlY_PltSDsGyKFrbxnuzpWUkic2z7I373AbnEWBRHS9R2ve5YZdVTz5S8YbwUf24nKTCnrUTyejaRNRD9OiovT94620W965S1GaJhmFFIAlJz0RZNYOHc6VDxhB1TozshbZdXBTUUO8X255wLKg6hb1f5Mo6dGGAul84PaOYlEQUU_4vJ8SXc9J84Q3D1wgyn6CKipGy6BaO3dWV_yi6xthGVJ9P-EYfdELIjzNMs7Pymg0gPP_HDyAbVwkdq9-SVBYlxoQTHPkh"
              />
            </div>
            <div className="px-4 py-3 md:p-6 bg-surface-container-low rounded-3xl rounded-bl-none text-on-surface-variant body-lg leading-relaxed shadow-sm text-sm md:text-base">
              Here's a sneak peek of the background motion concept! 🌿
            </div>
            <span className="label-sm text-on-surface-variant opacity-40 ml-2">
              12:46 PM
            </span>
          </div>
        </div>
      </div>

      {/* <!-- Message Input Area --> */}
      <footer className="p-3 md:p-12 md:pt-4">
        <div className="bg-surface-container-lowest rounded-2xl md:rounded-3xl p-2 md:p-3 flex items-center gap-2 md:gap-4 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-outline-variant/10">
          <button className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors">
            <span className="material-symbols-outlined">add_circle</span>
          </button>
          <input
            className="bg-transparent border-none focus:outline-none focus-visible:outline-none flex-1 text-on-surface placeholder:text-outline/60 font-medium text-sm md:text-base"
            placeholder="Type your message..."
            type="text"
          />
          <div className="flex items-center gap-1 md:gap-2">
            <button className="hidden md:flex w-12 h-12 items-center justify-center text-on-surface-variant hover:text-secondary transition-colors">
              <span className="material-symbols-outlined">
                sentiment_satisfied
              </span>
            </button>
            <button className="w-10 h-10 md:w-14 md:h-14 bg-gradient-to-br from-primary to-primary-container text-white rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20 transition-transform active:scale-95">
              <span className="material-symbols-outlined text-xl">send</span>
            </button>
          </div>
        </div>
      </footer>

      {/* <!-- Floating Decoration --> */}
      <div className="absolute top-1/2 -right-64 w-96 h-96 bg-secondary/5 blur-[120px] rounded-full -z-10 pointer-events-none"></div>
      <div className="absolute bottom-0 -left-64 w-96 h-96 bg-primary/5 blur-[120px] rounded-full -z-10 pointer-events-none"></div>
    </section>
  );
}

export default ConversationView;
