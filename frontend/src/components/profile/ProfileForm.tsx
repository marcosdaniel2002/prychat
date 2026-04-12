"use client";

import toast from "react-hot-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { updatePassword } from "@/services/auth/updatePassword.services";
import { useAuth } from "@/contexts/AuthContext";
import { updateProfile } from "@/services/auth/updateProfile.services";

function ProfileForm() {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();
  const user = useAuth();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsPending(true);
    // ✅ FormData desde el form completo, como si fuera un form normal
    const formData = new FormData(e.currentTarget);
    try {
      const res = await updateProfile(formData);
      toast.success(`Perfil actualizado con éxito.`);
      //   router.replace("/");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsPending(false);
    }
  }
  return (
    <form onSubmit={onSubmit}>
      <div className="space-y-10">
        <div className="bg-surface-container-low p-8 rounded-[2rem]">
          <h4 className="text-primary font-bold label-md mb-6 flex items-center gap-2">
            <span
              className="material-symbols-outlined text-lg"
              data-icon="person_edit"
            >
              person_edit
            </span>
            Personal Information
          </h4>
          <div className="space-y-6">
            <div className="group">
              <label
                htmlFor="firstName"
                className="block text-primary text-[0.875rem] font-bold mb-2 ml-1"
              >
                First Name
              </label>
              <input
                className="w-full bg-surface-container-highest border-none rounded-xl py-3 px-4 focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary-fixed transition-all outline-none text-on-surface"
                type="text"
                defaultValue={user?.nombres || "Sin registros"}
                name="firstName"
                required
              />
            </div>
            <div className="group">
              <label
                htmlFor="lastName"
                className="block text-primary text-[0.875rem] font-bold mb-2 ml-1"
              >
                Last Name
              </label>
              <input
                className="w-full bg-surface-container-highest border-none rounded-xl py-3 px-4 focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary-fixed transition-all outline-none text-on-surface"
                type="text"
                defaultValue={user?.apellidos || "Sin registros"}
                required
                name="lastName"
              />
            </div>
            <div className="group">
              <label
                htmlFor="username"
                className="block text-primary text-[0.875rem] font-bold mb-2 ml-1"
              >
                Username
              </label>
              <input
                className="w-full bg-surface-container-highest border-none rounded-xl py-3 px-4 focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary-fixed transition-all outline-none text-on-surface"
                type="text"
                defaultValue={user?.username || "Sin registros"}
                required
                name="username"
              />
            </div>
            <div className="group">
              <label
                htmlFor="biography"
                className="block text-primary text-[0.875rem] font-bold mb-2 ml-1"
              >
                Biography
              </label>
              <textarea
                className="w-full bg-surface-container-highest border-none rounded-xl py-3 px-4 focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary-fixed transition-all outline-none text-on-surface resize-none"
                rows={4}
                defaultValue={user?.biografia || "Sin registros"}
                name="biography"
              ></textarea>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-end gap-4 pt-4">
            <button className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-br from-primary to-primary-container text-on-primary rounded-full font-bold shadow-[0_4px_12px_rgba(33,106,23,0.2)] hover:scale-[1.02] active:scale-95 transition-all">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default ProfileForm;
