"use client"
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import LoginForm from '@/components/LoginForm'
import { useAuth } from '@/hooks/useAuth'

export default function Home() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && user) {
      router.replace('/payment-search')
    }
  }, [loading, user, router])

  return (
    <div className="min-h-screen">
      <LoginForm onSuccess={() => {}}
      />
    </div>
  )
}
