'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function Gallery({ photos, alt }: { photos: string[]; alt: string }) {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  if (photos.length === 0) {
    return (
      <div className="flex aspect-[4/3] items-center justify-center rounded-2xl bg-sage-50 text-ink/30">
        Нет фото
      </div>
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => setLightbox(true)}
        className="relative block aspect-[4/3] w-full overflow-hidden rounded-2xl bg-sage-50"
      >
        <Image
          src={photos[active]}
          alt={alt}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
          priority
        />
      </button>

      {photos.length > 1 && (
        <div className="mt-3 grid grid-cols-5 gap-2 md:grid-cols-6">
          {photos.map((src, i) => (
            <button
              key={src + i}
              type="button"
              onClick={() => setActive(i)}
              className={`relative aspect-square overflow-hidden rounded-lg bg-sage-50 ring-1 transition ${
                i === active ? 'ring-2 ring-sage-700' : 'ring-ink/5 hover:ring-ink/20'
              }`}
            >
              <Image src={src} alt="" fill sizes="10vw" className="object-cover" />
            </button>
          ))}
        </div>
      )}

      {lightbox && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4" onClick={() => setLightbox(false)}>
          <div className="relative h-full w-full">
            <Image src={photos[active]} alt={alt} fill sizes="100vw" className="object-contain" />
          </div>
          <button
            type="button"
            className="absolute right-4 top-4 z-10 text-2xl text-white/80 hover:text-white"
            onClick={() => setLightbox(false)}
            aria-label="Закрыть"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}
