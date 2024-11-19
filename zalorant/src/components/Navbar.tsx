import Link from 'next/link';
import Search from './Search'

export default function Navbar() {
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
          <li>
            <Link href="/login" className="text-black font-medium hover:text-gray-500">
              Login
            </Link>
          </li>
          <li>
            <Link href="/register" className="text-black font-medium hover:text-gray-500">
              Register
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
