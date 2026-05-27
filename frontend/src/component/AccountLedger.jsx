import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createNewUser } from "../api/service";

export const AccountLedger = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState("SUBMIT"); // Modes: SUBMIT, MODIFY, FIND

  const initialFormState = {
    email: "",
    password: "",
    name: "",
    fatherName: "",
    motherName: "",
    phone: "",
    nationality: "",
    gender: "",
    address1: "",
    address2: "",
    address3: "",
  };

  const [formData, setFormData] = useState(initialFormState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAction = (actionType) => {
    if (actionType === "CANCEL") {
      setFormData(initialFormState);
      setMode("SUBMIT");
      return;
    }

    if (actionType === "EXIT") {
      navigate("/");
      return;
    }

    if (actionType === "MODIFY_MODE") {
      setMode("MODIFY");
      return;
    }

    if (actionType === "FIND_MODE") {
      setMode("FIND");
      return;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (mode === "SUBMIT") {
      try {
        console.log("Creating account:", formData);
        const response = await createNewUser(formData);
        console.log("Registration Successful:", response);
        handleAction("CANCEL");
      } catch (error) {
        console.error("Registration Failed:", error);
      }
    } else if (mode === "MODIFY") {
      console.log("Modifying account:", formData);
    } else if (mode === "FIND") {
      console.log("Searching with:", { email: formData.email });
    }
  };

  return (
    <div className="h-[calc(100vh-110px)] w-full flex items-center justify-center bg-gray-50 p-6 overflow-hidden">
      <div className="w-full max-w-5xl bg-white border border-gray-200 rounded-xl shadow-sm flex flex-col h-full max-h-[580px]">
        <div className="px-6 py-4 border-b border-gray-100 flex-shrink-0 flex justify-between items-center">
          <h2 className="text-base font-bold text-gray-800">Account Ledger</h2>
          <span className="text-[10px] bg-blue-50 text-blue-600 font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
            Current Mode: {mode}
          </span>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 flex flex-col min-h-0">
          <div className="flex-1 p-6 grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4 min-h-0">
            {/* Column 1: Credentials */}
            <div className="space-y-3.5">
              <h3 className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
                {mode === "SUBMIT" ? "Credentials" : "Find User"}
              </h3>
              {mode === "SUBMIT" && (
                <>
                  <div>
                    <label className="block text-[10px] font-semibold text-gray-500 uppercase mb-1">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded px-2.5 py-1.5 text-sm focus:outline-none focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-gray-500 uppercase mb-1">
                      Password{" "}
                      {mode !== "FIND" && (
                        <span className="text-red-500">*</span>
                      )}
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      disabled={mode === "FIND"}
                      className="w-full border border-gray-300 rounded px-2.5 py-1.5 text-sm focus:outline-none focus:border-blue-500 disabled:bg-gray-50 disabled:cursor-not-allowed"
                      required={mode !== "FIND"}
                    />
                  </div>
                </>
              )}
              {mode !== "SUBMIT" && (
                <>
                  <div>
                    <label className="block text-[10px] font-semibold text-gray-500 uppercase mb-1">
                      USERNAME <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded px-2.5 py-1.5 text-sm focus:outline-none focus:border-blue-500"
                      required
                    />
                  </div>
                </>
              )}
            </div>

            {/* Column 2: Personal Details */}
            <div
              className={`space-y-3.5 border-x border-gray-100 px-6 ${mode === "FIND" ? "opacity-40" : ""}`}
            >
              <h3 className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
                Personal Details
              </h3>
              <div>
                <label className="block text-[10px] font-semibold text-gray-500 uppercase mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={mode === "FIND"}
                  className="w-full border border-gray-300 rounded px-2.5 py-1.5 text-sm focus:outline-none focus:border-blue-500 disabled:bg-gray-50"
                  required={mode !== "FIND"}
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] font-semibold text-gray-500 uppercase mb-1">
                    Father's Name
                  </label>
                  <input
                    type="text"
                    name="fatherName"
                    value={formData.fatherName}
                    onChange={handleChange}
                    disabled={mode === "FIND"}
                    className="w-full border border-gray-300 rounded px-2.5 py-1.5 text-sm focus:outline-none focus:border-blue-500 disabled:bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-gray-500 uppercase mb-1">
                    Mother's Name
                  </label>
                  <input
                    type="text"
                    name="motherName"
                    value={formData.motherName}
                    onChange={handleChange}
                    disabled={mode === "FIND"}
                    className="w-full border border-gray-300 rounded px-2.5 py-1.5 text-sm focus:outline-none focus:border-blue-500 disabled:bg-gray-50"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] font-semibold text-gray-500 uppercase mb-1">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={mode === "FIND"}
                    className="w-full border border-gray-300 rounded px-2.5 py-1.5 text-sm focus:outline-none focus:border-blue-500 disabled:bg-gray-50"
                    required={mode !== "FIND"}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-gray-500 uppercase mb-1">
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    disabled={mode === "FIND"}
                    className="w-full border border-gray-300 rounded px-2.5 py-1.5 text-sm bg-white focus:outline-none focus:border-blue-500 disabled:bg-gray-50"
                  >
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-gray-500 uppercase mb-1">
                  Nationality
                </label>
                <input
                  type="text"
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleChange}
                  disabled={mode === "FIND"}
                  className="w-full border border-gray-300 rounded px-2.5 py-1.5 text-sm focus:outline-none focus:border-blue-500 disabled:bg-gray-50"
                />
              </div>
            </div>

            {/* Column 3: Address Information */}
            <div
              className={`space-y-3.5 ${mode === "FIND" ? "opacity-40" : ""}`}
            >
              <h3 className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
                Address Information
              </h3>
              <div>
                <label className="block text-[10px] font-semibold text-gray-500 uppercase mb-1">
                  Address Line 1
                </label>
                <input
                  type="text"
                  name="address1"
                  value={formData.address1}
                  onChange={handleChange}
                  disabled={mode === "FIND"}
                  className="w-full border border-gray-300 rounded px-2.5 py-1.5 text-sm focus:outline-none focus:border-blue-500 disabled:bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-gray-500 uppercase mb-1">
                  Address Line 2
                </label>
                <input
                  type="text"
                  name="address2"
                  value={formData.address2}
                  onChange={handleChange}
                  disabled={mode === "FIND"}
                  className="w-full border border-gray-300 rounded px-2.5 py-1.5 text-sm focus:outline-none focus:border-blue-500 disabled:bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-gray-500 uppercase mb-1">
                  Address Line 3
                </label>
                <input
                  type="text"
                  name="address3"
                  value={formData.address3}
                  onChange={handleChange}
                  disabled={mode === "FIND"}
                  className="w-full border border-gray-300 rounded px-2.5 py-1.5 text-sm focus:outline-none focus:border-blue-500 disabled:bg-gray-50"
                />
              </div>
            </div>
          </div>
          <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-2 flex-shrink-0 bg-gray-50 rounded-b-xl">
            {/* 1. Submit Button (Shows only in SUBMIT mode) */}
            {mode === "SUBMIT" && (
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-bold uppercase tracking-wider px-5 py-2 rounded transition-colors active:scale-95 shadow-sm"
              >
                Submit
              </button>
            )}

            {/* 2. Modify Button (Acts as submit when already in MODIFY mode) */}
            {mode === "MODIFY" && (
              <button
                type="submit"
                className="bg-amber-600 hover:bg-amber-700 text-white text-[10px] font-bold uppercase tracking-wider px-5 py-2 rounded transition-colors active:scale-95 shadow-sm"
              >
                Modify
              </button>
            )}

            {/* 3. Change to Modify Mode Button (Shows when NOT in modify mode already) */}
            {mode !== "MODIFY" && (
              <button
                type="button"
                onClick={() => handleAction("MODIFY_MODE")}
                className="bg-gray-600 hover:bg-gray-700 text-white text-[10px] font-bold uppercase tracking-wider px-5 py-2 rounded transition-colors active:scale-95 shadow-sm"
              >
                Modify
              </button>
            )}

            {/* 4. Find Account Button (Acts as submit in FIND mode, switches mode otherwise) */}
            {mode === "FIND" ? (
              <button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold uppercase tracking-wider px-5 py-2 rounded transition-colors active:scale-95 shadow-sm"
              >
                Find Account
              </button>
            ) : (
              <button
                type="button"
                onClick={() => handleAction("FIND_MODE")}
                className="bg-gray-600 hover:bg-gray-700 text-white text-[10px] font-bold uppercase tracking-wider px-5 py-2 rounded transition-colors active:scale-95 shadow-sm"
              >
                Find Account
              </button>
            )}

            {/* 5. Cancel Button (Always visible) */}
            <button
              type="button"
              onClick={() => handleAction("CANCEL")}
              className="bg-gray-400 hover:bg-gray-500 text-white text-[10px] font-bold uppercase tracking-wider px-5 py-2 rounded transition-colors active:scale-95 shadow-sm"
            >
              Cancel
            </button>

            {/* 6. Exit Button (Always visible) */}
            <button
              type="button"
              onClick={() => handleAction("EXIT")}
              className="bg-red-500 hover:bg-red-600 text-white text-[10px] font-bold uppercase tracking-wider px-5 py-2 rounded transition-colors active:scale-95 shadow-sm"
            >
              Exit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
