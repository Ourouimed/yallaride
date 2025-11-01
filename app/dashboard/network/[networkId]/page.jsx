'use client'
import { useParams } from "next/navigation";
import DashboardLayout from "../../dashboardLayout";

export default function NetworkPage(){
    const params = useParams(); 
    const { networkId } = params;
    return <DashboardLayout>
        Hello {networkId}
    </DashboardLayout>
}