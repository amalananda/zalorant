'use client' // Menjadikan komponen ini sebagai Client Component

import { useState } from 'react'

export default function Register() {
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setError(null)
    setSuccessMessage(null)

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        username,
        email,
        password,
      }),
    })

    if (response.ok) {
      // Jika register berhasil
      setSuccessMessage('Registration successful! You can now log in.')
      setName('')
      setUsername('')
      setEmail('')
      setPassword('')
    } else {
      const data = await response.json()
      setError(data.error || 'Registration failed')
    }
  }

  return (
    <>
      <div className="flex h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-white">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-black">
            Register to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Input Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-black">
                Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full rounded-md border-2 border-gray-300 bg-white text-black shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:border-black sm:text-sm"
                />
              </div>
            </div>

            {/* Input Username */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-black">
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full rounded-md border-2 border-gray-300 bg-white text-black shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:border-black sm:text-sm"
                />
              </div>
            </div>

            {/* Input Email */}
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-md border-2 border-gray-300 bg-white text-black shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:border-black sm:text-sm"
                />
              </div>
            </div>

            {/* Input Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-black">
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-md border-2 border-gray-300 bg-white text-black shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:border-black sm:text-sm"
                />
              </div>
            </div>

            {/* Pesan Error */}
            {error && (
              <div className="text-red-600 text-sm">
                <p>{error}</p>
              </div>
            )}

            {/* Pesan Sukses */}
            {successMessage && (
              <div className="text-green-600 text-sm">
                <p>{successMessage}</p>
              </div>
            )}

            {/* Tombol Register */}
            <div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-black text-white font-semibold rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
