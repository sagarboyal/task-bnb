import React from "react";

export const InputField = React.forwardRef(
  (
    {
      id,
      type = "text",
      label,
      value,
      onChange,
      placeholder,
      disabled,
      error,
      rightAction,
      ...props
    },
    ref,
  ) => {
    return (
      <div className="space-y-1.5 w-full">
        {label && (
          <label
            htmlFor={id}
            className="text-xs font-semibold tracking-wide text-slate-600 uppercase block select-none"
          >
            {label}
          </label>
        )}

        <div className="relative flex items-center w-full">
          <input
            id={id}
            ref={ref}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            className={`w-full rounded-md border bg-white py-2.5 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-300 focus:ring-1 ${
              rightAction ? "pl-4 pr-16" : "px-4"
            } ${
              error
                ? "border-red-500 focus:border-red-500 focus:ring-red-500/50"
                : "border-slate-200/80 focus:border-blue-500 focus:ring-blue-500"
            } ${disabled ? "bg-slate-50 text-slate-400 cursor-not-allowed" : ""}`}
            {...props}
          />

          {rightAction && (
            <div className="absolute right-4 flex items-center justify-center">
              {rightAction}
            </div>
          )}
        </div>

        {error && (
          <p className="text-[11px] font-medium text-red-500 mt-1 animate-in fade-in slide-in-from-top-1 duration-150">
            {error}
          </p>
        )}
      </div>
    );
  },
);

InputField.displayName = "InputField";
