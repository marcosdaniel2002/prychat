"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import DropzoneCustom, { DropzoneFile } from "../shared/DropzoneCustom";
import { updateAvatar } from "@/actions/auth/update-avatar.action";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

interface AvatarFormProps {
  currentImage?: string | null;
  onClose?: () => void;
}

function AvatarForm({ currentImage, onClose }: AvatarFormProps) {
  const router = useRouter();
  const user = useAuth();

  const actualImage = user?.imagen
    ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/${user.imagen}`
    : null;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // ✅ FormData desde el form completo, como si fuera un form normal
    const formData = new FormData(e.currentTarget);

    // Validación manual para el dropzone
    // const imagen = formData.get("imagen") as File;
    // const removeImagen = formData.get("_remove_imagen") === "true";
    // const hasNewFile = imagen && imagen.size > 0;

    // // required=true + sin initialPreview + no seleccionó nada
    // if (!hasNewFile && removeImagen) {
    //   toast.error("Imagen obligatoria");
    //   return;
    // }

    try {
      await updateAvatar(formData);
      toast.success("Avatar actualizado con éxito.");
      router.refresh(); // ✅ Re-ejecuta el layout y trae el usuario actualizado del servidor
      onClose && onClose();
    } catch (err: any) {
      toast.error(err.message);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {/* ── Dropzone ── */}
      <div className="space-y-2">
        <label
          htmlFor="imagen"
          className="block text-primary font-semibold text-[0.875rem] ml-1"
        >
          Foto de perfil
        </label>
        <DropzoneCustom
          inputName="imagen"
          required={true}
          initialPreview={actualImage}
          onError={(msg) => toast.error(msg)}
        />
      </div>

      {/* ── buttons ── */}
      <div className="flex flex-col sm:flex-row items-center justify-end gap-4">
        <button
          onClick={onClose}
          className="w-full sm:w-auto px-6 py-3.5 text-on-surface hover:bg-surface-container-highest rounded-full font-bold transition-all"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="w-full sm:w-auto px-6 py-3.5 bg-gradient-to-br from-primary to-primary-container text-on-primary rounded-full font-bold shadow-[0_4px_12px_rgba(33,106,23,0.2)] hover:scale-[1.02] active:scale-95 transition-all"
        >
          Save
        </button>
      </div>
    </form>
  );
}

export default AvatarForm;
