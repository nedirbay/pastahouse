import api from './api'

interface Review {
  id: number
  rating: number
  comment: string
  // Add other review properties as needed
}

interface CreateReviewData {
  rating: number
  comment: string
}

interface UpdateReviewData {
  rating?: number
  comment?: string
}

interface ReviewListResponse {
  reviews: Review[]
  pagination: {
    page: number
    limit: number
    total: number
  }
}

interface ReviewQueryParams {
  page?: number
  limit?: number
}

export const reviewService = {
  // Get all reviews for a product
  getReviews: (productId: number, params?: ReviewQueryParams): Promise<ReviewListResponse> => {
    return api
      .get(`/api/products/${productId}/reviews`, { params })
      .then((response) => response.data)
  },

  // Create a new review for a product
  createReview: (productId: number, data: CreateReviewData): Promise<Review> => {
    return api.post(`/api/products/${productId}/reviews`, data).then((response) => response.data)
  },

  // Update a review
  updateReview: (id: number, data: UpdateReviewData): Promise<Review> => {
    return api.put(`/api/reviews/${id}`, data).then((response) => response.data)
  },

  // Delete a review
  deleteReview: (id: number): Promise<{ message: string }> => {
    return api.delete(`/api/reviews/${id}`).then((response) => response.data)
  },
}
