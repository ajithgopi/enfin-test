type BookCreateRequest = {
  name: string
  description: string
  date_published: Date
  price: number
}

type Book = {
  _id: string
} & BookCreateRequest

type BookSearchParams = {
  q: string
  page: number
}

export type {
  BookCreateRequest,
  Book,
  BookSearchParams
}