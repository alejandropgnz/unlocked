import { useState, type ChangeEvent } from "react";
import { Camera, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { logger } from "@/lib/logger";
import { cn } from "@/lib/cn";
import { AvatarCropDialog } from "./AvatarCropDialog";

interface AvatarUploaderProps {
  /** Auth user id — used as Storage path prefix. */
  userId: string;
  /** Current avatar URL. Null/empty shows initials fallback. */
  value: string | null;
  /** Called with the new public URL after a successful upload. */
  onChange: (url: string) => void;
  /** Initials shown when no avatar (fallback). */
  initials: string;
  size?: "md" | "lg";
}

export function AvatarUploader({
  userId,
  value,
  onChange,
  initials,
  size = "md",
}: AvatarUploaderProps) {
  const [cropSrc, setCropSrc] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const avatarSize = size === "lg" ? "w-32 h-32" : "w-24 h-24";
  const camSize = size === "lg" ? "w-9 h-9" : "w-8 h-8";

  const handleFileSelected = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Solo imágenes");
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      toast.error("Máximo 8 MB");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setCropSrc(reader.result as string);
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const handleCropConfirm = async (blob: Blob) => {
    setCropSrc(null);
    setUploading(true);
    try {
      const path = `${userId}/avatar.jpg`;
      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(path, blob, { upsert: true, contentType: "image/jpeg" });
      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("avatars")
        .getPublicUrl(path);
      const url = `${publicUrl}?t=${Date.now()}`;
      onChange(url);
      toast.success("Foto actualizada");
    } catch (err) {
      logger.error("avatar upload failed", err);
      toast.error("Error al subir la imagen");
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <div className="relative inline-block">
        <div
          className={cn(
            avatarSize,
            "rounded-full overflow-hidden bg-surface flex items-center justify-center ring-4 ring-bg",
          )}
        >
          {value ? (
            <img src={value} alt="" className="w-full h-full object-cover" />
          ) : (
            <span className="text-2xl font-black text-muted">{initials}</span>
          )}
        </div>
        <label
          className={cn(
            camSize,
            "absolute bottom-0 right-0 rounded-full bg-gold text-bg flex items-center justify-center shadow-md hover:bg-gold/80 transition cursor-pointer",
            uploading && "pointer-events-none opacity-70",
          )}
          aria-label="Cambiar foto de perfil"
        >
          {uploading ? (
            <Loader2 className="w-4 h-4 animate-spin" strokeWidth={2.25} />
          ) : (
            <Camera className="w-4 h-4" strokeWidth={2.25} />
          )}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            disabled={uploading}
            onChange={handleFileSelected}
          />
        </label>
      </div>

      {cropSrc && (
        <AvatarCropDialog
          imageSrc={cropSrc}
          open={!!cropSrc}
          onCancel={() => setCropSrc(null)}
          onConfirm={handleCropConfirm}
        />
      )}
    </>
  );
}
