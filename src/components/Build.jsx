import React from "react";
import Section from "./Section";
import imageLaptop from "@/images/laptop.jpg";
import Blockquote from "./Blockquote";

const Build = () => {
  return (
    <Section title="Tiền kỳ & Sản xuất" image={{ src: imageLaptop, shape: 2 }}>
      <div className="space-y-6 text-base text-neutral-600">
        <p>
          Sau khi chốt concept, chúng tôi triển khai tiền kỳ: kịch bản chi tiết,
          storyboard, casting, bối cảnh, đạo cụ, lịch quay và ekip phù hợp.
        </p>
        <p>
          Quá trình quay được vận hành gọn gàng với đạo diễn hình ảnh, gaffer,
          stylist… đảm bảo chất lượng khung hình và âm thanh.
        </p>
        <p>
          Tất cả footage được backup an toàn ngay tại hiện trường.
        </p>
      </div>
      <Blockquote
        author={{ name: "Client", role: "Brand manager" }}
        className="mt-12"
      >
        XưởngArt làm việc rất chuyên nghiệp, bám sát timeline và giữ chất lượng
        hình ảnh đúng như cam kết.
      </Blockquote>
    </Section>
  );
};

export default Build;
