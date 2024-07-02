import { Book, BookCreateRequest, BookSearchParams } from "../types/books.types";
import { PaginatedResponse } from "../types/common.types";
import { APIService } from "./api.service";

class BookService extends APIService{
  async get(searchparams: BookSearchParams): Promise<PaginatedResponse<Book>> {
    const response = await this.http.get('books', { params: searchparams })
    if (response.status !== 200) {
      throw new Error('Failed to get books! Please try again.')
    }
    return await response.data
  }

  async create(book: BookCreateRequest): Promise<Book> {
    const response = await this.http.post('books', book)
    if (response.status !== 201) {
      throw new Error('Failed to create book! Please try again.')
    }
    return await response.data
  }
}

const bookService = new BookService()

export {
  bookService
}