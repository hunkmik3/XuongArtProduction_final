import { SocialMediaProfiles } from "@/components/SocialMedia";

export const navigation = [
  {
    title: "Dự án",
    links: [
      { title: "CellPhoneS x ASUS Pro Art", href: "/#projects" },
      { title: "CellphoneS x Xiaomi 13", href: "/#projects" },
      { title: "OPPO Find N2 Flip", href: "/#projects" },
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
      { title: "Blog", href: "/blog" },
      { title: "Liên hệ", href: "/contact" },
    ],
  },
  {
    title: "Kết nối",
    links: SocialMediaProfiles,
  },
];
