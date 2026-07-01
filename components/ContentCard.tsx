import type { ContentItem } from "@/data/contents";

type ContentCardProps = {
  content: ContentItem;
};

export function ContentCard({ content }: ContentCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-cocoa/10 bg-white shadow-soft">
      <div className="relative flex aspect-[16/10] items-center justify-center bg-linen">
        <div className="absolute inset-4 rounded-[1rem] border border-dashed border-cocoa/20" />
        <span className="relative text-sm font-semibold uppercase tracking-[0.2em] text-cocoa/45">
          {content.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <span className="mb-4 w-fit rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-clay">
          {content.tag}
        </span>
        <h3 className="text-2xl font-bold text-coffee">{content.title}</h3>
        <p className="mt-3 flex-1 text-base leading-7 text-cocoa/75">
          {content.description}
        </p>
      </div>
    </article>
  );
}
