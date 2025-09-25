import Build from "@/components/Build";
import ContactSection from "@/components/ContactSection";
import Deliver from "@/components/Deliver";
import Discover from "@/components/Discover";
import PageIntro from "@/components/PageIntro";
import Values from "@/components/Values";
import React from "react";

const ProcessPage = () => {
  return (
    <>
      <PageIntro eyebrow="Quy trình" title="Cách chúng tôi thực hiện dự án">
        <p>
          Quy trình sản xuất của XưởngArt được thiết kế dành riêng cho nội dung
          hình ảnh và video: nhanh gọn, minh bạch và tối ưu chi phí nhưng vẫn
          đảm bảo chất lượng điện ảnh.
        </p>
      </PageIntro>
      <div className="mt-24 space-y-24 [counter-reset:section] sm:mt-32 sm:space-y-32 lg:mt-40 lg:space-y-40">
        {/* Discover */}
        <Discover />
        {/* Build */}
        <Build />
        {/* Deliver */}
        <Deliver />
      </div>
      {/* Values */}
      <Values />
      <ContactSection />
    </>
  );
};

export default ProcessPage;
