"use client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { register } from "@/services/auth/register.services";
// import { register } from "@/actions/auth/register.action";

function RegisterForm() {
  const router = useRouter();
  async function onSubmit(data: FormData) {
    try {
      await register(data);
      router.replace("/");
    } catch (err: any) {
      toast.error(err.message);
    }
  }
  return (
    <form action={onSubmit} className="space-y-5">
      {/* <!-- First Name & Last Name Fields --> */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label
            htmlFor="nombres"
            className="block text-primary font-semibold text-[0.875rem] ml-1"
          >
            First Name
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
              placeholder="Alex"
              type="text"
              required
              name="nombres"
            />
          </div>
        </div>
        <div className="space-y-2">
          <label
            htmlFor="apellidos"
            className="block text-primary font-semibold text-[0.875rem] ml-1"
          >
            Last Name
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
              placeholder="Rivers"
              type="text"
              required
              name="apellidos"
            />
          </div>
        </div>
      </div>
      {/* <!-- Username Field --> */}
      <div className="space-y-2">
        <label
          htmlFor="username"
          className="block text-primary font-semibold text-[0.875rem] ml-1"
        >
          Username
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
            placeholder="alexrivers"
            type="text"
            required
            name="username"
          />
        </div>
      </div>
      {/* <!-- Email Field --> */}
      <div className="space-y-2">
        <label
          htmlFor="email"
          className="block text-primary font-semibold text-[0.875rem] ml-1"
        >
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
            required
            name="email"
          />
        </div>
      </div>
      {/* <!-- Password Field --> */}
      <div className="space-y-2">
        <label
          htmlFor="password"
          className="block text-primary font-semibold text-[0.875rem] ml-1"
        >
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
            required
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
      {/* <!-- Confirm Password Field --> */}
      <div className="space-y-2">
        <label
          htmlFor="passwordConfirm"
          className="block text-primary font-semibold text-[0.875rem] ml-1"
        >
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
            required
            name="passwordConfirm"
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
      {/* <!-- Terms Checkbox --> */}
      <div className="flex items-start gap-3 pt-1">
        <input
          id="terms"
          type="checkbox"
          className="mt-0.5 w-4 h-4 accent-primary cursor-pointer"
          required
        />
        <label
          htmlFor="terms"
          className="text-on-surface-variant text-sm font-medium leading-snug cursor-pointer"
        >
          I agree to the{" "}
          <a href="#" className="text-secondary font-bold hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-secondary font-bold hover:underline">
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
  );
}

export default RegisterForm;
