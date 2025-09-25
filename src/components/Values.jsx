import React from "react";
import GridPattern from "./GridPattern";
import SectionIntro from "./SectionIntro";
import Container from "./Container";
import { GridList, GridListItem } from "./GridList";

const Values = () => {
  return (
    <div className="relative mt-24 pt-24 sm:mt-32 sm:pt-32 lg:mt-40 lg:pt-40">
      <div className="absolute inset-x-0 top-0 -z-10 h-[884px] overflow-hidden rounded-t-4xl bg-gradient-to-b from-neutral-50">
        <GridPattern
          className="absolute inset-0 h-full w-full fill-neutral-100 stroke-neutral-950/5 [mask-image:linear-gradient(to_bottom_left,white_40%,transparent_50%)]"
          yOffset={-270}
        />
      </div>
      <SectionIntro eyebrow="Giá trị cốt lõi" title="Sáng tạo điện ảnh – thực thi chỉn chu">
        <p>
          Chúng tôi theo đuổi tính sáng tạo trong từng khung hình nhưng luôn đặt
          hiệu quả truyền thông và trải nghiệm khán giả lên hàng đầu.
        </p>
      </SectionIntro>
      <Container className="mt-24">
        <GridList>
          <GridListItem title="Tỉ mỉ">
            Quy trình sản xuất chuẩn điện ảnh, chú ý đến từng chi tiết về ánh
            sáng, màu sắc, bố cục và nhịp dựng.
          </GridListItem>
          <GridListItem title="Hiệu quả">
            Tối ưu thời gian và chi phí, rõ ràng về timeline – đảm bảo bàn giao
            đúng hạn.
          </GridListItem>
          <GridListItem title="Linh hoạt">
            Mỗi thương hiệu có mục tiêu riêng; chúng tôi tùy biến giải pháp để
            phù hợp kênh và ngân sách.
          </GridListItem>
          <GridListItem title="Minh bạch">
            Trao đổi mở, báo cáo tiến độ thường xuyên; mọi thay đổi đều được
            thống nhất trước khi thực hiện.
          </GridListItem>
          <GridListItem title="Đồng hành">
            Xây dựng mối quan hệ lâu dài với khách hàng, luôn sẵn sàng hỗ trợ
            trong các chiến dịch tiếp theo.
          </GridListItem>
          <GridListItem title="Đổi mới">
            Liên tục cập nhật xu hướng và công nghệ quay dựng để mang lại trải
            nghiệm giàu cảm xúc.
          </GridListItem>
        </GridList>
      </Container>
    </div>
  );
};

export default Values;
