type PaginatedResponse<T> = {
  data: T[]
  pagination: {
    total: number
    totalPages: number
    currentPage: number
  }
}

export type {
  PaginatedResponse
}