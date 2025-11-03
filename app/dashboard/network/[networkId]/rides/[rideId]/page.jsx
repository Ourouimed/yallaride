'use client'
import DashboardLayout from "@/app/dashboard/dashboardLayout"
import { Card, CardHeader } from "@/components/ui/card"
import { useParams } from "next/navigation"

export default function RidePage (){
    const { rideId } = useParams()
    return <DashboardLayout>
        <div className="grid grid-cols-[7fr_3fr] gap-3">
            <div className="space-y-3">
                <div className="flex items-center justify-betwee py-3">
                    <h3 className="text-xl font-semibold py-2">Ride Data</h3>
                    
                </div>
                <Card>
                    <CardHeader>
                        
                    </CardHeader>
                </Card>
            </div>

        </div>

    </DashboardLayout>
}