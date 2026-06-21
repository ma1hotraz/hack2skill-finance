import { useState, useMemo, useCallback } from 'react'
import { Expense, CategoryTotal, ExpenseCategory } from '../types'
import { categorizeExpense, generateId } from '../utils/formatters'

export function useExpenses() {
  const [expenses, setExpenses] = useState<Expense[]>([])

  const addExpense = useCallback((description: string, amount: number) => {
    const newExpense: Expense = {
      id: generateId(),
      description,
      amount,
      category: categorizeExpense(description),
      date: new Date()
    }
    setExpenses((prev) => [...prev, newExpense])
  }, [])

  const deleteExpense = useCallback((id: string) => {
    setExpenses((prev) => prev.filter((item) => item.id !== id))
  }, [])

  const clearExpenses = useCallback(() => {
    setExpenses([])
  }, [])

  const getTotalSpent = useMemo((): number => {
    return expenses.reduce((sum, item) => sum + item.amount, 0)
  }, [expenses])

  const getTotalByCategory = useMemo((): CategoryTotal[] => {
    const categories: ExpenseCategory[] = [
      'Food & Drink',
      'Transport',
      'Shopping',
      'Entertainment',
      'Bills & Utilities',
      'Health',
      'Other'
    ]

    const totalsMap = expenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount
      return acc
    }, {} as Record<ExpenseCategory, number>)

    const sum = expenses.reduce((acc, expense) => acc + expense.amount, 0)

    return categories.map((category) => {
      const total = totalsMap[category] || 0
      const percentage = sum > 0 ? (total / sum) * 100 : 0
      return {
        category,
        total,
        percentage
      }
    })
  }, [expenses])

  return {
    expenses,
    addExpense,
    deleteExpense,
    getTotalByCategory,
    getTotalSpent,
    clearExpenses
  }
}
