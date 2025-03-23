"use client";

import React, { useEffect, useState } from "react";
import { Database, Activity } from "lucide-react";

export function LoadingScreen() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate progress bar filling
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = Math.min(prev + Math.random() * 20 + 1, 93);
        if (newProgress >= 100) clearInterval(interval);
        return newProgress;
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black text-white overflow-hidden">
      {/* Clean black background - no grid pattern as requested */}
      
      {/* Branding with enhanced styling */}
      <div className="relative z-10 flex flex-col items-center mb-8">
        <div className="mb-4 text-4xl font-bold flex items-center gap-4">
          {/* <div className="relative mr-4 p-4 rounded-full bg-blue-500/20 border border-blue-500/30 shadow-lg card-glow">
            <Database className="h-8 w-8 text-blue-400" />
          </div> */}
          <img 
            src="/logo.svg" 
            alt="Archiva Logo" 
            className="h-12 w-auto" 
          />
          
          <h1 className="bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent font-bold">
          Archiva
          </h1>
        </div>
      </div>

      {/* Enhanced Loading Progress Bar */}
      <div className="relative w-36 h-36 flex items-center justify-center">
        {/* Background Circle with improved styling */}
        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" stroke="rgba(50,50,50,0.5)" strokeWidth="8" fill="transparent" />
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="url(#progressGradient)"
            strokeWidth="8"
            strokeDasharray="251.2"
            strokeDashoffset={`${251.2 - (progress / 100) * 251.2}`}
            fill="transparent"
            strokeLinecap="round"
            className="pulse-animation"
          />
          <defs>
            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#10B981" />
            </linearGradient>
          </defs>
        </svg>

        {/* Progress Text with glassmorphism effect */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-mono text-3xl font-bold tracking-wider bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">{Math.floor(progress)}%</span>
          <div className="flex items-center mt-1">
            <Activity className="h-3 w-3 text-blue-400 mr-1" />
            <span className="text-xs font-medium text-blue-300">Loading</span>
          </div>
        </div>
      </div>

      {/* Enhanced Tagline */}
      <div className="mt-6 text-center glassmorphism py-2 px-4 rounded-lg">
        <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
          Optimize. Secure. Archiva.
        </h2>
        <p className="text-xs text-gray-400 mt-1">Blockchain Storage with Minimal Gas Consumption</p>
      </div>
    </div>
  );
}