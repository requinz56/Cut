'use client'

import { useCallback } from 'react'
import type { Appointment } from '@/types'
import { SAMPLE_APPOINTMENTS } from '@/lib/mock-data'
import { useLocalStorage } from './useLocalStorage'

export function useAppointments() {
  const [appointments, setAppointments] = useLocalStorage<Appointment[]>(
    'tor5:appointments',
    SAMPLE_APPOINTMENTS
  )

  const addAppointment = useCallback(
    (apt: Appointment) => {
      setAppointments((prev) => [apt, ...prev])
    },
    [setAppointments]
  )

  const cancelAppointment = useCallback(
    (id: string) => {
      setAppointments((prev) =>
        prev.map((apt) =>
          apt.id === id ? { ...apt, status: 'cancelled' as const } : apt
        )
      )
    },
    [setAppointments]
  )

  const upcoming = appointments.filter(
    (a) => a.status === 'confirmed' || a.status === 'pending'
  )
  const past = appointments.filter(
    (a) => a.status === 'completed' || a.status === 'cancelled'
  )

  return { appointments, upcoming, past, addAppointment, cancelAppointment }
}
