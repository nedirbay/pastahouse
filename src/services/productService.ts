import api from './api'

interface Product {
  id: number
  name: string
  description: string
  price: number
  image: string
  category: number
  in_stock: boolean
  quantity: number
  // Add other product properties as needed
}

interface Category {
  id: number
  name: string
  description: string
}

interface Tag {
  id: number
  name: string
}

interface Pagination {
  page: number
  limit: number
  total: number
}

interface ProductListResponse {
  products: Product[]
  pagination: Pagination
}

interface ProductQueryParams {
  page?: number
  limit?: number
  search?: string
  category?: number
  tags?: string // comma separated
  minPrice?: number
  maxPrice?: number
  minRating?: number
  ordering?: string
}

export const productService = {
  // Get all products with optional filters
  getProducts: (params?: ProductQueryParams): Promise<ProductListResponse> => {
    return api.get('/api/products', { params }).then((response) => response.data)
  },

  // Get a specific product by ID
  getProduct: (id: number): Promise<Product> => {
    return api.get(`/api/products/${id}`).then((response) => response.data)
  },

  // Create a new product (admin only)
  createProduct: (data: Partial<Product>): Promise<Product> => {
    return api.post('/api/products', data).then((response) => response.data)
  },

  // Update a product (admin only)
  updateProduct: (id: number, data: Partial<Product>): Promise<Product> => {
    return api.put(`/api/products/${id}`, data).then((response) => response.data)
  },

  // Delete a product (admin only)
  deleteProduct: (id: number): Promise<{ message: string }> => {
    return api.delete(`/api/products/${id}`).then((response) => response.data)
  },

  // Get all categories
  getCategories: (): Promise<Category[]> => {
    return api.get('/api/categories').then((response) => response.data)
  },

  // Create a new category (admin only)
  createCategory: (data: Pick<Category, 'name' | 'description'>): Promise<Category> => {
    return api.post('/api/categories', data).then((response) => response.data)
  },

  // Get all tags
  getTags: (): Promise<Tag[]> => {
    return api.get('/api/tags').then((response) => response.data)
  },
}
