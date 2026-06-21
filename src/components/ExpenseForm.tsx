import React, { useState, useRef } from 'react'
import { categorizeExpense } from '../utils/formatters'
import { ExpenseCategory } from '../types'

interface ExpenseFormProps {
  onAddExpense: (description: string, amount: number) => void
}

export function ExpenseForm({ onAddExpense }: ExpenseFormProps) {
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [detectedCategory, setDetectedCategory] = useState<ExpenseCategory | null>(null)
  
  // Validation errors
  const [descError, setDescError] = useState<string | null>(null)
  const [amountError, setAmountError] = useState<string | null>(null)

  const descriptionInputRef = useRef<HTMLInputElement>(null)

  const handleDescriptionBlur = () => {
    const trimmed = description.trim()
    if (trimmed) {
      const category = categorizeExpense(trimmed)
      setDetectedCategory(category)
      setDescError(null)
    } else {
      setDetectedCategory(null)
    }
  }

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value)
    if (descError && e.target.value.trim()) {
      setDescError(null)
    }
  }

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value)
    if (amountError && Number(e.target.value) > 0) {
      setAmountError(null)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const trimmedDesc = description.trim()
    const numericAmount = parseFloat(amount)

    // Validation
    let isValid = true

    if (!trimmedDesc) {
      setDescError('Description is required')
      isValid = false
    } else {
      setDescError(null)
    }

    if (isNaN(numericAmount) || numericAmount <= 0) {
      setAmountError('Amount must be a number greater than 0')
      isValid = false
    } else {
      setAmountError(null)
    }

    if (!isValid) return

    // Success call
    onAddExpense(trimmedDesc, numericAmount)

    // Reset Form
    setDescription('')
    setAmount('')
    setDetectedCategory(null)
    
    // Focus back to input
    if (descriptionInputRef.current) {
      descriptionInputRef.current.focus()
    }
  }

  return (
    <section 
      aria-label="Add new expense transaction"
      className="bg-[#1e293b] rounded-xl border border-[#334155] p-5 shadow-sm w-full"
    >
      <h2 className="text-xs font-bold text-[#94a3b8] uppercase tracking-wider mb-4 flex items-center">
        <span className="w-1.5 h-1.5 rounded-full bg-[#6366f1] mr-2"></span> Add New Expense
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {/* Description Field */}
        <div>
          <label 
            htmlFor="expense-description" 
            className="block text-[11px] font-medium text-[#94a3b8] mb-1.5 uppercase tracking-wider"
          >
            Description
          </label>
          <div className="relative">
            <input
              id="expense-description"
              ref={descriptionInputRef}
              type="text"
              value={description}
              onChange={handleDescriptionChange}
              onBlur={handleDescriptionBlur}
              placeholder="e.g. Coffee at Starbucks, Uber ride, Rent"
              className={`w-full bg-[#0f172a] border ${
                descError ? 'border-rose-500 ring-rose-500' : 'border-[#334155] focus:border-[#6366f1]'
              } rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-[#6366f1] focus:outline-none placeholder-[#334155] text-white`}
              aria-label="Expense description text"
              aria-invalid={!!descError}
              aria-describedby={descError ? 'description-error' : undefined}
            />
            {detectedCategory && (
              <span className="absolute right-3 top-2.5 inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#f59e0b]/20 text-[#f59e0b] border border-[#f59e0b]/35 animate-fade-in select-none">
                🏷️ {detectedCategory}
              </span>
            )}
          </div>
          {descError && (
            <p 
              id="description-error" 
              role="alert" 
              className="mt-1.5 text-xs text-rose-400 font-medium"
            >
              ⚠️ {descError}
            </p>
          )}
        </div>

        {/* Amount Field */}
        <div>
          <label 
            htmlFor="expense-amount" 
            className="block text-[11px] font-medium text-[#94a3b8] mb-1.5 uppercase tracking-wider"
          >
            Amount (USD)
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#334155] font-mono">$</span>
            <input
              id="expense-amount"
              type="number"
              step="0.01"
              min="0.01"
              value={amount}
              onChange={handleAmountChange}
              placeholder="0.00"
              className={`w-full bg-[#0f172a] border ${
                amountError ? 'border-rose-500 ring-rose-500' : 'border-[#334155] focus:border-[#6366f1]'
              } rounded-lg pl-8 pr-3 py-2.5 text-sm font-mono focus:ring-2 focus:ring-[#6366f1] focus:outline-none text-white`}
              aria-label="Expense numeric amount in USD"
              aria-invalid={!!amountError}
              aria-describedby={amountError ? 'amount-error' : undefined}
            />
          </div>
          {amountError && (
            <p 
              id="amount-error" 
              role="alert" 
              className="mt-1.5 text-xs text-rose-400 font-medium"
            >
              ⚠️ {amountError}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-[#6366f1] text-white rounded-lg font-semibold text-sm hover:bg-[#4f46e5] transition-shadow shadow-lg shadow-[#6366f1]/10 cursor-pointer"
        >
          Add Expense
        </button>
      </form>
    </section>
  )
}
