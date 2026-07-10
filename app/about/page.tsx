import type { Metadata } from "next";
import { CharacterCard } from "@/components/CharacterCard";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { characters } from "@/data/characters";

export const metadata: Metadata = {
  title: "關於野狗軍團",
  description: "認識 WildDogHere 野狗爸、野狗媽、小野狗們與阿公阿嬤後援隊，以雙視角記錄真實家族生活。",
  alternates: { canonical: "/about" },
  openGraph: { title: "關於野狗軍團｜WildDogHere", description: "一支有時混亂、有時吵鬧，但總會一起出沒的家族生活團隊。", images: ["/images/hero/wilddog-family-hero.png"] }
};

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-cream px-5 py-12 sm:px-8 sm:py-16">
        <section className="paper-texture mx-auto grid max-w-7xl items-center gap-10 rounded-[1.5rem] bg-linen p-7 shadow-soft lg:grid-cols-[0.9fr_1.1fr] sm:p-10">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-clay">Our Story</p>
            <h1 className="mt-3 text-4xl font-black leading-tight text-coffee sm:text-5xl">關於野狗軍團</h1>
            <p className="mt-6 text-lg leading-9 text-cocoa/78">WildDogHere 是由野狗爸與野狗媽共同經營的家族生活部落格。我們把家人轉化成狗狗角色，但文章裡的使用、出遊、用餐與親子互動，都來自真實生活。</p>
            <p className="mt-4 text-base leading-8 text-cocoa/70">我們不只想告訴你產品好不好，更想記錄它放進家庭之後，孩子怎麼反應、大人是否真的方便，以及有哪些細節值得注意。</p>
          </div>
          <img src="/images/hero/wilddog-family-hero.png" alt="WildDogHere 野狗軍團全家主視覺" width="1536" height="1024" className="aspect-[4/3] w-full rounded-[1.25rem] object-cover shadow-soft" />
        </section>

        <section className="mx-auto mt-16 max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-clay">Family & Narrators</p>
            <h2 className="mt-3 text-3xl font-bold text-coffee">家庭成員與敘事者</h2>
            <p className="mt-4 text-base leading-8 text-cocoa/70">野狗爸與野狗媽是主要敘事者，小野狗們帶來最直接的使用反應，阿公阿嬤則讓家族故事多了長輩視角。</p>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {characters.map((character) => <CharacterCard key={character.id} character={character} />)}
          </div>
        </section>

        <section className="mx-auto mt-16 max-w-5xl rounded-[1.5rem] border border-cocoa/10 bg-white/75 p-7 sm:p-10">
          <h2 className="text-2xl font-bold text-coffee">我們怎麼寫內容</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            <div><h3 className="font-bold text-clay">真實情境</h3><p className="mt-2 text-sm leading-7 text-cocoa/68">以家庭實際使用、親自到訪與旅行過程為主。</p></div>
            <div><h3 className="font-bold text-clay">保留缺點</h3><p className="mt-2 text-sm leading-7 text-cocoa/68">不只寫好看的部分，也留下不方便、不適合或需要注意的細節。</p></div>
            <div><h3 className="font-bold text-clay">合作揭露</h3><p className="mt-2 text-sm leading-7 text-cocoa/68">品牌邀請、贈品或合作內容會在文章內清楚說明。</p></div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
