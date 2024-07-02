import React, { useEffect, useState } from 'react'
import { bookService } from '../services/books.service'
import moment from 'moment'
import { IoMdClose } from 'react-icons/io'

type Props = {
  onCreate: Function,
  onClose: Function
}

const NewBookModal = (props: Props) => {

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [datePublished, setDatePublished] = useState('')

  const clearInputs = () => {
    setName('')
    setDescription('')
    setPrice('')
    setDatePublished('')
  }

  const createBook = () => {
    bookService.create({
      name,
      description,
      date_published: moment(datePublished).toDate(),
      price: parseInt(price)
    }).then(book => {
      props.onCreate(book)
      props.onClose()
      clearInputs()
    })
  }

  useEffect(() => {
    clearInputs()
  }, [])

  return <div className='fixed top-0 left-0 h-screen w-screen bg-black bg-opacity-50 flex items-center justify-center py-28'>
    <div className='bg-white w-full max-w-md shadow rounded-xl p-5'>

      <div className='py-3 flex justify-end'>
        <IoMdClose className='cursor-pointer' onClick={() => props.onClose()} size={28}/>
      </div>

      <div className='flex flex-col gap-3'>
        <div className='flex flex-col gap-1'>
          <label>Name</label>
          <input type='text' className='bg-neutral-200 px-3 py-2 rounded-xl' value={name} onChange={e => setName(e.target.value)}/>
        </div>
        <div className='flex flex-col gap-1'>
          <label>Description</label>
          <textarea className='bg-neutral-200 px-3 py-2 rounded-xl' value={description} onChange={e => setDescription(e.target.value)}></textarea>
        </div>
        <div className='flex flex-col gap-1'>
          <label>Date Published</label>
          <input type='date' className='bg-neutral-200 px-3 py-2 rounded-xl' value={datePublished} onChange={e => setDatePublished(e.target.value)}/>
        </div>
        <div className='flex flex-col gap-1'>
          <label>Price</label>
          <input type='number' min={0} className='bg-neutral-200 px-3 py-2 rounded-xl' value={price} onChange={e => setPrice(e.target.value)}/>
        </div>
        <div className='flex justify-end mt-5'>
          <button className="bg-blue-600 hover:bg-blue-700 transition-colors text-sm text-white font-bold px-8 py-2 rounded-full" onClick={createBook}>Create</button>
        </div>
      </div>
    </div>
  </div>
}

export default NewBookModal