import UploadForm from '../components/UploadForm';

export default function Home() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Envio de Documento</h1>
      <UploadForm />
    </main>
  );
}
