import React, { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useHoverIntent } from "../../../hooks/useHoverIntent";

export const NestedDivisionDropdown = ({
  division,
  items = [],
  onSubmenuItemClick,
  parentForceClose,
  isSubMenu = false,
}) => {
  const { isOpen, bindContainer } = useHoverIntent(200);
  const triggerRef = useRef(null);
  const [coords, setCoords] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setCoords({
        top: rect.top - 4,
        left: rect.right + 2,
      });
    }
  }, [isOpen]);

  return (
    <div {...bindContainer} className="relative w-full" ref={triggerRef}>
      <div
        className={`flex items-center justify-between w-full px-3 py-1.5 cursor-pointer transition-colors duration-100 select-none rounded-md ${
          isSubMenu
            ? "text-[13px] text-slate-700 hover:bg-slate-100/80 hover:text-slate-900 font-medium"
            : "text-[13px] font-semibold text-slate-800 hover:bg-slate-100/80 hover:text-slate-900"
        } ${isOpen ? "bg-slate-100/80 text-slate-900" : ""}`}
      >
        <span className="truncate flex-1 text-left min-w-0 pr-2">{division}</span>
        {items.length > 0 && (
          <span className={`text-[9px] transition-transform duration-200 ease-out shrink-0 ${isOpen ? "translate-x-0.5 text-slate-500" : "opacity-40 text-slate-500"}`}>
            ▶
          </span>
        )}
      </div>

      {isOpen && items.length > 0 && createPortal(
        <div
          style={{
            position: 'fixed',
            top: coords.top,
            left: coords.left,
            zIndex: 99999,
          }}
          className="bg-white/95 backdrop-blur-xl rounded-xl border border-slate-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.08)] p-1.5 w-56 animate-dropdown-submenu ring-1 ring-slate-900/5"
        >
          <div className="flex flex-col gap-0.5 max-h-[70vh] overflow-y-auto overflow-x-hidden custom-scrollbar pr-1">
            {items.map((item) => {
              const hasChildren = item.children && item.children.length > 0;

              if (hasChildren) {
                return (
                  <NestedDivisionDropdown
                    key={item.id}
                    division={item.label}
                    items={item.children}
                    onSubmenuItemClick={onSubmenuItemClick}
                    parentForceClose={parentForceClose}
                    isSubMenu={true}
                  />
                );
              }

              return (
                <button
                  key={item.id}
                  type="button"
                  disabled={item.active === false}
                  onClick={() => {
                    onSubmenuItemClick?.(item);
                    parentForceClose?.();
                  }}
                  className={`w-full px-3 py-1.5 text-left text-[13px] font-medium rounded-md transition-all duration-100 flex items-center min-w-0 ${
                    item.active !== false
                      ? "text-slate-700 hover:bg-slate-100/80 hover:text-slate-900 active:scale-[0.98] active:bg-slate-200/60"
                      : "text-slate-400 cursor-not-allowed"
                  }`}
                >
                  <span className="truncate block w-full">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};
