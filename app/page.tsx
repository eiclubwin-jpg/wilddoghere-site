import { CTAButton } from "@/components/CTAButton";
import { ContentCard } from "@/components/ContentCard";
import { FamilyDecorations } from "@/components/FamilyDecorations";
import { Hero } from "@/components/Hero";
import { SearchPosts } from "@/components/SearchPosts";
import { SectionTitle } from "@/components/SectionTitle";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { categoryEntries } from "@/data/categories";
import { characters } from "@/data/characters";
import { contents } from "@/data/contents";
import { socialLinks } from "@/data/socialLinks";
import { getPublishedContents, hasReadableContent } from "@/lib/content";

const collaborationTypes = ["親子用品", "玩具與收藏", "美食體驗", "旅遊住宿", "生活用品", "3C用品", "品牌活動"];
const publishedPosts = getPublishedContents(contents);
const readablePosts = publishedPosts.filter(hasReadableContent);
const featuredPosts = readablePosts.filter((content) => content.featured).slice(0, 3);
const latestPosts = readablePosts.slice(0, 6);
const searchablePosts = readablePosts.map((post) => ({
  ...post,
  bodyHtml: post.bodyHtml?.trim() ? "available" : undefined
}));

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="overflow-hidden">
        <Hero />

        <section id="featured" className="relative bg-cream px-5 py-16 sm:px-8 sm:py-20">
          <FamilyDecorations characters={characters} variant="featured" />
          <div className="relative mx-auto max-w-7xl">
            <SectionTitle eyebrow="Editor Picks" title="編輯精選" description="從家族日常、開箱實測到美食旅行，先看野狗軍團最想分享的紀錄。" />
            <div className="grid gap-6 md:grid-cols-3">
              {featuredPosts.map((content) => <ContentCard key={content.id} content={content} variant="feature" />)}
            </div>
          </div>
        </section>

        <section id="latest-posts" className="relative bg-linen px-5 py-16 sm:px-8 sm:py-20">
          <div className="relative mx-auto max-w-7xl">
            <FamilyDecorations characters={characters} variant="latest" />
            <SectionTitle eyebrow="Latest Posts" title="最新文章" description="野狗軍團最近的開箱、旅行、收藏與生活實測。" />
            <div className="grid gap-6 xl:grid-cols-2">
              {latestPosts.map((content) => <ContentCard key={content.id} content={content} variant="list" />)}
            </div>
            <div className="mt-8 text-center">
              <CTAButton href="/categories" variant="secondary">查看全部文章</CTAButton>
            </div>
          </div>
        </section>

        <SearchPosts posts={searchablePosts} />

        <section id="categories" className="relative bg-linen px-5 py-16 sm:px-8 sm:py-20">
          <FamilyDecorations characters={characters} variant="categories" />
          <div className="relative mx-auto max-w-7xl">
            <SectionTitle eyebrow="Browse Topics" title="按主題找文章" description="從親子開箱、玩具收藏到美食旅行，快速找到想看的家庭實測。" />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {categoryEntries.map((category) => {
                const count = readablePosts.filter((post) => post.category === category.contentCategory).length;
                return (
                  <a key={category.slug} href={`/categories/${category.slug}`} className="hand-drawn relative min-h-44 overflow-hidden bg-white/80 p-6 shadow-soft transition hover:-translate-y-1 hover:bg-white">
                    <p className="text-sm font-semibold text-clay">{count} 篇公開文章</p>
                    <h3 className="mt-2 text-2xl font-bold text-coffee">{category.title}</h3>
                    <p className="mt-3 text-base leading-7 text-cocoa/72">{category.description}</p>
                    <p className="mt-5 text-sm font-semibold text-clay">開啟分類</p>
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        <section id="about" className="bg-cream px-5 py-16 sm:px-8 sm:py-20">
          <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-clay">About WildDogHere</p>
              <h2 className="mt-3 text-3xl font-bold leading-tight text-coffee sm:text-4xl">關於野狗軍團</h2>
              <p className="mt-5 text-base leading-8 text-cocoa/75">
                WildDogHere 是由野狗爸與野狗媽共同經營的家族生活部落格。我們把家人轉化成一組狗狗角色，以輕鬆但誠實的方式，留下每一次使用、到訪與親子互動。
              </p>
              <p className="mt-4 text-base leading-8 text-cocoa/70">這不是完美家庭展示，而是一支有時混亂、有時吵鬧，但總會一起出沒的野狗軍團。</p>
              <div className="mt-8"><CTAButton href="/about" variant="secondary">認識全部成員</CTAButton></div>
            </div>
            <FamilyDecorations characters={characters} variant="about" />
          </div>
        </section>

        <section id="collaboration" className="bg-cream px-5 pb-16 sm:px-8 sm:pb-20">
          <div className="relative mx-auto grid max-w-6xl overflow-hidden rounded-[1.5rem] bg-cocoa p-8 text-cream shadow-soft md:grid-cols-[1.2fr_0.8fr] md:p-12">
            <FamilyDecorations characters={characters} variant="collaboration" />
            <div className="relative">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-butter">Collaboration</p>
              <h2 className="mt-4 text-3xl font-bold sm:text-4xl">讓產品回到真實家庭生活裡被使用。</h2>
              <p className="mt-5 text-base leading-8 text-cream/80">歡迎親子、玩具、美食、旅遊、生活用品與 3C 品牌邀請野狗軍團一起出沒。</p>
              <ul className="mt-6 flex flex-wrap gap-2 text-sm text-cream/78">
                {collaborationTypes.map((type) => <li key={type} className="rounded-full bg-cream/10 px-4 py-2">{type}</li>)}
              </ul>
            </div>
            <div className="relative mt-8 flex flex-col justify-center gap-4 md:mt-0 md:items-end">
              <a href="mailto:wilddoghere@gmail.com" className="text-xl font-bold text-butter">wilddoghere@gmail.com</a>
              <CTAButton href="/collaboration" variant="secondary">了解合作方式</CTAButton>
            </div>
          </div>
        </section>

        <section id="social" className="bg-linen px-5 py-16 sm:px-8 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <SectionTitle eyebrow="Follow Along" title="社群也在出沒" description="短影音、新文通知與家庭日常，依你習慣的平台追蹤。" />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {socialLinks.filter((link) => link.platform !== "website").map((link) => (
                <a key={link.platform} href={link.url} target={link.url.startsWith("http") ? "_blank" : undefined} rel={link.url.startsWith("http") ? "noreferrer" : undefined} className="rounded-[1.25rem] border border-cocoa/10 bg-cream p-6 transition hover:-translate-y-1 hover:bg-white">
                  <h3 className="text-xl font-bold text-coffee">{link.label}</h3>
                  <p className="mt-3 text-sm font-semibold text-clay">{link.name}</p>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
