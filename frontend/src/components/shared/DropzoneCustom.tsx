"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";

const MAX_SIZE = 2 * 1024 * 1024;
const ACCEPTED_TYPES = { "image/png": [], "image/jpeg": [], "image/webp": [] };

export interface DropzoneFile {
  file: File;
  preview: string;
}

interface DropzoneProps {
  value?: DropzoneFile | null;
  onChange?: (value: DropzoneFile | null) => void;
  onError?: (message: string) => void;
  maxSize?: number;
  accept?: Record<string, string[]>;
  hint?: string;
  disabled?: boolean;
  inputName?: string;
  initialPreview?: string | null; // 👈 nuevo
  required?: boolean;
}

function DropzoneCustom({
  value,
  onChange,
  onError,
  maxSize = MAX_SIZE,
  accept = ACCEPTED_TYPES,
  hint = "PNG, JPG, WebP · Máx. 2 MB",
  disabled = false,
  inputName,
  initialPreview,
  required = false,
}: DropzoneProps) {
  const [removedInitial, setRemovedInitial] = useState(false);
  const [internalValue, setInternalValue] = useState<DropzoneFile | null>(
    () => {
      if (initialPreview) {
        return {
          file: new File([], "current-file", { type: "image/jpeg" }),
          preview: initialPreview,
        };
      }
      return null;
    },
  );
  const hiddenInputRef = useRef<HTMLInputElement>(null);

  const current = value !== undefined ? value : internalValue;

  function syncHiddenInput(file: File | null) {
    if (!hiddenInputRef.current) return;
    const dt = new DataTransfer();
    if (file) dt.items.add(file);
    hiddenInputRef.current.files = dt.files;
  }

  const onDrop = useCallback(
    (accepted: File[], rejected: any[]) => {
      if (rejected.length > 0) {
        const code = rejected[0].errors[0]?.code;
        const msg =
          code === "file-too-large"
            ? `El archivo supera los ${(maxSize / 1024 / 1024).toFixed(0)} MB permitidos.`
            : code === "file-invalid-type"
              ? "Tipo de archivo no permitido."
              : "Archivo no válido.";
        onError?.(msg);
        return;
      }
      const file = accepted[0];
      if (!file) return;
      const next: DropzoneFile = { file, preview: URL.createObjectURL(file) };
      if (value === undefined) setInternalValue(next);
      syncHiddenInput(file);
      onChange?.(next);
      setRemovedInitial(false);
    },
    [maxSize, onError, onChange, value],
  );

  function handleRemove(e: React.MouseEvent) {
    e.stopPropagation();
    if (value === undefined) setInternalValue(null);
    syncHiddenInput(null);
    onChange?.(null);
    setRemovedInitial(true);
  }

  const { getRootProps, getInputProps, isDragActive, isDragReject, open } =
    useDropzone({
      onDrop,
      accept,
      maxSize,
      multiple: false,
      disabled,
    });

  const zoneClass = disabled
    ? "border-outline-variant/30 bg-surface-container-low/50 cursor-not-allowed opacity-60"
    : isDragReject
      ? "border-error cursor-grabbing"
      : isDragActive
        ? "border-primary cursor-copy scale-[1.01]"
        : current
          ? "border-primary/40 cursor-pointer"
          : "border-outline-variant/50 hover:border-primary/50 cursor-pointer";

  useEffect(() => {
    if (!hiddenInputRef.current || !required) return;

    const hasFile = !!current && current.file.size > 0;
    const hasInitial = !!initialPreview && !removedInitial; // 👈

    hiddenInputRef.current.setCustomValidity(
      !hasFile && !hasInitial ? "Imagen obligatoria" : "",
    );
  }, [current, required, initialPreview, removedInitial]); // 👈

  return (
    <div
      {...getRootProps()}
      className={`relative rounded-xl border-2 border-dashed transition-all duration-300 overflow-hidden ${zoneClass}`}
    >
      {/* Dropzone internal input */}
      <input {...getInputProps()} />

      {/* Hidden input for FormData */}
      {inputName && (
        <>
          <input
            ref={hiddenInputRef}
            type="file"
            name={inputName}
            data-required={required ? "true" : undefined}
            className="absolute opacity-0 w-full h-px top-30 left-0 pointer-events-none" // 👈 h-px en vez de h-full
            tabIndex={-1}
          />
          <input
            type="hidden"
            name={`_remove_${inputName}`}
            value={current ? "false" : "true"}
          />
        </>
      )}

      {/* Background preview image — always rendered when there's a file */}
      {current && (
        <div className="absolute inset-0 z-0">
          <img
            src={current.preview}
            alt="preview background"
            className="w-full h-full object-cover"
          />
          {/* Subtle darkening overlay so text is readable */}
          <div className="absolute inset-0 bg-black/30" />
        </div>
      )}

      {/* Content layer — always on top */}
      <div
        className={`h-[170px] relative z-10 flex flex-col items-center justify-center gap-2 px-4 py-8 text-center select-none ${current ? "opacity-60 hover:opacity-90 transition-opacity duration-300" : ""}`}
      >
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
            isDragReject
              ? "bg-error-container"
              : isDragActive
                ? "bg-primary-fixed"
                : current
                  ? "bg-white/20 backdrop-blur-sm"
                  : "bg-surface-container"
          }`}
        >
          <span
            className={`material-symbols-outlined transition-colors duration-300 ${
              isDragReject
                ? "text-error"
                : isDragActive
                  ? "text-primary"
                  : current
                    ? "text-white"
                    : "text-outline"
            }`}
            style={{ fontSize: "1.5rem" }}
          >
            {isDragReject
              ? "block"
              : isDragActive
                ? "download"
                : current
                  ? "edit"
                  : "add_photo_alternate"}
          </span>
        </div>

        {isDragReject ? (
          <p
            className={`text-[0.875rem] font-semibold ${current ? "text-white" : "text-error"}`}
          >
            Archivo no permitido
          </p>
        ) : isDragActive ? (
          <p
            className={`text-[0.875rem] font-semibold ${current ? "text-white" : "text-primary"}`}
          >
            Suelta aquí tu imagen
          </p>
        ) : current ? (
          <>
            <p className="text-[0.875rem] font-semibold text-white drop-shadow">
              {current.file.name}
            </p>
            <p className="text-[0.75rem] font-medium text-white/80 drop-shadow">
              {current.file.type.split("/")[1].toUpperCase()} ·{" "}
              {current.file.size < 1024 * 1024
                ? `${(current.file.size / 1024).toFixed(0)} KB`
                : `${(current.file.size / 1024 / 1024).toFixed(1)} MB`}
            </p>
            <div className="flex items-center gap-3 mt-1">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  open();
                }}
                className="text-[0.75rem] font-bold text-white bg-white/20 hover:bg-white/30 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 transition-all"
              >
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: "0.875rem" }}
                >
                  edit
                </span>
                Cambiar
              </button>
              <button
                type="button"
                onClick={handleRemove}
                className="text-[0.75rem] font-bold text-white bg-white/20 hover:bg-error-container/60 hover:text-error backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 transition-all"
              >
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: "0.875rem" }}
                >
                  close
                </span>
                Quitar
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="text-[0.875rem] font-semibold text-on-surface-variant">
              Arrastra una imagen o{" "}
              <span className="text-primary font-bold">
                haz clic para elegir
              </span>
            </p>
            {hint && (
              <p className="text-[0.75rem] font-medium text-outline">{hint}</p>
            )}
          </>
        )}
      </div>

      {/* Drag active pulse border */}
      {isDragActive && !isDragReject && (
        <div className="pointer-events-none absolute inset-0 rounded-xl border-2 border-primary animate-pulse z-20" />
      )}
    </div>
  );
}

export default DropzoneCustom;
