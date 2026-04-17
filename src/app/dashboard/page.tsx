'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { db, auth } from '@/lib/firebase'
import {
  collection,
  getDocs,
  query,
  where
} from 'firebase/firestore'
import { signOut } from 'firebase/auth'

export default function DashboardPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  const [products, setProducts] = useState<any[]>([])

  // 🔐 protect halaman
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading])

  // 🔥 ambil produk user
  const fetchProducts = async () => {
    if (!auth.currentUser) return

    const q = query(
      collection(db, 'products'),
      where('userId', '==', auth.currentUser.uid)
    )

    const snapshot = await getDocs(q)

    const data = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))

    setProducts(data)
  }

  useEffect(() => {
    if (user) {
      fetchProducts()
    }
  }, [user])

  if (loading) return <p>Loading...</p>

  // 📊 HITUNG STATISTIK
  const totalProduk = products.length

  const totalNilai = products.reduce(
    (sum, item: any) => sum + item.price,
    0
  )

  const produkTermahal = products.reduce((max, item: any) => {
    return !max || item.price > max.price ? item : max
  }, null)

  return (
    <div className="p-6 bg-white min-h-screen text-black">
      <h1 className="text-2xl font-bold mb-6">
        Dashboard UMKM
      </h1>

      <p className="mb-4">Selamat datang, {user?.email}</p>

      {/* 📊 CARD */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white text-black p-5 rounded-2xl shadow">
            <h2 className="text-gray-500 text-sm">Total Produk</h2>
            <p className="text-2xl font-bold mt-2">{totalProduk}</p>
        </div>

        <div className="bg-white text-black p-5 rounded-2xl shadow">
            <h2 className="text-gray-500 text-sm">Total Nilai</h2>
            <p className="text-2xl font-bold mt-2">
            Rp {totalNilai}
            </p>
        </div>

        <div className="bg-white text-black p-5 rounded-2xl shadow">
            <h2 className="text-gray-500 text-sm">Produk Termahal</h2>
            <p className="text-2xl font-bold mt-2">
            {produkTermahal ? produkTermahal.name : '-'}
            </p>
        </div>
    </div>

      {/* 🚪 LOGOUT */}
      <button
        onClick={() => {
          signOut(auth)
          router.push('/login')
        }}
        className="bg-red-500 text-white px-4 py-2 mt-6 rounded"
      >
        Logout
      </button>
    </div>
  )
}