import { useState } from "react";
import DatePicker from "../ui/date-picker";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function RegisterPassangerRole ({ setRegisterForm, registerForm , errors , currRole}){
    const [date, setDate] = useState(undefined)
    const [ roleData , setRoleData ] = useState({ role: currRole , })

    const AddRoleForm = (e) => {
      const newRoleData = { ...roleData};
      setRoleData(newRoleData);
      setRegisterForm(prev => ({ ...prev, roleform: newRoleData }));
    };

    const handleChange = (e) => {
        AddRoleForm(e)
        setRegisterForm((prev) => ({ ...prev , [e.target.id]: e.target.value }));
    };
    
    const handleDateChange = (selectedDate) => {
        setDate(selectedDate);
        setRegisterForm((prev) => ({
          ...prev,
          birthdate: selectedDate ? selectedDate.toLocaleDateString("en-CA") : "",
        }));
    };
    return <>
        <div className="space-y-2">
            <Label htmlFor="fullname">Passenger name</Label>
            <Input id="fullname" type="text" placeholder="John Doe" onChange={handleChange} value={registerForm.fullname}/>
            {errors.fullname && <p className="text-red-500 text-sm">{errors.fullname}</p>}
        </div>

        <div className="space-y-2">
            <Label htmlFor='birthdate'>Date of birth</Label>
            <DatePicker
                id="birthdate"
                date={registerForm.birthdate ? new Date(registerForm.birthdate) : undefined}
                setDate={handleDateChange}
            />
            {errors.birthdate && <p className="text-red-500 text-sm">{errors.birthdate}</p>}
        </div>
    </>
}