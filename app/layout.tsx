import type { Metadata } from "next";
import type { ReactNode } from "react";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.wilddoghere.com"),
  title: {
    default: "WildDogHere｜野狗軍團出沒中",
    template: "%s｜WildDogHere"
  },
  description:
    "WildDogHere／野狗軍團出沒中，是一個記錄家族日常、親子開箱、玩具收藏、美食旅行與生活實測的部落格。",
  keywords: [
    "WildDogHere",
    "野狗軍團出沒中",
    "家族生活部落格",
    "親子開箱",
    "玩具開箱",
    "玩具收藏",
    "家庭日常",
    "美食旅行",
    "生活實測",
    "3C開箱"
  ],
  openGraph: {
    title: "WildDogHere｜野狗軍團出沒中",
    description:
      "由野狗爸與野狗媽共同經營的家族生活部落格，分享親子開箱、玩具收藏、美食旅行、生活用品與日常故事。",
    type: "website",
    locale: "zh_TW",
    url: "https://www.wilddoghere.com",
    siteName: "WildDogHere",
    images: [
      {
        url: "/images/hero/wilddog-family-hero.png",
        width: 1536,
        height: 1024,
        alt: "WildDogHere 野狗軍團全家主視覺"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "WildDogHere｜野狗軍團出沒中",
    description: "家族生活、親子開箱、玩具收藏、美食旅行與生活實測部落格。",
    images: ["/images/hero/wilddog-family-hero.png"]
  },
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": "/feed.xml"
    }
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="zh-Hant">
      <body>
        {children}
        <Script src="/_vercel/insights/script.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
