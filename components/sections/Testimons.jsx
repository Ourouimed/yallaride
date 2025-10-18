import { Puzzle, Stars } from 'lucide-react'
import BadgeSpan from '../ui/badge-span'
import ServiceCard from '../cards/service-card'
import { testimons } from '@/lib/testimons'
import TestimonCard from '../cards/testimon-card'
export default function Testimons (){
    return <section id="services"
    className="relative px-6 md:px-16 lg:px-20 py-10 min-h-screen flex justify-center items-center">
        <div className='flex flex-col gap-4 justify-center items-center space-y-5'>
            <BadgeSpan title='Testimonials' icon={Stars}/>
            <h1 className='text-3xl font-semibold text-center'>What our costumers says</h1>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {testimons.map(({profile , author , testimonial , rateCount} , i)=>  
              <TestimonCard key={i} author={author} profile={profile} testimonial={testimonial} rateCount={rateCount}/>)}
                                        
            </div>
        </div>
        
    </section>
}