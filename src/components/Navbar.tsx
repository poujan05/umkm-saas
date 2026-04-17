'use client'

import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'

export default function Navbar() {
  const { user } = useAuth()

  return (
    <nav className="bg-white border-b px-6 py-4 flex justify-between items-center">
      <h1 className="font-bold text-blue-600">
        UMKM SaaS
      </h1>

      <div className="flex gap-6 items-center">
        <Link href="/">Home</Link>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/products">Produk</Link>
        <Link href="/faq">FAQ</Link>

        {user && (
          <span className="text-sm text-gray-600">
            {user.email}
          </span>
        )}
      </div>
    </nav>
  )
}