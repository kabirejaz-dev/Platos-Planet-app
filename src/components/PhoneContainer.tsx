import React, { useState, useEffect } from "react";
import { 
  Smartphone, 
  Wifi, 
  Battery, 
  Signal, 
  ToggleLeft, 
  ToggleRight, 
  Maximize2, 
  Minimize2, 
  Compass, 
  MapPin,
  MapPinHouse
} from "lucide-react";

interface PhoneContainerProps {
  children: React.ReactNode;
  title?: string;
}

export default function PhoneContainer({ children, title = "Plato's Planet Hub" }: PhoneContainerProps) {
  const [useDeviceFrame, setUseDeviceFrame] = useState(true);
  const [deviceType, setDeviceType] = useState<"android" | "ios">("ios");
  const [timeStr, setTimeStr] = useState("12:00");
  const [iosTimeStr, setIosTimeStr] = useState("09:41");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const ampm = hours >= 12 ? "PM" : "AM";
      
      // Android standard format
      const simpleHours = hours % 12 || 12;
      setTimeStr(`${simpleHours}:${minutes} ${ampm}`);
      
      // iOS standard 24hr or clean standard format
      const formattedHours = hours.toString().padStart(2, "0");
      setIosTimeStr(`${simpleHours}:${minutes}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-blue-dark via-slate-950 to-slate-950 text-slate-100 flex flex-col items-center justify-start p-2 sm:p-6 font-sans transition-all duration-300">
      {/* Upper Brand Bar */}
      <div className="w-full max-w-lg mb-4 flex flex-col sm:flex-row items-center justify-between gap-2 px-2 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-brand-yellow animate-pulse" />
          <span className="font-semibold text-slate-350">
            Plato's Planet {deviceType === "ios" ? "Apple iOS" : "Android"} App Simulator
          </span>
        </div>
        <div className="flex items-center gap-3">
          {useDeviceFrame && (
            <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-850 p-0.5 rounded-lg">
              <button
                onClick={() => setDeviceType("ios")}
                className={`px-2 py-0.5 rounded font-black tracking-wide text-[9px] cursor-pointer transition-all ${
                  deviceType === "ios" 
                    ? "bg-brand-yellow text-slate-950" 
                    : "text-slate-450 hover:text-slate-200"
                }`}
              >
                 iPhone
              </button>
              <button
                onClick={() => setDeviceType("android")}
                className={`px-2 py-0.5 rounded font-black tracking-wide text-[9px] cursor-pointer transition-all ${
                  deviceType === "android" 
                    ? "bg-brand-yellow text-slate-950" 
                    : "text-slate-450 hover:text-slate-200"
                }`}
              >
                Android
              </button>
            </div>
          )}
          <button 
            id="toggle-shell-btn"
            onClick={() => setUseDeviceFrame(!useDeviceFrame)}
            className="flex items-center gap-1.5 px-2.5 py-1 bg-brand-blue-dark hover:bg-brand-blue border border-brand-blue/60 transition-all font-medium text-brand-yellow rounded-lg"
          >
            {useDeviceFrame ? (
              <>
                <Minimize2 className="w-3 h-3 text-brand-yellow" />
                <span>Screen Only</span>
              </>
            ) : (
              <>
                <Maximize2 className="w-3 h-3 text-brand-yellow" />
                <span>Show Frame</span>
              </>
            )}
          </button>
        </div>
      </div>

      {useDeviceFrame ? (
        deviceType === "ios" ? (
          /* High fidelity Apple iPhone Bezel (iOS Simulator) */
          <div 
            id="ios-device-outer"
            className="relative w-full max-w-sm h-[820px] bg-black rounded-[54px] p-3.5 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] border-[6px] border-slate-800 flex flex-col overflow-hidden transition-all duration-500 hover:border-slate-700"
          >
            {/* iPhone Dynamic Island */}
            <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-full z-50 flex items-center justify-center border border-slate-900 shadow-inner">
              {/* Camera Lens indicators */}
              <div className="absolute left-3 w-2.5 h-2.5 bg-slate-950 border border-slate-900 rounded-full" />
              <div className="absolute right-4 w-1.5 h-1.5 bg-slate-950 border border-slate-900 rounded-full opacity-60" />
            </div>

            {/* Apple iPhone Inner Screen */}
            <div className="w-full h-full rounded-[42px] bg-slate-950 flex flex-col overflow-hidden relative border border-slate-900">
              {/* iPhone iOS Status Bar */}
              <div className="w-full h-9 bg-slate-950 px-6.5 pt-1.5 flex items-center justify-between text-[11px] font-extrabold text-slate-305 z-40 select-none pb-0">
                <span className="font-extrabold tracking-wide text-slate-200 font-sans pl-1">{iosTimeStr}</span>
                <div className="flex items-center gap-1.5 pr-1">
                  <Signal className="w-3 h-3 text-slate-300" />
                  <span className="text-[9px] text-slate-400 font-mono font-medium">5G</span>
                  <Wifi className="w-3 h-3 text-slate-300" />
                  <div className="w-5 h-2.5 bg-slate-900 border border-slate-700 rounded-sm p-0.5 relative flex items-center">
                    <div className="bg-emerald-450 h-full w-[85%] rounded-[1px]" />
                    <div className="w-0.5 h-1 bg-slate-700 absolute -right-1 rounded-r-sm" />
                  </div>
                </div>
              </div>

              {/* UAE Status header overlay */}
              <div className="w-full bg-brand-blue-dark px-4 py-1 flex items-center justify-between text-[9px] text-brand-yellow/95 border-b border-brand-blue/30">
                <span className="flex items-center gap-1 font-mono tracking-wider font-semibold">
                  <MapPinHouse className="w-2.5 h-2.5 text-brand-yellow" />
                   INTERACTIVE IOS CONTEXT: DUBAI CAMPUSES
                </span>
                <span className="bg-slate-900 text-brand-yellow border border-brand-blue px-1.5 py-0.2 rounded text-[7.5px] font-black uppercase font-mono">
                  Active Demo
                </span>
              </div>

              {/* App Internal Frame */}
              <div className="flex-1 flex flex-col overflow-y-auto overflow-x-hidden relative bg-slate-950">
                {children}
              </div>

              {/* Apple iOS Home Indicator bar bottom line spacer */}
              <div className="w-full h-7 bg-slate-950 flex items-center justify-center py-2 z-40 select-none">
                {/* Thin swipe indicator strip */}
                <div className="w-32 h-1 bg-slate-200/85 hover:bg-white rounded-full transition-colors" />
              </div>
            </div>
          </div>
        ) : (
          /* High fidelity Android Bezel */
          <div 
            id="android-device-outer"
            className="relative w-full max-w-sm h-[820px] bg-black rounded-[52px] p-4 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] border-[6px] border-slate-700 flex flex-col overflow-hidden transition-all duration-500 hover:border-slate-600"
          >
            {/* Top Notch Dynamic Island Speaker */}
            <div className="absolute top-1 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-50 flex items-center justify-center">
              <div className="w-12 h-1 bg-slate-800 rounded-full mt-1.5" />
              <div className="absolute top-1 right-6 w-1.5 h-1.5 bg-slate-900 rounded-full" />
            </div>

            {/* Android Screen Area */}
            <div className="w-full h-full rounded-[38px] bg-slate-950 flex flex-col overflow-hidden relative border border-slate-900">
              {/* Custom Android Status Bar */}
              <div className="w-full h-7 bg-slate-950 px-6 flex items-center justify-between text-[11px] font-medium text-slate-400 z-40 select-none border-b border-white/[0.03]">
                <span className="font-semibold text-slate-300 select-all">{timeStr}</span>
                <div className="flex items-center gap-1.5">
                  <span className="opacity-90">Dubai DEWA Hub</span>
                  <Signal className="w-3 h-3 text-slate-400" />
                  <Wifi className="w-3 h-3 text-slate-400" />
                  <Battery className="w-3.5 h-3.5 text-emerald-400" />
                </div>
              </div>

              {/* Simulated Campus Locations strip (Slightly transparent overlay) */}
              <div className="w-full bg-brand-blue-dark px-4 py-1 flex items-center justify-between text-[9px] text-brand-yellow/95 border-b border-brand-blue/30">
                <span className="flex items-center gap-1 font-mono tracking-wider font-semibold">
                  <MapPin className="w-2.5 h-2.5 text-brand-red animate-pulse" />
                  DUBAI, UAE (CAMPUSES: AL QUSAIS | KARAMA)
                </span>
                <span className="bg-brand-red text-white px-1.5 py-0.5 rounded-sm font-extrabold tracking-tight">K-12 REGISTERED</span>
              </div>

              {/* App Internal Frame */}
              <div className="flex-1 flex flex-col overflow-y-auto overflow-x-hidden relative bg-slate-950">
                {children}
              </div>

              {/* Android Navigation Bar Bar */}
              <div className="w-full h-11 bg-slate-950 flex items-center justify-around text-slate-500 border-t border-white/[0.02] py-2 z-40 select-none">
                <button className="p-1 hover:text-brand-yellow transition-colors">
                  <div className="w-3.5 h-3.5 border-2 border-current rounded-sm rotate-45" />
                </button>
                <button className="p-1 hover:text-brand-yellow transition-colors">
                  <div className="w-4 h-4 border-2 border-current rounded-full" />
                </button>
                <button className="p-1 hover:text-brand-yellow transition-colors">
                  <div className="w-4 h-3 flex flex-col justify-between items-center">
                    <div className="w-3.5 h-0.5 bg-current rounded-full" />
                    <div className="w-3.5 h-0.5 bg-current rounded-full" />
                    <div className="w-3.5 h-0.5 bg-current rounded-full" />
                  </div>
                </button>
              </div>
            </div>
          </div>
        )
      ) : (
        /* Native Standard Browser View with maximum utility but looking like a mobile WebApp */
        <div 
          id="app-full-expanded"
          className="w-full max-w-md min-h-[780px] bg-slate-950 rounded-2xl shadow-2xl border border-slate-800/80 flex flex-col overflow-hidden transition-all duration-500"
        >
          {/* Subtle Top Indicator for PWA */}
          <div className="w-full bg-brand-blue-dark px-4 py-1.5 flex items-center justify-between text-[11px] text-slate-350 border-b border-brand-blue/30">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-brand-red" />
              Plato's Planet Dubai (Main Office: Al Qusais)
            </span>
            <span className="text-brand-yellow font-bold tracking-wider font-mono">Licensed KHDA UAE</span>
          </div>
          <div className="flex-1 flex flex-col overflow-y-auto bg-slate-950">
            {children}
          </div>
        </div>
      )}
    </div>
  );
}
