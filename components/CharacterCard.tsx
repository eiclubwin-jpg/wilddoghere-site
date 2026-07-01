import type { Character } from "@/data/characters";

type CharacterCardProps = {
  character: Character;
};

export function CharacterCard({ character }: CharacterCardProps) {
  return (
    <article className="hand-drawn flex h-full flex-col bg-cream p-6 shadow-soft">
      <div
        className={`mb-5 flex aspect-[4/3] items-center justify-center rounded-[1.25rem] ${character.color}`}
      >
        <span className="text-5xl font-bold text-cocoa/35">
          {character.name.slice(0, 1)}
        </span>
      </div>
      <p className="text-sm font-semibold text-clay">{character.role}</p>
      <h3 className="mt-2 text-2xl font-bold text-coffee">{character.name}</h3>
      <p className="mt-3 flex-1 text-base leading-7 text-cocoa/75">
        {character.personality}
      </p>
    </article>
  );
}
