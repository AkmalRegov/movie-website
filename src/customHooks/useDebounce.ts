import { useState, useEffect } from "react";
export const useDebounce = (value: string, delay: number): string => {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    //set debounce vale after certain passed delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
      console.log(`debounce value is: ${value}`);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value]);

  return debouncedValue;
};
