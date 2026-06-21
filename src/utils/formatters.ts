import { ExpenseCategory } from '../types'

/**
 * Formats a number as USD currency string
 * @param amount - numeric value to format
 */
export const formatCurrency = (amount: number): string => {
  // Safe floating point handling (e.g. 0.1 + 0.2 = 0.3)
  const rounded = Math.round(amount * 100) / 100
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(rounded)
}

/**
 * Formats a Date object to locale date string
 */
export const formatDate = (date: Date): string => {
  const d = new Date(date)
  if (isNaN(d.getTime())) return ''
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })
}

/**
 * Auto-categorizes expense based on description keywords
 */
export const categorizeExpense = (description: string): ExpenseCategory => {
  const desc = (description || '').toLowerCase()
  
  const rules: { keywords: string[]; category: ExpenseCategory }[] = [
    {
      keywords: ['food', 'coffee', 'restaurant', 'lunch', 'dinner', 'grocery'],
      category: 'Food & Drink'
    },
    {
      keywords: ['uber', 'taxi', 'bus', 'metro', 'fuel', 'petrol', 'train'],
      category: 'Transport'
    },
    {
      keywords: ['amazon', 'shop', 'clothes', 'shoes', 'mall'],
      category: 'Shopping'
    },
    {
      keywords: ['netflix', 'movie', 'game', 'spotify', 'concert'],
      category: 'Entertainment'
    },
    {
      keywords: ['rent', 'electricity', 'wifi', 'internet', 'bill', 'phone'],
      category: 'Bills & Utilities'
    },
    {
      keywords: ['gym', 'doctor', 'medicine', 'pharmacy', 'health'],
      category: 'Health'
    }
  ]

  for (const rule of rules) {
    if (rule.keywords.some(keyword => desc.includes(keyword))) {
      return rule.category
    }
  }

  return 'Other'
}

/**
 * Generates a unique ID string
 */
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 11) + Date.now().toString(36)
}

/**
 * Sanitizes user input — strips HTML, trims, limits to 500 chars
 */
export const sanitizeInput = (input: string): string => {
  if (!input) return ''
  // 1. Remove script blocks and comments first
  let clean = input.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
  // 2. Strip any other HTML tags
  clean = clean.replace(/<[^>]*>/g, '')
  return clean.trim().substring(0, 500)
}

/**
 * Truncates text to given length with ellipsis
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}
