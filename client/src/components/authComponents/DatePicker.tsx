"use client"


import { format } from "date-fns"
// import { CalendarIcon } from "lucide-react"
import { SlCalender } from "react-icons/sl";
import { cn } from "../../lib/utils"
import { Button } from "../../components/ui/button"
import { Calendar } from "../../components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover"


type UserInput = {
  date: Date | undefined;
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
};

export function DatePickerDemo({date, setDate}:UserInput) {



  return (<div className="flex flex-col">
    <label className="font-bold text-mood-blue mb-2 ">Date of Birth</label>  
    <Popover>     
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start bg-dirt-white hover:bg-mood-blue hover:text-[#FFF8DE] text-left font-normal border-mood-blue border-[1px]",
            !date && "text-muted-foreground"
          )}
        >
              
          <SlCalender />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="end">

        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>

         </div>
  
  )
}
