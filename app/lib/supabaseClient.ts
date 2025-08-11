import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface NetworkHealth {
  id: number
  gas_price: number
  network_congestion: number
  timestamp: string
  created_at: string
}

export interface SwapTransaction {
  id: number
  from_token: string
  to_token: string
  from_amount: string
  to_amount: string
  wallet_address: string
  transaction_hash?: string
  status: 'pending' | 'completed' | 'failed'
  created_at: string
}
