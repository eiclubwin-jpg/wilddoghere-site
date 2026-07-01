export type Character = {
  id: string;
  name: string;
  role: string;
  personality: string;
  image: {
    src: string;
    alt: string;
    status: "placeholder" | "ready";
    recommendedFileName: string;
  };
  traits: string[];
  color: string;
};

export const characters: Character[] = [
  {
    id: "wilddog-dad",
    name: "野狗爸",
    role: "玩具研究員與路線規劃師",
    personality:
      "負責開箱、收藏觀點、旅行路線與生活裡的細節觀察，讓內容保有實測感與收藏脈絡。",
    image: {
      src: "",
      alt: "野狗爸角色正式圖",
      status: "placeholder",
      recommendedFileName: "wilddog-dad.webp"
    },
    traits: ["玩具開箱", "收藏觀察", "旅行路線"],
    color: "bg-butter"
  },
  {
    id: "wilddog-mom",
    name: "野狗媽",
    role: "生活紀錄者與家庭編輯",
    personality:
      "擅長把日常整理成溫暖故事，也把美食、親子時刻與家庭節奏留成可以回看的記憶。",
    image: {
      src: "",
      alt: "野狗媽角色正式圖",
      status: "placeholder",
      recommendedFileName: "wilddog-mom.webp"
    },
    traits: ["家庭日常", "美食紀錄", "內容整理"],
    color: "bg-linen"
  },
  {
    id: "wilddog-kid-one",
    name: "小野狗一號",
    role: "直覺派體驗員",
    personality:
      "用最真實的反應測試玩具、餐點與旅行地點是否真的好玩，補上孩子視角的第一手回饋。",
    image: {
      src: "",
      alt: "小野狗一號角色正式圖",
      status: "placeholder",
      recommendedFileName: "wilddog-kid-one.webp"
    },
    traits: ["真實反應", "親子體驗", "玩樂測試"],
    color: "bg-orange-100"
  },
  {
    id: "wilddog-kid-two",
    name: "小野狗二號",
    role: "氣氛擔當",
    personality:
      "把家庭日常裡的小插曲變成笑點，也讓每次出門、吃飯與拍攝更有自然的故事感。",
    image: {
      src: "",
      alt: "小野狗二號角色正式圖",
      status: "placeholder",
      recommendedFileName: "wilddog-kid-two.webp"
    },
    traits: ["日常笑點", "互動片刻", "家庭氣氛"],
    color: "bg-stone-100"
  }
];
