export type EmojiCategory = "reaction" | "review" | "kids" | "family";

export type EmojiItem = {
  id: string;
  name: string;
  character: string;
  text: string;
  image: string;
  alt: string;
  category: EmojiCategory;
  usage: string;
};

export const emojis: EmojiItem[] = [
  {
    id: "dogmom-speechless",
    name: "野狗媽傻眼",
    character: "野狗媽",
    text: "傻眼",
    image: "/images/emojis/dogmom-speechless.png",
    alt: "野狗媽傻眼表情符號",
    category: "reaction",
    usage: "荒謬事件、媽媽無言、家庭小劇場"
  },
  {
    id: "dogmom-tired",
    name: "野狗媽累了",
    character: "野狗媽",
    text: "累了",
    image: "/images/emojis/dogmom-tired.png",
    alt: "野狗媽累了表情符號",
    category: "reaction",
    usage: "育兒、工作、旅行後疲累"
  },
  {
    id: "dogmom-done",
    name: "野狗媽收工",
    character: "野狗媽",
    text: "收工",
    image: "/images/emojis/dogmom-done.png",
    alt: "野狗媽收工表情符號",
    category: "reaction",
    usage: "文章結尾、任務完成、開箱結束"
  },
  {
    id: "dogdad-calm",
    name: "野狗爸冷靜",
    character: "野狗爸",
    text: "冷靜",
    image: "/images/emojis/dogdad-calm.png",
    alt: "野狗爸冷靜表情符號",
    category: "review",
    usage: "爸爸視角分析、理性判斷"
  },
  {
    id: "dogdad-check",
    name: "野狗爸我看看",
    character: "野狗爸",
    text: "我看看",
    image: "/images/emojis/dogdad-check.png",
    alt: "野狗爸我看看表情符號",
    category: "review",
    usage: "3C、規格、玩具細節檢查"
  },
  {
    id: "dogdad-good",
    name: "野狗爸不錯",
    character: "野狗爸",
    text: "不錯",
    image: "/images/emojis/dogdad-good.png",
    alt: "野狗爸不錯表情符號",
    category: "review",
    usage: "產品評價、餐廳、旅遊體驗"
  },
  {
    id: "firstkid-amazing",
    name: "小野狗一號好棒",
    character: "小野狗一號",
    text: "好棒",
    image: "/images/emojis/firstkid-amazing.png",
    alt: "小野狗一號好棒表情符號",
    category: "kids",
    usage: "看到喜歡的玩具、甜點、飯店"
  },
  {
    id: "firstkid-please",
    name: "小野狗一號拜託",
    character: "小野狗一號",
    text: "拜託",
    image: "/images/emojis/firstkid-please.png",
    alt: "小野狗一號拜託表情符號",
    category: "kids",
    usage: "小孩想買東西、想再玩一次"
  },
  {
    id: "firstkid-sparkle",
    name: "小野狗一號閃亮",
    character: "小野狗一號",
    text: "閃亮",
    image: "/images/emojis/firstkid-sparkle.png",
    alt: "小野狗一號閃亮表情符號",
    category: "kids",
    usage: "漂亮小物、開箱驚喜、可愛照片"
  },
  {
    id: "secondkid-angry",
    name: "小野狗二號生氣",
    character: "小野狗二號",
    text: "生氣",
    image: "/images/emojis/secondkid-angry.png",
    alt: "小野狗二號生氣表情符號",
    category: "kids",
    usage: "小孩鬧脾氣、家庭劇場"
  },
  {
    id: "secondkid-no",
    name: "小野狗二號不要",
    character: "小野狗二號",
    text: "不要",
    image: "/images/emojis/secondkid-no.png",
    alt: "小野狗二號不要表情符號",
    category: "kids",
    usage: "拒絕走路、拒絕吃飯、拒絕配合"
  },
  {
    id: "secondkid-wait",
    name: "小野狗二號等等",
    character: "小野狗二號",
    text: "等等",
    image: "/images/emojis/secondkid-wait.png",
    alt: "小野狗二號等等表情符號",
    category: "kids",
    usage: "臨時狀況、出門前變數"
  },
  {
    id: "thirdkid-giggle",
    name: "小野狗三號偷笑",
    character: "小野狗三號",
    text: "偷笑",
    image: "/images/emojis/thirdkid-giggle.png",
    alt: "小野狗三號偷笑表情符號",
    category: "kids",
    usage: "小孩講出好笑話、惡作劇成功"
  },
  {
    id: "thirdkid-sleepy",
    name: "小野狗三號睡了",
    character: "小野狗三號",
    text: "睡了",
    image: "/images/emojis/thirdkid-sleepy.png",
    alt: "小野狗三號睡了表情符號",
    category: "kids",
    usage: "旅行途中、玩到沒電、睡前情境"
  },
  {
    id: "thirdkid-play",
    name: "小野狗三號想玩",
    character: "小野狗三號",
    text: "想玩",
    image: "/images/emojis/thirdkid-play.png",
    alt: "小野狗三號想玩表情符號",
    category: "kids",
    usage: "玩具開箱、親子遊戲、遊樂區文章"
  },
  {
    id: "grandpa-okay",
    name: "阿公好喔",
    character: "阿公",
    text: "好喔",
    image: "/images/emojis/grandpa-okay.png",
    alt: "阿公好喔表情符號",
    category: "reaction",
    usage: "長輩配合、家庭聚會、溫暖回應"
  },
  {
    id: "grandpa-thanks",
    name: "阿公辛苦了",
    character: "阿公",
    text: "辛苦了",
    image: "/images/emojis/grandpa-thanks.png",
    alt: "阿公辛苦了表情符號",
    category: "reaction",
    usage: "表達暖心、照顧、支持"
  },
  {
    id: "grandpa-stable",
    name: "阿公穩啦",
    character: "阿公",
    text: "穩啦",
    image: "/images/emojis/grandpa-stable.png",
    alt: "阿公穩啦表情符號",
    category: "review",
    usage: "行程安排成功、餐廳選對、採購成功"
  },
  {
    id: "grandma-glasses",
    name: "阿嬤眼鏡呢",
    character: "阿嬤",
    text: "眼鏡呢",
    image: "/images/emojis/grandma-glasses.png",
    alt: "阿嬤眼鏡呢表情符號",
    category: "reaction",
    usage: "阿嬤日常、找東西、家庭小劇場"
  },
  {
    id: "grandma-no-walk",
    name: "阿嬤不走啦",
    character: "阿嬤",
    text: "不走啦",
    image: "/images/emojis/grandma-no-walk.png",
    alt: "阿嬤不走啦表情符號",
    category: "reaction",
    usage: "旅遊走太多路、長輩累了"
  },
  {
    id: "grandma-okay",
    name: "阿嬤好啦",
    character: "阿嬤",
    text: "好啦",
    image: "/images/emojis/grandma-okay.png",
    alt: "阿嬤好啦表情符號",
    category: "reaction",
    usage: "被說服、家庭互動、日常碎念後接受"
  },
  {
    id: "family-unbox",
    name: "野狗軍團開箱",
    character: "野狗軍團",
    text: "開箱",
    image: "/images/emojis/family-unbox.png",
    alt: "野狗軍團開箱表情符號",
    category: "family",
    usage: "開箱文章段落開頭"
  },
  {
    id: "family-finish",
    name: "野狗軍團打完收工",
    character: "野狗軍團",
    text: "打完收工",
    image: "/images/emojis/family-finish.png",
    alt: "野狗軍團打完收工表情符號",
    category: "family",
    usage: "文章結尾固定用圖"
  },
  {
    id: "family-go-out",
    name: "野狗軍團一起去",
    character: "野狗軍團",
    text: "一起去",
    image: "/images/emojis/family-go-out.png",
    alt: "野狗軍團一起去表情符號",
    category: "family",
    usage: "旅遊、美食、親子出遊文章"
  }
];
