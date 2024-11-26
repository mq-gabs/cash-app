import { useEffect, useState } from "react";
import Filter from "../components/Filter";
import { TFilterField } from "../utils/types";
import { useDebouncedCallback } from "use-debounce";

export function useFilters(fields: TFilterField[], callback: () => void) {
  const [filters, setFilters] = useState<any>({});
  const [FilterEl, setFilterEl] = useState<React.ReactNode>(() => <></>)

  console.log({ filters });

  useEffect(() => {
    setFilterEl(() => 
      <Filter
        fields={fields}
        setFilters={setFilters}
      />
    )
  }, []);

  const debouncedCallback = useDebouncedCallback(callback, 800);

  useEffect(() => {
    if (Object.keys(filters).length === 0) return;
    debouncedCallback();
  }, [filters])

  return {
    FilterEl,
    filters,
  };
}
