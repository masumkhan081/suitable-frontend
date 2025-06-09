import React from 'react'
import { Popover, PopoverContent } from '../ui/popover'
import { PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { cn } from '@/0.lib/utils'
import { CalendarIcon } from 'lucide-react'

export default function CustomDatePicker({
  label,
  value,
  onChange
}: {
  label: string
  value: Date
  onChange: (date: Date | undefined) => void
}) {
  return (
    <div className="flex flex-col gap-2  ">
      <label>{label}</label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={'outline'}
            className={cn(
              'w-full bg-gray-200 !rounded-md pl-3 py-4 text-left font-normal',
              'text-muted-foreground'
            )}
          >
            <span>{value?.toDateString() || 'Select Date'}</span>
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0  " align="start">
          {/* <Calendar
            mode="single"
            selected={value}
            onSelect={(date) => onChange(date)}
            disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
            initialFocus
          /> */}
        </PopoverContent>
      </Popover>
    </div>
  )
}
