// FriendsList.tsx — Server Component
import { Usuario } from "@/types/auth/usuario.types";
import { getPotentialFriends } from "@/services/friends/get-potential-friends.server";
import FriendCard from "./FriendCard";

async function FriendsList() {
  const data = await getPotentialFriends(); // 👈 directo, sin useEffect

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {data.users.map((user) => (
        <FriendCard key={user.id} usuario={user} />
      ))}
    </div>
  );
}

export default FriendsList;
