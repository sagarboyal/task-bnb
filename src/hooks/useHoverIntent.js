import { useState, useRef, useEffect } from "react";

/**
 * Reusable production hook to handle hover-intent dropdowns with a safety timer buffer.
 * @param {number} delay - Safety window buffer time in milliseconds (default: 300ms).
 */
export const useHoverIntent = (delay = 300) => {
  const [isOpen, setIsOpen] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleMouseEnter = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timerRef.current = setTimeout(() => {
      setIsOpen(false);
    }, delay);
  };

  const forceClose = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setIsOpen(false);
  };

  return {
    isOpen,
    setIsOpen,
    forceClose,
    bindContainer: {
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
    },
    bindMenu: {
      onMouseEnter: handleMouseEnter,
    },
  };
};
