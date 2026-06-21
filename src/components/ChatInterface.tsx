import React, { useState, useEffect, useRef } from 'react'
import { Message } from '../types'
import { MessageBubble } from './MessageBubble'
import { LoadingSkeleton } from './LoadingSkeleton'
import { QuickActions } from './QuickActions'
import { AlertTriangle, XCircle } from 'lucide-react'

interface ChatInterfaceProps {
  messages: Message[]
  isLoading: boolean
  error: string | null
  onSendMessage: (text: string) => void
  onClearError: () => void
}

export function ChatInterface({
  messages,
  isLoading,
  error,
  onSendMessage,
  onClearError
}: ChatInterfaceProps) {
  const [input, setInput] = useState('')
  const listRef = useRef<HTMLUListElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  // Smooth scroll to bottom on new messages
  useEffect(() => {
    if (bottomRef.current && typeof bottomRef.current.scrollIntoView === 'function') {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isLoading])

  const handleSend = () => {
    const trimmed = input.trim()
    if (!trimmed || isLoading) return

    onSendMessage(trimmed)
    setInput('')
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleQuickAction = (presetPrompt: string) => {
    if (isLoading) return
    onSendMessage(presetPrompt)
  }

  return (
    <section
      aria-label="Personal Finance AI Chat Assistant"
      className="flex flex-col flex-1 h-[650px] md:h-full bg-[#0f172a] border border-[#334155] rounded-xl overflow-hidden relative"
    >
      {/* Thread Log Container */}
      <div
        className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4"
        role="log"
        aria-live="polite"
      >
        <div ref={listRef} className="flex flex-col gap-4" role="list">
          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}
          {isLoading && <LoadingSkeleton />}
          <div ref={bottomRef} />
        </div>
      </div>

      {/* Quick Actions & Input Controls Area */}
      <div className="p-6 bg-[#1e293b] border-t border-[#334155] space-y-4">
        
        {/* Error Notification Banner */}
        {error && (
          <div
            className="flex items-center justify-between gap-3 p-3 bg-rose-950/40 border border-[#334155] rounded-lg text-rose-300 text-xs animate-fade-in font-medium"
            role="alert"
          >
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 flex-shrink-0 text-rose-400" />
              <span>{error}</span>
            </div>
            <button
              onClick={onClearError}
              className="p-1 hover:bg-rose-900/40 rounded-full transition cursor-pointer"
              aria-label="Dismiss error notification"
            >
              <XCircle className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Quick Suggestion Prompts */}
        <QuickActions onActionClick={handleQuickAction} isLoading={isLoading} />

        {/* Controls Compose Area */}
        <div className="relative">
          <textarea
            id="chat-message-input"
            value={input}
            onChange={(e) => setInput(e.target.value.substring(0, 500))}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
            placeholder={isLoading ? "AI is typing..." : "Ask me about your finances..."}
            className="w-full bg-[#0f172a] border border-[#334155] rounded-xl p-4 pr-14 text-sm focus:ring-2 focus:ring-[#6366f1] focus:outline-none resize-none h-24 placeholder-[#334155] text-white disabled:opacity-50"
            aria-label="Chat message"
            maxLength={500}
          />
          
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="absolute right-3 bottom-3 p-2.5 bg-[#6366f1] text-white rounded-lg shadow-lg hover:bg-[#4f46e5] disabled:opacity-50 cursor-pointer transition-colors flex items-center justify-center"
            aria-label="Send message"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="m22 2-7 20-4-9-9-4Z"/>
              <path d="M22 2 11 13"/>
            </svg>
          </button>
          
          <div className="absolute left-4 -bottom-1 text-[10px] text-[#334155] font-mono translate-y-full mt-1">
            {input.length} / 500 characters
          </div>
        </div>
      </div>
    </section>
  )
}
export default ChatInterface
