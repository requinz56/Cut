'use client'

import { Search } from 'lucide-react'

interface SearchBarProps {
  value: string
  onChange: (v: string) => void
  placeholder?: string
}

export default function SearchBar({ value, onChange, placeholder = 'חפש עסק או שירות...' }: SearchBarProps) {
  return (
    <div className="relative">
      <Search
        size={18}
        className="absolute end-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none"
      />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-white border border-surface-border rounded-2xl pe-10 ps-4 py-3.5 text-base text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-blue/20 focus:border-blue transition-colors"
      />
    </div>
  )
}
