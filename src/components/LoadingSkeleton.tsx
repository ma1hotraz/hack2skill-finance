import React from 'react'

export function LoadingSkeleton() {
  return (
    <div className="flex items-start gap-3 animate-fade-in" role="listitem" aria-busy="true" aria-label="AI is thinking"> 
      <div className="w-8 h-8 rounded-full bg-[#334155] flex items-center justify-center text-lg shrink-0 shadow-sm shadow-black">🤖</div> 
      <div className="flex flex-col max-w-[80%] space-y-2"> 
        <div className="bg-[#1e293b] px-4 py-3 rounded-2xl rounded-tl-none border border-[#334155] flex gap-1 items-center"> 
          <div className="w-1.5 h-1.5 bg-[#6366f1] rounded-full animate-pulse"></div> 
          <div className="w-1.5 h-1.5 bg-[#6366f1] rounded-full animate-pulse [animation-delay:0.2s]"></div> 
          <div className="w-1.5 h-1.5 bg-[#6366f1] rounded-full animate-pulse [animation-delay:0.4s]"></div> 
        </div> 
      </div> 
    </div>
  )
}
