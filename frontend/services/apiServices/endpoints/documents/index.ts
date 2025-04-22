import apiClient from '../../axiosConfig/client';
import routes from '../../routes';

export async function uploadDocument(file: File) {
  const formData = new FormData();
  formData.append('file', file);

  const response = await apiClient.post(routes.documents.upload, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
}

export async function getAllDocuments() {
  const response = await apiClient.get(routes.documents.list);
  return response.data;
}

export async function getDocumentById(id: string) {
  const response = await apiClient.get(routes.documents.getById(id));
  return response.data;
}
