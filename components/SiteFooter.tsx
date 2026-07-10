import { FamilyDecorations } from "@/components/FamilyDecorations";
import { characters } from "@/data/characters";
import { socialLinks } from "@/data/socialLinks";

export function SiteFooter() {
  return (
    <footer className="bg-coffee px-5 py-8 text-cream sm:px-8">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
        <FamilyDecorations characters={characters} variant="footer" />
        <div className="text-sm">
          <p className="font-bold">WildDogHere｜野狗軍團出沒中</p>
          <p className="mt-2 text-cream/60">家族生活、親子開箱、玩具收藏與美食旅行。</p>
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-3 text-sm text-cream/75 lg:justify-end">
          <a href="/about">關於我們</a>
          <a href="/collaboration">合作洽詢</a>
          <a href="/feed.xml">RSS</a>
          {socialLinks.filter((link) => ["youtube", "instagram", "facebook"].includes(link.platform)).map((link) => (
            <a key={link.platform} href={link.url} target="_blank" rel="noreferrer">{link.label}</a>
          ))}
        </div>
      </div>
      <p className="mx-auto mt-6 max-w-7xl border-t border-cream/10 pt-5 text-xs text-cream/45">
        © 2026 WildDogHere. 文章內容為實際家庭生活與使用紀錄；合作內容會於文內標示。
      </p>
    </footer>
  );
}
