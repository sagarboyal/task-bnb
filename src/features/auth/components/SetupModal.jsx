import React, { useState } from "react";
import { SelectableDropdown } from "../../../components/ui";
import { useEnterKeyNavigation } from "../../../hooks/useEnterKeyNavigation";

export const dbCompanies = [
  { label: "BAJAJ PARIVAHAN PRIVATE LTD.", value: "BAJAJ_PARIVAHAN" },
  { label: "XYZ LOGISTICS INDIA", value: "XYZ_LOGISTICS" },
  { label: "RELIANCE FREIGHT CARRIERS", value: "RELIANCE_FREIGHT" },
];

export const dbFinancialYears = [
  { label: "2025-2026", value: "25-26" },
  { label: "2026-2027", value: "26-27" },
  { label: "2027-2028", value: "27-28" },
];

export const dbBranches = [
  { label: "AMRITSAR", value: "AMR" },
  { label: "NEW DELHI", value: "DEL" },
  { label: "MUMBAI CENTRAL", value: "BOM" },
  { label: "KOLKATA HUB", value: "CCU" },
];

const SetupModal = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    companyName: "",
    financialYear: "",
    branchLocation: "",
  });
  const [errors, setErrors] = useState({});

  const handleDropdownChange = (id, value) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
    if (errors[id]) {
      setErrors((prev) => ({ ...prev, [id]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.companyName)
      newErrors.companyName = "Please select a Company";
    if (!formData.financialYear)
      newErrors.financialYear = "Please select a Financial Year";
    if (!formData.branchLocation)
      newErrors.branchLocation = "Please select a Branch Location";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = () => {
    if (validate()) {
      const payload = {
        ...formData,
        companyLabel: dbCompanies.find((c) => c.value === formData.companyName)
          ?.label,
        financialYearLabel: dbFinancialYears.find(
          (f) => f.value === formData.financialYear,
        )?.label,
        branchLabel: dbBranches.find((b) => b.value === formData.branchLocation)
          ?.label,
      };
      onSubmit(payload);
    }
  };

  const { formRef, handleKeyDown } = useEnterKeyNavigation(
    ["companyName", "financialYear", "branchLocation", "setup-submit"],
    handleFormSubmit,
  );

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl animate-in zoom-in-95 duration-200 overflow-visible border border-slate-200">
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
          <h3 className="text-lg font-bold text-slate-800 tracking-tight">
            Session Configuration
          </h3>
          <p className="text-xs text-slate-500 font-medium">
            Please confirm your operating parameters.
          </p>
        </div>

        <form
          ref={formRef}
          onKeyDown={handleKeyDown}
          onSubmit={(e) => {
            e.preventDefault();
            handleFormSubmit();
          }}
          className="p-6 space-y-5"
        >
          <SelectableDropdown
            id="companyName"
            label="Company Name"
            options={dbCompanies}
            value={formData.companyName}
            onChange={handleDropdownChange}
            error={errors.companyName}
          />

          <SelectableDropdown
            id="financialYear"
            label="Financial Year"
            options={dbFinancialYears}
            value={formData.financialYear}
            onChange={handleDropdownChange}
            error={errors.financialYear}
          />

          <SelectableDropdown
            id="branchLocation"
            label="Branch Location"
            options={dbBranches}
            value={formData.branchLocation}
            onChange={handleDropdownChange}
            error={errors.branchLocation}
          />

          <div className="pt-4 flex justify-end">
            <button
              id="setup-submit"
              type="submit"
              className="rounded-md bg-[#3B82F6] px-6 py-2.5 text-sm font-bold tracking-wide text-white transition-all hover:bg-blue-600 active:scale-[0.98] shadow-sm flex items-center justify-center min-w-[120px] outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              Start Session
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SetupModal;
