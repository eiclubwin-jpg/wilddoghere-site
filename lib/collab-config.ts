// 合作洽詢頁的聯絡設定。

export const COLLAB_EMAIL = "wilddoghere@gmail.com";

// LINE 官方帳號「加入好友」網址。預設是 @253nhvlz；
// 之後要換帳號，可以直接改這裡，或在 Vercel 設定 NEXT_PUBLIC_LINE_ADD_FRIEND_URL（設了就以它為準）。
const DEFAULT_LINE_ADD_FRIEND_URL = "https://line.me/R/ti/p/@253nhvlz";

export const LINE_ADD_FRIEND_URL =
  process.env.NEXT_PUBLIC_LINE_ADD_FRIEND_URL?.trim() || DEFAULT_LINE_ADD_FRIEND_URL;
