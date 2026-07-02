"use client";

import type { Character } from "@/data/characters";

type CharacterStickerProps = {
  character: Character;
  size?: "xs" | "sm" | "md" | "lg";
  className?: string;
  position?: string;
  rotate?: string;
  hideOnMobile?: boolean;
};

const sizeStyles = {
  xs: "h-14 w-14 sm:h-16 sm:w-16",
  sm: "h-16 w-16 sm:h-20 sm:w-20",
  md: "h-24 w-24 sm:h-28 sm:w-28",
  lg: "h-28 w-28 sm:h-36 sm:w-36"
};

export function CharacterSticker({
  character,
  size = "md",
  className = "",
  position = "",
  rotate = "rotate-0",
  hideOnMobile = false
}: CharacterStickerProps) {
  return (
    <div
      className={`pointer-events-none ${position} ${hideOnMobile ? "hidden sm:block" : ""} ${className}`}
      aria-label={character.name}
    >
      <div
        className={`family-float overflow-hidden rounded-[1.4rem] border border-white/80 bg-cream/90 p-1.5 shadow-soft transition duration-300 ${sizeStyles[size]} ${rotate}`}
      >
        <img
          src={character.image}
          alt={character.imageAlt}
          className="h-full w-full rounded-[1rem] object-cover"
          loading="lazy"
          onError={(event) => {
            event.currentTarget.style.display = "none";
          }}
        />
      </div>
    </div>
  );
}
