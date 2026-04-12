"use client";

import { login } from "@/services/auth/login.services";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

function LoginForm() {
  const router = useRouter();
  async function onSubmit(data: FormData) {
    try {
      const res = await login(data);
      toast.success(`Bienvenido, ${res.nombres}`);
      router.replace("/");
    } catch (err: any) {
      toast.error(err.message);
    }
  }
  return (
    <form action={onSubmit} className="space-y-6">
      {/* <!-- Username/Email Field --> */}
      <div className="space-y-2">
        <label className="block text-primary font-semibold text-[0.875rem] ml-1">
          Email or Username
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
            type="text"
            name="username"
          />
        </div>
      </div>
      {/* <!-- Password Field --> */}
      <div className="space-y-2">
        <div className="flex justify-between items-center ml-1">
          <label className="text-primary font-semibold text-[0.875rem]">
            Password
          </label>
          <a
            className="text-secondary font-bold text-xs hover:underline transition-all"
            href="#"
          >
            Forgot password?
          </a>
        </div>
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
            name="password"
          />
          <button
            className="text-outline hover:text-primary transition-colors"
            type="button"
          >
            <span className="material-symbols-outlined" data-icon="visibility">
              visibility
            </span>
          </button>
        </div>
      </div>
      {/* <!-- Log In Button --> */}
      <button
        className="w-full primary-gradient text-on-primary font-bold py-4 rounded-full cloud-shadow hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 mt-4"
        type="submit"
      >
        <span>Log In</span>
        <span
          className="material-symbols-outlined text-sm"
          data-icon="arrow_forward"
        >
          arrow_forward
        </span>
      </button>
      {/* <!-- Divider --> */}
      <div className="relative py-4 flex items-center">
        <div className="flex-grow border-t border-outline-variant opacity-15"></div>
        <span className="flex-shrink mx-4 text-outline text-[0.6875rem] font-bold tracking-[0.05em] uppercase">
          Or continue with
        </span>
        <div className="flex-grow border-t border-outline-variant opacity-15"></div>
      </div>
      {/* <!-- Social Logins --> */}
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
  );
}

export default LoginForm;
