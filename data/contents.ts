export type ContentItem = {
  id: string;
  title: string;
  category: string;
  description: string;
  tag: string;
  format: "Shorts" | "Video" | "Photo" | "Article";
  status: "published" | "planning";
  image: {
    src: string;
    alt: string;
    status: "placeholder" | "ready";
    recommendedFileName: string;
  };
  href?: string;
};

export const contents: ContentItem[] = [
  {
    id: "family-travel-diary",
    title: "親子旅行週記",
    category: "Travel",
    description: "從景點、餐桌到車上的對話，記錄一家人一起走過的生活路線。",
    tag: "家庭出走",
    format: "Video",
    status: "planning",
    image: {
      src: "",
      alt: "親子旅行週記代表作品封面",
      status: "placeholder",
      recommendedFileName: "content-family-travel-diary.webp"
    }
  },
  {
    id: "toy-unboxing-notes",
    title: "玩具開箱筆記",
    category: "Toys",
    description: "不只看外盒與造型，也分享收藏理由、互動玩法與孩子的真實反應。",
    tag: "收藏分享",
    format: "Shorts",
    status: "planning",
    image: {
      src: "",
      alt: "玩具開箱筆記代表作品封面",
      status: "placeholder",
      recommendedFileName: "content-toy-unboxing-notes.webp"
    }
  },
  {
    id: "wilddog-family-table",
    title: "野狗家的餐桌",
    category: "Food",
    description: "把日常美食、旅行餐廳與家人一起吃飯的片刻，整理成可回味的故事。",
    tag: "美食日常",
    format: "Photo",
    status: "planning",
    image: {
      src: "",
      alt: "野狗家的餐桌代表作品封面",
      status: "placeholder",
      recommendedFileName: "content-wilddog-family-table.webp"
    }
  },
  {
    id: "collection-room-notes",
    title: "收藏房間筆記",
    category: "Collection",
    description: "分享收藏展示、入手理由、保存方式與家庭生活裡的收藏角落。",
    tag: "收藏生活",
    format: "Article",
    status: "planning",
    image: {
      src: "",
      alt: "收藏房間筆記代表作品封面",
      status: "placeholder",
      recommendedFileName: "content-collection-room-notes.webp"
    }
  },
  {
    id: "weekend-family-mission",
    title: "週末家庭任務",
    category: "Family",
    description: "把採買、散步、親子活動與臨時行程，整理成一集一個任務的日常紀錄。",
    tag: "家庭企劃",
    format: "Video",
    status: "planning",
    image: {
      src: "",
      alt: "週末家庭任務代表作品封面",
      status: "placeholder",
      recommendedFileName: "content-weekend-family-mission.webp"
    }
  },
  {
    id: "brand-friendly-review",
    title: "家庭實測合作",
    category: "Review",
    description: "以家庭使用情境做自然體驗，保留真實心得與適合親子讀者的重點整理。",
    tag: "合作案例",
    format: "Video",
    status: "planning",
    image: {
      src: "",
      alt: "家庭實測合作代表作品封面",
      status: "placeholder",
      recommendedFileName: "content-brand-friendly-review.webp"
    }
  }
];
