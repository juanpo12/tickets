'use client'
import { useRouter } from 'next/navigation'
import LoginForm from '@/components/LoginForm'
import PaymentSearch from '@/components/PaymentSearch'
import { useAuth } from '@/hooks/useAuth'

export default function Home() {
  const { user, signOut } = useAuth()
  const router = useRouter()

  const handleLogout = async () => {
    await signOut()
  }

  return (
    <div className="min-h-screen">
      {user ? (
        <PaymentSearch onLogout={handleLogout} />
      ) : (
        <LoginForm onSuccess={() => {
          router.push('/payment-search')
        }} />
      )}
    </div>
  )
}
