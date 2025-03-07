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

  const fromDate = fromDateValue ? new Date(fromDateValue) : undefined;
  const toDate = toDateValue ? new Date(toDateValue) : undefined;

  const [search, setSearch] = useState<string>(searchValue);
  const [date, setDate] = useState<DateRange | undefined>({
    from: fromDate,
    to: toDate,
  });

  console.log("data: ", date);

  return (
    <article className="flex gap-4 w-full min-w-[640px]">
      <DatePickerWithRange query={{ date, setDate }} />
      <BoardsSearch query={{ search, setSearch }} />
      <BoardsSearchButton query={{ search, date }} />
    </article>
  );
}
