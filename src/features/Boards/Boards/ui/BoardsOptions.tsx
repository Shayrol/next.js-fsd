"use client";

import { BoardsSearchButton } from "@/shared/ui/button/search-button";
import { DatePickerWithRange } from "@/shared/ui/input/datePicker";
import { BoardsSearch } from "@/shared/ui/input/search";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { DateRange } from "react-day-picker";

export default function BoardsOptions() {
  const params = useSearchParams();
  const searchValue = params?.get("search") ?? "";
  const fromDateValue = params?.get("from");
  const toDateValue = params?.get("to");

  const isValidDate = (d: Date | undefined) =>
    d instanceof Date && !isNaN(d.getTime());
  const fromDate = fromDateValue ? new Date(fromDateValue) : undefined;
  const toDate = toDateValue ? new Date(toDateValue) : undefined;
  const validatedFrom = isValidDate(fromDate) ? fromDate : undefined;
  const validatedTo = isValidDate(toDate) ? toDate : undefined;

  const [search, setSearch] = useState<string>(searchValue);
  const [date, setDate] = useState<DateRange | undefined>({
    from: validatedFrom,
    to: validatedTo,
  });

  console.log("datE: ", date);

  return (
    <article className="flex gap-4 justify-center items-center w-full max-md:flex-col">
      <DatePickerWithRange query={{ date, setDate }} />
      <BoardsSearch query={{ search, setSearch }} />
      <BoardsSearchButton query={{ search, date }} />
    </article>
  );
}
