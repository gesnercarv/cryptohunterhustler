'use client'

import { useState, useEffect } from 'react'
import { supabase } from './lib/supabaseClient'

interface HealthData {
  gas_price: number
  network_congestion: number
  timestamp: string
}

export default function HomePage() {
  const [healthData, setHealthData] = useState<HealthData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchHealthData()
    const interval = setInterval(fetchHealthData, 30000) // Update every 30 seconds
    return () => clearInterval(interval)
  }, [])

  const fetchHealthData = async () => {
    try {
      const { data, error } = await supabase
        .from('network_health')
        .select('*')
        .order('timestamp', { ascending: false })
        .limit(1)
        .single()

      if (error) throw error
      setHealthData(data)
    } catch (error) {
      console.error('Error fetching health data:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Crypto Hunter Hustler</h1>
        <p className="text-gray-600 mb-6">
          Automated crypto trading platform with real-time on-chain health monitoring
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-50 rounded-lg p-4">
            <h2 className="text-xl font-semibold text-blue-900 mb-2">Network Health</h2>
            {loading ? (
              <p className="text-blue-600">Loading...</p>
            ) : healthData ? (
              <div className="space-y-2">
                <p className="text-blue-700">
                  <strong>Gas Price:</strong> {healthData.gas_price} Gwei
                </p>
                <p className="text-blue-700">
                  <strong>Network Congestion:</strong> {healthData.network_congestion}%
                </p>
                <p className="text-blue-600 text-sm">
                  Last updated: {new Date(healthData.timestamp).toLocaleString()}
                </p>
              </div>
            ) : (
              <p className="text-blue-600">No data available</p>
            )}
          </div>
          
          <div className="bg-green-50 rounded-lg p-4">
            <h2 className="text-xl font-semibold text-green-900 mb-2">Quick Actions</h2>
            <div className="space-y-2">
              <a href="/wallet" className="block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                View Wallet
              </a>
              <a href="/swap" className="block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Token Swap
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
