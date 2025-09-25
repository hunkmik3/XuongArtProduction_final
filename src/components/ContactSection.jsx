import React from "react";
import Container from "./Container";
import FadeIn from "./FadeIn";
import Button from "./Button";
import Offices from "./Offices";

const ContactSection = () => {
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <FadeIn className="-mx-6 rounded-4xl bg-neutral-950 px-6 py-20 sm:mx-0 sm:py-32 md:px-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-3xl font-medium text-white [text-wrap:balance] sm:text-4xl">
            Hãy chia sẻ với chúng tôi về dự án của bạn
          </h2>
        
          <div className="mt-6 flex">
            <Button href={"/contact"} invert>
              👉 Bắt đầu hợp tác
            </Button>
          </div>
          <div className="mt-10 border-t border-white/10 pt-10">
            <h3 className="font-display text-base font-semibold text-white">
              Thông tin liên hệ
            </h3>
            <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2 text-neutral-300">
              <div>
                <p className="font-semibold text-white">Our Office – Hồ Chí Minh City</p>
                <p className="mt-2">📍 172 Lâm Văn Bền, phường Tân Quy, Quận 7, HCM, Vietnam</p>
                <p className="mt-1">☎ 036 499 4647</p>
                <p className="mt-1">📧 ntnhan198.nd@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </FadeIn>
    </Container>
  );
};

export default ContactSection;
