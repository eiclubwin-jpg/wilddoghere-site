// Character image management:
// - Store final character images in public/images/characters/.
// - Keep paths absolute from public, such as /images/characters/dog-dad.png.
// - If a file is not ready yet, keep the intended path here; CharacterCard
//   will fall back to a clean placeholder without breaking the build.
// - Prefer compressed PNG only when transparency is needed; otherwise use WebP
//   in future updates and update the path here.
export type Character = {
  id: string;
  name: string;
  dogType: string;
  roleTitle: string;
  keywords: string[];
  description: string;
  quote: string;
  image: string;
  imageAlt: string;
  isCoreNarrator: boolean;
};

export const characters: Character[] = [
  {
    id: "wilddog-dad",
    name: "野狗爸",
    dogType: "阿富汗犬",
    roleTitle: "玩具研究員與路線規劃師",
    keywords: ["玩具開箱", "收藏觀察", "旅行路線"],
    description:
      "負責開箱、收藏觀點、旅行路線與生活裡的細節觀察，讓內容保有實測感與收藏脈絡。",
    quote: "每一次出門，都可以變成一段值得收藏的家庭故事。",
    image: "/images/characters/dog-dad.png",
    imageAlt: "野狗爸阿富汗犬角色圖",
    isCoreNarrator: true
  },
  {
    id: "wilddog-mom",
    name: "野狗媽",
    dogType: "白臉英國法鬥",
    roleTitle: "生活紀錄者與家庭編輯",
    keywords: ["家庭日常", "美食紀錄", "內容整理"],
    description:
      "擅長把日常整理成溫暖故事，也把美食、親子時刻與家庭節奏留成可以回看的記憶。",
    quote: "日常不一定完美，但每一刻都可以被好好記錄。",
    image: "/images/characters/dog-mom.png",
    imageAlt: "野狗媽白臉英國法鬥角色圖",
    isCoreNarrator: true
  },
  {
    id: "big-kid",
    name: "小野狗一號",
    dogType: "貴賓犬",
    roleTitle: "直覺派體驗員",
    keywords: ["真實反應", "玩具測試", "親子體驗"],
    description:
      "用孩子最直接的反應測試玩具、餐點與旅行地點是否真的好玩，是內容裡最自然的第一線回饋。",
    quote: "好不好玩，看我第一個反應就知道。",
    image: "/images/characters/first-kid.png",
    imageAlt: "小野狗一號貴賓犬角色圖",
    isCoreNarrator: false
  },
  {
    id: "second-kid",
    name: "小野狗二號",
    dogType: "吉娃娃",
    roleTitle: "氣氛擔當",
    keywords: ["日常笑點", "互動片刻", "家庭氣氛"],
    description:
      "把家庭日常裡的小插曲變成笑點，也讓每次出門、吃飯與拍攝更有自然的故事感。",
    quote: "我負責讓大家記得今天最可愛的瞬間。",
    image: "/images/characters/second-kid.png",
    imageAlt: "小野狗二號吉娃娃角色圖",
    isCoreNarrator: false
  },
  {
    id: "third-kid",
    name: "小野狗三號",
    dogType: "雪納瑞",
    roleTitle: "聰明可愛 × 記憶力好的小弟角色",
    keywords: ["聰明", "記憶力好", "黏媽媽", "玩具開箱", "童趣"],
    description:
      "看起來小小的，腦袋卻轉很快，是野狗軍團裡的可愛小隊員。",
    quote: "我記得啊，上次不是這樣說的。",
    image: "/images/characters/third-kid.png",
    imageAlt: "小野狗三號雪納瑞角色圖",
    isCoreNarrator: false
  },
  {
    id: "grandpa",
    name: "阿公",
    dogType: "黃金獵犬",
    roleTitle: "溫暖支援隊長",
    keywords: ["家庭支援", "長輩視角", "穩定陪伴"],
    description:
      "代表家族裡穩定、可靠又溫暖的支援力量，讓品牌敘事不只停在小家庭，也延伸到家族共同參與。",
    quote: "一家人一起，就是最好的安排。",
    image: "/images/characters/grandpa.png",
    imageAlt: "阿公黃金獵犬角色圖",
    isCoreNarrator: false
  },
  {
    id: "grandma",
    name: "阿嬤",
    dogType: "米格魯",
    roleTitle: "生活智慧收藏家",
    keywords: ["生活智慧", "家族記憶", "美食分享"],
    description:
      "把家族記憶、生活智慧與餐桌故事帶進內容裡，讓野狗軍團的日常更有家的厚度。",
    quote: "好好吃飯，好好生活，就是家最重要的事。",
    image: "/images/characters/grandma.png",
    imageAlt: "阿嬤米格魯角色圖",
    isCoreNarrator: false
  }
];
