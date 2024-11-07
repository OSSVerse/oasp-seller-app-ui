import { useState, useRef, useEffect } from "react";

/**
 * A custom React hook that tracks hover state of an element.
 *
 * @returns {[React.RefObject<HTMLElement>, boolean]} A tuple containing the ref of the element and the hover state
 *
 * @example
 * ```jsx
 * const [hoverRef, isHovered] = useHover();
 * ```
 */
function useHover(): [React.RefObject<HTMLElement>, boolean] {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleMouseOver = () => setIsHovered(true);
    const handleMouseOut = () => setIsHovered(false);

    const node = ref.current;
    if (node) {
      node.addEventListener("mouseover", handleMouseOver);
      node.addEventListener("mouseout", handleMouseOut);

      return () => {
        node.removeEventListener("mouseover", handleMouseOver);
        node.removeEventListener("mouseout", handleMouseOut);
      };
    }
  }, []);

  return [ref, isHovered];
}

export default useHover;
