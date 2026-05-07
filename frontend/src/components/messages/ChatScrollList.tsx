import { getConversaciones } from "@/services/conversacion/getConversaciones.services";
import ChatItem from "./ChatItem";

async function ChatScrollList() {
  const data = await getConversaciones();
  console.log({ data });
  return (
    <div className="flex-1 overflow-y-auto hide-scrollbar px-2 md:px-4 space-y-1 md:space-y-2 pb-28 md:pb-0">
      {data.conversaciones.map((conversacion) => (
        <ChatItem key={conversacion.id} conversacion={conversacion} />
      ))}

      {data.conversaciones.length === 0 && (
        <p className="text-center text-on-surface-variant mt-10">
          No conversations yet. Start a new chat!
        </p>
      )}
    </div>
  );
}

export default ChatScrollList;
