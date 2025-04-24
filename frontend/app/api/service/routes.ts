const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001'

const routes = {
  documents: {
    upload: `${BASE_URL}/documents/upload`,
    list: `${BASE_URL}/documents`,
  },
}

export default routes
