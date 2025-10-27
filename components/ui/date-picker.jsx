import {  Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from '@/components/ui/calendar'
import { ChevronDownIcon } from "lucide-react"
import { Button } from "./button"

export default function DatePicker({id , date , setDate}){
    return <Popover>
    <PopoverTrigger asChild>
      <Button id={id} variant='outline' className='w-full justify-between font-normal'>
        {date ? date.toLocaleDateString() : "Select date"} 
        <ChevronDownIcon />
        </Button>
    </PopoverTrigger>
    <PopoverContent className="w-auto overflow-hidden p-0" align="start">
    <Calendar 
      mode="single"
      selected={date}
      captionLayout="dropdown"
      onSelect={(date) => {
        setDate(date)
      }}
    />
    </PopoverContent>
  </Popover>
}