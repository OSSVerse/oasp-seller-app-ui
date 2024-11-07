import { useRef, useEffect } from "react";

/**
 * A custom React hook that returns the previous value of a given state or prop.
 *
 * @template T The type of the value being tracked
 * @param {T} value The current value to compare against
 * @returns {T | undefined} The previous value, or undefined on the first render
 *
 * @example
 * ```jsx
 * import { useState } from 'react';
 * import usePrevious from './usePrevious';
 *
 * function Counter() {
 *   const [count, setCount] = useState(0);
 *   const prevCount = usePrevious(count);
 *
 *   return (
 *     <div>
 *       <p>Current count: {count}</p>
 *       <p>Previous count: {prevCount}</p>
 *       <button onClick={() => setCount(count + 1)}>Increment</button>
 *     </div>
 *   );
 * }
 * ```
 */

function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

export default usePrevious;
