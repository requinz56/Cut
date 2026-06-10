'use client'

import { useState } from 'react'
import { Plus, Edit2, Trash2, X } from 'lucide-react'
import AppShell from '@/components/layout/AppShell'
import BottomNav from '@/components/layout/BottomNav'
import PageHeader from '@/components/layout/PageHeader'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { PROVIDERS } from '@/lib/mock-data'
import { formatPrice, formatDuration } from '@/lib/format'
import type { Service } from '@/types'

const DEMO_PROVIDER = PROVIDERS.find((p) => p.id === 'gentleman-barber')!

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>(DEMO_PROVIDER.services)
  const [showAdd, setShowAdd] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState({ name: '', duration: '', price: '' })

  function resetForm() {
    setForm({ name: '', duration: '', price: '' })
    setShowAdd(false)
    setEditingId(null)
  }

  function handleAdd() {
    if (!form.name || !form.price) return
    const newService: Service = {
      id: `svc-${Date.now()}`,
      providerId: DEMO_PROVIDER.id,
      name: form.name,
      durationMins: parseInt(form.duration) || 30,
      priceILS: parseInt(form.price) || 0,
    }
    setServices((prev) => [...prev, newService])
    resetForm()
  }

  function handleEdit(id: string) {
    const svc = services.find((s) => s.id === id)
    if (!svc) return
    setForm({ name: svc.name, duration: String(svc.durationMins), price: String(svc.priceILS) })
    setEditingId(id)
  }

  function handleSaveEdit() {
    if (!editingId) return
    setServices((prev) =>
      prev.map((s) =>
        s.id === editingId
          ? {
              ...s,
              name: form.name,
              durationMins: parseInt(form.duration) || s.durationMins,
              priceILS: parseInt(form.price) || s.priceILS,
            }
          : s
      )
    )
    resetForm()
  }

  function handleDelete(id: string) {
    setServices((prev) => prev.filter((s) => s.id !== id))
  }

  const isFormOpen = showAdd || editingId !== null

  return (
    <AppShell>
      <PageHeader
        title="שירותים ומחירים"
        showBack={false}
        action={!isFormOpen ? { label: 'הוסף', onClick: () => setShowAdd(true) } : undefined}
      />

      {/* Add / Edit form */}
      {isFormOpen && (
        <div className="mx-4 mb-4 bg-blue-light rounded-xl p-4 border border-blue/20">
          <div className="flex items-center justify-between mb-3">
            <p className="font-semibold text-text-primary text-sm">
              {editingId ? 'עריכת שירות' : 'הוספת שירות'}
            </p>
            <button type="button" onClick={resetForm} aria-label="סגור" className="tap-highlight-none text-text-muted hover:text-text-primary">
              <X size={18} />
            </button>
          </div>
          <div className="space-y-3">
            <Input label="שם השירות" value={form.name} onChange={(v) => setForm((f) => ({ ...f, name: v }))} placeholder="תספורת גברים" />
            <div className="grid grid-cols-2 gap-3">
              <Input label="משך (דקות)" value={form.duration} onChange={(v) => setForm((f) => ({ ...f, duration: v }))} type="number" placeholder="30" />
              <Input label="מחיר (₪)" value={form.price} onChange={(v) => setForm((f) => ({ ...f, price: v }))} type="number" placeholder="60" dir="ltr" />
            </div>
            <Button variant="primary" size="md" fullWidth onClick={editingId ? handleSaveEdit : handleAdd}>
              {editingId ? 'שמור שינויים' : 'הוסף שירות'}
            </Button>
          </div>
        </div>
      )}

      {/* Services list */}
      <div className="px-4 py-4 space-y-2">
        {services.map((svc) => (
          <div key={svc.id} className="bg-white rounded-xl border border-surface-border shadow-card p-4 flex items-center gap-3">
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-text-primary text-sm">{svc.name}</p>
              <p className="text-xs text-text-muted mt-0.5">{formatDuration(svc.durationMins)}</p>
            </div>
            <span className="font-bold text-text-primary" dir="ltr">{formatPrice(svc.priceILS)}</span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => handleEdit(svc.id)}
                aria-label="ערוך שירות"
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-blue-light transition-colors tap-highlight-none text-text-muted hover:text-blue"
              >
                <Edit2 size={15} />
              </button>
              <button
                type="button"
                onClick={() => handleDelete(svc.id)}
                aria-label="מחק שירות"
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-red-50 transition-colors tap-highlight-none text-text-muted hover:text-status-cancelled"
              >
                <Trash2 size={15} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <BottomNav variant="owner" />
    </AppShell>
  )
}
