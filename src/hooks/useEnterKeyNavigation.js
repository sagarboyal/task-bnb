import { useRef } from "react";

/**
 * Reusable hook to handle Enter key focus shifting.
 * @param {string[]} fieldOrder - Array of ordered element ID strings.
 * @param {function} [submitCallback] - Optional function to fire when pressing enter on the final field.
 */
export const useEnterKeyNavigation = (fieldOrder, submitCallback) => {
  const formRef = useRef(null);

  const handleKeyDown = (e) => {
    if (e.key !== "Enter") return;

    const activeElement = document.activeElement;
    if (!activeElement) return;

    const currentIndex = fieldOrder.indexOf(activeElement.id);

    if (currentIndex !== -1) {
      e.preventDefault();

      if (currentIndex < fieldOrder.length - 1) {
        const nextFieldId = fieldOrder[currentIndex + 1];
        const nextElement = formRef.current?.querySelector(`#${nextFieldId}`);

        if (nextElement) {
          nextElement.focus();
        }
      } else if (submitCallback) {
        submitCallback();
      }
    }
  };

  return { formRef, handleKeyDown };
};
