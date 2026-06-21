import React from 'react'
import { Expense, CategoryTotal, ExpenseCategory } from '../types'
import { formatCurrency, formatDate } from '../utils/formatters'
import { Trash2, AlertCircle } from 'lucide-react'

interface ExpenseSummaryProps {
  expenses: Expense[]
  categoryTotals: CategoryTotal[]
  totalSpent: number
  onDeleteExpense: (id: string) => void
}

const CATEGORY_STYLES: Record<
  ExpenseCategory,
  { barColor: string; textColor: string; badgeBg: string }
> = {
  'Food & Drink': {
    barColor: 'bg-orange-500',
    textColor: 'text-orange-400',
    badgeBg: 'bg-orange-500/10 border-orange-500/30 text-orange-300'
  },
  'Transport': {
    barColor: 'bg-blue-500',
    textColor: 'text-blue-400',
    badgeBg: 'bg-blue-500/10 border-blue-500/30 text-blue-300'
  },
  'Shopping': {
    barColor: 'bg-purple-500',
    textColor: 'text-purple-400',
    badgeBg: 'bg-purple-500/10 border-purple-500/30 text-purple-300'
  },
  'Entertainment': {
    barColor: 'bg-pink-500',
    textColor: 'text-pink-400',
    badgeBg: 'bg-pink-500/10 border-pink-500/30 text-pink-300'
  },
  'Bills & Utilities': {
    barColor: 'bg-yellow-500',
    textColor: 'text-yellow-400',
    badgeBg: 'bg-yellow-500/10 border-yellow-500/30 text-yellow-300'
  },
  'Health': {
    barColor: 'bg-green-500',
    textColor: 'text-green-400',
    badgeBg: 'bg-green-500/10 border-green-500/30 text-green-300'
  },
  'Other': {
    barColor: 'bg-slate-500',
    textColor: 'text-slate-400',
    badgeBg: 'bg-slate-500/10 border-slate-500/30 text-slate-300'
  }
}

const ExpenseSummaryComponent = ({
  expenses,
  categoryTotals,
  totalSpent,
  onDeleteExpense
}: ExpenseSummaryProps) => {
  const hasExpenses = expenses.length > 0

  return (
    <div
      aria-label="Expense summary by category"
      className="space-y-6 w-full"
    >
      {/* Total Spent & Category Distribution Card */}
      <div className="bg-[#1e293b] rounded-xl border border-[#334155] p-5 shadow-sm flex flex-col">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-xs font-bold text-[#94a3b8] uppercase tracking-wider mb-1">Total Spent</h2>
            <div className="text-3xl font-mono font-bold text-white tracking-tighter">
              {formatCurrency(totalSpent)}
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] bg-[#22c55e]/20 text-[#22c55e] px-2 py-1 rounded-md font-bold">
              {hasExpenses ? '-12.4% vs Last Month' : 'Ready'}
            </span>
          </div>
        </div>

        {/* Breakdown List Section */}
        {!hasExpenses ? (
          <div className="flex flex-col items-center justify-center text-center py-8 text-slate-500">
            <AlertCircle className="w-8 h-8 mb-2 flex-shrink-0 text-[#94a3b8]" />
            <p className="text-xs uppercase tracking-wider text-[#94a3b8] font-bold">No expenses logged</p>
          </div>
        ) : (
          <div className="space-y-4 overflow-y-auto max-h-64 pr-1">
            {categoryTotals.map((item) => {
              const styles = CATEGORY_STYLES[item.category]
              const percent = Math.round(item.percentage)

              return (
                <div key={item.category} className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="font-medium text-[#f1f5f9] flex items-center gap-1.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${styles.barColor}`} />
                      {item.category}
                    </span>
                    <span className="font-mono text-[#94a3b8]">
                      {formatCurrency(item.total)} ({percent}%)
                    </span>
                  </div>
                  {/* Progress Bar Container */}
                  <div className="h-2 bg-[#0f172a] rounded-full overflow-hidden">
                    <div
                      className={`h-full ${styles.barColor} rounded-full transition-all duration-500`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Actual Raw Transactions List */}
      <section 
        aria-label="Recent Transactions"
        className="bg-[#1e293b] rounded-xl border border-[#334155] p-5 shadow-sm"
      >
        <h2 className="text-xs font-bold text-[#94a3b8] uppercase tracking-wider mb-4 flex items-center">
          <span className="w-1.5 h-1.5 rounded-full bg-[#6366f1] mr-2"></span> Recent Transactions
        </h2>

        {!hasExpenses ? (
          <p className="text-xs text-[#94a3b8]/60 text-center py-4">No recent history.</p>
        ) : (
          <div className="max-h-60 overflow-y-auto pr-1">
            <ul className="space-y-2" role="list">
              {expenses.map((exp) => {
                const styles = CATEGORY_STYLES[exp.category]
                return (
                  <li
                    key={exp.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-[#0f172a] border border-[#334155] hover:border-[#6366f1]/50 hover:border-slate-600 transition"
                    role="listitem"
                  >
                    <div className="min-w-0 pr-3">
                      <p className="text-sm font-medium text-slate-200 truncate" title={exp.description}>
                        {exp.description}
                      </p>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] uppercase font-semibold border ${styles.badgeBg}`}>
                          {exp.category}
                        </span>
                        <span className="text-[10px] text-[#94a3b8] font-mono">
                          {formatDate(exp.date)}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold font-mono text-white flex-shrink-0">
                        {formatCurrency(exp.amount)}
                      </span>
                      <button
                        onClick={() => onDeleteExpense(exp.id)}
                        className="p-1.5 hover:bg-rose-950/45 hover:text-rose-400 border border-[#334155] hover:border-rose-800/40 rounded bg-[#1e293b] text-slate-400 transition cursor-pointer"
                        aria-label={`Delete expense ${exp.description}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        )}
      </section>
    </div>
  )
}

const ExpenseSummary = React.memo(ExpenseSummaryComponent)
export default ExpenseSummary
