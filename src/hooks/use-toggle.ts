import { useState, useCallback } from "react";

/**
 * A custom React hook that provides a boolean state with a toggle function.
 *
 * @param {boolean} initialValue The initial value of the boolean state
 * @returns {[boolean, () => void]} A tuple containing the boolean state and a toggle function
 *
 * @example
 * ```jsx
 * const [isToggled, toggle] = useToggle(false);
 * ```
 */
function useToggle(initialValue: boolean): [boolean, () => void] {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => {
    setValue((prevValue) => !prevValue);
  }, []);

  return [value, toggle];
}

export default useToggle;
