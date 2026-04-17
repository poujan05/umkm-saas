'use client'

import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'

export default function Navbar() {
  const { user } = useAuth()

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-white text-black shadow">
      <h1 className="font-bold text-lg text-blue-600">
        UMKM SaaS
      </h1>

      <div className="flex gap-6 items-center">
        <Link href="/" className="hover:text-blue-600">
          Home
        </Link>
        <Link href="/dashboard" className="hover:text-blue-600">
          Dashboard
        </Link>
        <Link href="/products" className="hover:text-blue-600">
          Produk
        </Link>
        <Link href="/faq" className="hover:text-blue-600">
          FAQ
        </Link>

        {user && (
          <span className="text-sm text-gray-500">
            {user.email}
          </span>
        )}
      </div>
    </nav>
  )
}