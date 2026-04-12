"use client";

import { enviarSolicitud } from "@/services/solicitud/enviarSolicitud.server";
import { Usuario } from "@/types/auth/usuario.types";
import toast from "react-hot-toast";

interface Props {
  usuario: Usuario;
}

function FriendCard({ usuario }: Props) {
  const imagen = usuario.imagen
    ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/${usuario.imagen}`
    : "https://lh3.googleusercontent.com/aida-public/AB6AXuAUQLwRHwEnVbDFgzH8beS5ADfpzbmqwU2ZrORz5O-_CDRpBFB5jYGgyJJ2rs9P6JSD833qcGIyQBV4SLWyqWMMwtJEn80MiRHVBgNYvBmd0F01x25LrXGK0dI4W5D9VrbJaTcoUJRkzI06m3QMy96jgniIs6pRnkAl3PthzV46ugF9xt4JCiCEdBNtBXTHFmKHuf2VhzgfFd1GwEsXpk6hSvu1kJVQqOMlz7fMIeYACQIvnDABNCsJBjyXcshTUgqdPkRQMjZtqB2D";
  const onSendRequest = async () => {
    // Aquí iría la lógica para enviar la solicitud de amistad
    try {
      const res = await enviarSolicitud(usuario.id);
      toast.success("Friend request sent!");
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <div className="glass-card rounded-[2rem] p-6 flex flex-col items-center text-center cloud-shadow group hover:translate-y-[-4px] transition-transform duration-300">
      <div className="relative mb-6">
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-surface-container-low group-hover:border-secondary-fixed transition-colors">
          <img
            alt={usuario.nombres}
            className="w-full h-full object-cover"
            data-alt="elegant portrait of a young woman with a creative style sitting in a sunlit art studio"
            src={imagen}
          />
        </div>
        <div
          className={`absolute bottom-1 right-1 w-6 h-6 ${usuario.estado_user == "online" ? "bg-primary-fixed" : "bg-outline-variant"} border-4 border-white rounded-full`}
        ></div>
      </div>
      <h3 className="text-title-md font-bold text-on-surface mb-1">
        {usuario.nombres} {usuario.apellidos}
      </h3>
      <p className="text-label-sm uppercase tracking-widest text-secondary font-bold mb-4">
        {usuario.email}
      </p>
      <p className="text-on-surface-variant text-sm mb-8 leading-relaxed line-clamp-2">
        {usuario.biografia || "No biography available."}
      </p>
      <button
        onClick={onSendRequest}
        className="mt-auto w-full py-3 px-6 bg-gradient-to-br from-primary to-primary-container text-white rounded-full font-bold shadow-md shadow-primary/10 hover:shadow-lg transition-all active:scale-95"
      >
        Send Request
      </button>
    </div>
  );
}

export default FriendCard;

{
  /* <!-- Card 2 --> */
}
// <div className="glass-card rounded-[2rem] p-6 flex flex-col items-center text-center cloud-shadow group hover:translate-y-[-4px] transition-transform duration-300">
//   <div className="relative mb-6">
//     <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-surface-container-low group-hover:border-secondary-fixed transition-colors">
//       <img
//         alt="Marcus Chen"
//         className="w-full h-full object-cover"
//         data-alt="modern portrait of a man with glasses in a minimalist office setting with soft shadows"
//         src="https://lh3.googleusercontent.com/aida-public/AB6AXuAUQLwRHwEnVbDFgzH8beS5ADfpzbmqwU2ZrORz5O-_CDRpBFB5jYGgyJJ2rs9P6JSD833qcGIyQBV4SLWyqWMMwtJEn80MiRHVBgNYvBmd0F01x25LrXGK0dI4W5D9VrbJaTcoUJRkzI06m3QMy96jgniIs6pRnkAl3PthzV46ugF9xt4JCiCEdBNtBXTHFmKHuf2VhzgfFd1GwEsXpk6hSvu1kJVQqOMlz7fMIeYACQIvnDABNCsJBjyXcshTUgqdPkRQMjZtqB2D"
//       />
//     </div>
//     <div className="absolute bottom-1 right-1 w-6 h-6 bg-outline-variant border-4 border-white rounded-full"></div>
//   </div>
//   <h3 className="text-title-md font-bold text-on-surface mb-1">
//     Marcus Chen
//   </h3>
//   <p className="text-label-sm uppercase tracking-widest text-secondary font-bold mb-4">
//     UX Architect
//   </p>
//   <p className="text-on-surface-variant text-sm mb-8 leading-relaxed line-clamp-2">
//     Building fluid interfaces that prioritize user clarity and joy.
//   </p>
//   <button className="mt-auto w-full py-3 px-6 bg-gradient-to-br from-primary to-primary-container text-white rounded-full font-bold shadow-md shadow-primary/10 hover:shadow-lg transition-all active:scale-95">
//     Send Request
//   </button>
// </div>
