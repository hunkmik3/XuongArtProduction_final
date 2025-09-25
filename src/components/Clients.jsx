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
    <div className="mt-24 rounded-4xl bg-neutral-950 py-20 sm:mt-32 sm:py-32 lg:mt-56">
      <Container>
        <FadeIn className="flex items-center gap-x-8">
          <h2 className="text-center font-sans text-xl sm:text-2xl lg:text-2xl font-semibold tracking-normal text-white sm:text-left">
            Chúng tôi đã đồng hành cùng nhiều thương hiệu & đối tác sáng tạo
          </h2>
          <div className="h-px flex-auto bg-neutral-800" />
        </FadeIn>
        <FadeInStagger faster>
          <ul
            role="list"
            className="mt-10 grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-4"
          >
            {clients.map((client) => (
              <li key={client}>
                <FadeIn>
                  <div className="text-white text-xl font-semibold">{client}</div>
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
