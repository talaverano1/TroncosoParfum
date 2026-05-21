"use client";

import { type ScentNote } from "@/app/types/products";

interface ScentNotesProps {
  notes: ScentNote[];
}

export default function ScentNotes({ notes }: ScentNotesProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-white/50 text-sm md:text-base uppercase tracking-[0.2em] font-semibold">
        Notas Olfativas
      </h2>
      <div className="flex flex-col gap-3 md:gap-4">
        {notes.map((note) => (
          <div key={note.name} className="flex items-center gap-3 md:gap-4">
            <span className="text-white/80 text-sm sm:text-base md:text-lg w-20 sm:w-28 md:w-44 shrink-0 truncate font-medium">
              {note.name}
            </span>
            <div className="flex-1 h-2 sm:h-3 bg-white/10 rounded-full overflow-hidden shadow-inner">
              <div
                className="h-full rounded-full gold-gradient"
                style={{ width: `${note.intensity * 10}%` }}
              />
            </div>
            <span className="text-gold/80 text-xs sm:text-sm md:text-base font-bold w-6 md:w-8 text-right shrink-0">
              {note.intensity / 2}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
