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

interface IProps {
  date: DateRange | undefined;
  setDate: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
  className?: React.HTMLAttributes<HTMLDivElement>;
}

function DatePickerWithRange({ query }: { query: IProps }) {
  return (
    <div
      className={cn(
        "w-full grid gap-2 border border-gray-300 rounded-[8px]",
        query.className
      )}
    >
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-full min-w-[280px] h-full max-h-[48px] p-3 gap-2 justify-start text-left font-normal border-none outline-none bg-gray-50",
              !query.date?.from && !query.date?.to && "text-muted-foreground"
            )}
          >
            <Image
              src={"/vote/main-date.svg"}
              alt="date-image"
              width={0}
              height={0}
              sizes="100vw"
              className="w-[17px] h-fit"
            />
            <span className="w-full h-full">
              {query.date?.from ? (
                query.date.to ? (
                  <>
                    {format(query.date.from, "yyyy.MM.dd")} -{" "}
                    {format(query.date.to, "yyyy.MM.dd")}
                  </>
                ) : (
                  format(query.date.from, "yyyy.MM.dd")
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
            defaultMonth={query.date?.from || new Date()}
            selected={query.date}
            onSelect={query.setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default React.memo(DatePickerWithRange);
