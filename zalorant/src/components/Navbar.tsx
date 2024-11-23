import Link from 'next/link'
import Search from './Search'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'


export default function Navbar() {
  const isLoggedIn = cookies().has('Authorization')

  return (
    <div className="navbar bg-white shadow-md">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl font-bold text-black">Zalorant</a>
      </div>
      <Search />
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 space-x-4">
          <li>
            <Link href="/" className="text-black font-medium hover:text-gray-500">
              Home
            </Link>
          </li>
          <li>
            <Link href="/products" className="text-black font-medium hover:text-gray-500">
              Products
            </Link>
          </li>
          {isLoggedIn && (
            <li>
              <Link href="/wishlist" className="text-black font-medium hover:text-gray-500">
                Wishlist
              </Link>
            </li>
          )}
          {
            isLoggedIn ? (
              <li>
                <form action={async () => {
                  'use server'

                  cookies().delete('Authorization')
                  cookies().delete('token')
                  redirect('/')
                }}>
                  <button>Logout</button>
                </form>
              </li>
            ) : (
              <li>
                <Link href="/login" className="text-black font-medium hover:text-gray-500">
                  Login
                </Link>
              </li>
            )
          }
          <li>
            <Link href="/register" className="text-black font-medium hover:text-gray-500">
              Register
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}
