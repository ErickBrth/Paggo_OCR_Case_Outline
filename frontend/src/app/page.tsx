'use client'

import { signIn } from 'next-auth/react'
import { Toaster } from 'react-hot-toast'

export default function LoginPage() {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-[#f2f2f2] to-[#e0e0e0] p-4">
      <Toaster />
      <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center text-gray-700 mb-8">
          Bem-vindo ao Paggo OCR
        </h1>
        <button 
          onClick={() => signIn('google', { callbackUrl: '/pages/dashboard' })}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded w-full transition"
        >
          Entrar com Google
        </button>
      </div>
    </main>
  )
}
