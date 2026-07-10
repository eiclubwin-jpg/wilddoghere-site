# WildDogHere 表情符號使用說明

## 1. 圖片存放位置

所有 WildDogHere 專屬表情符號放在：

```txt
public/images/emojis/
```

網站引用路徑請使用：

```txt
/images/emojis/檔名.png
```

## 2. 如何在 CMS 中插入圖片

在 WildDogHere CMS 的「文章內文」工具列中：

1. 在「文章內文」下方找到可直接預覽的表情貼圖圖片。
2. 先把文字游標放在想插入的位置。
3. 用滑鼠連點貼圖圖片兩下。
4. CMS 會在游標位置自動插入 120px 寬的表情 PNG。

使用鍵盤時，可先用 Tab 選到貼圖，再按 Enter 插入。

插入後可以繼續在文章中移動、刪除，或搭配段落文字使用。

## 3. Markdown 使用方式

```md
![野狗媽傻眼](/images/emojis/dogmom-speechless.png)
```

## 4. HTML 使用方式

```html
<img src="/images/emojis/dogmom-speechless.png" alt="野狗媽傻眼" width="120" />
```

## 5. React / Next.js 元件使用方式

```tsx
import { EmojiSticker } from "@/components/EmojiSticker";

<EmojiSticker
  image="/images/emojis/dogmom-speechless.png"
  alt="野狗媽傻眼"
  size={120}
/>
```

## 6. 建議顯示尺寸

- 文章內小圖：80px
- 文章段落插圖：120px
- 文章結尾貼圖：160px
- 全家貼圖：180px 到 240px

## 7. 如何新增下一批表情符號

1. 將新的 PNG 放到 `public/images/emojis/`。
2. 檔名使用英文小寫與 hyphen，例如 `dogmom-wow.png`。
3. 確認圖片為透明背景 PNG。
4. 到 `data/emojis.ts` 新增一筆資料。
5. 若要讓 CMS 下拉選單也出現，請同步更新 `cms/public/cms.js` 的 `emojiOptions`。
6. 執行 `npm run build` 確認網站沒有錯誤。

## 8. 常用引用範例

```html
<p>這次出門真的太累了。</p>
<img
  class="emoji-sticker"
  src="/images/emojis/dogmom-tired.png"
  alt="野狗媽累了表情符號"
  width="120"
/>
```

```md
![野狗軍團打完收工](/images/emojis/family-finish.png)
```
