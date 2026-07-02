import { CTAButton } from "@/components/CTAButton";
import { ContentCard } from "@/components/ContentCard";
import { FamilyDecorations } from "@/components/FamilyDecorations";
import { Hero } from "@/components/Hero";
import { SectionTitle } from "@/components/SectionTitle";
import { characters } from "@/data/characters";
import { contents } from "@/data/contents";
import { socialLinks } from "@/data/socialLinks";

const navItems = [
  { label: "首頁", href: "#" },
  { label: "關於野狗軍團", href: "#about" },
  { label: "親子開箱", href: "#category-parenting" },
  { label: "3C科技生活", href: "#category-tech" },
  { label: "玩具收藏", href: "#category-toys" },
  { label: "美食旅行", href: "#category-food-travel" },
  { label: "生活用品", href: "#category-lifestyle" },
  { label: "合作洽詢", href: "#collaboration" }
];

const categoryEntries: Array<{
  id: string;
  title: string;
  description: string;
}> = [
  {
    id: "category-parenting",
    title: "親子開箱",
    description: "孩子真實反應、親子共玩體驗與家庭日常裡的用品實測。"
  },
  {
    id: "category-toys",
    title: "玩具收藏",
    description: "Tomica、收藏玩具與大人小孩都會想靠近的開箱紀錄。"
  },
  {
    id: "category-food-travel",
    title: "美食旅行",
    description: "親子用餐、家族聚會、旅行規劃與適合一家人的出遊節奏。"
  },
  {
    id: "category-lifestyle",
    title: "生活用品",
    description: "外出、收納、育兒與家庭生活裡真正用得到的小物分享。"
  },
  {
    id: "category-tech",
    title: "3C科技生活",
    description: "拍攝設備、充電配件、收納包與科技用品的生活化實測。"
  },
  {
    id: "category-daily",
    title: "野狗日常",
    description: "一家人每天出沒的片段、笑點、觀察與值得留下的小故事。"
  }
];

const collaborationTypes = [
  "親子用品",
  "玩具與收藏",
  "美食體驗",
  "旅遊住宿",
  "生活用品",
  "3C用品",
  "品牌活動"
];

const featuredPosts = contents.filter((content) => content.featured).slice(0, 3);
const latestPosts = [...contents]
  .sort(
    (current, next) =>
      new Date(next.date).getTime() - new Date(current.date).getTime()
  )
  .slice(0, 6);

const coreNarrators = characters.filter((character) => character.isCoreNarrator);
const kidMembers = characters.filter((character) =>
  ["big-kid", "second-kid", "third-kid"].includes(character.id)
);
const supportMembers = characters.filter((character) =>
  ["grandpa", "grandma"].includes(character.id)
);

