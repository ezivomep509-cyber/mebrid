'use client';

import { useState } from 'react';
import { social } from '@/lib/site';

export default function ContactWidget() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-40 sm:bottom-6 sm:right-6">
      {/* Развёрнутая карточка */}
      {open && (
        <div className="mb-3 w-72 overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-ink/10">
          <div className="bg-sage-700 px-4 py-3 text-white">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold">Напишите нам</div>
                <div className="text-xs text-white/80">Ответим в течение рабочего дня</div>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Закрыть"
                className="-mr-1 -mt-1 rounded-full p-1.5 text-white/80 hover:bg-white/10 hover:text-white"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <div className="p-4">
            <p className="mb-3 text-xs text-ink/70 leading-relaxed">
              Поможем подобрать мебель, рассчитаем доставку и&nbsp;ответим на&nbsp;любые вопросы.
            </p>
            <a
              href={social.vkMessage}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl bg-[#0077FF] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#0066DD]"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.7 7.5c.2-.5 0-.9-.8-.9h-2.5c-.7 0-1 .4-1.1.7 0 0-1.3 3.3-3.3 5.4-.6.6-.9.8-1.2.8-.2 0-.4-.2-.4-.7V7.5c0-.6-.2-.9-.7-.9H8.7c-.4 0-.6.3-.6.6 0 .6.9.7 1 2.5v3.7c0 .8-.1.9-.4.9-.8 0-3-3.3-4.3-7.1-.3-.7-.5-1-1.2-1H.7c-.7 0-.9.4-.9.7 0 .6 1 4.2 4.5 8.9 2.4 3.2 5.7 5 8.7 5 1.8 0 2.1-.4 2.1-1v-2.4c0-.7.1-.9.7-.9.4 0 1 .2 2.6 1.7 1.8 1.8 2.1 2.6 3.1 2.6h2.5c.7 0 1.1-.4.9-1-.2-.6-1.1-1.5-2.3-2.6-.6-.7-1.6-1.5-1.9-1.9-.4-.5-.3-.7 0-1.2 0 0 3.4-4.7 3.7-6.3z" />
              </svg>
              Написать в&nbsp;ВКонтакте
            </a>
            <p className="mt-3 text-center text-[11px] text-ink/40">
              Откроется диалог с&nbsp;менеджером
            </p>
          </div>
        </div>
      )}

      {/* Главная кнопка */}
      <button
        onClick={() => setOpen(!open)}
        aria-label={open ? 'Закрыть' : 'Написать нам'}
        className={`group flex h-14 items-center gap-3 rounded-full bg-sage-700 px-5 text-white shadow-lg shadow-sage-700/30 transition-all hover:bg-sage-900 hover:shadow-xl ${
          open ? 'pl-4 pr-4' : ''
        }`}
      >
        {open ? (
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        ) : (
          <>
            <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
            <span className="text-sm font-semibold">Написать нам</span>
          </>
        )}
      </button>
    </div>
  );
}
