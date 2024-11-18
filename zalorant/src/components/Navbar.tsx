import Link from 'next/link'


export default function Navbar() {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">daisyUI</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li><Link href='/'>Home</Link> </li>
          <li><a>Products</a></li>
          <li><a>Login</a></li>
          <li><Link href='/register'>Register</Link> </li>
        </ul>
      </div>
    </div>
  )
}
