import { useEffect, useState } from "react"
import { bookService } from "./services/books.service"
import { Book } from "./types/books.types"
import { PaginatedResponse } from "./types/common.types"
import { LuSearch } from 'react-icons/lu'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import moment from "moment";
import NewBookModal from "./components/NewBookModal"

function App() {

  const [isLoading, setIsLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [page, setPage] = useState(1)
  const [books, setBooks] = useState<PaginatedResponse<Book>>()

  const [showNewBookModal, setShowNewBookModal] = useState(false)

  const getBooks = () => {
    setIsLoading(true)
    bookService.get({ q: searchQuery, page }).then(res => {
      setBooks(res)
      setIsLoading(false)
    })
  }

  const onCreate = (book: Book) => {
    if (books) {
      setBooks({
        ...books,
        data: [
          ...books.data,
          book
        ]
      })
    }
  }

  useEffect(() => {
    getBooks()
  }, [page, searchQuery])

  return <div className='w-full px-10 max-w-5xl mx-auto'>
    <div className='my-10'>
      <h1 className='font-bold text-3xl'>Books</h1>

      <div className="flex items-center justify-between my-5">
        <div className="relative flex">
          <LuSearch className="absolute self-center ml-3 text-neutral-600"/>
          <input type="text" className="w-full pl-10 pr-5 py-2 bg-neutral-100 text-sm rounded-full focus:outline-none" onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search..."/>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 transition-colors text-sm text-white font-bold px-8 py-2 rounded-full" onClick={() => setShowNewBookModal(true)}>New Book</button>
      </div>

      { !isLoading && <div>
        <div className="mt-5 overflow-x-auto bg-neutral-100 rounded-lg p-2">
          <table className="w-full">
            <thead>
              <tr>
                <th className="py-3 text-left border-b rounded-tl-lg">#</th>
                <th className="py-3 text-left border-b">Name</th>
                <th className="py-3 text-left border-b">Date Publised</th>
                <th className="py-3 text-left border-b">Price</th>
              </tr>
            </thead>
            <tbody>
              {
                books?.data.map((book, bookIdx) => (
                  <tr key={book._id} className="text-neutral-600">
                    <td className="text-left py-2">{ bookIdx+1 }</td>
                    <td className="text-left py-2">{ book.name }</td>
                    <td className="text-left py-2">{ moment(book.date_published).format('ll') }</td>
                    <td className="text-left py-2">{ book.price }</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
        <div className="py-4 flex justify-end gap-1">
        {
          Array(books?.pagination.totalPages ?? 1).fill(1).map((_, cPage) => (
            <button key={cPage.toString()} disabled={cPage+1 === page} onClick={() => setPage(cPage+1)} className="bg-blue-600 disabled:bg-blue-400 hover:bg-blue-700 transition-colors text-sm text-white font-bold w-8 h-8 inline-flex items-center justify-center rounded-full">{ cPage+1 }</button>
          ))
        }
        </div>
      </div> }

      { isLoading && <div className="w-full flex justify-center py-10">
        <AiOutlineLoading3Quarters size={50} className="animate-spin"/>
      </div> }

      { showNewBookModal && <NewBookModal onCreate={onCreate} onClose={() => setShowNewBookModal(false)} /> }

    </div>
  </div>
}

export default App