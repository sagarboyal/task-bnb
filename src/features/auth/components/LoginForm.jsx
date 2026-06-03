import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEnterKeyNavigation } from "../../../hooks/useEnterKeyNavigation";
import { IMAGES } from "../../../assets/index";
import { InputField } from "../../../components/ui";
import { LoadingIcon } from "../../../components/icons";

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const formFieldOrder = ["username", "password", "login-submit"];

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    if (errors[id]) {
      setErrors((prev) => ({ ...prev, [id]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = () => {
    if (!validateForm() || isLoading) return;

    setIsLoading(true);
    console.log("Submitting login payload:", formData);

    setTimeout(() => {
      setIsLoading(false);
      navigate("/");
    }, 800);
  };

  const { formRef, handleKeyDown } = useEnterKeyNavigation(
    formFieldOrder,
    handleFormSubmit,
  );

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      {/* Brand Header Container */}
      <div className="flex flex-col items-center text-center space-y-5 select-none">
        <img
          src={IMAGES.BRAND_LOGO}
          alt="BNB Software Logo"
          className="h-24 w-auto md:h-28 object-contain pointer-events-none filter drop-shadow-md transform transition-transform duration-500 hover:scale-[1.02]"
          onError={(e) => {
            e.target.style.display = "none";
          }}
        />
        <div className="space-y-1.5">
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">
            Welcome back
          </h2>
          <p className="text-sm font-medium text-slate-500 max-w-sm mx-auto">
            Please enter your system credentials to proceed
          </p>
        </div>
      </div>

      {/* Interactive Input Layout Form */}
      <form
        ref={formRef}
        onKeyDown={handleKeyDown}
        onSubmit={(e) => {
          e.preventDefault();
          handleFormSubmit();
        }}
        className="space-y-4"
      >
        <InputField
          id="username"
          label="Username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Enter username"
          disabled={isLoading}
          error={errors.username}
        />

        <InputField
          id="password"
          type={showPassword ? "text" : "password"}
          label="Password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter password"
          disabled={isLoading}
          error={errors.password}
          rightAction={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-[10px] font-bold tracking-wider text-slate-400 uppercase transition-colors hover:text-slate-600 outline-none"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          }
        />

        {/* Submission Button */}
        <button
          id="login-submit"
          type="submit"
          disabled={isLoading}
          className="mt-2 w-full rounded-md bg-[#3B82F6] py-2.5 text-sm font-semibold text-white transition-all hover:bg-blue-600 active:scale-[0.99] disabled:bg-blue-400 disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center shadow-sm"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <LoadingIcon
                className="animate-spin h-4 w-4 text-white"
                strokeWidth={2.5}
              />
              <span>Authenticating...</span>
            </span>
          ) : (
            "Log In"
          )}
        </button>

        <div className="text-center pt-3 border-t border-slate-100 mt-2">
          <a
            href="#admin-portal"
            className="text-[10px] font-bold tracking-widest text-slate-500 uppercase transition-colors hover:text-blue-600 focus-visible:text-blue-600 outline-none"
          >
            Admin Portal
          </a>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
