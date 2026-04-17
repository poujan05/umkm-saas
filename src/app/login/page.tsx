'use client'

import { useState } from 'react'
import { auth } from '@/lib/firebase'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLogin, setIsLogin] = useState(true)

  const router = useRouter()

  const handleAuth = async () => {
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password)
        alert('Login berhasil!')
      } else {
        await createUserWithEmailAndPassword(auth, email, password)
        alert('Register berhasil!')
      }

      router.push('/dashboard')
    } catch (error: any) {
      alert(error.message)
    }
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        {isLogin ? 'Login' : 'Register'}
      </h1>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 w-full mb-2"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 w-full mb-4"
      />

      <button
        onClick={handleAuth}
        className="bg-blue-600 text-white px-4 py-2 w-full"
      >
        {isLogin ? 'Login' : 'Register'}
      </button>

      <p
        onClick={() => setIsLogin(!isLogin)}
        className="mt-4 text-blue-500 cursor-pointer"
      >
        {isLogin
          ? 'Belum punya akun? Register'
          : 'Sudah punya akun? Login'}
      </p>
    </div>
  )
}