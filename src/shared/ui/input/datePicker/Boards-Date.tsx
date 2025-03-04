"use client";

import * as React from "react";
import { format } from "date-fns";
import type { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";

export default function DatePickerWithRange({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });

  console.log("date: ", date);

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[289px] h-[48px] p-3 gap-2 justify-start text-left font-normal border-none outline-none bg-gray-50",
              !date?.from && !date?.to && "text-muted-foreground"
            )}
          >
            <Image
              src={"/vote/main-date.svg"}
              alt="date-image"
              width={17}
              height={0}
            />
            <span className="w-full h-full">
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "yyyy.MM.dd")} -{" "}
                    {format(date.to, "yyyy.MM.dd")}
                  </>
                ) : (
                  format(date.from, "yyyy.MM.dd")
                )
              ) : (
                <span className="font-normal text-gray-600">
                  YYYY.MM.DD - YYYY.MM.DD
                </span>
              )}
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from || new Date()}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
