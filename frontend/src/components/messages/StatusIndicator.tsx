type EstadoUser = "online" | "offline" | "away" | "busy";

const statusConfig: Record<EstadoUser, { color: string; label: string }> = {
  online: { color: "bg-green-400", label: "Online" },
  offline: { color: "bg-gray-400", label: "Offline" },
  away: { color: "bg-yellow-400", label: "Away" },
  busy: { color: "bg-red-400", label: "Busy" },
};

export function StatusIndicator({ estado }: { estado: string }) {
  const config = statusConfig[estado as EstadoUser] ?? statusConfig.offline;
  return (
    <span className="label-sm text-secondary uppercase font-bold tracking-widest flex items-center gap-1.5">
      {config.label}
    </span>
  );
}
