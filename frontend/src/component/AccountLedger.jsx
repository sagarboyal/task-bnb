import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  createNewUser,
  searchUsers,
  getUserDetails,
  updateUser,
} from "../api/service";

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
    dob: "",
    nationality: "",
    gender: "",
    address1: "",
    address2: "",
    address3: "",
  };

  const [formData, setFormData] = useState(initialFormState);

  // New state variables for Search functionality
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(true);

  const dummySuggestions = [
    {
      _id: "dummy-1",
      code: "AL001",
      name: "Test User One",
      email: "one@example.com",
    },
    {
      _id: "dummy-2",
      code: "AL002",
      name: "Test User Two",
      email: "two@example.com",
    },
    {
      _id: "dummy-3",
      code: "AL003",
      name: "Test User Three",
      email: "three@example.com",
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const formFieldOrder = [
    "email",
    "password",
    "name",
    "fatherName",
    "motherName",
    "phone",
    "gender",
    "dob",
    "nationality",
    "address1",
    "address2",
    "address3",
  ];

  const formRef = useRef(null);
  const fieldRefs = useRef({});

  const registerRef = (fieldName) => (element) => {
    fieldRefs.current[fieldName] = element;
  };

  const handleEnterToNextField = async (e, fieldName) => {
    if (e.key !== "Enter") return;
    e.preventDefault();

    const visibleFields = formFieldOrder.filter((name) => {
      const field = fieldRefs.current[name];
      return field && !field.disabled;
    });

    const currentIndex = visibleFields.indexOf(fieldName);
    if (currentIndex === -1) return;

    const nextFieldName = visibleFields[currentIndex + 1];
    if (nextFieldName) {
      fieldRefs.current[nextFieldName]?.focus();
      return;
    }

    if (formRef.current) {
      if (!formRef.current.checkValidity()) {
        formRef.current.reportValidity();
        const firstInvalid = formRef.current.querySelector(":invalid");
        firstInvalid?.focus();
        return;
      }
    }

    await handleSubmit(e);
  };

  const handleSearchChange = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setSelectedUserId(null);
    setActiveSuggestionIndex(-1);

    if (query.length > 0) {
      try {
        const results = await searchUsers(query);
        const items = Array.isArray(results) ? results : [];
        setSuggestions(items.length ? items : dummySuggestions);
        setHasSearched(true);
      } catch (error) {
        console.error("Search failed", error);
        setSuggestions(dummySuggestions);
        setHasSearched(true);
      }
    } else {
      setSuggestions([]);
      setHasSearched(false);
    }
  };

  useEffect(() => {
    if (suggestions.length === 0) {
      setActiveSuggestionIndex(-1);
      return;
    }
    setActiveSuggestionIndex((current) =>
      current >= suggestions.length ? suggestions.length - 1 : current,
    );
  }, [suggestions]);

  const handleSearchKeyDown = (e) => {
    if (mode !== "MODIFY") return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveSuggestionIndex((prev) =>
        Math.min(prev + 1, suggestions.length - 1),
      );
      return;
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveSuggestionIndex((prev) => Math.max(prev - 1, 0));
      return;
    }

    if (e.key === "Enter") {
      if (activeSuggestionIndex >= 0) {
        e.preventDefault();
        handleSelectSuggestion(suggestions[activeSuggestionIndex], true);
        return;
      }

      if (selectedUserId) {
        e.preventDefault();
        handleGetUserDetails(selectedUserId);
      }
    }
  };

  const handleSelectSuggestion = (user, shouldFetch = false) => {
    const userId = user._id || user.id;
    setSearchQuery(user.code || user.name);
    setSelectedUserId(userId);
    setSuggestions([]);

    if (shouldFetch) {
      handleGetUserDetails(userId);
    }
  };

  const handleGetUserDetails = async (userId = selectedUserId) => {
    if (!userId) return;
    try {
      const user = await getUserDetails(userId);
      setFormData({ ...initialFormState, ...user });
      setIsFormVisible(true);
    } catch (error) {
      console.error("Failed to fetch user details", error);
    }
  };

  const handleOpenUserDetails = async (userSummary) => {
    const userId = userSummary._id || userSummary.id;
    if (!userId) return;

    try {
      const user = await getUserDetails(userId);
      setFormData({ ...initialFormState, ...user });
      setSearchQuery(user.code || userSummary.code || user.name || "");
      setSelectedUserId(userId);
      setSuggestions([]);
      setIsFormVisible(true);
    } catch (error) {
      console.error("Failed to fetch user details", error);
    }
  };

  const handleAction = (actionType) => {
    if (actionType === "BACK_TO_FIND_RESULTS") {
      setFormData(initialFormState);
      setSelectedUserId(null);
      setIsFormVisible(false);
      return;
    }

    if (actionType === "CANCEL") {
      setFormData(initialFormState);
      setMode("SUBMIT");
      setIsFormVisible(true);
      setSearchQuery("");
      setSuggestions([]);
      setHasSearched(false);
      setSelectedUserId(null);
      return;
    }

    if (actionType === "EXIT") {
      navigate("/");
      return;
    }

    if (actionType === "MODIFY_MODE") {
      setMode("MODIFY");
      setIsFormVisible(false);
      setSearchQuery("");
      setSuggestions([]);
      setHasSearched(false);
      setSelectedUserId(null);
      setFormData(initialFormState);
      return;
    }

    if (actionType === "FIND_MODE") {
      setMode("FIND");
      setIsFormVisible(false);
      setSearchQuery("");
      setSuggestions([]);
      setHasSearched(false);
      setSelectedUserId(null);
      setFormData(initialFormState);
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
      if (!selectedUserId) return;
      try {
        console.log("Modifying account:", formData);
        await updateUser(selectedUserId, formData);
        console.log("Update Successful");
        handleAction("CANCEL");
      } catch (error) {
        console.error("Update failed", error);
      }
    } else if (mode === "FIND") {
      // Find mode is read-only, no submit action
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

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="flex-1 flex flex-col min-h-0"
        >
          {(mode === "MODIFY" || mode === "FIND") && !isFormVisible ? (
            <div className="flex-1 flex flex-col items-center justify-start pt-20 p-6 min-h-0 overflow-y-auto">
              <div className="w-full max-w-md relative">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Search User by Name or Account Code
                </label>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onKeyDown={handleSearchKeyDown}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500 shadow-sm"
                  placeholder="Type a name, AL code, or last digits..."
                />
                {mode === "MODIFY" && suggestions.length > 0 && (
                  <ul className="absolute z-10 w-full bg-white border border-gray-200 mt-1 rounded-md shadow-lg max-h-60 overflow-y-auto">
                    {suggestions.map((user, index) => (
                      <li
                        key={user._id || user.id}
                        role="option"
                        aria-selected={activeSuggestionIndex === index}
                        onMouseEnter={() => setActiveSuggestionIndex(index)}
                        onClick={() => handleSelectSuggestion(user)}
                        className={`px-4 py-2 cursor-pointer text-sm border-b border-gray-50 last:border-0 ${
                          activeSuggestionIndex === index
                            ? "bg-blue-100 text-gray-900"
                            : "text-gray-700 hover:bg-blue-50"
                        }`}
                      >
                        <span className="font-semibold text-blue-700">
                          {user.code}
                        </span>
                        <span className="text-gray-700"> - {user.name}</span>
                        <span className="text-gray-400"> ({user.email})</span>
                      </li>
                    ))}
                  </ul>
                )}
                {mode === "MODIFY" &&
                  hasSearched &&
                  suggestions.length === 0 && (
                    <div className="absolute z-10 w-full bg-white border border-gray-200 mt-1 rounded-md shadow-lg px-4 py-3 text-sm text-gray-500">
                      No account found
                    </div>
                  )}
              </div>

              {mode === "FIND" && (
                <div className="w-full max-w-4xl mt-8">
                  {suggestions.length > 0 ? (
                    <div className="overflow-hidden border border-gray-200 rounded-lg shadow-sm bg-white">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-5 py-3 text-left text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                              Account Code
                            </th>
                            <th className="px-5 py-3 text-left text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                              Name
                            </th>
                            <th className="px-5 py-3 text-left text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                              Email
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100">
                          {suggestions.map((user) => (
                            <tr
                              key={user._id || user.id}
                              onClick={() => handleOpenUserDetails(user)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                  e.preventDefault();
                                  handleOpenUserDetails(user);
                                }
                              }}
                              className="hover:bg-blue-50 transition-colors cursor-pointer"
                              role="button"
                              tabIndex={0}
                            >
                              <td className="px-5 py-3 text-sm font-semibold text-blue-700">
                                {user.code || "-"}
                              </td>
                              <td className="px-5 py-3 text-sm text-gray-800">
                                {user.name || "-"}
                              </td>
                              <td className="px-5 py-3 text-sm text-gray-600">
                                {user.email || "-"}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    hasSearched && (
                      <div className="border border-dashed border-gray-300 rounded-lg bg-white px-6 py-10 text-center text-sm font-medium text-gray-500">
                        No data found
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          ) : mode === "FIND" && isFormVisible ? (
            <div className="flex-1 p-6 min-h-0 overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-blue-600 uppercase tracking-wider">
                  User Information
                </h3>
                <button
                  type="button"
                  onClick={() => handleAction("BACK_TO_FIND_RESULTS")}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-[10px] font-bold uppercase tracking-wider px-4 py-2 rounded transition-colors"
                >
                  Back
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    title: "Account",
                    fields: [
                      ["Email", formData.email],
                      ["Full Name", formData.name],
                    ],
                  },
                  {
                    title: "Personal",
                    fields: [
                      ["Father's Name", formData.fatherName],
                      ["Mother's Name", formData.motherName],
                      [
                        "Date of Birth",
                        formData.dob ? formData.dob.split("T")[0] : "",
                      ],
                      ["Phone", formData.phone],
                      ["Gender", formData.gender],
                      ["Nationality", formData.nationality],
                    ],
                  },
                  {
                    title: "Address",
                    fields: [
                      ["Address Line 1", formData.address1],
                      ["Address Line 2", formData.address2],
                      ["Address Line 3", formData.address3],
                    ],
                  },
                ].map((section) => (
                  <div
                    key={section.title}
                    className="border border-gray-200 rounded-lg bg-white shadow-sm overflow-hidden"
                  >
                    <div className="px-4 py-2 bg-gray-50 border-b border-gray-200">
                      <h4 className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">
                        {section.title}
                      </h4>
                    </div>
                    <div className="divide-y divide-gray-100">
                      {section.fields.map(([label, value]) => (
                        <div key={label} className="px-4 py-2">
                          <div className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">
                            {label}
                          </div>
                          <div className="mt-0.5 text-sm font-medium text-gray-900 truncate">
                            {value || "-"}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex-1 p-6 grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4 min-h-0 overflow-y-auto">
              {/* Column 1: Credentials */}
              <div className="space-y-3.5">
                <h3 className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
                  {mode === "SUBMIT" ? "Credentials" : "User Information"}
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
                        ref={registerRef("email")}
                        onKeyDown={(e) => handleEnterToNextField(e, "email")}
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
                        ref={registerRef("password")}
                        onKeyDown={(e) => handleEnterToNextField(e, "password")}
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
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        disabled
                        className="w-full border border-gray-300 rounded px-2.5 py-1.5 text-sm bg-gray-50 text-gray-600 cursor-not-allowed"
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
                    ref={registerRef("name")}
                    onKeyDown={(e) => handleEnterToNextField(e, "name")}
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
                      ref={registerRef("fatherName")}
                      onKeyDown={(e) => handleEnterToNextField(e, "fatherName")}
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
                      ref={registerRef("motherName")}
                      onKeyDown={(e) => handleEnterToNextField(e, "motherName")}
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
                      ref={registerRef("phone")}
                      onKeyDown={(e) => handleEnterToNextField(e, "phone")}
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
                      ref={registerRef("gender")}
                      onKeyDown={(e) => handleEnterToNextField(e, "gender")}
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
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-semibold text-gray-500 uppercase mb-1">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      name="dob"
                      value={formData.dob ? formData.dob.split("T")[0] : ""}
                      onChange={handleChange}
                      ref={registerRef("dob")}
                      onKeyDown={(e) => handleEnterToNextField(e, "dob")}
                      disabled={mode === "FIND"}
                      className="w-full border border-gray-300 rounded px-2.5 py-1.5 text-sm bg-white focus:outline-none focus:border-blue-500 disabled:bg-gray-50"
                    />
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
                      ref={registerRef("nationality")}
                      onKeyDown={(e) =>
                        handleEnterToNextField(e, "nationality")
                      }
                      disabled={mode === "FIND"}
                      className="w-full border border-gray-300 rounded px-2.5 py-1.5 text-sm focus:outline-none focus:border-blue-500 disabled:bg-gray-50"
                    />
                  </div>
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
                    ref={registerRef("address1")}
                    onKeyDown={(e) => handleEnterToNextField(e, "address1")}
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
                    ref={registerRef("address2")}
                    onKeyDown={(e) => handleEnterToNextField(e, "address2")}
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
                    ref={registerRef("address3")}
                    onKeyDown={(e) => handleEnterToNextField(e, "address3")}
                    disabled={mode === "FIND"}
                    className="w-full border border-gray-300 rounded px-2.5 py-1.5 text-sm focus:outline-none focus:border-blue-500 disabled:bg-gray-50"
                  />
                </div>
              </div>
            </div>
          )}
          <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-2 flex-shrink-0 bg-gray-50 rounded-b-xl">
            {mode === "SUBMIT" && (
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-bold uppercase tracking-wider px-5 py-2 rounded transition-colors active:scale-95 shadow-sm"
              >
                Submit
              </button>
            )}

            {mode === "MODIFY" && !isFormVisible && (
              <button
                type="button"
                onClick={handleGetUserDetails}
                disabled={!selectedUserId}
                className="bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-bold uppercase tracking-wider px-5 py-2 rounded transition-colors active:scale-95 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Get
              </button>
            )}

            {mode === "MODIFY" && isFormVisible && (
              <button
                type="submit"
                className="bg-amber-600 hover:bg-amber-700 text-white text-[10px] font-bold uppercase tracking-wider px-5 py-2 rounded transition-colors active:scale-95 shadow-sm"
              >
                Modify
              </button>
            )}

            {mode !== "MODIFY" && (
              <button
                type="button"
                onClick={() => handleAction("MODIFY_MODE")}
                className="bg-gray-600 hover:bg-gray-700 text-white text-[10px] font-bold uppercase tracking-wider px-5 py-2 rounded transition-colors active:scale-95 shadow-sm"
              >
                Modify
              </button>
            )}

            {mode !== "FIND" && (
              <button
                type="button"
                onClick={() => handleAction("FIND_MODE")}
                className="bg-gray-600 hover:bg-gray-700 text-white text-[10px] font-bold uppercase tracking-wider px-5 py-2 rounded transition-colors active:scale-95 shadow-sm"
              >
                Find Account
              </button>
            )}

            <button
              type="button"
              onClick={() => handleAction("CANCEL")}
              className="bg-gray-400 hover:bg-gray-500 text-white text-[10px] font-bold uppercase tracking-wider px-5 py-2 rounded transition-colors active:scale-95 shadow-sm"
            >
              Cancel
            </button>

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
