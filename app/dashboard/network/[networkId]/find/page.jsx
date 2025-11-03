'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardLayout from "../../../dashboardLayout";
import { useState } from "react";
import { useNetwork } from "@/context/NetworksContext";
import DatePicker from "@/components/ui/date-picker";
import { Button } from "@/components/ui/button";
import { ArrowRight, Car, MapPin, MapPinned, User, Users } from "lucide-react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { useParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function FindRidePage(){
    const [rideData , setRideData] = useState({
            departure : '' ,
            arrival : '' ,
            departure_date : '' ,
            num_seats : 0 
        })
        const [ availableRides , setAvailableRides] = useState([])
        const [date , setDate] = useState(undefined)
        const [validationError , setValidationErrors] = useState({})
        const { isLoading , findRide} = useNetwork()
        const { networkId } = useParams()
        const { user } = useAuth()
    
         const validateForm = () => {
            const newErrors = {}
            if (!rideData.departure.trim()) newErrors.departure = "Ride departure is required"
            if (!rideData.arrival.trim()) newErrors.arrival = "Ride arrival is required"
            if (!rideData.departure_date) newErrors.departure_date = "Ride departure date is required"
            setValidationErrors(newErrors)
            return Object.keys(newErrors).length === 0
        }

        const getRideDuration = (departure_date, departure_time, arrival_date, arrival_time) => {
            if (!departure_date || !departure_time || !arrival_date || !arrival_time) return "—";

            const start = new Date(`${departure_date}T${departure_time}`);
            const end = new Date(`${arrival_date}T${arrival_time}`);

            const diffMs = end - start;
            if (diffMs <= 0) return "Invalid";

            const hours = Math.floor(diffMs / (1000 * 60 * 60));
            const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

            return `${hours}h${minutes > 0 ? `${minutes}min` : ""}`;
        };

    
        
        const handleChange = (e)=>{
            setRideData(prev => ({...prev , [e.target.id] : e.target.value.toLowerCase()}))
        }

        const handleFindRide = async ()=>{
            if(validateForm()){
                const rides = await findRide(rideData , networkId)
                setAvailableRides(rides)
            }
        }
        
    
        const handleDateChange = (selectedDate) => {
            setDate(selectedDate);
            setRideData((prev) => ({
              ...prev,
              departure_date: selectedDate ? selectedDate.toLocaleDateString("en-CA") : "",
            }));
        };
    return <DashboardLayout>
       {user?.role === 'passanger' ? <>
         <Card>
            <CardHeader className='!pb-3 border-b border-border'>
                <CardTitle>
                    Find Ride
                </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
                <div className="space-y-2 flex items-center gap-2 w-full">
                    <div className="w-full mb-0 space-y-2">
                        <InputGroup>
                            <InputGroupAddon>
                                <MapPin/>
                            </InputGroupAddon>
                            <InputGroupInput id="departure" type="text" placeholder='Departure location' onChange={handleChange} value={rideData.departure}/>
                        </InputGroup>
                        
                        {validationError.departure && <p className="text-red-500 text-sm">{validationError.departure}</p>}
                    </div>
                    <div className="w-full mb-0 space-y-2">
                        <InputGroup>
                            <InputGroupAddon>
                                <MapPinned/>
                            </InputGroupAddon>
                            <InputGroupInput id="arrival" type="text" placeholder="Arrival location" onChange={handleChange} value={rideData.arrival}/>
                        </InputGroup>
                        
                        {validationError.arrival && <p className="text-red-500 text-sm">{validationError.arrival}</p>}
                    </div>

                    <div className="w-full mb-0 space-y-2">
                            <DatePicker
                                id="departure_date"
                                date={rideData.departure_date ? new Date(rideData.departure_date) : undefined}
                                setDate={handleDateChange}
                                />
                        
                        {validationError.departure_date && <p className="text-red-500 text-sm">{validationError.departure_date}</p>}
                    </div>

                    <Button onClick={handleFindRide} disabled={isLoading}>{isLoading? 'Finding...' : 'Find Ride'}<Car/></Button>
            </div>
            </CardContent>
        </Card>

        <div className="grid grid-cols-[3fr_7fr] gap-5">
            <div>

            </div>
            <div>
                {availableRides.length >= 1  ? <>
                    
                    <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center gap-2">
                            <span className="font-semibold">{rideData.departure_date}</span>
                            {rideData.departure} <ArrowRight/> {rideData.arrival}
                        </div>
                        {availableRides.length} available ride{availableRides.length > 1 && 's'}
                    </div>

                    <div className="space-y-2">
                        {availableRides.map(ride => 
                        <Card key={ride.id}>
                            <CardHeader className='flex justify-between items-center border-b border-border'>
                                <div className='flex gap-5 items-center'>
                                    <div className="text-sm">
                                        <span className="block font-semibold">{ride.departure_time}</span>
                                        <span>{ride.departure}</span>
                                    </div>
                                    <span className="h-2 block rounded-full w-60 max-w-full bg-black flex justify-center items-center">
                                        <div className="bg-background p-3 text-sm">
                                            {getRideDuration(ride.departure_date, ride.departure_time, ride.arrival_date, ride.arrival_time)}
                                        </div>
                                    </span>
                                    <div className="text-sm">
                                        <span className="block font-semibold">{ride.arrival_time}</span>
                                        <span>{ride.arrival}</span>
                                    </div>
                                </div>
                                <div>
                                    <span className="text-sm text-gray-700">From</span><br/>
                                    <span><span className="font-semibold text-2xl">{ride.price}</span>MAD</span>
                                </div>
                            </CardHeader>
                            <CardContent className='flex justify-between items-center w-full '>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2">
                                        <Car/>
                                        <h4 className="font-semibold">
                                            {ride.driver.fullname}
                                        </h4>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Users/>
                                        <h4 className="font-semibold">
                                            {ride.total_seats - ride.available_seats} / {ride.total_seats}
                                        </h4>
                                    </div>
                                </div>
                                <Button href={`/dashboard/network/${networkId}/rides/${ride.id}`}>Book Now</Button>
                            </CardContent>
                        </Card>)} 
                    </div>
                    
                </>: <p>No data</p>}
                
            </div>
        </div>
       </> : <p>You don't have access to this page</p>}
    </DashboardLayout>
}   