import React from "react";
import Container from "./Container";
import FadeIn from "./FadeIn";
import FooterNavigation from "./FooterNavigation";
import Logo from "./Logo";
import Link from "next/link";

const ArrowIcon = (props) => {
  return (
    <svg viewBox="0 0 16 6" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 3 10 .5v2H0v1h10v2L16 3Z"
      />
    </svg>
  );
};

const NewsletterForm = () => {
  return (
    <div className="max-w-sm">
      <h2 className="font-display text-sm font-semibold tracking-wider text-neutral-950">
        Liên hệ nhanh
      </h2>
      <p className="mt-4 text-sm text-neutral-700">
        Email: ntnhan198.nd@gmail.com
      </p>
      <p className="mt-1 text-sm text-neutral-700">Phone: 036 499 4647</p>
    </div>
  );
};

const Footer = () => {
  return (
    <Container as="footer" className="mt-16 sm:mt-24 md:mt-32 lg:mt-40 w-full">
      <FadeIn>
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:gap-y-16 lg:grid-cols-2">
          <FooterNavigation />
          <div className="flex lg:justify-end">
            <NewsletterForm />
          </div>
        </div>
        <div className="mb-12 sm:mb-20 mt-12 sm:mt-16 md:mt-24 flex flex-col sm:flex-row flex-wrap items-start sm:items-end justify-between gap-4 sm:gap-x-6 gap-y-4 border-t border-neutral-950/10 pt-8 sm:pt-12">
          <Link href={"/"} aria-label="Home">
            <Logo className="h-6 sm:h-8 text-xl sm:text-2xl">
              XUONGART
            </Logo>
          </Link>
          <p className="text-xs sm:text-sm text-neutral-700">
            © XUONGART Inc. {new Date().getFullYear()}
          </p>
        </div>
      </FadeIn>
    </Container>
  );
};

export default Footer;
