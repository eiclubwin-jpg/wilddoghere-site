import type { ContentItem } from "@/data/contents";

type ContentCardProps = {
  content: ContentItem;
};

export function ContentCard({ content }: ContentCardProps) {
  const hasImage = content.image.status === "ready" && content.image.src;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-cocoa/10 bg-white shadow-soft">
      <div className="relative flex aspect-[16/10] items-center justify-center bg-linen">
        {hasImage ? (
          <img
            src={content.image.src}
            alt={content.image.alt}
            className="h-full w-full object-cover"
          />
        ) : (
          <>
            <div className="absolute inset-4 rounded-[1rem] border border-dashed border-cocoa/20" />
            <div className="relative px-5 text-center">
              <span className="block text-sm font-semibold uppercase tracking-[0.2em] text-cocoa/45">
                {content.category}
              </span>
              <span className="mt-3 block text-xs font-semibold text-cocoa/40">
                {content.image.recommendedFileName}
              </span>
            </div>
          </>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-4 flex flex-wrap gap-2">
          <span className="w-fit rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-clay">
            {content.tag}
          </span>
          <span className="w-fit rounded-full bg-linen px-3 py-1 text-xs font-semibold text-cocoa/65">
            {content.format}
          </span>
        </div>
        <h3 className="text-2xl font-bold text-coffee">{content.title}</h3>
        <p className="mt-3 flex-1 text-base leading-7 text-cocoa/75">
          {content.description}
        </p>
        <p className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-cocoa/45">
          {content.status === "published" ? "Published" : "Planning"}
        </p>
      </div>
    </article>
  );
}
