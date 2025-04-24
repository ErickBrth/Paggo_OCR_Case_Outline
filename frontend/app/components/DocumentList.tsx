interface Document {
    id: string
    filename: string
    text: string
    llmSummary: string
    createdAt: string
  }
  
  interface Props {
    documents: Document[]
    loading: boolean
  }
  
  export default function DocumentList({ documents, loading }: Props) {
    if (loading) return <p>Carregando documentos...</p>
    if (!documents || documents.length === 0) return <p>Nenhum documento enviado ainda.</p>
  
    return (
      <div className="space-y-6 mt-10">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">Documentos enviados</h2>
        {documents.map((doc) => (
          <div key={doc.id} className="bg-white p-6 rounded-lg shadow-md text-gray-800">
            <p className="font-semibold">{doc.filename}</p>
            <p className="text-sm text-gray-500">
              {new Date(doc.createdAt).toLocaleString()}
            </p>
            <div className="mt-4">
              <p className="font-medium">Texto extraído:</p>
              <pre className="whitespace-pre-wrap text-sm bg-gray-100 p-2 rounded">{doc.text}</pre>
            </div>
            <div className="mt-4">
              <p className="font-medium">Explicação da LLM:</p>
              <pre className="whitespace-pre-wrap text-sm bg-gray-50 p-2 rounded text-indigo-700">
                {doc.llmSummary || 'Nenhuma explicação disponível.'}
              </pre>
            </div>
          </div>
        ))}
      </div>
    )
  }
  