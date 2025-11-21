'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { Payment } from '@/types/supabase'

interface PaymentSearchProps {
  onLogout: () => void
}

export default function PaymentSearch({ onLogout }: PaymentSearchProps) {
  const [paymentId, setPaymentId] = useState('')
  const [payment, setPayment] = useState<Payment | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!paymentId.trim()) return

    setLoading(true)
    setError('')
    setPayment(null)

    try {
      const { data, error } = await supabase
        .from('tickets')
        .select('*')
        .eq('payment_id', paymentId)
        .single()

      if (error) {
        if (error.code === 'PGRST116') {
          setError('Pago no encontrado - ID de pago inválido')
        } else {
          setError('Error al buscar el pago')
        }
      } else {
        setPayment(data)
      }
    } catch (err) {
      setError('Error al buscar el pago')
    } finally {
      setLoading(false)
    }
  }

  const clearSearch = () => {
    setPaymentId('')
    setPayment(null)
    setError('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <header className="bg-gray-800/50 backdrop-blur-lg border-b border-gray-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center animate-float">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h1 className="text-xl font-bold text-white">
                Buscador de Pagos
              </h1>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 hover:text-white rounded-lg transition-all duration-200 border border-gray-600/30"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>Cerrar Sesión</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search Section */}
        <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-700/50 p-8 mb-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">
              Buscar Pago
            </h2>
            <p className="text-gray-400">
              Ingresa el ID de pago para ver los detalles del pedido
            </p>
          </div>

          <form onSubmit={handleSearch} className="max-w-md mx-auto">
            <div className="space-y-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={paymentId}
                  onChange={(e) => setPaymentId(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Ej: 134673677430"
                  disabled={loading}
                />
              </div>
              
              <div className="flex space-x-3">
                <button
                  type="submit"
                  disabled={loading || !paymentId.trim()}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 active:scale-95 animate-pulse-glow"
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Buscando...
                    </div>
                  ) : (
                    'Buscar Pago'
                  )}
                </button>
                
                {payment && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="px-6 py-3 bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 hover:text-white rounded-xl font-medium transition-all duration-200 border border-gray-600/30"
                  >
                    Limpiar
                  </button>
                )}
              </div>
            </div>
          </form>

          {error && (
            <div className="mt-6 bg-red-500/20 border border-red-500/30 rounded-lg p-4">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-red-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-red-300 text-sm">{error}</p>
              </div>
            </div>
          )}
        </div>

        {/* Results Section */}
        {payment && (
          <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-700/50 p-8 animate-fade-in animate-shimmer">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">
                Detalles del Pago
              </h2>
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${
                  payment.payment_status === 'paid' ? 'bg-green-500' :
                  payment.payment_status === 'pending' ? 'bg-yellow-500' :
                  'bg-red-500'
                }`}></div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  payment.payment_status === 'paid' ? 'bg-green-500/20 text-green-300' :
                  payment.payment_status === 'pending' ? 'bg-yellow-500/20 text-yellow-300' :
                  'bg-red-500/20 text-red-300'
                }`}>
                  {payment.payment_status.toUpperCase()}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-gray-700/30 rounded-xl p-4 border border-gray-600/30">
                  <h3 className="text-sm font-medium text-gray-400 mb-1">ID del Pago</h3>
                  <p className="text-white font-mono text-sm">{payment.payment_id}</p>
                </div>
                
                <div className="bg-gray-700/30 rounded-xl p-4 border border-gray-600/30">
                  <h3 className="text-sm font-medium text-gray-400 mb-1">Comprador</h3>
                  <p className="text-white font-medium">{payment.buyer_name}</p>
                  <p className="text-gray-300 text-sm">{payment.buyer_email}</p>
                </div>

                <div className="bg-gray-700/30 rounded-xl p-4 border border-gray-600/30">
                  <h3 className="text-sm font-medium text-gray-400 mb-1">Fecha del Pago</h3>
                  <p className="text-white">
                    {new Date(payment.created_at).toLocaleDateString('es-ES', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                  <p className="text-gray-300 text-sm">
                    {new Date(payment.created_at).toLocaleTimeString('es-ES')}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl p-4 border border-blue-500/30">
                  <h3 className="text-sm font-medium text-blue-300 mb-1">Monto Pagado</h3>
                  <p className="text-3xl font-bold text-white">${payment.amount_paid}</p>
                </div>

                <div className="bg-gray-700/30 rounded-xl p-4 border border-gray-600/30">
                  <h3 className="text-sm font-medium text-gray-400 mb-1">Cantidad de Entradas</h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-white">{payment.quantity}</span>
                    <span className="text-gray-300">entradas</span>
                  </div>
                </div>

                <div className="bg-gray-700/30 rounded-xl p-4 border border-gray-600/30">
                  <h3 className="text-sm font-medium text-gray-400 mb-1">ID del Evento</h3>
                  <p className="text-white font-mono">{payment.event_id}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
