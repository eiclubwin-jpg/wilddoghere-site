import { CharacterSticker } from "@/components/CharacterSticker";
import type { Character } from "@/data/characters";

type FamilyDecorationsProps = {
  characters: Character[];
  variant:
    | "hero"
    | "featured"
    | "latest"
    | "categories"
    | "about"
    | "collaboration"
    | "footer";
};

function findCharacter(characters: Character[], id: string) {
  return characters.find((character) => character.id === id);
}

export function FamilyDecorations({
  characters,
  variant
}: FamilyDecorationsProps) {
  const dad = findCharacter(characters, "wilddog-dad");
  const mom = findCharacter(characters, "wilddog-mom");
  const firstKid = findCharacter(characters, "big-kid");
  const secondKid = findCharacter(characters, "second-kid");
  const thirdKid = findCharacter(characters, "third-kid");
  const grandpa = findCharacter(characters, "grandpa");
  const grandma = findCharacter(characters, "grandma");

  if (variant === "hero") {
    return (
      <div className="pointer-events-none absolute inset-0">
        {dad ? (
          <CharacterSticker
            character={dad}
            size="lg"
            position="absolute right-8 top-6 sm:right-12 lg:right-20"
            rotate="-rotate-3"
          />
        ) : null}
        {mom ? (
          <CharacterSticker
            character={mom}
            size="md"
            position="absolute bottom-8 right-28 hidden sm:block lg:right-36"
            rotate="rotate-3"
          />
        ) : null}
      </div>
    );
  }

  if (variant === "featured") {
    return (
      <div className="pointer-events-none absolute inset-x-0 top-6 mx-auto hidden max-w-7xl sm:block">
        {firstKid ? (
          <CharacterSticker
            character={firstKid}
            size="sm"
            position="absolute left-5 top-2"
            rotate="-rotate-6"
          />
        ) : null}
        {secondKid ? (
          <CharacterSticker
            character={secondKid}
            size="sm"
            position="absolute right-5 top-6"
            rotate="rotate-6"
          />
        ) : null}
      </div>
    );
  }

  if (variant === "latest") {
    return thirdKid ? (
      <CharacterSticker
        character={thirdKid}
        size="sm"
        className="mx-auto mb-5 w-fit sm:absolute sm:right-8 sm:top-14 sm:mx-0 sm:mb-0"
        rotate="-rotate-3"
      />
    ) : null;
  }

  if (variant === "categories") {
    return (
      <div className="pointer-events-none absolute inset-x-0 top-10 mx-auto hidden max-w-7xl lg:block">
        {dad ? (
          <CharacterSticker
            character={dad}
            size="xs"
            position="absolute right-24 top-24"
            rotate="rotate-6"
          />
        ) : null}
        {mom ? (
          <CharacterSticker
            character={mom}
            size="xs"
            position="absolute left-24 top-28"
            rotate="-rotate-6"
          />
        ) : null}
        {thirdKid ? (
          <CharacterSticker
            character={thirdKid}
            size="xs"
            position="absolute right-1/3 top-4"
            rotate="-rotate-3"
          />
        ) : null}
      </div>
    );
  }

  if (variant === "about") {
    return (
      <div className="mt-7 flex flex-wrap gap-2">
        {characters.map((character, index) => (
          <CharacterSticker
            key={character.id}
            character={character}
            size="xs"
            rotate={index % 2 === 0 ? "-rotate-3" : "rotate-3"}
          />
        ))}
      </div>
    );
  }

  if (variant === "collaboration") {
    return (
      <div className="pointer-events-none absolute inset-0">
        {grandpa ? (
          <CharacterSticker
            character={grandpa}
            size="md"
            position="absolute bottom-4 left-4 hidden sm:block"
            rotate="-rotate-3"
          />
        ) : null}
        {grandma ? (
          <CharacterSticker
            character={grandma}
            size="md"
            position="absolute bottom-4 right-4 hidden sm:block"
            rotate="rotate-3"
          />
        ) : null}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
      {characters.map((character, index) => (
        <CharacterSticker
          key={character.id}
          character={character}
          size="xs"
          rotate={index % 2 === 0 ? "-rotate-2" : "rotate-2"}
        />
      ))}
    </div>
  );
}
