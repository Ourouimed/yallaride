'use client'
import { useAuth } from "@/context/AuthContext";
import DashboardLayout from "../dashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import DatePicker from "@/components/ui/date-picker";
import { Textarea } from "@/components/ui/textarea";

export default function ProfilePage (){
    const { user } = useAuth()
    const [date, setDate] = useState(undefined)
    const [profile , setProfile ] = useState({
        fullname : '' , email : '' , birthdate : '' , bio : ''
    })

    useEffect(() => {
        if (user) {
          setProfile({...profile , fullname: user.fullname , email : user.email});
        }
    }, [user]);

    
    const handleChange = e =>{
        setProfile(prev => ({...prev , [e.target.id] : e.target.value}))
    }

    const handleDateChange = (selectedDate) => {
        setDate(selectedDate);
        setProfile((prev) => ({
          ...prev,
          birthdate: selectedDate ? selectedDate.toLocaleDateString("en-CA") : "",
        }));
    };
    return <>
    <DashboardLayout>
       <h3 className="text-xl font-semibold  py-2">My Profile</h3>
       <Card>
        <CardHeader className='!pb-3 border-b border-border'>
            <CardTitle>
                Personal information
            </CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
            <div className="space-y-2 flex items-center gap-2 w-full">
                <div className="w-full mb-0">
                    <Label htmlFor="fullname">Full name</Label>
                    <Input id="fullname" type="text" placeholder={user?.fullname} onChange={handleChange} value={profile.fullname}/>
                </div>
                <div className="w-full">
                    <Label htmlFor="email">Email address</Label>
                    <Input id="email" type="text" placeholder="you@example.com" onChange={handleChange} value={profile.email}/>
                </div>
            </div>
            
            <div className="space-y-2">
                <Label htmlFor='birthdate'>Date of birth</Label>
                <DatePicker
                    id="birthdate"
                    date={profile.birthdate ? new Date(profile.birthdate) : undefined}
                    setDate={handleDateChange}
                    />
            </div>
            <div className="space-y-2">
                <Label htmlFor='bio'>Bio</Label>
                <Textarea value={profile.bio} id='bio' onChange={handleChange} placeholder='Describe you there' className='resize-none h-45'></Textarea>
            </div>
        </CardContent>
        
       </Card>

       {user?.role === 'driver'}
    </DashboardLayout>
  </> 
}