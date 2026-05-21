"use client";

// ─── FilterChip ───────────────────────────────────────────────────────────────
interface FilterChipProps {
  icon: string;
  label: string;
  active: boolean;
  onClick: () => void;
}

export default function FilterChip({ icon, label, active, onClick }: FilterChipProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-250 whitespace-nowrap border ${
        active
          ? "bg-gold text-black border-gold shadow-md shadow-gold/20"
          : "bg-white/5 text-white/50 border-white/10 hover:bg-white/10 hover:text-white/80"
      }`}
    >
      <span className="text-sm leading-none">{icon}</span>
      <span>{label}</span>
    </button>
  );
}
