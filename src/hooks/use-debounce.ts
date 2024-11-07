import { useState, useEffect } from "react";
/**
 * A custom React hook that provides a debounced value and a setter function.
 *
 * @template T The type of the value being debounced
 * @param {T} initialValue The initial value to be debounced
 * @param {number} delay The delay in milliseconds for the debounce effect
 * @returns {[T, React.Dispatch<React.SetStateAction<T>>]} A tuple containing the debounced value and a setter function
 *
 * @example
 * ```jsx
 * import { useState } from 'react';
 * import useDebounce from './useDebounce';
 *
 * function SearchComponent() {
 *   const [searchTerm, setSearchTerm] = useDebounce('', 300);
 *
 *   const handleInputChange = (e) => {
 *     setSearchTerm(e.target.value);
 *   };
 *
 *   // Use searchTerm for API calls or other operations
 *   // It will only update 300ms after the last change
 *
 *   return (
 *     <input
 *       type="text"
 *       value={searchTerm}
 *       onChange={handleInputChange}
 *       placeholder="Search..."
 *     />
 *   );
 * }
 * ```
 */

function useDebounce<T>(
  initialValue: T,
  delay: number,
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState<T>(initialValue);
  const [debouncedValue, setDebouncedValue] = useState<T>(initialValue);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return [debouncedValue, setValue];
}

export default useDebounce;
