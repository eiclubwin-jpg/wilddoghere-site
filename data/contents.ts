export type ContentCategory =
  | "親子開箱"
  | "玩具收藏"
  | "美食旅行"
  | "生活用品"
  | "3C與收納"
  | "野狗日常";

export type ContentItem = {
  id: string;
  title: string;
  slug: string;
  category: ContentCategory;
  excerpt: string;
  coverImage: string;
  imageAlt: string;
  narrator: "野狗媽" | "野狗爸" | "野狗爸 × 野狗媽" | "野狗軍團";
  date: string;
  tags: string[];
  platform: string;
  link: string;
  featured: boolean;
  status: "published" | "draft" | "coming-soon";
};

export const contents: ContentItem[] = [
  {
    id: "whack-a-mole-toy-unboxing",
    title: "親子玩具開箱｜打地鼠遊戲機",
    slug: "whack-a-mole-toy-unboxing",
    category: "親子開箱",
    excerpt:
      "從孩子反應、遊戲節奏到親子一起玩的耐玩度，記錄打地鼠遊戲機在家裡登場的真實狀態。",
    coverImage: "/images/contents/whack-a-mole-toy-unboxing.png",
    imageAlt: "打地鼠遊戲機親子玩具開箱封面",
    narrator: "野狗軍團",
    date: "2026-07-01",
    tags: ["親子互動", "玩具實測", "家庭遊戲"],
    platform: "Instagram Reels / YouTube Shorts",
    link: "#",
    featured: true,
    status: "draft"
  },
  {
    id: "tomica-sushi-car-vol-2",
    title: "收藏開箱｜Tomica 壽司車第二彈",
    slug: "tomica-sushi-car-vol-2",
    category: "玩具收藏",
    excerpt:
      "以收藏視角介紹 Tomica 壽司車第二彈，整理造型亮點、入手理由與適合親子一起看的細節。",
    coverImage: "/images/contents/tomica-sushi-car-vol-2.png",
    imageAlt: "Tomica 壽司車第二彈收藏開箱封面",
    narrator: "野狗爸",
    date: "2026-06-28",
    tags: ["Tomica", "收藏", "車車玩具"],
    platform: "Instagram / YouTube",
    link: "#",
    featured: true,
    status: "coming-soon"
  },
  {
    id: "tomica-bath-ball",
    title: "玩具開箱｜TOMICA 泡澡球",
    slug: "tomica-bath-ball",
    category: "親子開箱",
    excerpt:
      "把泡澡、驚喜玩具與孩子期待感放在同一支內容裡，呈現 TOMICA 泡澡球的日常使用情境。",
    coverImage: "/images/contents/tomica-bath-ball.png",
    imageAlt: "TOMICA 泡澡球玩具開箱封面",
    narrator: "野狗媽",
    date: "2026-06-24",
    tags: ["TOMICA", "泡澡球", "親子日常"],
    platform: "Instagram Reels",
    link: "#",
    featured: true,
    status: "draft"
  },
  {
    id: "bellabot-pro-cat-robot",
    title: "收藏開箱｜BellaBot Pro 貓型機器人",
    slug: "bellabot-pro-cat-robot",
    category: "3C與收納",
    excerpt:
      "從外型、互動感與收藏亮點切入，分享 BellaBot Pro 貓型機器人帶來的科技感與可愛反差。",
    coverImage: "/images/contents/bellabot-pro-cat-robot.png",
    imageAlt: "BellaBot Pro 貓型機器人收藏開箱封面",
    narrator: "野狗爸",
    date: "2026-06-20",
    tags: ["機器人", "收藏開箱", "科技玩具"],
    platform: "YouTube / Instagram",
    link: "#",
    featured: false,
    status: "coming-soon"
  },
  {
    id: "camera-bag-perfect-one",
    title: "生活開箱｜相機包／命定的一咖",
    slug: "camera-bag-perfect-one",
    category: "生活用品",
    excerpt:
      "以日常外出、拍攝裝備與家庭行程為使用情境，分享找到命定相機包的整理與收納觀點。",
    coverImage: "/images/contents/camera-bag-perfect-one.png",
    imageAlt: "相機包命定的一咖生活開箱封面",
    narrator: "野狗媽",
    date: "2026-06-16",
    tags: ["相機包", "收納", "外出裝備"],
    platform: "Instagram / Blog",
    link: "#",
    featured: false,
    status: "draft"
  },
  {
    id: "laptop-pouch-charging-accessories",
    title: "生活開箱｜筆電包＋收納包＋充電配件",
    slug: "laptop-pouch-charging-accessories",
    category: "3C與收納",
    excerpt:
      "整理工作、拍攝與親子外出時會帶上的筆電包、收納包與充電配件，做一套實用裝備分享。",
    coverImage: "/images/contents/laptop-pouch-charging-accessories.png",
    imageAlt: "筆電包收納包充電配件生活開箱封面",
    narrator: "野狗爸 × 野狗媽",
    date: "2026-06-12",
    tags: ["筆電包", "充電配件", "生活收納"],
    platform: "Instagram / Blog",
    link: "#",
    featured: false,
    status: "draft"
  },
  {
    id: "puff-portable-fan",
    title: "親子外出｜Puff 小風扇",
    slug: "puff-portable-fan",
    category: "生活用品",
    excerpt:
      "用夏天親子外出的真實場景，觀察 Puff 小風扇在推車、排隊、戶外活動中的實用程度。",
    coverImage: "/images/contents/puff-portable-fan.png",
    imageAlt: "Puff 小風扇親子外出封面",
    narrator: "野狗媽",
    date: "2026-06-08",
    tags: ["親子外出", "夏天用品", "生活實測"],
    platform: "Instagram Reels",
    link: "#",
    featured: true,
    status: "coming-soon"
  },
  {
    id: "taimall-island-buffet",
    title: "美食體驗｜台茂島語",
    slug: "taimall-island-buffet",
    category: "美食旅行",
    excerpt:
      "從親子用餐便利度、餐點選擇與家庭聚餐氣氛，記錄台茂島語的實際用餐體驗。",
    coverImage: "/images/contents/taimall-island-buffet.png",
    imageAlt: "台茂島語美食體驗封面",
    narrator: "野狗軍團",
    date: "2026-06-04",
    tags: ["台茂", "親子用餐", "美食體驗"],
    platform: "Instagram / Blog",
    link: "#",
    featured: false,
    status: "draft"
  },
  {
    id: "nagomi-ya-dining",
    title: "美食體驗｜NAGOMI 雅",
    slug: "nagomi-ya-dining",
    category: "美食旅行",
    excerpt:
      "以家庭聚餐和大人小孩都能吃得舒服為主軸，整理 NAGOMI 雅的餐點、環境與用餐節奏。",
    coverImage: "/images/contents/nagomi-ya-dining.png",
    imageAlt: "NAGOMI 雅美食體驗封面",
    narrator: "野狗爸 × 野狗媽",
    date: "2026-05-30",
    tags: ["NAGOMI 雅", "家庭聚餐", "餐廳體驗"],
    platform: "Instagram / Blog",
    link: "#",
    featured: false,
    status: "coming-soon"
  },
  {
    id: "japan-family-travel-plan",
    title: "親子旅遊｜日本親子旅行規劃",
    slug: "japan-family-travel-plan",
    category: "美食旅行",
    excerpt:
      "從交通、住宿、景點節奏到玩具收藏路線，規劃一趟適合野狗軍團的日本親子旅行。",
    coverImage: "/images/contents/japan-family-travel-plan.png",
    imageAlt: "日本親子旅行規劃封面",
    narrator: "野狗爸 × 野狗媽",
    date: "2026-05-24",
    tags: ["日本旅遊", "親子旅行", "行程規劃"],
    platform: "Blog / YouTube",
    link: "#",
    featured: true,
    status: "draft"
  }
];
