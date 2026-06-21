import React from 'react'
import { BarChart3, Lightbulb, Calendar, Search } from 'lucide-react'

interface QuickActionsProps {
  onActionClick: (text: string) => void
  isLoading: boolean
}

export function QuickActions({ onActionClick, isLoading }: QuickActionsProps) {
  const actions = [
    {
      label: 'Analyze Spending',
      prompt: 'Can you analyze my current spending and give me a summary?',
      icon: BarChart3,
    },
    {
      label: 'Saving Tips',
      prompt: 'What are some practical saving tips based on my budget?',
      icon: Lightbulb,
    },
    {
      label: 'Monthly Budget',
      prompt: 'Help me plan a monthly budget structure for these categories.',
      icon: Calendar,
    },
    {
      label: 'Biggest Expense',
      prompt: 'Identify my largest expense category and suggest ways to optimize it.',
      icon: Search,
    }
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full">
      {actions.map((act) => {
        const Icon = act.icon
        return (
          <button
            key={act.label}
            onClick={() => onActionClick(act.prompt)}
            disabled={isLoading}
            className="px-2 py-2.5 bg-[#0f172a] border border-[#334155] rounded-lg text-[10px] font-bold uppercase tracking-wider text-[#94a3b8] hover:border-[#6366f1] hover:text-[#6366f1] transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed select-none"
            aria-label={`Ask AI to: ${act.label}`}
          >
            <Icon className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="truncate">{act.label}</span>
          </button>
        )
      })}
    </div>
  )
}
