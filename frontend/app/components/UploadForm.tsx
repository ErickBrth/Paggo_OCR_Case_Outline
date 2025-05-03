'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'

type Props = {
  onUploadSuccess?: () => void
}

export default function UploadForm({ onUploadSuccess }: Props) {
  const { data: session } = useSession()
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) return toast.error('Selecione um arquivo')

    const formData = new FormData()
    formData.append('file', file)

    setUploading(true)
    const toastId = toast.loading('Enviando...')

    try {
      const res = await fetch('https://paggo-ocr-case-outline.onrender.com/documents/upload', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${session?.idToken}`,
        },
        body: formData,
      })

      if (!res.ok) throw new Error('Erro no upload')

      toast.success('Documento processado com sucesso!', { id: toastId })
      onUploadSuccess?.()
    } catch (err) {
      if (err instanceof Error) {
        console.error('Erro:', err.message)
      } else {
        console.error('Erro desconhecido:', err)
      }
      toast.error('Erro ao enviar documento', { id: toastId })
    }     finally {
      setUploading(false)
      setFile(null)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded shadow text-white space-y-4">
      <h2 className="text-lg font-semibold">Enviar Documento</h2>
      <input
        type="file"
        accept="image/*,application/pdf"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="w-full px-3 py-2 bg-gray-700 border rounded"
      />
      <button
        type="submit"
        disabled={uploading}
        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white disabled:opacity-50"
      >
        {uploading ? 'Enviando...' : 'Enviar'}
      </button>
    </form>
  )
}
