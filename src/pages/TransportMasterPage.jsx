import React from 'react';

export default function TransportMasterPage() {
  return (
    <div className="p-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Transport Master Data</h2>
        <button className="bg-brand-600 hover:bg-brand-700 active:scale-95 text-white px-4 py-2 rounded-lg text-sm font-bold tracking-wide transition-all shadow-sm shadow-brand-600/20">
          + Add New Record
        </button>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50/50 text-[11px] font-bold tracking-widest text-slate-500 uppercase flex justify-between">
          <span>Record ID</span>
          <span>Details</span>
          <span>Status</span>
        </div>
        <div className="p-12 text-center text-slate-500 text-sm">
          <div className="mb-2 text-3xl opacity-20">🗂️</div>
          No records found. Click "Add New Record" to begin entering master data.
        </div>
      </div>
    </div>
  );
}
