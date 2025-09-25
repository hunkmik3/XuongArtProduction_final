import Clients from "@/components/Clients";
import ContactSection from "@/components/ContactSection";
import Container from "@/components/Container";
import FadeIn from "@/components/FadeIn";
import Services from "@/components/Services";
import ProjectsGallery from "@/components/ProjectsGallery";
import Testimonials from "@/components/Testimonials";
import logoPhobiaDark from "@/images/clients/phobia/logo-dark.svg";

export default function Home() {
  return (
    <main className="text-black">
      <Container className="mt-24 sm:mt-32">
        <FadeIn className="max-w-3xl">
          <h1 className="font-display text-5xl font-medium tracking-tight text-neutral-950 [text-wrap:balance] sm:text-7xl">
            Xưởng Art – Biến ý tưởng thành trải nghiệm số
          </h1>
          <p className="mt-6 text-xl text-neutral-600">
          Nơi nghệ thuật gặp công nghệ.
Xưởng Art Production là studio sáng tạo chuyên về sản xuất video và nội dung hình ảnh.
Chúng tôi tin rằng mỗi khung hình đều mang sức mạnh kể chuyện – khơi gợi cảm xúc và truyền tải thông điệp thương hiệu một cách tinh tế..
          </p>
        </FadeIn>
      </Container>
      <Clients />
      {/* Testimonials section removed by request */}
      <Services />
      <ProjectsGallery />
      <ContactSection />
    </main>
  );
}
