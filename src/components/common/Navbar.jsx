import React from "react";
import {
  SettingsIcon,
  UserIcon,
  CalendarIcon,
  MapPinIcon,
  RefreshIcon,
  LogoutIcon,
} from "../icons";
import { IMAGES } from "../../assets";
import { useHoverIntent } from "../../hooks/useHoverIntent";
import Menu from "./Menu";
import { useSession } from "../../contexts/SessionContext";

/**
 * Responsive Navigation Header Bar
 */
const Navbar = ({
  userName = "ADMIN",
  onChangeBranch = () => console.log("Navigate to Change Branch view"),
  onLogout = () => console.log("Clear session token and redirect to login"),
}) => {
  const { sessionData } = useSession();
  const { isOpen, setIsOpen, bindContainer, bindMenu } = useHoverIntent(300);

  const companyName = sessionData?.companyLabel || "TRANSPORT SOFTWARE";
  const financialYear = sessionData?.financialYearLabel || "";
  const branchLocation = sessionData?.branchLabel || "";

  return (
    <nav className="w-full bg-white/95 backdrop-blur-xl border-b border-slate-200 text-slate-800 select-none h-14 sticky top-0 z-50 shadow-sm transition-all">
      <div className="mx-auto h-full px-4 sm:px-6 flex items-center justify-between w-full gap-4">
        {/* Left Section: Company Branding Identification */}
        <div className="flex items-center gap-3 shrink-0 max-w-[30%] sm:max-w-[25%] md:max-w-none">
          <img
            src={IMAGES.BRAND_LOGO}
            alt="BNB Software Logo"
            className="h-6 sm:h-7 w-auto object-contain pointer-events-none filter drop-shadow-sm transition-transform duration-300 hover:scale-105"
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        </div>

        {/* Center Section: Centered Company Title */}
        <div className="flex-1 flex items-center justify-center text-center overflow-hidden max-w-xs sm:max-w-md lg:max-w-lg xl:max-w-xl">
          <h1 className="text-xs sm:text-sm md:text-base font-extrabold tracking-widest text-slate-800 uppercase truncate font-sans">
            {companyName}
          </h1>
        </div>

        {/* Right Section: System Context & User Diagnostics Info */}
        <div className="flex items-center justify-end gap-2 sm:gap-3 shrink-0">
          <div className="hidden lg:flex items-center gap-2">
            {/* Financial Year Badge */}
            <div className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 py-1 pl-2 pr-2.5 text-[11px] font-medium tracking-wide text-slate-500 transition-colors hover:bg-slate-100">
              <div className="flex h-5 w-5 items-center justify-center rounded bg-white shadow-sm text-blue-600">
                <CalendarIcon className="h-3.5 w-3.5" strokeWidth={2.2} />
              </div>
              <span className="flex items-center gap-1 font-semibold text-slate-600">
                FY
                <span className="font-bold tabular-nums text-slate-900">
                  {financialYear}
                </span>
              </span>
            </div>

            <div className="h-5 w-[1px] bg-slate-200 mx-1"></div>

            {/* Regional Hub Branch Location Badge */}
            <div className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 py-1 pl-2 pr-2.5 text-[11px] font-medium tracking-wide text-slate-500 transition-colors hover:bg-slate-100">
              <div className="flex h-5 w-5 items-center justify-center rounded bg-white shadow-sm text-emerald-600">
                <MapPinIcon className="h-3.5 w-3.5" strokeWidth={2.2} />
              </div>
              <span className="font-bold uppercase tracking-wider text-slate-900">
                {branchLocation}
              </span>
            </div>
          </div>

          {/* Authenticated User Profile */}
          <div className="hidden sm:flex group items-center gap-2.5 bg-white border border-slate-200 shadow-sm pl-2 pr-3.5 py-1 rounded-lg h-9 transition-all hover:border-slate-300 hover:shadow-md cursor-pointer">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-gradient-to-br from-blue-600 to-blue-800 text-white shadow-sm transition-transform group-hover:scale-105">
              <UserIcon className="h-3.5 w-3.5" strokeWidth={2.2} />
            </div>
            <div className="flex flex-col text-left justify-center">
              <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400 leading-none">
                Operator
              </span>
              <span className="text-[11px] font-bold text-slate-800 uppercase tracking-wide mt-0.5 max-w-[70px] xl:max-w-[100px] truncate leading-none">
                {userName}
              </span>
            </div>
          </div>

          {/* Settings Dropdown */}
          <div {...bindContainer} className="relative flex items-center h-9">
            <button
              type="button"
              className={`h-9 w-9 flex items-center justify-center transition-all border outline-none rounded-lg ${
                isOpen
                  ? "bg-slate-800 text-white border-slate-800 shadow-md"
                  : "bg-white border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50 shadow-sm"
              }`}
            >
              <SettingsIcon
                className={`h-4 w-4 transition-transform duration-500 ease-out ${isOpen ? "rotate-90" : ""}`}
                strokeWidth={2}
              />
            </button>

            {/* Dropdown Panel Menu */}
            {isOpen && (
              <div
                {...bindMenu}
                className="absolute right-0 top-12 w-56 rounded-xl border border-slate-200 bg-white/95 p-1.5 shadow-2xl backdrop-blur-xl pointer-events-auto ring-1 ring-black/5 transition-all duration-200 animate-in fade-in slide-in-from-top-2"
                role="menu"
              >
                {/* Mobile Diagnostic Meta Readout */}
                <div className="block lg:hidden px-2.5 py-2 bg-slate-50 rounded-lg mb-1 border border-slate-100">
                  <div className="text-[9px] font-bold tracking-wider text-slate-400 uppercase mb-1">
                    Active Scope
                  </div>
                  <div className="flex flex-col gap-1 text-[11px] font-medium text-slate-700">
                    <span className="flex items-center gap-1.5">
                      <CalendarIcon className="h-3 w-3 text-blue-500" /> FY:{" "}
                      {financialYear}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPinIcon className="h-3 w-3 text-slate-500" /> Loc:{" "}
                      {branchLocation}
                    </span>
                    <span className="flex sm:hidden items-center gap-1.5">
                      <UserIcon className="h-3 w-3 text-emerald-600" /> User:{" "}
                      {userName}
                    </span>
                  </div>
                </div>

                <div className="px-2.5 pb-1 pt-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 select-none">
                  System Control
                </div>

                <button
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    onChangeBranch();
                    setIsOpen(false);
                  }}
                  className="group flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-xs font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 outline-none"
                >
                  <RefreshIcon
                    className="h-3.5 w-3.5 text-slate-400 transition-transform duration-300 ease-out group-hover:rotate-180 group-hover:text-blue-600"
                    strokeWidth={2.2}
                  />
                  <span>Change Branch Location</span>
                </button>

                <div className="my-1 h-[1px] bg-slate-100 mx-2"></div>

                <button
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    onLogout();
                    setIsOpen(false);
                  }}
                  className="group flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-xs font-medium text-red-600 transition-colors hover:bg-red-50 hover:text-red-700 outline-none"
                >
                  <LogoutIcon
                    className="h-3.5 w-3.5 text-red-400 transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:text-red-600"
                    strokeWidth={2.2}
                  />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
