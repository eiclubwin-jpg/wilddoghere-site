import { CTAButton } from "@/components/CTAButton";
import { CharacterCard } from "@/components/CharacterCard";
import { ContentCard } from "@/components/ContentCard";
import { SectionTitle } from "@/components/SectionTitle";
import { characters } from "@/data/characters";
import { contents } from "@/data/contents";
import { socialLinks } from "@/data/socialLinks";

const navItems = [
  { label: "品牌介紹", href: "#about" },
  { label: "雙核心", href: "#narrators" },
  { label: "角色", href: "#characters" },
  { label: "作品", href: "#contents" },
  { label: "合作", href: "#collaboration" }
];

const collaborationPoints = [
  "親子生活用品、玩具、食品、旅遊與收藏相關合作",
  "以真實使用情境、家庭節奏與自然敘事呈現",
  "可配合短影音、圖文紀錄、開箱心得與活動出席",
  "合作內容會保留體驗觀點，不做過度商業化包裝"
];

export default function Home() {
  const narratorCards = characters.slice(0, 2);

  return (
    <main className="overflow-hidden">
      <header className="sticky top-0 z-30 border-b border-cocoa/10 bg-cream/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <a href="#" className="text-lg font-black text-coffee">
            WildDogHere
            <span className="block text-xs font-semibold text-clay">
              野狗軍團出沒中
            </span>
          </a>
          <nav className="hidden items-center gap-7 md:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-semibold text-cocoa/75 transition hover:text-clay"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="hidden sm:block">
            <CTAButton href="#contact" variant="secondary">
              聯絡我們
            </CTAButton>
          </div>
        </div>
      </header>

      <section className="paper-texture relative">
        <div className="mx-auto grid min-h-[calc(100vh-77px)] max-w-7xl items-center gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
          <div>
            <p className="mb-5 w-fit rounded-full bg-white/75 px-4 py-2 text-sm font-semibold text-clay shadow-sm">
              Family stories, toys, food and little trips.
            </p>
            <h1 className="max-w-4xl text-5xl font-black leading-tight text-coffee sm:text-6xl lg:text-7xl">
              WildDogHere
              <span className="mt-3 block text-3xl text-cocoa sm:text-5xl">
                野狗軍團出沒中
              </span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-9 text-cocoa/80">
              一個以家族共同經營為目標的生活型社群品牌，由野狗爸與野狗媽帶路，記錄親子生活、玩具開箱、美食旅行、收藏分享與自然合作體驗。
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <CTAButton href="#contents">看看代表作品</CTAButton>
              <CTAButton href="#collaboration" variant="secondary">
                合作洽詢
              </CTAButton>
            </div>
          </div>

          <div className="hand-drawn relative mx-auto w-full max-w-xl bg-white/70 p-5 shadow-soft">
            <div className="rounded-[1.5rem] bg-butter p-6">
              <div className="grid grid-cols-2 gap-4">
                {["親子日常", "玩具開箱", "美食旅行", "收藏分享"].map(
                  (label, index) => (
                    <div
                      key={label}
                      className={`flex aspect-square items-center justify-center rounded-[1.25rem] border border-cocoa/10 bg-cream text-center text-lg font-bold text-cocoa shadow-sm ${
                        index % 2 === 0 ? "rotate-[-1deg]" : "rotate-[1deg]"
                      }`}
                    >
                      {label}
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="bg-cream px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-5xl">
          <SectionTitle
            eyebrow="About"
            title="把一家人的生活，整理成可以一起回看的故事"
            description="WildDogHere 不追求誇張表演，也不把日常包裝成距離很遠的品牌形象。我們從家庭視角出發，分享真實、溫暖、有記憶點的生活內容。"
          />
          <div className="grid gap-5 md:grid-cols-3">
            {["真實親子節奏", "收藏與玩具觀點", "家庭感內容企劃"].map((item) => (
              <div
                key={item}
                className="rounded-[1.25rem] border border-cocoa/10 bg-white/75 p-6 text-center text-lg font-bold text-cocoa"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="narrators" className="px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Core Narrators"
            title="野狗爸與野狗媽，雙核心敘事者"
            description="一個負責觀察與探索，一個負責整理與記錄。兩種視角共同構成野狗軍團的內容溫度。"
          />
          <div className="grid gap-6 md:grid-cols-2">
            {narratorCards.map((character) => (
              <CharacterCard key={character.name} character={character} />
            ))}
          </div>
        </div>
      </section>

      <section id="characters" className="bg-linen px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Characters"
            title="野狗軍團角色介紹"
            description="角色設定已保留正式圖片欄位。未來只要把角色圖放進 public/images/characters 並更新資料檔，就能替換目前的佔位視覺。"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {characters.map((character) => (
              <CharacterCard key={character.name} character={character} />
            ))}
          </div>
        </div>
      </section>

      <section id="contents" className="bg-cream px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Contents"
            title="代表作品與內容主軸"
            description="先以六種內容卡片呈現品牌輪廓，包含旅行、玩具、美食、收藏、家庭企劃與合作實測。"
          />
          <div className="grid gap-6 md:grid-cols-3">
            {contents.map((content) => (
              <ContentCard key={content.title} content={content} />
            ))}
          </div>
        </div>
      </section>

      <section id="collaboration" className="px-5 py-20 sm:px-8">
        <div className="mx-auto grid max-w-6xl gap-8 rounded-[2rem] bg-cocoa p-8 text-cream shadow-soft md:grid-cols-[1.2fr_0.8fr] md:p-12">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-butter">
              Collaboration
            </p>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
              適合自然融入家庭生活的合作內容
            </h2>
            <p className="mt-5 text-base leading-8 text-cream/80">
              歡迎與家庭生活、親子體驗、玩具收藏、美食旅行和日常用品相關的品牌洽詢。野狗軍團適合自然融入生活場景的內容合作，重點是讓觀眾看見真實使用方式與家庭互動，而不是硬式廣告。
            </p>
            <ul className="mt-6 grid gap-3 text-sm leading-6 text-cream/78 sm:grid-cols-2">
              {collaborationPoints.map((point) => (
                <li key={point} className="rounded-[1rem] bg-cream/10 px-4 py-3">
                  {point}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-center md:justify-end">
            <CTAButton href="mailto:hello@wilddoghere.com" variant="secondary">
              寄信洽詢合作
            </CTAButton>
          </div>
        </div>
      </section>

      <section id="contact" className="bg-linen px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionTitle
            eyebrow="Contact"
            title="社群與聯絡方式"
            description="社群資料集中維護在 data/socialLinks.ts。正式帳號確認後，直接替換連結與 handle 即可。"
          />
          <div className="grid gap-5 md:grid-cols-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="rounded-[1.25rem] border border-cocoa/10 bg-cream p-6 transition hover:-translate-y-1 hover:bg-white"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-xl font-bold text-coffee">{link.label}</h3>
                  <span className="rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-cocoa/55">
                    {link.status === "live" ? "Live" : "Pending"}
                  </span>
                </div>
                <p className="mt-2 text-sm font-semibold text-clay">
                  {link.handle}
                </p>
                <p className="mt-2 text-sm leading-6 text-cocoa/70">{link.note}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-coffee px-5 py-8 text-cream sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p className="font-semibold">WildDogHere｜野狗軍團出沒中</p>
          <p className="text-cream/65">
            © {new Date().getFullYear()} WildDogHere. Built for family stories.
          </p>
        </div>
      </footer>
    </main>
  );
}
