import type { Character } from "@/data/characters";

type CharacterCardProps = {
  character: Character;
};

export function CharacterCard({ character }: CharacterCardProps) {
  const hasImage = character.image.status === "ready" && character.image.src;

  return (
    <article className="hand-drawn flex h-full flex-col bg-cream p-6 shadow-soft">
      <div
        className={`mb-5 flex aspect-[4/3] items-center justify-center overflow-hidden rounded-[1.25rem] ${character.color}`}
      >
        {hasImage ? (
          <img
            src={character.image.src}
            alt={character.image.alt}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="text-center">
            <span className="block text-5xl font-bold text-cocoa/35">
              {character.name.slice(0, 1)}
            </span>
            <span className="mt-3 block text-xs font-semibold text-cocoa/45">
              {character.image.recommendedFileName}
            </span>
          </div>
        )}
      </div>
      <p className="text-sm font-semibold text-clay">{character.role}</p>
      <h3 className="mt-2 text-2xl font-bold text-coffee">{character.name}</h3>
      <p className="mt-3 flex-1 text-base leading-7 text-cocoa/75">
        {character.personality}
      </p>
      <div className="mt-5 flex flex-wrap gap-2">
        {character.traits.map((trait) => (
          <span
            key={trait}
            className="rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-cocoa/65"
          >
            {trait}
          </span>
        ))}
      </div>
    </article>
  );
}
