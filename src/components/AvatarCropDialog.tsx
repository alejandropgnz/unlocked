import { useState, useCallback } from "react";
import Cropper, { type Area } from "react-easy-crop";
import { Modal } from "./ui/Modal";
import { Button } from "./ui/Button";

interface AvatarCropDialogProps {
  imageSrc: string;
  open: boolean;
  onCancel: () => void;
  onConfirm: (blob: Blob) => void | Promise<void>;
}

async function getCroppedBlob(imageSrc: string, area: Area): Promise<Blob> {
  const image = await new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = imageSrc;
  });

  const canvas = document.createElement("canvas");
  const targetSize = 512; // output 512×512 jpeg
  canvas.width = targetSize;
  canvas.height = targetSize;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas not supported");

  ctx.drawImage(
    image,
    area.x,
    area.y,
    area.width,
    area.height,
    0,
    0,
    targetSize,
    targetSize,
  );

  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) return reject(new Error("toBlob failed"));
        resolve(blob);
      },
      "image/jpeg",
      0.9,
    );
  });
}

export function AvatarCropDialog({
  imageSrc,
  open,
  onCancel,
  onConfirm,
}: AvatarCropDialogProps) {
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState<Area | null>(null);
  const [processing, setProcessing] = useState(false);

  const onCropComplete = useCallback((_a: Area, areaPixels: Area) => {
    setCroppedArea(areaPixels);
  }, []);

  const handleConfirm = async () => {
    if (!croppedArea) return;
    setProcessing(true);
    try {
      const blob = await getCroppedBlob(imageSrc, croppedArea);
      await onConfirm(blob);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <Modal open={open} onClose={onCancel} className="max-w-md">
      <h3 className="text-xl font-black tracking-tighter mb-4">Recortar foto</h3>
      <div className="relative w-full h-72 bg-bg rounded-xl overflow-hidden">
        <Cropper
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          aspect={1}
          cropShape="round"
          showGrid={false}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropComplete}
        />
      </div>
      <div className="mt-4">
        <label className="text-xs uppercase tracking-widest text-muted">Zoom</label>
        <input
          type="range"
          min={1}
          max={3}
          step={0.05}
          value={zoom}
          onChange={(e) => setZoom(Number(e.target.value))}
          className="w-full mt-1 accent-indigo"
        />
      </div>
      <div className="mt-5 flex gap-3">
        <Button variant="ghost" size="block" onClick={onCancel} disabled={processing}>
          Cancelar
        </Button>
        <Button
          variant="primary"
          size="block"
          onClick={handleConfirm}
          disabled={processing || !croppedArea}
        >
          {processing ? "..." : "Guardar"}
        </Button>
      </div>
    </Modal>
  );
}
