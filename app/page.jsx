import Intro from "@/components/views/intro";

export default function Home() {
  return (
    <section className="flex items-start justify-between gap-10 animate-slide-top mt-10 px-10 max-xl:px-5 max-lg:flex-col max-lg:gap-5 max-sm:px-1">
      <Intro />
    </section>
  );
}
