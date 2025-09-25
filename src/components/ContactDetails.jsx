import React from "react";
import FadeIn from "./FadeIn";
import Offices from "./Offices";
import Border from "./Border";
import Link from "next/link";
import SocialMedia from "./SocialMedia";

const ContactDetails = () => {
  return (
    <FadeIn>
      <h2 className="font-display text-base font-semibold text-neutral-950">
        Thông tin liên hệ
      </h2>
      <div className="mt-6 text-base text-neutral-600">
        <p className="font-semibold text-neutral-950">Our Office – Hồ Chí Minh City</p>
        <p className="mt-2">📍 172 Lâm Văn Bền, phường Tân Quy, Quận 7, HCM, Vietnam</p>
        <p className="mt-1">☎ 036 499 4647</p>
        <p className="mt-1">📧 ntnhan198.nd@gmail.com</p>
      </div>
      <Border className="mt-16 pt-16">
        <h2 className="font-display text-base font-semibold text-neutral-950">
          Email us
        </h2>
        <dl className="mt-6 grid grid-cols-1 gap-8 text-sm sm:grid-cols-2">
          {["Careers", "Press"].map((label) => (
            <div key={label}>
              <dt className="font-semibold text-neutral-950">{label}</dt>
              <dd>
                <Link
                  href={`mailto:ntnhan198.nd@gmail.com`}
                  className="text-neutral-600 hover:text-neutral-950"
                >
                  ntnhan198.nd@gmail.com
                </Link>
              </dd>
            </div>
          ))}
        </dl>
      </Border>
      <Border className="mt-16 pt-16">
        <h2 className="font-display text-base font-semibold text-neutral-950">
          Follow us
        </h2>
        <SocialMedia className="mt-6" />
      </Border>
    </FadeIn>
  );
};

export default ContactDetails;
