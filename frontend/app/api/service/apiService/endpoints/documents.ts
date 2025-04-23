import apiClient from "../axiosConfig/client"

export async function uploadDocument(file: File) {
  const formData = new FormData()
  formData.append('file', file)

  const response = await apiClient.post('/documents/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  return response.data
}

export async function getDocuments() {
  const response = await apiClient.get('/documents')
  return response.data
}
