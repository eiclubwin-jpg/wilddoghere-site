"use client";

import type { Character } from "@/data/characters";

type CharacterCardProps = {
  character: Character;
};

export function CharacterCard({ character }: CharacterCardProps) {
  return (
    <article className="hand-drawn flex h-full flex-col bg-cream p-6 shadow-soft">
      <div className="relative mb-5 flex aspect-[4/3] items-center justify-center overflow-hidden rounded-[1.25rem] bg-butter">
        <div className="absolute inset-4 rounded-[1rem] border border-dashed border-cocoa/20 bg-cream/45" />
        <div className="relative text-center">
          <span className="block text-5xl font-bold text-cocoa/35">
            {character.name.slice(0, 1)}
          </span>
          <span className="mt-3 block text-xs font-semibold text-cocoa/45">
            {character.dogType}
          </span>
        </div>
        <img
          src={character.image}
          alt={character.imageAlt}
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
          onError={(event) => {
            event.currentTarget.style.display = "none";
          }}
        />
      </div>
      <p className="text-sm font-semibold text-clay">{character.dogType}</p>
      <p className="mt-1 text-sm font-semibold text-cocoa/60">
        {character.roleTitle}
      </p>
      <h3 className="mt-2 text-2xl font-bold text-coffee">{character.name}</h3>
      <p className="mt-3 flex-1 text-base leading-7 text-cocoa/75">
        {character.description}
      </p>
      <blockquote className="mt-4 border-l-2 border-clay/40 pl-3 text-sm leading-6 text-cocoa/65">
        {character.quote}
      </blockquote>
      <div className="mt-5 flex flex-wrap gap-2">
        {character.keywords.map((keyword) => (
          <span
            key={keyword}
            className="rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-cocoa/65"
          >
            {keyword}
          </span>
        ))}
      </div>
      {character.isCoreNarrator ? (
        <p className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-clay">
          Core Narrator
        </p>
      ) : null}
    </article>
  );
}
