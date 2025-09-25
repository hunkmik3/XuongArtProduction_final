import React from "react";
import SectionIntro from "./SectionIntro";
import Container from "./Container";
import FadeIn from "./FadeIn";
import StylizedImage from "./StylizedImage";
import imageLaptop from "../images/laptop.jpg";
import List, { ListItem } from "./List";

const Services = () => {
  return (
    <>
      <SectionIntro
        eyebrow="Dịch vụ"
        title="Chúng tôi giúp bạn kể câu chuyện thương hiệu bằng hình ảnh chuyển động"
        className="mt-24 sm:mt-32 lg:mt-40"
      >
        <p>
        Every frame tells a story.
          
        </p>
      </SectionIntro>
      <Container className="mt-16">
        <div className="lg:flex lg:items-center lg:justify-end">
          <div className="flex justify-center lg:w-1/2 lg:justify-end lg:pr-12">
            <FadeIn className="w-[33.75rem] flex-none lg:w-[45rem]">
              <StylizedImage
                src={imageLaptop}
                sizes="(min-width: 1024px) 41rem, 31rem"
                className="justify-center lg:justify-end"
              />
            </FadeIn>
          </div>
          {/* List item */}
          <List className="mt-16 lg:mt-0 lg:w-1/2 lg:min-w-[33rem] lg:pl-4">
            <ListItem title="Post-Production">
              Dựng phim, biên tập, hiệu ứng hình ảnh, chỉnh màu – đảm bảo từng chi tiết đạt chất điện ảnh.
            </ListItem>
            <ListItem title="Livestream & Event Coverage">
              Giải pháp ghi hình và phát trực tiếp sự kiện, talkshow, hội nghị với chất lượng cao và tương tác mạnh mẽ.
            </ListItem>
            <ListItem title="Creative Content">
              Nội dung hình ảnh sáng tạo cho doanh nghiệp và thương hiệu: phim doanh nghiệp, video social media, chiến dịch truyền thông.
            </ListItem>
            <ListItem title="Video Production">
              Từ TVC quảng cáo, viral clip đến music video – chúng tôi tạo nên những thước phim giàu cảm xúc và chuyên nghiệp..
            </ListItem>
          </List>
        </div>
      </Container>
    </>
  );
};

export default Services;
