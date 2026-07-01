export type ContentItem = {
  title: string;
  category: string;
  description: string;
  tag: string;
};

export const contents: ContentItem[] = [
  {
    title: "親子旅行週記",
    category: "Travel",
    description: "從景點、餐桌到車上的對話，記錄一家人一起走過的生活路線。",
    tag: "家庭出走"
  },
  {
    title: "玩具開箱筆記",
    category: "Toys",
    description: "不只看外盒與造型，也分享收藏理由、互動玩法與孩子的真實反應。",
    tag: "收藏分享"
  },
  {
    title: "野狗家的餐桌",
    category: "Food",
    description: "把日常美食、旅行餐廳與家人一起吃飯的片刻，整理成可回味的故事。",
    tag: "美食日常"
  }
];
