'use client'
import DashboardLayout from "@/app/dashboard/dashboardLayout"
import { useParams } from "next/navigation"

export default function RidePage (){
    const { rideId } = useParams()
    return <DashboardLayout>
        <h1>Welcome {rideId}</h1>
    </DashboardLayout>
}