export type SocialLink = {
  platform: "youtube" | "instagram" | "facebook" | "website" | "email";
  label: string;
  name: string;
  url: string;
  status: "active" | "pending";
};

export const socialLinks: SocialLink[] = [
  {
    platform: "youtube",
    label: "YouTube",
    name: "野狗軍團出沒中",
    url: "https://www.youtube.com/@wilddoghere",
    status: "active"
  },
  {
    platform: "instagram",
    label: "Instagram",
    name: "WildDogHere",
    url: "https://www.instagram.com/wilddoghere/",
    status: "active"
  },
  {
    platform: "facebook",
    label: "Facebook",
    name: "野狗軍團出沒中",
    url: "https://www.facebook.com/profile.php?id=61591632385768",
    status: "active"
  },
  {
    platform: "website",
    label: "Official Website",
    name: "WildDogHere",
    url: "https://www.wilddoghere.com/",
    status: "active"
  },
  {
    platform: "email",
    label: "合作信箱",
    name: "wilddoghere@gmail.com",
    url: "mailto:wilddoghere@gmail.com",
    status: "active"
  }
];
