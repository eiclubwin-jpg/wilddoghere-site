import type { Metadata } from "next";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "合作洽詢",
  description: "WildDogHere 野狗軍團親子用品、玩具收藏、美食旅行、生活與 3C 家庭情境合作洽詢。",
  alternates: { canonical: "/collaboration" }
};

const directions = ["親子用品與家庭玩具", "3C、拍攝與收納配件", "美食體驗與家族聚餐", "親子旅遊、住宿與景點", "生活用品與家庭實測", "品牌活動與短影音紀錄"];
const formats = ["部落格長文與 SEO 實測", "YouTube 影片與 Shorts", "Instagram Reels 與圖文", "親子實際使用紀錄", "多平台內容整合", "活動、住宿與餐飲體驗"];

export default function CollaborationPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-linen px-5 py-12 sm:px-8 sm:py-16">
        <section className="mx-auto max-w-6xl rounded-[1.5rem] bg-cocoa p-8 text-cream shadow-soft sm:p-12">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-butter">Work With Us</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-black leading-tight sm:text-5xl">把品牌放進真實家庭情境，看它怎麼被使用。</h1>
          <p className="mt-6 max-w-3xl text-lg leading-9 text-cream/78">WildDogHere 以野狗爸與野狗媽的雙視角，結合孩子真實反應與家庭日常，製作有使用脈絡、有優缺點也有溫度的內容。</p>
          <a href="mailto:wilddoghere@gmail.com" className="mt-8 inline-flex min-h-12 items-center rounded-full bg-butter px-6 py-3 font-bold text-coffee">wilddoghere@gmail.com</a>
        </section>

        <div className="mx-auto mt-12 grid max-w-6xl gap-6 lg:grid-cols-2">
          <section className="rounded-[1.5rem] bg-white/80 p-7 shadow-soft sm:p-9">
            <h2 className="text-2xl font-bold text-coffee">適合合作的品類</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {directions.map((item) => <li key={item} className="rounded-xl bg-cream px-4 py-4 text-sm font-semibold leading-6 text-cocoa/75">{item}</li>)}
            </ul>
          </section>
          <section className="rounded-[1.5rem] bg-white/80 p-7 shadow-soft sm:p-9">
            <h2 className="text-2xl font-bold text-coffee">可製作的內容形式</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {formats.map((item) => <li key={item} className="rounded-xl bg-cream px-4 py-4 text-sm font-semibold leading-6 text-cocoa/75">{item}</li>)}
            </ul>
          </section>
        </div>

        <section className="mx-auto mt-12 max-w-6xl rounded-[1.5rem] border border-cocoa/10 bg-cream p-7 sm:p-10">
          <h2 className="text-2xl font-bold text-coffee">合作原則</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            <div><h3 className="font-bold text-clay">真實使用</h3><p className="mt-2 text-sm leading-7 text-cocoa/68">內容以家庭實際使用經驗為主，不只展示產品外觀。</p></div>
            <div><h3 className="font-bold text-clay">清楚揭露</h3><p className="mt-2 text-sm leading-7 text-cocoa/68">受邀、贈品或付費合作會在內容中說明。</p></div>
            <div><h3 className="font-bold text-clay">保留觀點</h3><p className="mt-2 text-sm leading-7 text-cocoa/68">野狗軍團會保留實際使用感受與優缺點描述。</p></div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
