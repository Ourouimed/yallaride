import { Car, CarFront, Puzzle } from 'lucide-react'
import BadgeSpan from '../ui/badge-span'
import ServiceCard from '../cards/service-card'
import { services } from '@/lib/services'
export default function Services (){
    return <section id="services"
    className="relative px-6 md:px-16 lg:px-20 py-10 min-h-screen flex justify-center items-center">
        <div className='flex flex-col gap-4 justify-center items-center space-y-5'>
            <BadgeSpan title='Services' icon={Puzzle}/>
            <h1 className='text-3xl font-semibold text-center'>This the services that we provide</h1>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {services.map(({title , description , icon} , i)=> 
              <ServiceCard key={i} title={title} description={description} icon={icon}/>)}
                                        
            </div>
        </div>
        
    </section>
}