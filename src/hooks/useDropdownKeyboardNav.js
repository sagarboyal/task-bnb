import { useState, useCallback, useEffect } from "react";

/**
 * Reusable hook to handle Up/Down arrow key navigation in custom dropdowns.
 * @param {Array} options - The array of available options
 * @param {boolean} isOpen - Whether the dropdown is currently open
 * @param {function} onSelect - Callback when an option is selected (via Enter)
 * @param {function} onClose - Callback to close the dropdown (via Escape)
 */
export const useDropdownKeyboardNav = (options, isOpen, onSelect, onClose) => {
  const [focusedIndex, setFocusedIndex] = useState(-1);

  // Reset focus when dropdown opens/closes
  useEffect(() => {
    if (!isOpen) {
      setFocusedIndex(-1);
    }
  }, [isOpen]);

  const handleKeyDown = useCallback(
    (e) => {
      if (!isOpen) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setFocusedIndex((prev) => (prev < options.length - 1 ? prev + 1 : 0));
          break;
        case "ArrowUp":
          e.preventDefault();
          setFocusedIndex((prev) => (prev > 0 ? prev - 1 : options.length - 1));
          break;
        case "Enter":
          e.preventDefault();
          if (focusedIndex >= 0 && focusedIndex < options.length) {
            onSelect(options[focusedIndex]);
          }
          break;
        case "Escape":
          e.preventDefault();
          onClose();
          break;
        default:
          break;
      }
    },
    [isOpen, options, focusedIndex, onSelect, onClose]
  );

  return { focusedIndex, setFocusedIndex, handleKeyDown };
};
