import { User } from "lucide-react";
import BadgeSpan from "../ui/badge-span";
import Image from "next/image";

export default function About() {
  return (
    <section
      id="about"
      className="relative px-6 sm:px-10 md:px-16 lg:px-20 py-16 min-h-screen flex items-center bg-[url('/assets/aboutBg.png')] bg-cover bg-center"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      <div className="relative grid md:grid-cols-2 gap-10 items-center w-full">
        {/* Image group */}
        <div className="flex justify-center md:justify-start items-center gap-4">
          <div className="relative h-[220px] w-[150px] sm:h-[260px] sm:w-[180px] md:h-[280px] md:w-[200px] -translate-y-4 md:-translate-y-8 rounded-l-3xl overflow-hidden">
            <Image
              src="/assets/car1.png"
              fill
              alt="Car 1"
              className="object-cover"
            />
          </div>
          <div className="relative h-[220px] w-[150px] sm:h-[260px] sm:w-[180px] md:h-[280px] md:w-[200px] translate-y-4 md:translate-y-8 rounded-r-3xl overflow-hidden">
            <Image
              src="/assets/car2.png"
              fill
              alt="Car 2"
              className="object-cover"
            />
          </div>
        </div>

        {/* Text content */}
        <div className="space-y-4 text-center md:text-left text-white">
          <BadgeSpan title="About us" icon={User} />
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight">
            Know More About Our Mission
          </h1>
          <p className="text-sm sm:text-base text-gray-200 max-w-md md:max-w-none mx-auto md:mx-0">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. It has been the industry's standard dummy text ever since
            the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book.
          </p>
        </div>
      </div>
    </section>
  );
}
