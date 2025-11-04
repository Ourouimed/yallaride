'use client'
import { useParams } from "next/navigation";
import DashboardLayout from "../../dashboardLayout";
import { useNetwork } from "@/context/NetworksContext";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CarFront, EllipsisVertical, MapPin, Plus, Settings, Users } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { usePopup } from "@/context/PopupContext";
import OfferRidePopup from "@/components/popup-forms/OfferRidePopup";
import StatsCard from "@/components/ui/stats-card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Popover , PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import { Select , SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function NetworkPage(){
    const params = useParams(); 
    const { networkId } = params;
    const [networkData , setNetworkData] = useState(null)
    const { isLoading , getNetwork , changeUserStatus} = useNetwork()
    const { user } = useAuth()
    const { openPopup } = usePopup()
    const passStatus = ['pending' , 'approved' , 'denied']
    const [currPassStatus , setCurrPassStatus] = useState('')

 

    const handleChangePassStatus = async (id , role)=>{
        await changeUserStatus(id , currPassStatus , networkId , role)
    }
 

    useEffect(() => {
    const fetchNetwork = async () => {
        const data = await getNetwork(networkId);
        setNetworkData(data);
    };

    if (networkId) fetchNetwork();
  }, [networkId, getNetwork]);


    return <DashboardLayout>
        {!networkData ? <p>Network unfound!!</p> : 
        <>
            <div className="flex items-center justify-between">
                <h3 className="text-xl"><span className="font-semibold">{networkData.name}</span>'s network</h3>
                <div className="flex items-center gap-2">
                    <p className="text-sm text-muted-foreground">
                        Network ID: <span className="font-medium">{networkId}</span>
                    </p>
                    {user?.role == 'director' ? <>
                    
                        <Button variant='outline' className='size-10 p-2 rounded-full'>
                            <Settings/>
                        </Button>
                    </> : user?.role == 'driver' ? <>
                                <Button className='rounded-md' onClick={()=> openPopup('Offer ride' , <OfferRidePopup networkId={networkId}/>)}>
                                    Offer Ride<Plus/>
                                </Button> 
                        </>: user?.role == 'passenger' ? <>
                                <Button className='rounded-md' href={`/dashboard/network/${networkId}/find`}>
                                    Find Ride
                                </Button> 
                        </> : null}


                    
                    
                </div>
            </div>

            {user?.role == 'director' && <>
                        <div className="grid grid-cols-[6fr_3fr] gap-5">
                            <div className="space-y-3">
                                <div className="grid grid-cols sm:grid-cols-2 gap-2">
                                    <StatsCard title='total drivers' icon={CarFront} statnumber={networkData.drivers.length}/>
                                    <StatsCard title='total passengers' icon={Users} statnumber={networkData.passengers.length}/>
                                    <StatsCard title='total rides' icon={MapPin} statnumber={networkData.drivers.length}/>
                                </div>
                                <div className="space-y-2">
                                    <h3>passengers</h3>
                                    <Table className='border border-border'>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>
                                                    #
                                                </TableHead>
                                                <TableHead>
                                                    full name
                                                </TableHead>
                                                <TableHead>
                                                    email
                                                </TableHead>
                                                <TableHead>
                                                    status
                                                </TableHead>
                                                <TableHead>
                                                    joined at
                                                </TableHead>
                                                <TableHead/>
                                                
                                        
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                                {networkData.passengers.map(p => <TableRow key={p.id}>
                                                    <TableCell>
                                                        {p.id}
                                                    </TableCell>
                                                    <TableCell>
                                                        {p.fullname}
                                                    </TableCell>
                                                    <TableCell>
                                                        {p.email}
                                                    </TableCell>
                                                    <TableCell>
                                                        <Badge variant={p.status}>
                                                            {p.status}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell>
                                                        {p.joined_at.toDate().toISOString().split('T')[0]}
                                                    </TableCell>
                                                    <TableCell>
                                                        <Popover>
                                                            <PopoverTrigger asChild className='cursor-pointer'>
                                                                <EllipsisVertical/>
                                                            </PopoverTrigger>
                                                            <PopoverContent>
                                                                <div className="flex items-center gap-2">
                                                                    <Select id='status'  defaultValue={p.status} onValueChange={(value) => setCurrPassStatus(value)}>
                                                                        <SelectTrigger className='w-full'>
                                                                            <SelectValue placeholder="Select a fruit" />
                                                                        </SelectTrigger>
                                                                        <SelectContent>
                                                                            <SelectGroup>
                                                                                <SelectLabel>Status</SelectLabel>
                                                                                {passStatus.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                                                                            </SelectGroup>
                                                                        </SelectContent>
                                                                    </Select>
                                                                    <Button  disabled={isLoading} onClick={()=> handleChangePassStatus(p.id , p.role)}>{isLoading? 'Saving...' : 'Save'}</Button>
                                                                </div>
                                                            
                                                                    
                                                            </PopoverContent>
                                                        </Popover>
                                                        
                                                    </TableCell>
                                                </TableRow>)}
                                        </TableBody>
                                    </Table>
                                </div>

                                <div className="space-y-2">
                                    <h3>Drivers</h3>
                                    <Table className='border border-border'>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>
                                                    #
                                                </TableHead>
                                                <TableHead>
                                                    full name
                                                </TableHead>
                                                <TableHead>
                                                    email
                                                </TableHead>
                                                <TableHead>
                                                    status
                                                </TableHead>
                                                <TableHead>
                                                    joined at
                                                </TableHead>
                                                <TableHead/>
                                                
                                        
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                                {networkData.drivers.map(p => <TableRow key={p.id}>
                                                    <TableCell>
                                                        {p.id}
                                                    </TableCell>
                                                    <TableCell>
                                                        {p.fullname}
                                                    </TableCell>
                                                    <TableCell>
                                                        {p.email}
                                                    </TableCell>
                                                    <TableCell>
                                                        <Badge variant={p.status}>
                                                            {p.status}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell>
                                                        {p.joined_at.toDate().toISOString().split('T')[0]}
                                                    </TableCell>
                                                    <TableCell>
                                                        <Popover>
                                                            <PopoverTrigger asChild className='cursor-pointer'>
                                                                <EllipsisVertical/>
                                                            </PopoverTrigger>
                                                            <PopoverContent>
                                                                <div className="flex items-center gap-2">
                                                                    <Select id='status'  defaultValue={p.status} onValueChange={(value) => setCurrPassStatus(value)}>
                                                                        <SelectTrigger className='w-full'>
                                                                            <SelectValue placeholder="Select a fruit" />
                                                                        </SelectTrigger>
                                                                        <SelectContent>
                                                                            <SelectGroup>
                                                                                <SelectLabel>Status</SelectLabel>
                                                                                {passStatus.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                                                                            </SelectGroup>
                                                                        </SelectContent>
                                                                    </Select>
                                                                    <Button  disabled={isLoading} onClick={()=> handleChangePassStatus(p.id , p.role)}>{isLoading? 'Saving...' : 'Save'}</Button>
                                                                </div>
                                                            
                                                                    
                                                            </PopoverContent>
                                                        </Popover>
                                                        
                                                    </TableCell>
                                                </TableRow>)}
                                        </TableBody>
                                    </Table>
                                </div>
                            </div>
                            <div>
                                
                                
                            </div>
                        </div>
                    
                    </>}
        </>}
    </DashboardLayout>
}