import clsx from "clsx";
import {
  BsFacebook,
  BsTwitter,
  BsYoutube,
  BsLinkedin,
} from "react-icons/bs";

export const SocialMediaProfiles = [
  {
    title: "Instagram",
    href: "#",
    icon: BsYoutube,
  },
  {
    title: "Facebook",
    href: "https://www.facebook.com/xuongartproduction",
    icon: BsFacebook,
  },
  {
    title: "linkedin",
    href: "#",
    icon: BsLinkedin,
  },
  {
    title: "Twitter",
    href: "#",
    icon: BsTwitter,
  },
];

const SocialMedia = ({ className, invert = false }) => {
  return (
    <ul
      role="list"
      className={clsx(
        "flex gap-x-10",
        invert ? "text-white" : "text-neutral-950",
        className
      )}
    >
      {SocialMediaProfiles.map((item) => (
        <li key={item.title}>
          <span
            aria-label={item.title}
            className={clsx(
              "transition",
              invert ? "hover:text-neutral-200" : "hover:text-neutral-700"
            )}
          >
            <item.icon className="h-6 w-6 fill-current" />
          </span>
        </li>
      ))}
    </ul>
  );
};

export default SocialMedia;
