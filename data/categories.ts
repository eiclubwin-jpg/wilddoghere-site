import type { ContentCategory } from "@/data/contents";

export type CategoryEntry = {
  slug: string;
  title: string;
  contentCategory: ContentCategory;
  description: string;
};

export const categoryEntries: CategoryEntry[] = [
  {
    slug: "parenting",
    title: "親子開箱",
    contentCategory: "親子開箱",
    description: "孩子真實反應、親子共玩體驗與家庭日常裡的用品實測。"
  },
  {
    slug: "toys",
    title: "玩具收藏",
    contentCategory: "玩具收藏",
    description: "Tomica、收藏玩具與大人小孩都會想靠近的開箱紀錄。"
  },
  {
    slug: "food-travel",
    title: "美食旅行",
    contentCategory: "美食旅行",
    description: "親子用餐、家族聚會、旅行規劃與適合一家人的出遊節奏。"
  },
  {
    slug: "lifestyle",
    title: "生活用品",
    contentCategory: "生活用品",
    description: "外出、收納、育兒與家庭生活裡真正用得到的小物分享。"
  },
  {
    slug: "tech",
    title: "3C科技生活",
    contentCategory: "3C與收納",
    description: "拍攝設備、充電配件、收納包與科技用品的生活化實測。"
  },
  {
    slug: "daily",
    title: "野狗日常",
    contentCategory: "野狗日常",
    description: "一家人每天出沒的片段、笑點、觀察與值得留下的小故事。"
  }
];
