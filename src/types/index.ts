export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export interface Expense {
  id: string
  description: string
  amount: number
  category: ExpenseCategory
  date: Date
}

export type ExpenseCategory =
  | 'Food & Drink'
  | 'Transport'
  | 'Shopping'
  | 'Entertainment'
  | 'Bills & Utilities'
  | 'Health'
  | 'Other'

export interface CategoryTotal {
  category: ExpenseCategory
  total: number
  percentage: number
}

export interface ChatRequest {
  message: string
  expenses: Expense[]
  history: Array<{ role: 'user' | 'assistant'; content: string }>
}

export interface ChatResponse {
  reply: string
}

export interface ApiError {
  message: string
  status: number
}
