import React from 'react';

export default function ReportsPage() {
  return (
    <div className="p-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <h2 className="text-2xl font-bold text-slate-800 mb-6 tracking-tight">Reporting & Analytics</h2>
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 text-center">
        <div className="text-4xl mb-4 opacity-50">📊</div>
        <h3 className="text-lg font-bold text-slate-700 mb-2">Select a Report</h3>
        <p className="text-slate-500 text-sm max-w-sm mx-auto">
          Please select a specific report from the top navigation menu under the "Reports" section to generate your data.
        </p>
      </div>
    </div>
  );
}
