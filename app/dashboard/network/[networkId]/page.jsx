'use client'
import { useParams } from "next/navigation";
import DashboardLayout from "../../dashboardLayout";
import { useNetwork } from "@/context/NetworksContext";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Settings } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { usePopup } from "@/context/PopupContext";
import OfferRidePopup from "@/components/popup-forms/OfferRidePopup";

export default function NetworkPage(){
    const params = useParams(); 
    const { networkId } = params;
    const [networkData , setNetworkData] = useState(null)
    const { getNetwork } = useNetwork()
    const { user } = useAuth()
    const { openPopup , closePopup } = usePopup()


    useEffect(() => {
    const fetchNetwork = async () => {
        const data = await getNetwork(networkId);
        setNetworkData(data);
    };

    if (networkId) fetchNetwork();
  }, [networkId, getNetwork]);


    return <DashboardLayout>
        {!networkData ? <p>Network unfound!!</p> : <>
            <div className="flex items-center justify-between">
                <h3 className="text-xl"><span className="font-semibold">{networkData.name}</span>'s network</h3>
                <div className="flex items-center gap-2">
                    {user?.role == 'director' ? <>
                        <Button variant='outline' className='size-10 p-2 rounded-full'>
                            <Settings/>
                        </Button>
                        <Button className='size-10 p-2 rounded-full'>
                            <Plus/>
                        </Button>
                    </> : user?.role == 'driver' ? <>
                                <Button className='rounded-md' onClick={()=> openPopup('Offer ride' , <OfferRidePopup networkId={networkId}/>)}>
                                    Offer Ride<Plus/>
                                </Button> 
                        </>: null}
                    
                </div>
            </div>
        </>}
    </DashboardLayout>
}