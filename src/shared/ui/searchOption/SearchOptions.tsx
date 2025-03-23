"use client";

import { DatePickerWithRange } from "@/shared/ui/input/datePicker";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import SearchButton from "../button/search-button/Search-Button";
import SearchInput from "../input/search/Search-Input";

export default function SearchOptions() {
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
    <article className="flex gap-4 justify-center items-center w-full max-md:flex-col mr-14 max-lg:mr-0">
      <DatePickerWithRange query={{ date, setDate }} />
      <SearchInput query={{ search, setSearch }} />
      <SearchButton query={{ search, date }} />
    </article>
  );
}
