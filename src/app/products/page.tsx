'use client'

import { useEffect, useState } from 'react'
import { db, auth } from '@/lib/firebase'
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  query,
  where
} from 'firebase/firestore'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'

export default function ProductsPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  const [products, setProducts] = useState<any[]>([])
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading])

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
    if (user) fetchProducts()
  }, [user])

  const handleAddProduct = async () => {
    if (!name || !price) return alert('Isi semua field!')

    await addDoc(collection(db, 'products'), {
      name,
      price: Number(price),
      userId: auth.currentUser?.uid
    })

    setName('')
    setPrice('')
    fetchProducts()
  }

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, 'products', id))
    fetchProducts()
  }

  const handleUpdate = async (id: string) => {
    await updateDoc(doc(db, 'products', id), {
      name,
      price: Number(price)
    })

    setEditingId(null)
    setName('')
    setPrice('')
    fetchProducts()
  }

  if (loading) return <p>Loading...</p>

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Produk</h1>

      <div className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm mb-6 flex flex-col md:flex-row gap-3">
        <input
          type="text"
          placeholder="Nama Produk"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded w-full"
        />

        <input
          type="number"
          placeholder="Harga"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border p-2 rounded w-full"
        />

        <button
          onClick={() =>
            editingId ? handleUpdate(editingId) : handleAddProduct()
          }
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          {editingId ? 'Update' : 'Tambah'}
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm flex justify-between items-center"
          >
            <div>
              <h2 className="font-semibold text-lg">
                {product.name}
              </h2>
              <p className="text-gray-600">
                Rp {product.price}
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  setEditingId(product.id)
                  setName(product.name)
                  setPrice(product.price.toString())
                }}
                className="bg-yellow-400 text-white px-3 py-1 rounded-lg"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(product.id)}
                className="bg-red-500 text-white px-3 py-1 rounded-lg"
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}