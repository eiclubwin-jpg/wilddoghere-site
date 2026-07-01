import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://wilddoghere.com"),
  title: {
    default: "WildDogHere｜野狗軍團出沒中",
    template: "%s｜WildDogHere"
  },
  description:
    "WildDogHere／野狗軍團出沒中，是由野狗爸與野狗媽共同經營的生活型社群品牌，記錄親子生活、玩具開箱、美食旅行、收藏分享與家庭日常。",
  keywords: [
    "WildDogHere",
    "野狗軍團出沒中",
    "親子生活",
    "玩具開箱",
    "家庭日常",
    "美食旅行",
    "收藏分享"
  ],
  openGraph: {
    title: "WildDogHere｜野狗軍團出沒中",
    description:
      "以家庭為中心的生活型社群品牌，記錄親子生活、玩具開箱、美食旅行、收藏分享與家庭日常。",
    type: "website",
    locale: "zh_TW",
    url: "https://wilddoghere.com",
    siteName: "WildDogHere"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="zh-Hant">
      <body>{children}</body>
    </html>
  );
}
