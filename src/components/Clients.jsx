import Container from "./Container";
import FadeIn, { FadeInStagger } from "./FadeIn";

const clients = [
  "Redmi",
  "Asus",
  "Samsung",
  "Cellphones",
  "Oppo",
  "Huawei",
  "Monday VietNam",
  "Apple",
];

const Clients = () => {
  return (
    <div className="mt-20 sm:mt-24 md:mt-32 lg:mt-56 rounded-4xl bg-neutral-950 py-12 sm:py-20 md:py-32">
      <Container>
        <FadeIn className="flex flex-col sm:flex-row items-center gap-x-8 gap-y-4">
          <h2 className="text-center text-base sm:text-xl md:text-2xl font-sans font-semibold tracking-normal text-white sm:text-left">
            Chúng tôi đã đồng hành cùng nhiều thương hiệu & đối tác sáng tạo
          </h2>
          <div className="h-px w-full sm:w-auto sm:flex-auto bg-neutral-800" />
        </FadeIn>
        <FadeInStagger faster>
          <ul
            role="list"
            className="mt-8 sm:mt-10 grid grid-cols-2 sm:grid-cols-4 gap-x-6 sm:gap-x-8 gap-y-8 sm:gap-y-10"
          >
            {clients.map((client) => (
              <li key={client}>
                <FadeIn>
                  <div className="text-white text-base sm:text-lg md:text-xl font-semibold">{client}</div>
                </FadeIn>
              </li>
            ))}
          </ul>
        </FadeInStagger>
      </Container>
    </div>
  );
};

export default Clients;
