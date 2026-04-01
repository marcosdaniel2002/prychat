import Link from "next/link";

function page() {
  return (
    <main className="w-full max-w-[1200px] grid grid-cols-1 lg:grid-cols-2 bg-surface-container-low rounded-[2.5rem] overflow-hidden cloud-shadow min-h-[700px]">
      {/* <!-- Left Side: Register Form --> */}
      <section className="flex flex-col justify-center items-center p-8 lg:p-24 bg-surface-container-lowest">
        <div className="w-full max-w-sm">
          {/* <!-- Mobile Logo --> */}
          <div className="lg:hidden flex items-center gap-3 mb-10 justify-center">
            <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center">
              <span
                className="material-symbols-outlined text-primary text-sm"
                data-icon="waves"
              >
                waves
              </span>
            </div>
            <span className="text-primary text-xl font-bold tracking-tight">
              The Fluid Exchange
            </span>
          </div>
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-on-surface text-4xl font-extrabold tracking-tight mb-2">
              Join the Exchange
            </h2>
            <p className="text-on-surface-variant font-medium">
              Create your account and start connecting.
            </p>
          </div>
          <form className="space-y-5">
            {/* <!-- Full Name Field --> */}
            <div className="space-y-2">
              <label className="block text-primary font-semibold text-[0.875rem] ml-1">
                Full Name
              </label>
              <div className="soft-field transition-all duration-300 bg-surface-container-highest rounded-xl flex items-center px-4 py-3.5">
                <span
                  className="material-symbols-outlined text-outline mr-3"
                  data-icon="person"
                >
                  person
                </span>
                <input
                  className="bg-transparent border-none focus:outline-none focus-visible:outline-none w-full text-on-surface placeholder:text-outline/60 font-medium"
                  placeholder="Alex Rivers"
                  type="text"
                />
              </div>
            </div>
            {/* <!-- Email Field --> */}
            <div className="space-y-2">
              <label className="block text-primary font-semibold text-[0.875rem] ml-1">
                Email Address
              </label>
              <div className="soft-field transition-all duration-300 bg-surface-container-highest rounded-xl flex items-center px-4 py-3.5">
                <span
                  className="material-symbols-outlined text-outline mr-3"
                  data-icon="alternate_email"
                >
                  alternate_email
                </span>
                <input
                  className="bg-transparent border-none focus:outline-none focus-visible:outline-none w-full text-on-surface placeholder:text-outline/60 font-medium"
                  placeholder="alex@rivers.com"
                  type="email"
                />
              </div>
            </div>
            {/* <!-- Password Field --> */}
            <div className="space-y-2">
              <label className="block text-primary font-semibold text-[0.875rem] ml-1">
                Password
              </label>
              <div className="soft-field transition-all duration-300 bg-surface-container-highest rounded-xl flex items-center px-4 py-3.5">
                <span
                  className="material-symbols-outlined text-outline mr-3"
                  data-icon="lock"
                >
                  lock
                </span>
                <input
                  className="bg-transparent border-none outline-none w-full text-on-surface placeholder:text-outline/60 font-medium"
                  placeholder="••••••••"
                  type="password"
                />
                <button
                  className="text-outline hover:text-primary transition-colors"
                  type="button"
                >
                  <span
                    className="material-symbols-outlined"
                    data-icon="visibility"
                  >
                    visibility
                  </span>
                </button>
              </div>
            </div>
            {/* <!-- Confirm Password Field --> */}
            <div className="space-y-2">
              <label className="block text-primary font-semibold text-[0.875rem] ml-1">
                Confirm Password
              </label>
              <div className="soft-field transition-all duration-300 bg-surface-container-highest rounded-xl flex items-center px-4 py-3.5">
                <span
                  className="material-symbols-outlined text-outline mr-3"
                  data-icon="lock"
                >
                  lock
                </span>
                <input
                  className="bg-transparent border-none outline-none w-full text-on-surface placeholder:text-outline/60 font-medium"
                  placeholder="••••••••"
                  type="password"
                />
                <button
                  className="text-outline hover:text-primary transition-colors"
                  type="button"
                >
                  <span
                    className="material-symbols-outlined"
                    data-icon="visibility"
                  >
                    visibility
                  </span>
                </button>
              </div>
            </div>
            {/* <!-- Terms Checkbox --> */}
            <div className="flex items-start gap-3 pt-1">
              <input
                id="terms"
                type="checkbox"
                className="mt-0.5 w-4 h-4 accent-primary cursor-pointer"
              />
              <label
                htmlFor="terms"
                className="text-on-surface-variant text-sm font-medium leading-snug cursor-pointer"
              >
                I agree to the{" "}
                <a
                  href="#"
                  className="text-secondary font-bold hover:underline"
                >
                  Terms of Service
                </a>{" "}
                and{" "}
                <a
                  href="#"
                  className="text-secondary font-bold hover:underline"
                >
                  Privacy Policy
                </a>
              </label>
            </div>
            {/* <!-- Sign Up Button --> */}
            <button
              className="w-full primary-gradient text-on-primary font-bold py-4 rounded-full cloud-shadow hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 mt-2"
              type="submit"
            >
              <span>Create Account</span>
              <span
                className="material-symbols-outlined text-sm"
                data-icon="arrow_forward"
              >
                arrow_forward
              </span>
            </button>
            {/* <!-- Divider --> */}
            <div className="relative py-3 flex items-center">
              <div className="flex-grow border-t border-outline-variant opacity-15"></div>
              <span className="flex-shrink mx-4 text-outline text-[0.6875rem] font-bold tracking-[0.05em] uppercase">
                Or sign up with
              </span>
              <div className="flex-grow border-t border-outline-variant opacity-15"></div>
            </div>
            {/* <!-- Social Signups --> */}
            <div className="grid grid-cols-2 gap-4">
              <button
                className="flex items-center justify-center gap-2 py-3 border border-outline-variant/15 rounded-xl hover:bg-surface-container transition-colors font-semibold text-on-surface-variant text-sm"
                type="button"
              >
                <img
                  alt="Google icon"
                  className="w-4 h-4 opacity-70"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAzDN19Rtp0KaHSlRnKZhvLXu-VQSlZ4aZ3epJVqVbVlC_aAG1k84lSqUG8X7ntS4b85jQyUTN_bEyx5HkWlGeRhBVnyr66C3eX24rEdcWpgx854878ROUfp4u6VB0XAJzH0b-sa7OcquYr3S7Ws4p52O9WsMkgfiFQU8Z46of-OXIRm4W0rE3LOnzLMZmK550789dIIkTD42YjEMXH4ndVa7x3rLrjtoYeXQdspshhZ2YeMOZEVgZBP9x6YosSlRbTqSl-7LFZdaB6"
                />
                Google
              </button>
              <button
                className="flex items-center justify-center gap-2 py-3 border border-outline-variant/15 rounded-xl hover:bg-surface-container transition-colors font-semibold text-on-surface-variant text-sm"
                type="button"
              >
                <span
                  className="material-symbols-outlined text-[18px]"
                  data-icon="account_circle"
                >
                  account_circle
                </span>
                Apple
              </button>
            </div>
          </form>
          {/* <!-- Login Link --> */}
          <div className="mt-8 text-center">
            <p className="text-on-surface-variant font-medium text-sm">
              Already have an account?
              <Link
                className="text-secondary font-extrabold ml-1 hover:underline transition-all"
                href="/auth/login"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* <!-- Right Side: Visual/Editorial Section --> */}
      <section className="hidden lg:flex flex-col justify-between p-16 relative overflow-hidden bg-primary-container">
        <div className="z-10">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center">
              <span
                className="material-symbols-outlined text-primary"
                data-icon="waves"
              >
                waves
              </span>
            </div>
            <span className="text-on-primary-container text-2xl font-extrabold tracking-tighter font-headline">
              The Fluid Exchange
            </span>
          </div>
          <h1 className="text-on-primary-container text-5xl font-extrabold leading-[1.1] tracking-tight mb-6">
            Your voice, <br />
            <span className="text-secondary-fixed">amplified.</span>
          </h1>
          <p className="text-on-primary-container/80 text-lg max-w-md font-medium leading-relaxed">
            Join a growing community of creators, thinkers, and connectors.
            Premium tools, zero noise.
          </p>
        </div>
        {/* <!-- Feature highlights --> */}
        <div className="z-10 space-y-4 my-auto">
          {[
            { icon: "bolt", text: "Real-time messaging with zero latency" },
            { icon: "workspace_premium", text: "Premium editorial workspace" },
            { icon: "group", text: "Collaborate with 12,000+ creators" },
          ].map(({ icon, text }) => (
            <div key={icon} className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary-fixed/20 flex items-center justify-center shrink-0">
                <span
                  className="material-symbols-outlined text-primary-fixed text-[18px]"
                  data-icon={icon}
                >
                  {icon}
                </span>
              </div>
              <p className="text-on-primary-container/80 font-medium text-sm">
                {text}
              </p>
            </div>
          ))}
        </div>
        {/* <!-- Decorative Elements --> */}
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-secondary-fixed/20 rounded-full blur-[100px]"></div>
        <div className="absolute top-20 -right-20 w-64 h-64 bg-primary-fixed/20 rounded-full blur-[80px]"></div>
        <div className="z-10 mt-auto">
          <div className="flex -space-x-3">
            <img
              className="w-10 h-10 rounded-full border-2 border-primary-container"
              data-alt="portrait of a young professional woman with a soft smile in bright natural lighting"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBwqaS14ZlzlK3l4qX3Wb3LTk82fUxj4-2BPfytB262yaJzjyaY1-sAhki5HNLutEMZOC5PZOFlxpNhmzrXxvp02oOtjSUZi9rQTMMtlT_dNf48JRgDMywFpkD5GTSpce9vKyu7bMuv9mU0O8nDNwAtBcHemSxYzmkPwAASzey67EjBCB3FyU7wGKy6liitwMw0UCCZEFAHeSX0tGvQ8cwLa-dQ_-p0jfw1nOtCbFElnVMySKQmO8utzVf2m9vGwjN6JvqBwaTjy8Su"
            />
            <img
              className="w-10 h-10 rounded-full border-2 border-primary-container"
              data-alt="close-up portrait of a man with a beard looking thoughtfully off-camera in soft studio light"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDHE1iBOic056g5KZWCbzoYikiqFNQ65L9mmd_Pl-KzWVuvNEKishFnHcK_rCJsZ-JdDBX59MD8tmsl3RClMt3XmUNBnFlabzqc6uneBa0YalgZ5kX_36NYTGCrDwE_Uh_Sn5O8inCevzwMQXim6gOpGbPujATrzXIT4c-RqsALxREKgZk01cisfusO3Q50gar4uxrHYV21w1i67KGNuvkLdJKSNc1A08_ju9TH7rlVfLqXsp2KuECqGZGFz7VLnXK9TlqIDgNm3QI-"
            />
            <img
              className="w-10 h-10 rounded-full border-2 border-primary-container"
              data-alt="smiling woman with glasses against a blurred architectural background"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA2Kg5IjrzXx_94N-qA09-dbbAs8hOc8eRTfWDzg83-oqLo93IuC42bqfEw8j2zIApybc3e_2-IGn7ZYEsgN-y_MxItqhG_z1MDpZ_W9w59V_oZBqpchYItnAyUdJ-MzMomWcPZz1EmgHawyJwTYZsN5XtNjwKfRN7M28GinRhI4R9NBYPUMRvlEbS6CtY61w4N262zFvwxXR8mi2Yf10OlmcVVscE-SYF9ycm7uukz0IESXG5iV--jpQfpw-U0M-XRkaKxUiT51Re_"
            />
          </div>
          <p className="text-on-primary-container/70 text-sm mt-4 font-medium">
            Joined by 12,000+ creators this month.
          </p>
        </div>
      </section>
    </main>
  );
}

export default page;
