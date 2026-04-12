export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <span
        className="text-[50px] inline-block animate-bounce"
        role="status"
        aria-label="Cargando"
      >
        🌿
      </span>
    </div>
  );
}
