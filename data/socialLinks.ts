export type SocialLink = {
  label: string;
  href: string;
  note: string;
  handle: string;
  status: "live" | "pending";
};

export const socialLinks: SocialLink[] = [
  {
    label: "Official Site",
    href: "https://www.wilddoghere.com",
    note: "品牌官網與合作入口",
    handle: "wilddoghere.com",
    status: "live"
  },
  {
    label: "Instagram",
    href: "https://instagram.com/",
    note: "日常照片與限時動態，正式帳號確認後替換連結",
    handle: "待補正式帳號",
    status: "pending"
  },
  {
    label: "YouTube",
    href: "https://youtube.com/",
    note: "開箱、旅行與家庭紀錄，正式頻道確認後替換連結",
    handle: "待補正式頻道",
    status: "pending"
  },
  {
    label: "合作信箱",
    href: "mailto:hello@wilddoghere.com",
    note: "品牌合作、內容邀約與產品體驗提案",
    handle: "hello@wilddoghere.com",
    status: "live"
  }
];
