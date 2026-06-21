import React from 'react'

interface HeaderProps {
  onClearAll: () => void
}

export function Header({ onClearAll }: HeaderProps) {
  return (
    <header className="h-16 flex items-center justify-between px-8 bg-[#0f172a] border-b border-[#334155] shrink-0">
      <div className="flex flex-col">
        <h1 className="text-lg font-bold tracking-tight text-white leading-none">JS Finance</h1>
        <p className="text-xs text-[#94a3b8] mt-1 uppercase tracking-widest font-medium">Smart Personal Finance Assistant</p>
      </div>
      <button
        onClick={onClearAll}
        className="px-4 py-2 text-xs font-semibold text-[#f1f5f9] bg-[#1e293b] border border-[#334155] rounded-md hover:bg-[#334155] transition-colors focus:ring-2 focus:ring-[#6366f1] focus:outline-none cursor-pointer"
        aria-label="Clear all expenses and chat history"
      >
        Clear all data
      </button>
    </header>
  )
}
