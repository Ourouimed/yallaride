import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card";

export default function StatsCard({title , statnumber , icon : Icon}){
    return <Card>
        <CardContent>
            <div className='flex items-center justify-between'>
                <CardDescription>
                    {title}
                </CardDescription>
                <Icon className='text-mainColor'/>
            </div>
            <CardTitle className='text-2xl'>
                {statnumber}
            </CardTitle>
        </CardContent>
    </Card>
}