import React, { Suspense, useCallback } from 'react'
import { Header } from './components/Header'
import { ExpenseForm } from './components/ExpenseForm'
import { ChatInterface } from './components/ChatInterface'
import { useExpenses } from './hooks/useExpenses'
import { useChat } from './hooks/useChat'

// Lazy load the ExpenseSummary component as required
const ExpenseSummary = React.lazy(() => import('./components/ExpenseSummary'))

export default function App() {
  const {
    expenses,
    addExpense,
    deleteExpense,
    getTotalByCategory,
    getTotalSpent,
    clearExpenses
  } = useExpenses()

  const {
    messages,
    isLoading,
    error,
    sendUserMessage,
    clearChat,
    dismissError
  } = useChat()

  const handleClearAll = useCallback(() => {
    clearExpenses()
    clearChat()
  }, [clearExpenses, clearChat])

  const handleSendMessage = useCallback((text: string) => {
    sendUserMessage(text, expenses)
  }, [sendUserMessage, expenses])

  return (
    <div className="h-screen bg-[#0f172a] text-[#f1f5f9] flex flex-col overflow-hidden font-sans">
      <Header onClearAll={handleClearAll} />
      
      <main className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Left column (40% space on wide viewports, 100% on mobile) */}
        <section className="w-full md:w-[40%] border-b md:border-b-0 md:border-r border-[#334155] flex flex-col overflow-y-auto p-6 bg-[#0f172a] space-y-6">
          <ExpenseForm onAddExpense={addExpense} />
          
          <Suspense fallback={
            <div className="bg-[#1e293b] rounded-xl border border-[#334155] p-5 shadow-sm text-center text-[#94a3b8] font-bold text-xs uppercase tracking-wider">
              Loading summary dashboard...
            </div>
          }>
            <ExpenseSummary
              expenses={expenses}
              categoryTotals={getTotalByCategory}
              totalSpent={getTotalSpent}
              onDeleteExpense={deleteExpense}
            />
          </Suspense>
        </section>

        {/* Right column (60% space on wide viewports, 100% on mobile) */}
        <section className="w-full md:w-[60%] flex-1 flex flex-col bg-[#0f172a] relative h-[650px] md:h-auto overflow-hidden">
          <ChatInterface
            messages={messages}
            isLoading={isLoading}
            error={error}
            onSendMessage={handleSendMessage}
            onClearError={dismissError}
          />
        </section>
      </main>
    </div>
  )
}
