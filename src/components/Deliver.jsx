import React from "react";
import Section from "./Section";
import imageMeeting from "@/images/meeting.jpg";
import List, { ListItem } from "./List";

const Deliver = () => {
  return (
    <Section title="Hậu kỳ & Bàn giao" image={{ src: imageMeeting, shape: 1 }}>
      <div className="space-y-6 text-base text-neutral-600">
        <p>
          Đội ngũ editor, colorist và sound designer thực hiện dựng, chỉnh màu,
          âm nhạc/voice-over, VFX (nếu có) và thực hiện các phiên bản phù hợp
          cho từng kênh phát hành.
        </p>
        <p>
          Files được bàn giao đúng chuẩn kỹ thuật (codec, resolution, bitrate)
          kèm toàn bộ tài nguyên cần thiết.
        </p>
      </div>
      <h3 className="mt-12 font-display text-base font-semibold text-neutral-950">
        Đầu việc chính
      </h3>
      <List>
        <ListItem title="Editing & Color grading">Dựng hình, hiệu ứng, chỉnh màu</ListItem>
        <ListItem title="Sound design">Nhạc nền/VO/Mix</ListItem>
        <ListItem title="Export & Deliverable">Xuất file theo chuẩn kênh, bàn giao tài nguyên</ListItem>
      </List>
    </Section>
  );
};

export default Deliver;
