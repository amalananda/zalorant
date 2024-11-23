'use client' // Menandakan bahwa ini adalah Client Component

import { useState } from 'react'

export default function LogoutButton() {
  const [loading, setLoading] = useState(false)

  const handleLogout = () => {
    setLoading(true)
    // Menghapus cookie Authorization saat logout
    document.cookie = 'Authorization=; Max-Age=-1; path=/'
    // Memastikan halaman di-refresh setelah logout
    window.location.href = '/' // Redirect ke halaman utama setelah logout
  }

  return (
    <button
      onClick={handleLogout}
      className="text-black font-medium hover:text-gray-500"
      disabled={loading}
    >
      Logout
      {loading ? 'Logging out...' : 'Logout'}
    </button>
  )
}
