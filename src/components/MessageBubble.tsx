import React from 'react'
import { Message } from '../types'

interface MessageBubbleProps {
  message: Message
}

export const MessageBubble = React.memo(function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user'
  
  const timeString = React.useMemo(() => {
    try {
      return new Date(message.timestamp).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      })
    } catch {
      return ''
    }
  }, [message.timestamp])

  if (isUser) {
    return (
      <div className="flex items-start gap-3 flex-row-reverse" role="listitem"> 
        <div className="flex flex-col max-w-[80%] items-end"> 
          <div className="bg-[#6366f1] p-4 rounded-2xl rounded-tr-none text-white text-sm shadow-md whitespace-pre-wrap break-words"> 
            {message.content} 
          </div> 
          <span className="text-[10px] text-[#94a3b8] mt-1 mr-1 font-mono uppercase tracking-widest">{timeString}</span> 
        </div> 
      </div>
    )
  }

  // Assistant message
  return (
    <div className="flex items-start gap-3" role="listitem"> 
      <div className="w-8 h-8 rounded-full bg-[#334155] flex items-center justify-center text-lg shrink-0 shadow-sm shadow-black">🤖</div> 
      <div className="flex flex-col max-w-[80%]"> 
        <div className="bg-[#1e293b] p-4 rounded-2xl rounded-tl-none border border-[#334155] text-sm leading-relaxed text-white whitespace-pre-wrap break-words"> 
          {message.content}
        </div> 
        <span className="text-[10px] text-[#94a3b8] mt-1 ml-1 font-mono uppercase tracking-widest">{timeString}</span> 
      </div> 
    </div>
  )
})
