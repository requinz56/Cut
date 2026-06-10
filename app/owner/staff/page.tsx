'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import AppShell from '@/components/layout/AppShell'
import BottomNav from '@/components/layout/BottomNav'
import PageHeader from '@/components/layout/PageHeader'
import StaffCard from '@/components/domain/StaffCard'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { STAFF_MEMBERS } from '@/lib/mock-data'
import type { StaffMember, StaffStatus } from '@/types'

export default function StaffPage() {
  const [staff, setStaff] = useState<StaffMember[]>(STAFF_MEMBERS)
  const [showAdd, setShowAdd] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [newName, setNewName] = useState('')
  const [newRole, setNewRole] = useState('')
  const [newPhone, setNewPhone] = useState('')

  const activeStaff = staff.filter((s) => s.status !== 'removed')
  const removedStaff = staff.filter((s) => s.status === 'removed')

  function handleToggle(id: string) {
    setStaff((prev) =>
      prev.map((s) =>
        s.id === id
          ? { ...s, status: s.status === 'active' ? 'inactive' : ('active' as StaffStatus) }
          : s
      )
    )
  }

  function handleStatusChange(id: string, status: StaffStatus) {
    setStaff((prev) => prev.map((s) => (s.id === id ? { ...s, status } : s)))
    setEditingId(null)
  }

  function handleRemove(id: string) {
    setStaff((prev) => prev.filter((s) => s.id !== id))
  }

  function handleAdd() {
    if (!newName.trim()) return
    const newMember: StaffMember = {
      id: `staff-${Date.now()}`,
      name: newName.trim(),
      role: newRole.trim() || 'איש צוות',
      phone: newPhone.trim(),
      status: 'active',
      joinedDate: new Date().toISOString().split('T')[0],
      hasBookingHistory: false,
    }
    setStaff((prev) => [newMember, ...prev])
    setNewName('')
    setNewRole('')
    setNewPhone('')
    setShowAdd(false)
  }

  return (
    <AppShell>
      <PageHeader
        title="ניהול צוות"
        showBack={false}
        action={{ label: 'הוסף', onClick: () => setShowAdd(true) }}
      />

      {/* Add form */}
      {showAdd && (
        <div className="mx-4 mb-4 bg-white rounded-2xl p-4 border border-blue/20 shadow-[0_2px_12px_rgba(37,99,235,0.09)]">
          <div className="flex items-center justify-between mb-3">
            <p className="font-bold text-text-primary text-sm">הוספת עובד</p>
            <button type="button" onClick={() => setShowAdd(false)} aria-label="סגור" className="tap-highlight-none w-7 h-7 flex items-center justify-center rounded-lg bg-surface hover:bg-red-50 hover:text-status-cancelled transition-colors text-text-muted">
              <X size={15} />
            </button>
          </div>
          <div className="space-y-3">
            <Input label="שם מלא" value={newName} onChange={setNewName} placeholder="שם פרטי ושם משפחה" />
            <Input label="תפקיד" value={newRole} onChange={setNewRole} placeholder="ספר" />
            <Input label="טלפון" value={newPhone} onChange={setNewPhone} type="tel" placeholder="050-000-0000" />
            <Button variant="primary" size="md" fullWidth onClick={handleAdd}>
              הוסף עובד
            </Button>
          </div>
        </div>
      )}

      <div className="px-4 py-4 space-y-3">
        {/* Active / inactive staff */}
        {activeStaff.map((member) => (
          <div key={member.id}>
            <StaffCard
              staff={member}
              onEdit={() => setEditingId(editingId === member.id ? null : member.id)}
              onToggle={() => handleToggle(member.id)}
              onRemove={!member.hasBookingHistory ? () => handleRemove(member.id) : undefined}
            />
            {editingId === member.id && (
              <div className="bg-surface border-x border-b border-surface-border rounded-b-xl px-4 py-3 -mt-1 space-y-2">
                <p className="text-xs font-medium text-text-muted">שינוי מצב</p>
                {(['active', 'inactive'] as StaffStatus[]).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => handleStatusChange(member.id, s)}
                    className={[
                      'w-full text-start text-sm py-2 px-3 rounded-lg transition-colors tap-highlight-none',
                      member.status === s
                        ? 'bg-blue-light text-blue font-medium'
                        : 'hover:bg-surface text-text-secondary',
                    ].join(' ')}
                  >
                    {s === 'active' ? 'פעיל' : 'לא פעיל'}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Removed staff section */}
        {removedStaff.length > 0 && (
          <div className="pt-2">
            <p className="text-xs font-medium text-text-muted mb-2 px-1">לא בצוות</p>
            {removedStaff.map((member) => (
              <StaffCard key={member.id} staff={member} />
            ))}
          </div>
        )}
      </div>

      <BottomNav variant="owner" />
    </AppShell>
  )
}
