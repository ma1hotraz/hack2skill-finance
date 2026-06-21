import { renderHook, act } from '@testing-library/react'
import { useExpenses } from '../hooks/useExpenses'
import { describe, test, expect } from 'vitest'

describe('useExpenses hook tests', () => {
  // Test 1
  test('initializes with empty expenses array', () => {
    const { result } = renderHook(() => useExpenses())
    expect(result.current.expenses).toEqual([])
  })

  // Test 2
  test('addExpense adds item with correct fields', () => {
    const { result } = renderHook(() => useExpenses())
    act(() => {
      result.current.addExpense('Gym membership', 50)
    })
    expect(result.current.expenses).toHaveLength(1)
    const item = result.current.expenses[0]
    expect(item.description).toBe('Gym membership')
    expect(item.amount).toBe(50)
    expect(item.id).toBeDefined()
    expect(item.date).toBeInstanceOf(Date)
  })

  // Test 3
  test('addExpense auto-categorizes description', () => {
    const { result } = renderHook(() => useExpenses())
    act(() => {
      result.current.addExpense('Whole Foods groceries', 85.5)
    })
    expect(result.current.expenses[0].category).toBe('Food & Drink')
  })

  // Test 4
  test('deleteExpense removes correct item by id', () => {
    const { result } = renderHook(() => useExpenses())
    act(() => {
      result.current.addExpense('Lunch', 15)
    })
    const id = result.current.expenses[0].id
    act(() => {
      result.current.deleteExpense(id)
    })
    expect(result.current.expenses).toEqual([])
  })

  // Test 5
  test('getTotalSpent returns sum of all amounts', () => {
    const { result } = renderHook(() => useExpenses())
    act(() => {
      result.current.addExpense('Subway sandwich', 10.5)
      result.current.addExpense('Gas fuel refill', 45)
    })
    expect(result.current.getTotalSpent).toBe(55.5)
  })

  // Test 6
  test('getTotalByCategory returns correct percentage', () => {
    const { result } = renderHook(() => useExpenses())
    act(() => {
      result.current.addExpense('Whole Foods grocery', 25) // Food & Drink
      result.current.addExpense('Uber taxi', 75) // Transport
    })
    const totals = result.current.getTotalByCategory
    const foodTotal = totals.find((t) => t.category === 'Food & Drink')
    const transportTotal = totals.find((t) => t.category === 'Transport')
    expect(foodTotal?.percentage).toBe(25)
    expect(transportTotal?.percentage).toBe(75)
  })
})
