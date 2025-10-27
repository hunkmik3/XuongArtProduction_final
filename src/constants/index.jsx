import { SocialMediaProfiles } from "@/components/SocialMedia";

export const navigation = [
  {
    title: "Dự án",
    links: [
      {
        title: "Xem tất cả",
        href: "/portfolio",
      },
    ],
  },
  {
    title: "Công ty",
    links: [
      { title: "Về chúng tôi", href: "/about" },
      { title: "Quy trình", href: "/process" },
      { title: "Liên hệ", href: "/contact" },
    ],
  },
  {
    title: "Kết nối",
    links: SocialMediaProfiles,
  },
];
