import LoginForm from "@/components/auth/LoginForm";
import Link from "next/link";

function page() {
  return (
    <main className="w-full max-w-[1200px] grid grid-cols-1 lg:grid-cols-2 bg-surface-container-low rounded-[2.5rem] overflow-hidden cloud-shadow min-h-[700px]">
      {/* <!-- Left Side: Visual/Editorial Section --> */}
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
            Digital conversation, <br />
            <span className="text-secondary-fixed">effortlessly premium.</span>
          </h1>
          <p className="text-on-primary-container/80 text-lg max-w-md font-medium leading-relaxed">
            Experience Atmospheric Clarity. A messaging workspace designed for
            focus, connection, and high-end editorial aesthetics.
          </p>
        </div>
        {/* <!-- Decorative Element --> */}
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-secondary-fixed/20 rounded-full blur-[100px]"></div>
        <div className="absolute top-20 -left-20 w-64 h-64 bg-primary-fixed/20 rounded-full blur-[80px]"></div>
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
      {/* <!-- Right Side: Login Form --> */}
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
              Welcome Back
            </h2>
            <p className="text-on-surface-variant font-medium">
              Please enter your details to continue.
            </p>
          </div>
          {/* LOGIN FORM */}
          <LoginForm />
          {/* <!-- Signup Link --> */}
          <div className="mt-10 text-center">
            <p className="text-on-surface-variant font-medium text-sm">
              New to the exchange?
              <Link
                className="text-secondary font-extrabold ml-1 hover:underline transition-all"
                href="/auth/register"
              >
                Sign up for free
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default page;
