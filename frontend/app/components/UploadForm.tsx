'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'
import { useSession } from 'next-auth/react'

export default function UploadForm() {
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const { data: session } = useSession()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) {
      toast.error('Selecione um arquivo')
      return
    }

    if (!session?.idToken) {
      toast.error('Usuário não autenticado.')
      return
    }

    const formData = new FormData()
    formData.append('file', file)

    setLoading(true)

    try {
      const res = await fetch('http://localhost:3001/documents/upload', {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${session.idToken}`,
        },
      })

      if (!res.ok) {
        throw new Error('Falha no upload')
      }

      const data = await res.json()
      toast.success('Upload realizado com sucesso!')
      console.log('Resposta do backend:', data)
      setFile(null)
    } catch (error: any) {
      console.error(error)
      toast.error(error.message || 'Erro ao enviar o arquivo')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-xl font-semibold mb-4 text-white text-center">📄 Enviar Documento</h2>
        <input
          type="file"
          accept="image/*,application/pdf"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="w-full px-4 py-2 mb-4 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-600 w-full py-2 rounded text-white font-medium transition disabled:opacity-50"
        >
          {loading ? 'Enviando...' : 'Enviar'}
        </button>
      </form>
    </div>
  )
}
