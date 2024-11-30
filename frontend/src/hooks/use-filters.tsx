import { useEffect, useState } from "react";
import Filter from "../components/Filter";
import { TFilterField } from "../utils/types";
import { useDebouncedCallback } from "use-debounce";

export function useFilters(fields: TFilterField[], callback: (v: any) => void) {
  const [filters, setFilters] = useState<any>({});
  const [FilterEl, setFilterEl] = useState<React.ReactNode>(() => <></>);

  const handleRenderFields = () => {
    setFilterEl(() => (
      <Filter fields={fields} setFilters={setFilters} onClear={handleClear} />
    ));
  };

  const handleClear = () => {
    setFilters({});
    setFilterEl(() => <></>);
    setTimeout(handleRenderFields, 0);
    callback(filters);
  };

  useEffect(() => {
    handleRenderFields();
  }, []);

  const debouncedCallback = useDebouncedCallback(callback, 800);

  useEffect(() => {
    if (Object.keys(filters).length === 0) return;
    debouncedCallback(filters);
  }, [filters]);

  return {
    FilterEl,
    filters,
  };
}
