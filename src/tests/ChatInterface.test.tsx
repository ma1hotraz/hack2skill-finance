import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { ChatInterface } from '../components/ChatInterface'
import { Message } from '../types'
import { describe, test, expect, vi } from 'vitest'

describe('ChatInterface Component tests', () => {
  const dummyMessages: Message[] = [
    {
      id: '1',
      role: 'assistant',
      content: 'Welcome message',
      timestamp: new Date()
    }
  ]

  // Test 1
  test('renders textarea and send button', () => {
    const handleSend = vi.fn()
    const handleClear = vi.fn()
    render(
      <ChatInterface
        messages={dummyMessages}
        isLoading={false}
        error={null}
        onSendMessage={handleSend}
        onClearError={handleClear}
      />
    )
    const textarea = screen.getByLabelText(/Type message content/i) as HTMLTextAreaElement
    const button = screen.getByLabelText(/Send message/i) as HTMLButtonElement
    
    expect(textarea).not.toBeNull()
    expect(button).not.toBeNull()
  })

  // Test 2
  test('send button disabled when input empty', () => {
    const handleSend = vi.fn()
    const handleClear = vi.fn()
    render(
      <ChatInterface
        messages={dummyMessages}
        isLoading={false}
        error={null}
        onSendMessage={handleSend}
        onClearError={handleClear}
      />
    )
    const button = screen.getByLabelText(/Send message/i) as HTMLButtonElement
    expect(button.disabled).toBe(true)
  })

  // Test 3
  test('send button disabled when isLoading true', () => {
    const handleSend = vi.fn()
    const handleClear = vi.fn()
    render(
      <ChatInterface
        messages={dummyMessages}
        isLoading={true}
        error={null}
        onSendMessage={handleSend}
        onClearError={handleClear}
      />
    )
    const button = screen.getByLabelText(/Send message/i) as HTMLButtonElement
    expect(button.disabled).toBe(true)
  })

  // Test 4
  test('typing in textarea updates character counter', () => {
    const handleSend = vi.fn()
    const handleClear = vi.fn()
    render(
      <ChatInterface
        messages={dummyMessages}
        isLoading={false}
        error={null}
        onSendMessage={handleSend}
        onClearError={handleClear}
      />
    )
    const textarea = screen.getByLabelText(/Type message content/i) as HTMLTextAreaElement
    fireEvent.change(textarea, { target: { value: 'react testing' } })
    
    const counter = screen.getByText('13/500')
    expect(counter).not.toBeNull()
  })

  // Test 5
  test('pressing Enter calls sendUserMessage', () => {
    const handleSend = vi.fn()
    const handleClear = vi.fn()
    render(
      <ChatInterface
        messages={dummyMessages}
        isLoading={false}
        error={null}
        onSendMessage={handleSend}
        onClearError={handleClear}
      />
    )
    const textarea = screen.getByLabelText(/Type message content/i) as HTMLTextAreaElement
    fireEvent.change(textarea, { target: { value: 'Analyze my bills please' } })
    fireEvent.keyDown(textarea, { key: 'Enter', code: 'Enter', charCode: 13 })
    
    expect(handleSend).toHaveBeenCalledWith('Analyze my bills please')
  })

  // Test 6
  test('error banner renders when error prop set', () => {
    const handleSend = vi.fn()
    const handleClear = vi.fn()
    render(
      <ChatInterface
        messages={dummyMessages}
        isLoading={false}
        error="Network timeout error occurred"
        onSendMessage={handleSend}
        onClearError={handleClear}
      />
    )
    const errorMsg = screen.getByText('Network timeout error occurred')
    expect(errorMsg).not.toBeNull()
  })
})
