import { useEffect } from "react";

/**
 * A custom React hook that detects clicks outside of a specified element.
 *
 * @param {React.RefObject<HTMLElement>} ref The ref of the element to detect clicks outside of
 * @param {() => void} handler The function to call when a click outside is detected
 *
 * @example
 * ```jsx
 * const ref = useRef();
 * useOnClickOutside(ref, () => {
 *   console.log('Clicked outside');
 * });
 * ```
 */
function useOnClickOutside(
  ref: React.RefObject<HTMLElement>,
  handler: () => void,
) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler();
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}

export default useOnClickOutside;
