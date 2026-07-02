"use client";

import { useState } from "react";
import { CTAButton } from "@/components/CTAButton";

const heroImageAlt =
  "野狗軍團全家主視覺，包含野狗爸、野狗媽、小野狗一號、小野狗二號、小野狗三號與阿公阿嬤";

export function Hero() {
  const [imageReady, setImageReady] = useState(true);

  return (
    <section className="paper-texture relative bg-cream">
      <div className="mx-auto grid min-h-[calc(100vh-77px)] max-w-7xl items-center gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[0.45fr_0.55fr] lg:gap-14 lg:py-16">
        <div className="relative z-10">
          <p className="mb-5 w-fit rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold leading-6 text-clay shadow-sm">
            家族生活 x 親子開箱 x 3C開箱 x 玩具收藏 x 美食旅行
          </p>
          <h1 className="text-5xl font-black leading-tight text-coffee sm:text-6xl lg:text-7xl">
            WildDogHere
            <span className="mt-3 block text-3xl text-cocoa sm:text-5xl">
              野狗軍團出沒中
            </span>
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-9 text-cocoa/82">
            一個記錄家族日常、親子開箱、玩具收藏、美食旅行與生活實測的部落格。
          </p>
          <p className="mt-5 max-w-2xl text-base leading-8 text-cocoa/72">
            我們用野狗爸與野狗媽的雙視角，分享一家人在日常生活裡的真實體驗。
            有時開箱、有時旅行，有時只是家裡又發生一件很好笑的小事。
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <CTAButton href="#latest-posts">看最新文章</CTAButton>
            <CTAButton href="#about" variant="secondary">
              認識野狗軍團
            </CTAButton>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -left-4 -top-4 h-24 w-24 rounded-full bg-butter/60 blur-sm" />
          <div className="absolute -bottom-5 -right-4 h-28 w-28 rounded-full bg-orange-100/70 blur-sm" />
          <div className="hand-drawn relative overflow-hidden bg-white/75 p-3 shadow-soft">
            <div className="relative aspect-[16/10] max-h-[44vh] min-h-64 overflow-hidden rounded-[1.35rem] bg-butter sm:max-h-none lg:aspect-[4/3]">
              <div className="absolute inset-4 rounded-[1rem] border border-dashed border-cocoa/20 bg-cream/55" />
              <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
                <span className="text-sm font-semibold uppercase tracking-[0.18em] text-cocoa/45">
                  WildDogHere
                </span>
                <span className="mt-2 text-base font-bold text-cocoa/55">
                  野狗軍團全家主視覺
                </span>
              </div>
              {imageReady ? (
                <img
                  src="/images/hero/wilddog-family-hero.png"
                  alt={heroImageAlt}
                  className="absolute inset-0 h-full w-full object-cover"
                  onError={() => setImageReady(false)}
                />
              ) : null}
            </div>
          </div>
          <p className="pointer-events-none absolute -bottom-4 left-8 hidden rotate-[-2deg] rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-clay shadow-sm sm:block">
            一家人一起出沒
          </p>
        </div>
      </div>
    </section>
  );
}
