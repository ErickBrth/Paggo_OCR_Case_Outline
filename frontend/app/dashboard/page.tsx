'use client'

import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Toaster, toast } from 'react-hot-toast'
import UploadForm from '../components/UploadForm'
import DocumentList from '../components/DocumentList'

interface Document {
  id: string
  filename: string
  text: string
  llmSummary: string
  createdAt: string
}

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [documents, setDocuments] = useState<Document[]>([])
  const [loadingDocs, setLoadingDocs] = useState(false)

  const loadDocuments = async () => {
    if (!session?.idToken) return
    setLoadingDocs(true)
    try {
      const res = await fetch('http://localhost:3001/documents', {
        headers: {
          Authorization: `Bearer ${session.idToken}`,
        },
      })
      const data = await res.json()
      setDocuments(data)
    } catch (err: any) {
      toast.error('Erro ao buscar documentos')
    } finally {
      setLoadingDocs(false)
    }
  }

  useEffect(() => {
    if (status === 'authenticated') {
      loadDocuments()
    }
  }, [status])

  if (status === 'loading') return <p>Carregando...</p>
  if (!session) {
    router.push('/login')
    return null
  }

  return (
    <main className="p-6 max-w-2xl mx-auto space-y-6">
      <Toaster />
      <h1 className="text-2xl font-bold">Bem-vindo, {session.user?.name}</h1>

      <UploadForm onUploadSuccess={loadDocuments} />
      <DocumentList documents={documents} loading={loadingDocs} />

      <button
        onClick={() => signOut()}
        className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded mt-4"
      >
        Sair
      </button>
    </main>
  )
}
