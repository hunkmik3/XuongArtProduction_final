import React from "react";
import SectionIntro from "./SectionIntro";
import Container from "./Container";
import { GridList, GridListItem } from "./GridList";

const Cultures = () => {
  return (
    <div className="mt-24 rounded-4xl bg-neutral-950 py-24 sm:mt-32 lg:mt-40 lg:py-32">
      <SectionIntro
        eyebrow="Văn hoá"
        title="Đam mê sáng tạo, cân bằng cuộc sống."
        invert
      >
        <p>
          Chúng tôi đề cao tinh thần hợp tác, tôn trọng lẫn nhau và luôn hướng
          đến trải nghiệm tốt nhất cho khách hàng.
        </p>
      </SectionIntro>
      <Container className="mt-16">
        <GridList>
          <GridListItem title="Cam kết" invert>
            Đồng hành cùng thương hiệu, giữ lời hứa về chất lượng và tiến độ.
          </GridListItem>
          <GridListItem title="Tin cậy" invert>
            Quy trình rõ ràng, giao tiếp minh bạch, ưu tiên hiệu quả.
          </GridListItem>
          <GridListItem title="Thấu cảm" invert>
            Luôn lắng nghe câu chuyện của khách hàng để truyền tải đúng cảm xúc.
          </GridListItem>
        </GridList>
      </Container>
    </div>
  );
};

export default Cultures;
