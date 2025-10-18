import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";

export default function ServiceCard ({title = '', description = '', icon : Icon}){
    return <Card className='transition duration-300 ease hover:-translate-y-5 hover:border-cyan-500'> 
        <CardContent className='space-y-4'>
            <div className="bg-sec dark:bg-gray-800  p-4 size-17 rounded-2xl flex justify-center items-center">
                {Icon && <Icon className='text-2xl text-mainColor dark:text-white'/>}
            </div>
            <CardTitle className='text-mainColor dark:text-white font-semibold text-xl'>
                {title}
            </CardTitle>
            <CardDescription>
                {description}
            </CardDescription>
        </CardContent>
    </Card>
}