"use client";
import DashboardLayout from "../dashboardLayout";
import { Button } from "@/components/ui/button";
import { usePopup } from "@/context/PopupContext";
import NetworkPopup from "@/components/popup-forms/NetworkPopup";
import { useNetwork } from "@/context/NetworksContext";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Car, User2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import JoinNetworkPopup from "@/components/popup-forms/JoinNetworkPopup";

export default function NetworksPage(){
    const { openPopup } = usePopup();
    const { networksList } = useNetwork()
    const { user } = useAuth()
    return <DashboardLayout>
        <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold py-2">Networks</h3>
            {user?.role === 'director' ? 
            <Button onClick={() => openPopup("Create new Network", <NetworkPopup />)}>Create new Network</Button> :
            <Button onClick={()=> openPopup('Join a network' , <JoinNetworkPopup/>)}>Join Network</Button>}
            
        </div>
        <div className="grid grid-cols sm:grid-cols-3 gap-2">
            {networksList.length == 0 ? 'No available networks' : <>
                {networksList.map(net => <Card key={net.id}>
  <CardHeader className='flex justify-between items-center border-b border-border'>
    <CardTitle>{net.name}</CardTitle>
    <p className="text-sm">{net.id}</p>
  </CardHeader>

  <CardFooter className='flex justify-between gap-3'>
    <div className="flex items-center gap-1">
        <p className="flex items-center gap-1"><User2 className='text-sm'/> {net.passangers.length || 0}</p>
        <p className="flex items-center gap-1"><Car className='text-sm'/> {net.drivers.length || 0}</p>
    </div>
    <Button href={`/dashboard/network/${net.id}`}>View</Button>
  </CardFooter>
  
</Card>
)}
                
            </>}
        </div>
    </DashboardLayout>
}