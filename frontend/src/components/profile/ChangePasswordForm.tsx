"use client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { updatePassword } from "@/services/auth/updatePassword.services";
import { useState } from "react";

function ChangePasswordForm() {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsPending(true);
    // ✅ FormData desde el form completo, como si fuera un form normal
    const formData = new FormData(e.currentTarget);
    try {
      const res = await updatePassword(formData);
      toast.success(`Contraseña actualizada con éxito.`);
      //   router.replace("/");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsPending(false);
    }
  }
  return (
    <form onSubmit={onSubmit}>
      <div className="bg-surface-container-low p-8 rounded-[2rem]">
        <h4 className="text-primary font-bold label-md mb-6 flex items-center gap-2">
          <span
            className="material-symbols-outlined text-lg"
            data-icon="lock_reset"
          >
            lock_reset
          </span>
          Security
        </h4>
        <div className="space-y-6">
          <div className="group">
            <label
              htmlFor="currentPassword"
              className="block text-primary text-[0.875rem] font-bold mb-2 ml-1"
            >
              Current Password
            </label>
            <input
              className="w-full bg-surface-container-highest border-none rounded-xl py-3 px-4 focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary-fixed transition-all outline-none text-on-surface"
              placeholder="••••••••"
              type="password"
              name="currentPassword"
              required={true}
            />
          </div>
          <div className="group">
            <label
              htmlFor="newPassword"
              className="block text-primary text-[0.875rem] font-bold mb-2 ml-1"
            >
              New Password
            </label>
            <input
              className="w-full bg-surface-container-highest border-none rounded-xl py-3 px-4 focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary-fixed transition-all outline-none text-on-surface"
              placeholder="••••••••"
              type="password"
              name="newPassword"
              required={true}
            />
          </div>
          <div className="group">
            <label
              htmlFor="confirmNewPassword"
              className="block text-primary text-[0.875rem] font-bold mb-2 ml-1"
            >
              Confirm New Password
            </label>
            <input
              className="w-full bg-surface-container-highest border-none rounded-xl py-3 px-4 focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary-fixed transition-all outline-none text-on-surface"
              placeholder="••••••••"
              type="password"
              name="confirmNewPassword"
              required
            />
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-end gap-4">
            <button
              disabled={isPending}
              className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-br from-primary to-primary-container text-on-primary rounded-full font-bold shadow-[0_4px_12px_rgba(33,106,23,0.2)] hover:scale-[1.02] active:scale-95 transition-all"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default ChangePasswordForm;
