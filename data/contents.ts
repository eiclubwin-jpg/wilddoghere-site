export type ContentItem = {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  platform: string;
  narrator: "野狗媽" | "野狗爸" | "野狗爸 × 野狗媽" | "野狗軍團";
  link: string;
  image: string;
  imageAlt: string;
  tags: string[];
  status: "draft" | "coming-soon" | "published";
};

export const contents: ContentItem[] = [
  {
    id: "whack-a-mole-toy-unboxing",
    title: "親子玩具開箱｜打地鼠遊戲機",
    category: "親子玩具開箱",
    excerpt:
      "從孩子反應、遊戲節奏到親子一起玩的耐玩度，記錄打地鼠遊戲機在家裡登場的真實狀態。",
    platform: "Instagram Reels / YouTube Shorts",
    narrator: "野狗軍團",
    link: "#",
    image: "/images/contents/whack-a-mole-toy-unboxing.png",
    imageAlt: "打地鼠遊戲機親子玩具開箱封面",
    tags: ["親子互動", "玩具實測", "家庭遊戲"],
    status: "draft"
  },
  {
    id: "tomica-sushi-car-vol-2",
    title: "收藏開箱｜Tomica 壽司車第二彈",
    category: "收藏開箱",
    excerpt:
      "以收藏視角介紹 Tomica 壽司車第二彈，整理造型亮點、入手理由與適合親子一起看的細節。",
    platform: "Instagram / YouTube",
    narrator: "野狗爸",
    link: "#",
    image: "/images/contents/tomica-sushi-car-vol-2.png",
    imageAlt: "Tomica 壽司車第二彈收藏開箱封面",
    tags: ["Tomica", "收藏", "車車玩具"],
    status: "coming-soon"
  },
  {
    id: "tomica-bath-ball",
    title: "玩具開箱｜TOMICA 泡澡球",
    category: "玩具開箱",
    excerpt:
      "把泡澡、驚喜玩具與孩子期待感放在同一支內容裡，呈現 TOMICA 泡澡球的日常使用情境。",
    platform: "Instagram Reels",
    narrator: "野狗媽",
    link: "#",
    image: "/images/contents/tomica-bath-ball.png",
    imageAlt: "TOMICA 泡澡球玩具開箱封面",
    tags: ["TOMICA", "泡澡球", "親子日常"],
    status: "draft"
  },
  {
    id: "bellabot-pro-cat-robot",
    title: "收藏開箱｜BellaBot Pro 貓型機器人",
    category: "收藏開箱",
    excerpt:
      "從外型、互動感與收藏亮點切入，分享 BellaBot Pro 貓型機器人帶來的科技感與可愛反差。",
    platform: "YouTube / Instagram",
    narrator: "野狗爸",
    link: "#",
    image: "/images/contents/bellabot-pro-cat-robot.png",
    imageAlt: "BellaBot Pro 貓型機器人收藏開箱封面",
    tags: ["機器人", "收藏開箱", "科技玩具"],
    status: "coming-soon"
  },
  {
    id: "camera-bag-perfect-one",
    title: "生活開箱｜相機包／命定的一咖",
    category: "生活開箱",
    excerpt:
      "以日常外出、拍攝裝備與家庭行程為使用情境，分享找到命定相機包的整理與收納觀點。",
    platform: "Instagram / Blog",
    narrator: "野狗媽",
    link: "#",
    image: "/images/contents/camera-bag-perfect-one.png",
    imageAlt: "相機包命定的一咖生活開箱封面",
    tags: ["相機包", "收納", "外出裝備"],
    status: "draft"
  },
  {
    id: "laptop-pouch-charging-accessories",
    title: "生活開箱｜筆電包＋收納包＋充電配件",
    category: "生活開箱",
    excerpt:
      "整理工作、拍攝與親子外出時會帶上的筆電包、收納包與充電配件，做一套實用裝備分享。",
    platform: "Instagram / Blog",
    narrator: "野狗爸 × 野狗媽",
    link: "#",
    image: "/images/contents/laptop-pouch-charging-accessories.png",
    imageAlt: "筆電包收納包充電配件生活開箱封面",
    tags: ["筆電包", "充電配件", "生活收納"],
    status: "draft"
  },
  {
    id: "puff-portable-fan",
    title: "親子外出｜Puff 小風扇",
    category: "親子外出",
    excerpt:
      "用夏天親子外出的真實場景，觀察 Puff 小風扇在推車、排隊、戶外活動中的實用程度。",
    platform: "Instagram Reels",
    narrator: "野狗媽",
    link: "#",
    image: "/images/contents/puff-portable-fan.png",
    imageAlt: "Puff 小風扇親子外出封面",
    tags: ["親子外出", "夏天用品", "生活實測"],
    status: "coming-soon"
  },
  {
    id: "taimall-island-buffet",
    title: "美食體驗｜台茂島語",
    category: "美食體驗",
    excerpt:
      "從親子用餐便利度、餐點選擇與家庭聚餐氣氛，記錄台茂島語的實際用餐體驗。",
    platform: "Instagram / Blog",
    narrator: "野狗軍團",
    link: "#",
    image: "/images/contents/taimall-island-buffet.png",
    imageAlt: "台茂島語美食體驗封面",
    tags: ["台茂", "親子用餐", "美食體驗"],
    status: "draft"
  },
  {
    id: "nagomi-ya-dining",
    title: "美食體驗｜NAGOMI 雅",
    category: "美食體驗",
    excerpt:
      "以家庭聚餐和大人小孩都能吃得舒服為主軸，整理 NAGOMI 雅的餐點、環境與用餐節奏。",
    platform: "Instagram / Blog",
    narrator: "野狗爸 × 野狗媽",
    link: "#",
    image: "/images/contents/nagomi-ya-dining.png",
    imageAlt: "NAGOMI 雅美食體驗封面",
    tags: ["NAGOMI 雅", "家庭聚餐", "餐廳體驗"],
    status: "coming-soon"
  },
  {
    id: "japan-family-travel-plan",
    title: "親子旅遊｜日本親子旅行規劃",
    category: "親子旅遊",
    excerpt:
      "從交通、住宿、景點節奏到玩具收藏路線，規劃一趟適合野狗軍團的日本親子旅行。",
    platform: "Blog / YouTube",
    narrator: "野狗爸 × 野狗媽",
    link: "#",
    image: "/images/contents/japan-family-travel-plan.png",
    imageAlt: "日本親子旅行規劃封面",
    tags: ["日本旅遊", "親子旅行", "行程規劃"],
    status: "draft"
  }
];
