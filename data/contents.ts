import contentsData from "./contents.json";

export type ContentCategory =
  | "親子開箱"
  | "玩具收藏"
  | "美食旅行"
  | "生活用品"
  | "3C與收納"
  | "野狗日常";

export type ContentNarrator =
  | "野狗媽"
  | "野狗爸"
  | "野狗爸 × 野狗媽"
  | "野狗軍團";

export type ContentStatus = "published" | "draft" | "coming-soon";

export type ContentItem = {
  id: string;
  title: string;
  slug: string;
  category: ContentCategory;
  excerpt: string;
  coverImage: string;
  imageAlt: string;
  narrator: ContentNarrator;
  date: string;
  tags: string[];
  bodyHtml?: string;
  platform: string;
  link: string;
  featured: boolean;
  status: ContentStatus;
};

export const contentCategories: ContentCategory[] = [
  "親子開箱",
  "玩具收藏",
  "美食旅行",
  "生活用品",
  "3C與收納",
  "野狗日常"
];

export const contents = contentsData as ContentItem[];
