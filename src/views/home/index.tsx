import { Search } from "@/components/ui/search";
import { BirdsList } from "./components/birds-list";
import { useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";

export function Home() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce({
    values: { value: search, delay: 300 },
  });

  return (
    <div className="w-full">
      <div className="px-6 py-4">
        <h1 className="text-[32px] leading-[40px] font-bold text-[#0D171C]">
          Birds
        </h1>
      </div>
      <hr className="border-[#D5DADF]" />
      <div className="px-6 py-3">
        <Search
          values={{ placeholder: "Search for birds" }}
          options={{ onChange: setSearch }}
        />
      </div>
      <hr className="border-[#D5DADF]" />
      <div className="px-6 py-6">
        <BirdsList filter={debouncedSearch} />
      </div>
    </div>
  );
}
