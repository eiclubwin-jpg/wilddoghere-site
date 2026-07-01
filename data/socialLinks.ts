export type SocialLink = {
  label: string;
  href: string;
  note: string;
  handle: string;
  status: "active" | "pending";
};

export const socialLinks: SocialLink[] = [
  {
    label: "個人部落格／官網",
    href: "https://www.wilddoghere.com/",
    note: "品牌官網與合作入口",
    handle: "www.wilddoghere.com",
    status: "active"
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/wilddoghere/",
    note: "日常照片、限時動態與生活紀錄",
    handle: "@wilddoghere",
    status: "active"
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@wilddoghere",
    note: "野狗軍團出沒中的開箱、旅行與家庭紀錄",
    handle: "野狗軍團出沒中",
    status: "active"
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61591632385768",
    note: "社群貼文、活動更新與品牌近況",
    handle: "WildDogHere",
    status: "active"
  },
  {
    label: "合作信箱",
    href: "mailto:wilddoghere@gmail.com",
    note: "品牌合作、內容邀約與產品體驗提案",
    handle: "wilddoghere@gmail.com",
    status: "active"
  }
];
