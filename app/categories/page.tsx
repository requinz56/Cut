'use client'

import { useRouter } from 'next/navigation'
import AppShell from '@/components/layout/AppShell'
import BottomNav from '@/components/layout/BottomNav'
import PageHeader from '@/components/layout/PageHeader'
import CategoryCard from '@/components/domain/CategoryCard'
import { CATEGORIES } from '@/lib/mock-data'

export default function CategoriesPage() {
  const router = useRouter()

  return (
    <AppShell>
      <PageHeader title="קטגוריות" />
      <div className="px-4 py-4">
        <div className="grid grid-cols-3 gap-3">
          {CATEGORIES.map((cat) => (
            <CategoryCard
              key={cat.id}
              category={cat}
              onClick={() => router.push(`/providers?category=${cat.id}`)}
            />
          ))}
        </div>
      </div>
      <BottomNav variant="customer" />
    </AppShell>
  )
}
