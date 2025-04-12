"use client";

import SearchButton from "@/shared/ui/button/search-button/Search-Button";
import SearchInput from "@/shared/ui/input/search/Search-Input";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function ActivitySearch() {
  const searchParams = useSearchParams();
  const searchValue = searchParams?.get("search") ?? "";

  const [search, setSearch] = useState<string>(searchValue);

  return (
    <section className="flex justify-end items-center gap-4 w-full">
      <div className="flex items-center gap-4 w-[820px] max-md:flex-col">
        <SearchInput query={{ search, setSearch }} />
        <SearchButton query={{ search }} />
      </div>
    </section>
  );
}
