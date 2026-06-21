import { describe, test, expect } from 'vitest'
import { formatCurrency, categorizeExpense, sanitizeInput } from '../utils/formatters'

describe('formatters unit tests', () => {
  // Test 1
  test('formatCurrency converts large numbers correctly', () => {
    expect(formatCurrency(1234.5)).toBe('$1,234.50')
  })

  // Test 2
  test('formatCurrency converts zero correctly', () => {
    expect(formatCurrency(0)).toBe('$0.00')
  })

  // Test 3
  test('formatCurrency handles floating point addition safely', () => {
    expect(formatCurrency(0.1 + 0.2)).toBe('$0.30')
  })

  // Test 4
  test('categorizeExpense identifies coffee shop as Food & Drink', () => {
    expect(categorizeExpense('coffee shop')).toBe('Food & Drink')
  })

  // Test 5
  test('categorizeExpense identifies uber ride as Transport', () => {
    expect(categorizeExpense('uber ride')).toBe('Transport')
  })

  // Test 6
  test('categorizeExpense identifies netflix subscription as Entertainment', () => {
    expect(categorizeExpense('netflix subscription')).toBe('Entertainment')
  })

  // Test 7
  test('categorizeExpense defaults unclear descriptions to Other', () => {
    expect(categorizeExpense('random thing')).toBe('Other')
  })

  // Test 8
  test('sanitizeInput strips dangerous script tags and nests trailing plain text', () => {
    expect(sanitizeInput("<script>alert('x')</script>hello")).toBe('hello')
  })
})
