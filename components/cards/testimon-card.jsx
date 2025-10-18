import Image from "next/image";
import { Card, CardContent, CardDescription } from "../ui/card";
import { Star } from "lucide-react";

export default function TestimonCard({ profile, author, testimonial, rateCount }) {
  return (
    <Card className='transition duration-300 ease hover:-translate-y-5 hover:border-cyan-500'>
      <CardContent className="flex flex-col items-center text-center space-y-3">
        <Image
          src={profile}
          alt={author}
          height={80}
          width={80}
          className="rounded-full border-4 border-sec dark:border-gray-800"
        />

        <div className="flex space-x-1">
          {Array.from({ length: rateCount }).map((_, index) => (
            <Star key={index} className="w-5 h-5 text-yellow-400" />
          ))}
          {Array.from({ length: 5 - rateCount }).map((_, index) => (
            <Star key={index} className="w-5 h-5 text-gray-400" />
          ))}
        </div>

        <CardDescription>{testimonial}</CardDescription>
        <span className="font-semibold text-mainColor dark:text-white">{author}</span>
      </CardContent>
    </Card>
  );
}