export default function Home() {
  return (
    <main className="overflow-hidden">
      <header className="sticky top-0 z-30 border-b border-cocoa/10 bg-cream/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-5 py-4 sm:px-8">
          <a href="#" className="shrink-0 text-lg font-black text-coffee">
            WildDogHere
            <span className="block text-xs font-semibold text-clay">
              野狗軍團出沒中
            </span>
          </a>
          <nav className="hidden min-w-0 flex-1 items-center justify-end gap-5 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="whitespace-nowrap text-sm font-semibold text-cocoa/75 transition hover:text-clay"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="hidden sm:block lg:hidden">
            <a
              href="#latest-posts"
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-cocoa/25 bg-cream/70 px-6 py-3 text-sm font-semibold text-cocoa transition hover:bg-white"
            >
              最新文章
            </a>
          </div>
        </div>
      </header>

      <Hero />

      <section id="featured" className="relative bg-cream px-5 py-20 sm:px-8">
        <FamilyDecorations characters={characters} variant="featured" />
        <div className="relative mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Featured Posts"
            title="精選文章"
            description="先用目前代表內容作為精選文章，未來只要在資料檔把文章標成 featured，就會出現在這裡。"
          />
          <div className="grid gap-6 md:grid-cols-3">
            {featuredPosts.map((content) => (
              <ContentCard key={content.id} content={content} variant="feature" />
            ))}
          </div>
        </div>
      </section>

      <section id="latest-posts" className="relative bg-linen px-5 py-20 sm:px-8">
        <div className="relative mx-auto max-w-7xl">
          <FamilyDecorations characters={characters} variant="latest" />
          <SectionTitle
            eyebrow="Latest Posts"
            title="最新文章"
            description="依文章日期排序。若連結尚未正式發布，卡片會顯示內容準備中。"
          />
          <div className="grid gap-6 xl:grid-cols-2">
            {latestPosts.map((content) => (
              <ContentCard key={content.id} content={content} variant="list" />
            ))}
          </div>
        </div>
      </section>

      <section id="categories" className="relative bg-cream px-5 py-20 sm:px-8">
        <FamilyDecorations characters={characters} variant="categories" />
        <div className="relative mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Categories"
            title="文章分類"
            description="從親子開箱、玩具收藏到美食旅行，把一家人的實測與日常分門別類整理。"
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {categoryEntries.map((category) => (
              <a
                id={category.id}
                key={category.id}
                href="#latest-posts"
                className="hand-drawn relative min-h-44 overflow-hidden bg-white/80 p-6 shadow-soft transition hover:-translate-y-1 hover:bg-white"
              >
                <span className="pointer-events-none absolute -right-5 -top-5 h-16 w-16 rounded-full bg-butter/70" />
                <p className="text-sm font-semibold text-clay">
                  {category.title}
                </p>
                <h3 className="mt-2 text-2xl font-bold text-coffee">
                  {category.title}
                </h3>
                <p className="mt-3 text-base leading-7 text-cocoa/72">
                  {category.description}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="px-5 py-20 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-clay">
              About WildDogHere
            </p>
            <h2 className="mt-3 text-3xl font-bold leading-tight text-coffee sm:text-4xl">
              關於野狗軍團
            </h2>
            <p className="mt-5 text-base leading-8 text-cocoa/75">
              WildDogHere／野狗軍團出沒中，是由野狗爸與野狗媽共同經營的家族生活部落格。我們把家人轉化成一組狗狗角色，用比較輕鬆、有生活感的方式，記錄親子開箱、玩具收藏、美食旅行與家庭日常。
            </p>
            <p className="mt-4 text-base leading-8 text-cocoa/70">
              這不是完美家庭展示，而是一支有時混亂、有時吵鬧，但總會一起出沒的野狗軍團。
            </p>
            <FamilyDecorations characters={characters} variant="about" />
            <div className="mt-8">
              <CTAButton href="#about" variant="secondary">
                認識野狗軍團
              </CTAButton>
            </div>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            <div className="rounded-[1.25rem] border border-cocoa/10 bg-cream p-5">
              <h3 className="text-lg font-bold text-coffee">野狗爸與野狗媽</h3>
              <p className="mt-3 text-sm leading-6 text-cocoa/70">
                {coreNarrators.map((member) => member.name).join("、")}共同整理開箱、旅行、收藏與家庭生活觀察。
              </p>
            </div>
            <div className="rounded-[1.25rem] border border-cocoa/10 bg-cream p-5">
              <h3 className="text-lg font-bold text-coffee">小野狗們</h3>
              <p className="mt-3 text-sm leading-6 text-cocoa/70">
                {kidMembers.map((member) => member.name).join("、")}帶來最直接的親子互動與日常反應。
              </p>
            </div>
            <div className="rounded-[1.25rem] border border-cocoa/10 bg-cream p-5">
              <h3 className="text-lg font-bold text-coffee">阿公阿嬤後援隊</h3>
              <p className="mt-3 text-sm leading-6 text-cocoa/70">
                {supportMembers.map((member) => member.name).join("、")}讓家族故事多了長輩視角與生活厚度。
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="collaboration" className="px-5 py-20 sm:px-8">
        <div className="relative mx-auto grid max-w-6xl overflow-hidden rounded-[2rem] bg-cocoa p-8 text-cream shadow-soft md:grid-cols-[1.2fr_0.8fr] md:p-12">
          <FamilyDecorations characters={characters} variant="collaboration" />
          <div className="relative">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-butter">
              Collaboration
            </p>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
              如果你的品牌適合真實家庭生活場景，歡迎邀請野狗軍團一起出沒。
            </h2>
            <p className="mt-5 text-base leading-8 text-cream/80">
              合作方向包含親子用品、玩具與收藏、美食體驗、旅遊住宿、生活用品、3C用品與品牌活動。
            </p>
            <ul className="mt-6 grid gap-3 text-sm leading-6 text-cream/78 sm:grid-cols-2">
              {collaborationTypes.map((type) => (
                <li key={type} className="rounded-[1rem] bg-cream/10 px-4 py-3">
                  {type}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative flex flex-col justify-center gap-4 md:items-end">
            <p className="text-sm font-semibold text-cream/70">合作信箱</p>
            <a
              href="mailto:wilddoghere@gmail.com"
              className="text-xl font-bold text-butter transition hover:text-cream"
            >
              wilddoghere@gmail.com
            </a>
            <CTAButton href="mailto:wilddoghere@gmail.com" variant="secondary">
              寄信洽詢合作
            </CTAButton>
          </div>
        </div>
      </section>

      <section id="social" className="bg-linen px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionTitle
            eyebrow="Social Links"
            title="社群連結"
            description="最新文章、短影音與日常紀錄會依不同平台陸續更新。"
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {socialLinks.map((link) => (
              <a
                key={link.platform}
                href={link.url}
                target={link.url.startsWith("http") ? "_blank" : undefined}
                rel={link.url.startsWith("http") ? "noreferrer" : undefined}
                className="rounded-[1.25rem] border border-cocoa/10 bg-cream p-6 transition hover:-translate-y-1 hover:bg-white"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-xl font-bold text-coffee">{link.label}</h3>
                  <span className="rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-cocoa/55">
                    {link.status === "active" ? "Active" : "Pending"}
                  </span>
                </div>
                <p className="mt-3 text-sm font-semibold text-clay">
                  {link.name}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-coffee px-5 py-8 text-cream sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-5 text-sm lg:grid-cols-[1fr_auto_1fr] lg:items-center">
          <div>
            <FamilyDecorations characters={characters} variant="footer" />
          </div>
          <p className="font-semibold">WildDogHere｜野狗軍團出沒中</p>
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-cream/75">
            {socialLinks.map((link) => (
              <a
                key={link.platform}
                href={link.url}
                target={link.url.startsWith("http") ? "_blank" : undefined}
                rel={link.url.startsWith("http") ? "noreferrer" : undefined}
                className="transition hover:text-cream"
              >
                {link.label}
              </a>
            ))}
          </div>
          <p className="text-cream/65">
            © {new Date().getFullYear()} WildDogHere. Family life blog.
          </p>
        </div>
      </footer>
    </main>
  );
}
