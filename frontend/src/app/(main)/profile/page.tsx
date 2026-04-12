"use client";

import AvatarForm from "@/components/profile/AvatarForm";
import ChangePasswordForm from "@/components/profile/ChangePasswordForm";
import ProfileForm from "@/components/profile/ProfileForm";
import Modal from "@/components/shared/Modal";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";

function page() {
  const [modalFormAvatar, setModalFormAvatar] = useState(false);
  const user = useAuth();
  return (
    <div className="px-6 md:px-12 lg:px-16 py-8 md:py-12 mx-auto w-full max-w-7xl mb-10 md:mb-0">
      <div className="mb-12">
        <h2 className="text-[2.75rem] font-extrabold tracking-tight text-on-surface leading-tight font-headline">
          My Profile
        </h2>
      </div>
      {/* <!-- Profile Header Section --> */}
      <div className="flex flex-col md:flex-row items-center gap-8 mb-16 bg-surface-container-low p-8 rounded-[2rem] relative overflow-hidden">
        <div className="relative group">
          <img
            alt="User Profile Picture"
            className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover shadow-lg border-4 border-surface"
            data-alt="Close-up portrait of a professional man with friendly expression, soft natural indoor lighting, minimalist background"
            src={
              user?.imagen
                ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/${user.imagen}`
                : "/default-avatar.png"
            }
          />
          <button
            onClick={() => setModalFormAvatar(true)}
            className="absolute bottom-1 right-1 bg-primary text-on-primary p-2.5 rounded-full shadow-md hover:scale-105 active:scale-95 transition-transform flex"
          >
            <span
              className="material-symbols-outlined text-sm"
              data-icon="camera_alt"
            >
              camera_alt
            </span>
          </button>
          {modalFormAvatar && (
            <Modal
              isOpen={modalFormAvatar}
              onClose={() => setModalFormAvatar(false)}
              title="Update Avatar"
            >
              <AvatarForm onClose={() => setModalFormAvatar(false)} />
            </Modal>
          )}
        </div>
        <div className="text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2">
            <h3 className="text-2xl font-bold text-on-surface">Alex Rivers</h3>
            <span className="bg-primary-fixed text-on-primary-fixed text-[0.6875rem] px-3 py-1 rounded-full font-bold uppercase tracking-wider inline-flex items-center gap-1.5 self-center md:self-auto">
              <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
              Active Now
            </span>
          </div>
          <p className="text-on-surface-variant font-medium text-lg">
            @arivers
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* <!-- Personal Info & Bio --> */}
        <ProfileForm />
        {/* <!-- Status & Security --> */}
        <section className="space-y-10">
          <div className="bg-surface-container-low p-8 rounded-[2rem]">
            <h4 className="text-primary font-bold label-md mb-6 flex items-center gap-2">
              <span
                className="material-symbols-outlined text-lg"
                data-icon="bubble_chart"
              >
                bubble_chart
              </span>
              Account Status
            </h4>
            <div className="group">
              <label className="block text-primary text-[0.875rem] font-bold mb-2 ml-1">
                Current Mood
              </label>
              <input
                className="w-full bg-surface-container-highest border-none rounded-xl py-3 px-4 focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary-fixed transition-all outline-none text-on-surface"
                type="text"
                defaultValue="Exploring the intersection of design and tech"
              />
            </div>
          </div>
          {/* FORM CONTRASENA */}
          <ChangePasswordForm />
        </section>
      </div>
    </div>
  );
}

export default page;
