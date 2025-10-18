import { User } from "lucide-react";
import BadgeSpan from "../ui/badge-span";
import Image from "next/image";

export default function About() {
  return (
    <section
      id="about"
      className="relative px-6 md:px-16 lg:px-20 py-10 min-h-screen flex items-center bg-[url('/assets/aboutBg.png')] bg-cover bg-center"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/73"></div>

      <div className="relative grid md:grid-cols-2 gap-6 items-center w-full">
        <div className="flex items-center gap-4">
          <div className="relative bg-blue-500 h-[280px] w-[200px] -translate-y-8 rounded-l-4xl overflow-hidden">
            <Image src="/assets/car1.png" fill alt="Car 1" className="object-cover" />
          </div>
          <div className="relative bg-red-500 h-[280px] w-[200px] translate-y-8 rounded-r-4xl overflow-hidden">
            <Image src="/assets/car2.png" fill alt="Car 2" className="object-cover" />
          </div>
        </div>

        <div className="space-y-4 text-center md:text-left text-white">
          <BadgeSpan title="About us" icon={User} />
          <h1 className="text-5xl font-semibold leading-tight">
            Know More About Our Mission
          </h1>
          <p className="text-para">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it.
          </p>
        </div>
      </div>
    </section>
  );
}
