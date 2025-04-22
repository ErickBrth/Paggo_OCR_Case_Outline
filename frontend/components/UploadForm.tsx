'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { uploadDocument } from '../services/apiServices/endpoints/documents';

export default function UploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return toast.error('Selecione uma imagem');

    try {
      setLoading(true);
      await uploadDocument(file);
      toast.success('Documento enviado com sucesso!');
    } catch (err) {
      toast.error('Erro ao enviar documento');
      console.error(err);
    } finally {
      setLoading(false);
      setFile(null);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="border p-2 rounded w-full"
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {loading ? 'Enviando...' : 'Enviar Nota Fiscal'}
      </button>
    </form>
  );
}
