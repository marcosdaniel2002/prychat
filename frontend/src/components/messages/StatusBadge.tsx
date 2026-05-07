// Badge para el avatar (esquina)
type EstadoUser = "online" | "offline" | "away" | "busy";

const statusConfig: Record<EstadoUser, { color: string; label: string }> = {
  online: { color: "bg-green-400", label: "Online" },
  offline: { color: "bg-gray-400", label: "Offline" },
  away: { color: "bg-yellow-400", label: "Away" },
  busy: { color: "bg-red-400", label: "Busy" },
};

export function StatusBadge({ estado }: { estado: string }) {
  const config = statusConfig[estado as EstadoUser] ?? statusConfig.offline;
  return (
    <span
      className={`absolute -bottom-1 -right-1 w-3 h-3 md:w-3.5 md:h-3.5 border-2 border-surface rounded-full ${config.color}`}
    />
  );
}
