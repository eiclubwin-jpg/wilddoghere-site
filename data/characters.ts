export type Character = {
  name: string;
  role: string;
  personality: string;
  color: string;
};

export const characters: Character[] = [
  {
    name: "野狗爸",
    role: "玩具研究員與路線規劃師",
    personality: "負責開箱、收藏觀點、旅行路線與生活裡的細節觀察。",
    color: "bg-butter"
  },
  {
    name: "野狗媽",
    role: "生活紀錄者與家庭編輯",
    personality: "擅長把日常整理成溫暖故事，也把美食、親子時刻留成記憶。",
    color: "bg-linen"
  },
  {
    name: "小野狗一號",
    role: "直覺派體驗員",
    personality: "用最真實的反應測試玩具、餐點與旅行地點是否真的好玩。",
    color: "bg-orange-100"
  },
  {
    name: "小野狗二號",
    role: "氣氛擔當",
    personality: "把家庭日常裡的小插曲變成笑點，也讓每次出門更有故事。",
    color: "bg-stone-100"
  }
];
