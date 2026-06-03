import React, { useState, useRef, useEffect } from "react";
import { useDropdownKeyboardNav } from "../../hooks/useDropdownKeyboardNav";

export const SelectableDropdown = ({
  id,
  label,
  options = [],
  value,
  onChange,
  placeholder = "Select an option",
  error,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Find currently selected option object
  const selectedOption = options.find((opt) => opt.value === value);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    onChange(id, option.value);
    setIsOpen(false);
  };

  const { focusedIndex, setFocusedIndex, handleKeyDown } = useDropdownKeyboardNav(
    options,
    isOpen,
    handleSelect,
    () => setIsOpen(false)
  );

  return (
    <div className="space-y-1.5 relative select-none" ref={containerRef}>
      {label && (
        <label htmlFor={id} className="block text-xs font-bold text-slate-700 tracking-wide">
          {label}
        </label>
      )}

      <div
        id={id}
        tabIndex={0}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={(e) => {
          if (!isOpen) {
            if (e.key === "ArrowDown" || e.key === " ") {
              e.preventDefault();
              setIsOpen(true);
            }
          } else {
            if (e.key === "Enter") {
              e.stopPropagation();
            }
            handleKeyDown(e);
          }
        }}
        className={`flex w-full items-center justify-between rounded-md border bg-white px-3 py-2 text-sm text-slate-900 outline-none transition-all cursor-pointer ${
          error
            ? "border-red-500 ring-1 ring-red-500"
            : isOpen
            ? "border-brand-500 ring-2 ring-brand-500/20"
            : "border-slate-300 hover:border-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
        }`}
      >
        <span className={selectedOption ? "text-slate-900" : "text-slate-400"}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <span className={`text-[10px] text-slate-500 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}>
          ▼
        </span>
      </div>
      
      {error && <p className="text-[10px] font-semibold tracking-wide text-red-500">{error}</p>}

      {isOpen && (
        <div className="absolute z-50 mt-1 w-full rounded-md border border-slate-200 bg-white py-1 shadow-lg animate-in fade-in slide-in-from-top-1 duration-150 max-h-60 overflow-y-auto custom-scrollbar">
          {options.length === 0 ? (
            <div className="px-3 py-2 text-sm text-slate-500 text-center">No options available</div>
          ) : (
            options.map((opt, index) => (
              <div
                key={opt.value}
                onMouseEnter={() => setFocusedIndex(index)}
                onClick={() => handleSelect(opt)}
                className={`cursor-pointer px-3 py-2 text-sm transition-colors ${
                  focusedIndex === index
                    ? "bg-brand-50 text-brand-700"
                    : selectedOption?.value === opt.value
                    ? "bg-slate-50 text-slate-900 font-medium"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                {opt.label}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
