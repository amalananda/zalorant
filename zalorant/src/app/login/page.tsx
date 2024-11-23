'use client'  // Menandakan ini adalah Client Component
export const dynamic = 'force-dynamic'

import { useState } from 'react'

export default function Login() {
  // State untuk form input
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  // Handle submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setError(null)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })

      // Pastikan status HTTP adalah 200 (OK) dan response berupa JSON
      if (!response.ok) {
        const errorData = await response.text()
        throw new Error(`Error: ${response.status} - ${errorData}`)
      }

      const data = await response.json()
      console.log('Login successful:', data)
      window.location.href = '/'
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || 'Login failed')
      } else {
        setError('Terjadi kesalahan yang tidak diketahui')
      }
    }
  }

  return (
    <>
      <div className="flex h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-white">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-black">
            Login to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-black">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-md border-2 border-gray-300 bg-white text-black shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:border-black sm:text-sm"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-black">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-md border-2 border-gray-300 bg-white text-black shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:border-black sm:text-sm"
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="text-red-600 text-sm">
                <p>{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-black text-white font-semibold rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
