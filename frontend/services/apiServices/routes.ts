const routes = {
    documents: {
      upload: '/documents/upload',
      list: '/documents',
      getById: (id: string) => `/documents/${id}`,
    },
  };
  
  export default routes;
  