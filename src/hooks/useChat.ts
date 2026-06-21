import { useState, useEffect, useRef, useCallback } from 'react'
import { Message, Expense, ChatRequest } from '../types'
import { generateId, sanitizeInput } from '../utils/formatters'
import * as api from '../services/api'

const WELCOME_TEXT = "Hello! I am your Smart Personal Finance Assistant. Add your expenses on the left, and ask me to analyze your spending, provide saving tips, or check your monthly budget!"

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const lastSendTimeRef = useRef<number>(0)

  const createWelcomeMessage = useCallback((): Message => ({
    id: 'welcome-' + Date.now(),
    role: 'assistant',
    content: WELCOME_TEXT,
    timestamp: new Date()
  }), [])

  // Push welcome message on mount
  useEffect(() => {
    setMessages([createWelcomeMessage()])
  }, [createWelcomeMessage])

  const sendUserMessage = useCallback(async (text: string, currentExpenses: Expense[]) => {
    const now = Date.now()
    if (now - lastSendTimeRef.current < 1000) {
      setError("Please wait a moment before sending another message.")
      return
    }
    lastSendTimeRef.current = now

    const sanitized = sanitizeInput(text)
    if (!sanitized) {
      return
    }

    const userMsg: Message = {
      id: generateId(),
      role: 'user',
      content: sanitized,
      timestamp: new Date()
    }

    // Add user message to state immediately
    setMessages((prev) => [...prev, userMsg])
    setIsLoading(true)
    setError(null)

    try {
      // Build history of maximum last 10 messages BEFORE this new message
      // and map them to the role-content structure required by the backend
      const historyPayload = messages
        .slice(-10)
        .map((m) => ({
          role: m.role,
          content: m.content
        }))

      const payload: ChatRequest = {
        message: sanitized,
        expenses: currentExpenses,
        history: historyPayload
      }

      const response = await api.sendMessage(payload)

      const assistantMsg: Message = {
        id: generateId(),
        role: 'assistant',
        content: response.reply,
        timestamp: new Date()
      }

      setMessages((prev) => [...prev, assistantMsg])
    } catch (err: any) {
      setError(err.message || "Failed to get response from assistant.")
    } finally {
      setIsLoading(false)
    }
  }, [messages])

  const clearChat = useCallback(() => {
    setMessages([createWelcomeMessage()])
    setError(null)
    setIsLoading(false)
  }, [createWelcomeMessage])

  const dismissError = useCallback(() => {
    setError(null)
  }, [])

  return {
    messages,
    isLoading,
    error,
    sendUserMessage,
    clearChat,
    dismissError
  }
}
