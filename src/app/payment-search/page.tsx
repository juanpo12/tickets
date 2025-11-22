'use client'

import { useEffect } from 'react'
import PaymentSearch from '@/components/PaymentSearch'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'

export default function PaymentSearchPage() {
  const { user, loading, signOut } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/')
    }
  }, [loading, user, router])

  if (loading || !user) return null

  const handleLogout = async () => {
    await signOut()
    router.replace('/')
  }

  return <PaymentSearch onLogout={handleLogout} />
}