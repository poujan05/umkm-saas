'use client'

import { useEffect, useState } from 'react'
import { db,
    auth
} from '@/lib/firebase'
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
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [products, setProducts] = useState<any[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)

  const { user, loading } = useAuth()
  const router = useRouter()

    useEffect(() => {
    if (!loading && !user) {
        router.push('/login')
    }
    }, [user, loading])

  // 🔹 ambil data
  const fetchProducts = async () => {
  if (!auth.currentUser) return

  const q = query(
    collection(db, 'products'),
    where('userId', '==', auth.currentUser.uid)
  )

  const querySnapshot = await getDocs(q)

  const data = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }))

  setProducts(data)
}

  useEffect(() => {
    fetchProducts()
  }, [])

  // 🔹 tambah produk
  const handleAddProduct = async () => {
  if (!name || !price) return alert('Isi semua field!')

  try {
    await addDoc(collection(db, 'products'), {
      name,
      price: Number(price),
      userId: auth.currentUser?.uid, // 🔥 INI KUNCINYA
      createdAt: new Date()
    })

    setName('')
    setPrice('')
    fetchProducts()
  } catch (error) {
    console.error(error)
  }
}

  // 🔹 hapus produk
  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'products', id))
      fetchProducts()
    } catch (error) {
      console.error(error)
    }
  }

  // 🔹 update produk
  const handleUpdate = async (id: string) => {
    if (!name || !price) return alert('Isi semua field!')

    try {
      await updateDoc(doc(db, 'products', id), {
        name,
        price: Number(price)
      })

      setEditingId(null)
      setName('')
      setPrice('')
      fetchProducts()
    } catch (error) {
      console.error(error)
    }
  }

if (loading) return <p>Loading...</p>

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Produk UMKM</h1>

      {/* FORM */}
      <div className="bg-white p-4 rounded-2xl shadow mb-6 flex flex-col md:flex-row gap-3">
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
                className="bg-blue-600 text-white px-4 py-2 rounded"
            >
                {editingId ? 'Update' : 'Tambah'}
            </button>
        </div>

      {/* LIST PRODUK */}
      <div className="grid md:grid-cols-2 gap-4">
            {products.map((product) => (
                <div
                key={product.id}
                className="bg-white p-4 rounded-2xl shadow flex justify-between items-center"
                >
                <div>
                    <h2 className="font-semibold text-lg">
                    {product.name}
                    </h2>
                    <p className="text-gray-500">Rp {product.price}</p>
                </div>

                <div className="flex gap-2">
                    <button
                    onClick={() => {
                        setEditingId(product.id)
                        setName(product.name)
                        setPrice(product.price.toString())
                    }}
                    className="bg-yellow-400 text-white px-3 py-1 rounded"
                    >
                    Edit
                    </button>

                    <button
                    onClick={() => handleDelete(product.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
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