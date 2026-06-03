import React, { useState, useEffect } from "react";
import { slides } from "../../../constants/auth/loginPageData";
import LoginForm from "../components/LoginForm";
import { FleetIllustration } from "../../../components/icons/FleetIllustration";
import { useDocumentTitle } from "../../../hooks/useDocumentTitle";

const LoginPage = () => {
  useDocumentTitle("Login");
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(slideTimer);
  }, [slides.length]);

  return (
    <div className="flex h-screen w-full bg-slate-50 font-sans antialiased selection:bg-blue-500 selection:text-white overflow-hidden">
      {/* Left Sidebar - Brand Showcase */}
      <div className="relative hidden lg:flex lg:w-[35%] xl:w-[30%] flex-col bg-gradient-to-b from-blue-600 to-blue-700 p-8 xl:p-12 text-white select-none h-screen overflow-hidden">
        {/* Ambient Background Decorative Glow */}
        <div className="absolute top-0 right-0 -mt-20 -mr-20 h-80 w-80 rounded-full bg-cyan-400/20 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 h-80 w-80 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none"></div>

        {/* Top Header Section */}
        <div className="relative z-10 space-y-1.5 text-center">
          <h1 className="text-xl xl:text-2xl font-black tracking-wide uppercase text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-50 to-blue-100 max-w-xs mx-auto leading-tight">
            Transport Management Software
          </h1>
          <p className="text-[10px] xl:text-[11px] font-bold tracking-widest text-cyan-200 uppercase opacity-90">
            Managing your shipments, simplified!
          </p>
        </div>

        <div className="relative z-10 my-auto flex flex-col items-center text-center w-full">
          {/* Fleet Illustration */}
          <div className="relative mb-6 xl:mb-10 flex h-32 xl:h-36 w-full max-w-[200px] xl:max-w-[240px] items-center justify-center">
            <FleetIllustration
              className="animate-pulse [animation-duration:8s]"
              primaryColor="text-white"
            />
          </div>

          {/* Sliding Content Window */}
          <div className="relative h-24 w-full max-w-xs overflow-hidden">
            {slides.map((slide, index) => {
              const isActive = index === currentSlide;
              return (
                <div
                  key={index}
                  aria-hidden={!isActive}
                  className={`absolute inset-0 flex flex-col items-center justify-center space-y-2 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                    isActive
                      ? "translate-x-0 opacity-100 scale-100"
                      : "translate-x-8 opacity-0 scale-95 pointer-events-none"
                  }`}
                >
                  <h3 className="text-base xl:text-lg font-bold tracking-wide text-white">
                    {slide.title}
                  </h3>
                  <p className="text-[11px] xl:text-xs leading-relaxed text-blue-100/80 px-4">
                    {slide.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Interactive Clickable Carousel Dot Indicators */}
          <div className="mt-6 xl:mt-8 flex items-center gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                aria-label={`Switch to presentation panel ${index + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-blue-600 ${
                  index === currentSlide
                    ? "w-5 bg-cyan-300"
                    : "w-1.5 bg-white/30 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Bottom Metadata Footer Section */}
        <div className="relative z-10 mt-auto flex items-center justify-end border-t border-white/10 pt-4 text-[10px] font-medium tracking-wider text-blue-100/50 w-full">
          <span className="text-right select-none">
            &copy; {new Date().getFullYear()} BNB Software. All rights reserved.
          </span>
        </div>
      </div>

      {/* Right Container */}
      <div className="flex w-full lg:w-[65%] xl:w-[70%] h-full flex-col justify-center bg-white px-6 py-12 sm:px-16 md:px-24 xl:px-36 overflow-y-auto">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
