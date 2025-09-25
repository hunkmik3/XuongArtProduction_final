import React from "react";
import Section from "./Section";
import imageWhiteboard from "@/images/whiteboard.jpg";
import { TagList, TagListItem } from "./TagList";

const Discover = () => {
  return (
    <Section title="Khám phá & Định hướng" image={{ src: imageWhiteboard, shape: 1 }}>
      <div className="space-y-6 text-base text-neutral-600">
        <p>
          Chúng tôi bắt đầu bằng việc tìm hiểu mục tiêu thương hiệu, đối tượng
          khán giả và bối cảnh truyền thông. Từ đó đề xuất ý tưởng chủ đạo và
          moodboard hình ảnh phù hợp.
        </p>
        <p>
          Đội ngũ creative cùng khách hàng thống nhất concept, thông điệp và
          kịch bản sơ bộ cho video/ảnh. Mọi thứ đều minh bạch về timeline và
          phạm vi.
        </p>
        <p>
          Kết quả của giai đoạn này là định hướng sáng tạo rõ ràng kèm kế hoạch
          tiền kỳ chi tiết.
        </p>
      </div>
      <h3 className="mt-12 font-display text-base font-semibold text-neutral-950">
        Đầu việc chính
      </h3>
      <TagList className="mt-4">
        <TagListItem>Workshop/Interview</TagListItem>
        <TagListItem>Research insight</TagListItem>
        <TagListItem>Idea & moodboard</TagListItem>
        <TagListItem>Treatment/Kịch bản sơ bộ</TagListItem>
        <TagListItem>Timeline & budget</TagListItem>
      </TagList>
    </Section>
  );
};

export default Discover;
