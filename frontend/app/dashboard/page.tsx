'use client'

import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Toaster } from 'react-hot-toast'
import UploadForm from '../components/UploadForm'

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  if (status === 'loading') return <p>Carregando...</p>
  if (!session) {
    router.push('/login')
    return null
  }

  return (
    <main className="p-6 max-w-2xl mx-auto space-y-6">
      <Toaster />
      <h1 className="text-2xl font-bold">Bem-vindo, {session.user?.name}</h1>
      <UploadForm />
      <button
        onClick={() => signOut()}
        className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded mt-4"
      >
        Sair
      </button>
    </main>
  )
}
