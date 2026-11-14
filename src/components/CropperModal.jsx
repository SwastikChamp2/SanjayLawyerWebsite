import { useCallback, useState } from 'react';
import Cropper from 'react-easy-crop';
import { getCroppedImg } from '../utils/articleUtils';

export default function CropperModal({ open, image, onClose, onCropComplete, aspect = 16 / 9 }) {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [area, setArea] = useState(null);

    const handleComplete = useCallback((_, px) => setArea(px), []);

    const confirm = async () => {
        if (!area) return;
        const blob = await getCroppedImg(image, area);
        onCropComplete(blob);
        onClose();
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[10050] flex items-center justify-center bg-black/75 p-4">
            <div className="flex w-full max-w-lg flex-col overflow-hidden bg-white shadow-2xl">
                <div className="relative h-80 w-full bg-navy">
                    <Cropper
                        image={image}
                        crop={crop}
                        zoom={zoom}
                        aspect={aspect}
                        onCropChange={setCrop}
                        onZoomChange={setZoom}
                        onCropComplete={handleComplete}
                    />
                </div>
                <div className="space-y-4 p-4">
                    <label className="flex items-center gap-3 text-sm font-semibold text-navy">
                        Zoom
                        <input
                            type="range" min={1} max={3} step={0.1} value={zoom}
                            onChange={(e) => setZoom(parseFloat(e.target.value))}
                            className="w-full accent-[var(--color-gold)]"
                        />
                    </label>
                    <div className="flex justify-end gap-3">
                        <button type="button" onClick={onClose} className="border border-line px-4 py-2 text-sm font-semibold text-navy hover:border-gold">Cancel</button>
                        <button type="button" onClick={confirm} className="bg-navy px-4 py-2 text-sm font-semibold text-white hover:text-gold">Crop &amp; apply</button>
                    </div>
                </div>
            </div>
        </div>
    );
}