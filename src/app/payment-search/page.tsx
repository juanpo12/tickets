'use client'

import PaymentSearch from '@/components/PaymentSearch'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function PaymentSearchPage() {
  const { user, signOut } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.replace('/')
    }
  }, [user, router])

  if (!user) return null

  const handleLogout = async () => {
    await signOut()
    router.replace('/')
  }

  return <PaymentSearch onLogout={handleLogout} />
}