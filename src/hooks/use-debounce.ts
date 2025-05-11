import { useEffect, useState } from "react";

interface UseDebounceProps<T> {
  values: {
    value: T;
    delay?: number;
  };
}

export function useDebounce<T>({
  values: { value, delay = 500 },
}: UseDebounceProps<T>): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
