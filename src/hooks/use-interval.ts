import { useEffect, useRef } from "react";

/**
 * A custom React hook that sets up an interval.
 *
 * @param {() => void} callback The callback function to be called at each interval
 * @param {number | null} delay The interval delay in milliseconds. Pass null to stop the interval.
 *
 * @example
 * ```jsx
 * useInterval(() => {
 *   console.log('This will run every second');
 * }, 1000);
 * ```
 */
function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef<() => void>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay === null) {
      return;
    }

    const tick = () => {
      if (savedCallback.current) {
        savedCallback.current();
      }
    };

    const id = setInterval(tick, delay);
    return () => clearInterval(id);
  }, [delay]);
}

export default useInterval;
