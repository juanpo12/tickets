'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import LoginForm from '@/components/LoginForm'
import { useAuth } from '@/hooks/useAuth'

export default function Home() {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (user) {
      router.replace('/payment-search')
    }
  }, [user, router])

  return (
    <div className="min-h-screen">
      <LoginForm onSuccess={() => {
        router.push('/payment-search')
      }} />
    </div>
  )
}
