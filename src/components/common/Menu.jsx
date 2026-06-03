import React, { useState, useEffect } from "react";
import { NestedDivisionDropdown } from "./ui/NestedDivisionDropdown";
import { useHoverIntent } from "../../hooks/useHoverIntent";
import { mockFlatMenuData } from "../../constants/menu/menuItems";

const buildMenuTree = (flatItems) => {
  if (!flatItems || flatItems.length === 0) return [];

  const itemMap = {};
  const rootItems = [];

  // Create a registry of active items
  flatItems.forEach((item) => {
    if (item && item.active) {
      itemMap[item.id] = { ...item, children: [] };
    }
  });

  // Build the tree structure
  flatItems.forEach((item) => {
    if (!item || !item.active) return;

    const mappedItem = itemMap[item.id];

    if (item.parent === item.id) {
      console.warn(`Circular loop error blocked for item ID: ${item.id}`);
      return;
    }

    if (!item.parent || !itemMap[item.parent]) {
      rootItems.push(mappedItem);
    } else {
      itemMap[item.parent].children.push(mappedItem);
    }
  });

  // Remove empty children arrays
  const pruneEmptyBranches = (nodes) => {
    return nodes.map((node) => {
      const processedNode = { ...node };

      if (processedNode.children && processedNode.children.length > 0) {
        processedNode.children = pruneEmptyBranches(processedNode.children);
      } else {
        delete processedNode.children;
      }
      return processedNode;
    });
  };

  return pruneEmptyBranches(rootItems);
};

// Separate component for independent hover state management
const MenuTab = ({ mainRoot, onSubmenuItemClick }) => {
  const { isOpen, forceClose, bindContainer } = useHoverIntent(300);
  const subDivisions = mainRoot.children || [];

  return (
    <div
      {...bindContainer}
      className="relative h-full flex items-center justify-center"
    >
      <button
        type="button"
        onClick={() => {
          if (mainRoot.path) {
            onSubmenuItemClick?.(mainRoot);
          }
        }}
        className={`h-full px-4 text-[13px] font-semibold tracking-wide border-b-[2px] outline-none cursor-pointer transition-all duration-150 flex items-center whitespace-nowrap ${
          isOpen
            ? "border-brand-600 text-brand-700 bg-brand-50/40"
            : "border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50/40"
        }`}
      >
        {mainRoot.label}
      </button>

      {isOpen && subDivisions.length > 0 && (
        <div className="absolute left-0 top-full w-60 bg-white/95 backdrop-blur-xl rounded-b-xl rounded-tr-xl border border-slate-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.08)] p-1.5 z-50 animate-dropdown-primary ring-1 ring-slate-900/5 mt-0.5">
          <div className="flex flex-col gap-0.5 max-h-[75vh] overflow-y-auto overflow-x-hidden custom-scrollbar pr-1">
            {subDivisions.map((division) => (
              <NestedDivisionDropdown
                key={division.id}
                division={division.label}
                items={division.children || []}
                onSubmenuItemClick={onSubmenuItemClick}
                parentForceClose={forceClose}
                isSubMenu={false}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const Menu = ({ onSubmenuItemClick }) => {
  const [menuMatrix, setMenuMatrix] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const structuralTree = buildMenuTree(mockFlatMenuData);
      
      const homeNode = {
        id: "STATIC_HOME",
        label: "Home",
        path: "/",
        children: []
      };

      setMenuMatrix([homeNode, ...structuralTree]);
    } catch (err) {
      console.error(
        "Critical failure building navigation tree layout matrix:",
        err,
      );
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="h-10 bg-white flex items-center px-4 text-xs font-semibold text-slate-400 border-b border-slate-200">
        Loading Configuration Matrix...
      </div>
    );
  }

  return (
    <div className="w-full border-b border-slate-200 bg-white/90 backdrop-blur-xl sticky top-14 z-40 shadow-sm select-none transition-all">
      <div className="mx-auto max-w-7xl px-4 flex items-center h-10 gap-1">
        {menuMatrix.map((mainRoot) => (
          <MenuTab
            key={mainRoot.id}
            mainRoot={mainRoot}
            onSubmenuItemClick={onSubmenuItemClick}
          />
        ))}
      </div>
    </div>
  );
};

export default Menu;
