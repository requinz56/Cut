'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Camera, ChevronLeft } from 'lucide-react'
import AppShell from '@/components/layout/AppShell'
import BottomNav from '@/components/layout/BottomNav'
import PageHeader from '@/components/layout/PageHeader'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import Select from '@/components/ui/Select'
import Button from '@/components/ui/Button'
import SectionHeader from '@/components/ui/SectionHeader'
import ContactLink from '@/components/domain/ContactLink'
import { BUSINESS_SETTINGS, CATEGORIES } from '@/lib/mock-data'
import type { ContactInfo } from '@/types'

const CONTACT_TYPES = ['phone', 'whatsapp', 'waze', 'instagram', 'facebook'] as const
const CONTACT_LABELS: Record<string, string> = {
  phone: 'טלפון',
  whatsapp: 'וואטסאפ',
  waze: 'Waze (קישור)',
  instagram: 'אינסטגרם',
  facebook: 'פייסבוק',
}

export default function OwnerSettingsPage() {
  const router = useRouter()
  const [name, setName] = useState(BUSINESS_SETTINGS.name)
  const [category, setCategory] = useState(BUSINESS_SETTINGS.category)
  const [about, setAbout] = useState(BUSINESS_SETTINGS.about)
  const [contact, setContact] = useState<ContactInfo>(BUSINESS_SETTINGS.contact)
  const [saved, setSaved] = useState(false)

  function handleSave() {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  function updateContact(field: keyof ContactInfo, value: string) {
    setContact((prev) => ({ ...prev, [field]: value }))
  }

  const visibleContacts = CONTACT_TYPES.filter((t) => contact[t as keyof ContactInfo])

  return (
    <AppShell>
      <PageHeader title="הגדרות עסק" showBack={false} />

      <div className="px-4 py-5 space-y-6">
        {/* Business image */}
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="relative w-24 h-24 rounded-2xl overflow-hidden border-2 border-surface-border">
              <Image
                src={BUSINESS_SETTINGS.imageUrl}
                alt={name}
                fill
                className="object-cover"
                sizes="96px"
              />
            </div>
            <button
              type="button"
              aria-label="שנה תמונה"
              className="absolute -bottom-1 -start-1 w-8 h-8 bg-blue rounded-full flex items-center justify-center text-white tap-highlight-none shadow-md"
            >
              <Camera size={14} />
            </button>
          </div>
          <p className="text-xs text-text-muted mt-2">תמונת העסק / לוגו</p>
        </div>

        {/* Basic info */}
        <div className="space-y-4">
          <SectionHeader title="פרטי העסק" />
          <Input label="שם העסק" value={name} onChange={setName} />
          <Select
            label="קטגוריה"
            value={category}
            onChange={(v) => setCategory(v as typeof category)}
            options={CATEGORIES.map((c) => ({ value: c.id, label: c.label }))}
          />
          <Textarea
            label="אודות העסק"
            value={about}
            onChange={setAbout}
            rows={4}
            maxLength={300}
            placeholder="כתוב תיאור קצר על העסק, השירותים והייחוד שלך..."
          />
        </div>

        {/* Contact info */}
        <div className="space-y-4">
          <SectionHeader title="אמצעי יצירת קשר" />
          {CONTACT_TYPES.map((type) => (
            <Input
              key={type}
              label={CONTACT_LABELS[type]}
              value={contact[type as keyof ContactInfo] ?? ''}
              onChange={(v) => updateContact(type as keyof ContactInfo, v)}
              type={type === 'phone' || type === 'whatsapp' ? 'tel' : 'text'}
              placeholder={type === 'phone' ? '03-000-0000' : type === 'instagram' ? '@handle' : 'https://...'}
            />
          ))}
        </div>

        {/* Preview contact links */}
        {visibleContacts.length > 0 && (
          <div>
            <p className="text-sm font-medium text-text-primary mb-2">תצוגה מקדימה</p>
            <div className="grid grid-cols-4 gap-2">
              {visibleContacts.map((type) => (
                <ContactLink
                  key={type}
                  type={type}
                  value={contact[type as keyof ContactInfo] ?? ''}
                />
              ))}
            </div>
          </div>
        )}

        <Button
          variant={saved ? 'secondary' : 'primary'}
          size="lg"
          fullWidth
          onClick={handleSave}
        >
          {saved ? '✓ נשמר בהצלחה' : 'שמור שינויים'}
        </Button>

        {/* Switch to customer view */}
        <button
          type="button"
          onClick={() => router.push('/')}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-surface-border text-sm font-medium text-text-secondary hover:border-blue hover:text-blue transition-colors tap-highlight-none"
        >
          <span>מעבר לממשק לקוח</span>
          <ChevronLeft size={16} />
        </button>
      </div>

      <BottomNav variant="owner" />
    </AppShell>
  )
}
