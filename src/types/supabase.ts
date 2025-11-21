export interface Payment {
  idx: number
  id: number
  event_id: number
  buyer_name: string
  buyer_email: string
  amount_paid: string
  payment_status: string
  payment_id: string
  created_at: string
  quantity: number
}

export interface Database {
  public: {
    Tables: {
      tickets: {
        Row: Payment
        Insert: Omit<Payment, 'created_at'>
        Update: Partial<Payment>
      }
    }
  }
}