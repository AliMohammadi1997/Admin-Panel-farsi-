import axios from 'axios'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import UseGetFetch from '../../Hooks/UseGetFetch'

const AddNewProduct = () => {
  const { fetchData } = UseGetFetch('http://localhost:8000/api/products/')
  const [newProductTitle, setNewProductTitle] = useState('')
  const [newProductPrice, setNewProductPrice] = useState('')
  const [newProductCount, setNewProductCount] = useState('')
  const [newProductImg, setNewProductImg] = useState('')
  const [newProductPopularity, setNewProductPopularity] = useState('')
  const [newProductSale, setNewProductSale] = useState('')
  const [newProductColors, setNewProductColors] = useState('')

  const inputEmpty = () => {
    setNewProductTitle('')
    setNewProductPrice('')
    setNewProductCount('')
    setNewProductImg('')
    setNewProductPopularity('')
    setNewProductSale('')
    setNewProductColors('')
  }

  const addNewProducts = e => {
    e.preventDefault()

    if (
      !newProductTitle.trim() ||
      !newProductPrice.trim() ||
      !newProductCount.trim() ||
      !newProductImg.trim() ||
      !newProductPopularity.trim() ||
      !newProductSale.trim() ||
      !newProductColors.trim()
    ) {
      toast.warning(' اطلاعات محصول را به طور کامل وارد کنید ')
      return
    }

    const newProducts = {
      title: newProductTitle,
      price: newProductPrice,
      count: newProductCount,
      img: newProductImg,
      popularity: newProductPopularity,
      colors: newProductColors,
      sale: newProductSale
    }

    const postProduct = async () => {
      await axios.post('http://localhost:8000/api/products/', newProducts)
    }

    postProduct()
    setTimeout(() => {
      fetchData()
    }, 2000)
    toast.success('محصول جدید با موفقیت اضافه گردید')
    inputEmpty()
  }

  return (
    <div className='mt-12 w-full'>
      <ToastContainer />
      <h1 className='text-xl '>افزودن محصول جدید</h1>

      <form
        action='#'
        onSubmit={addNewProducts}
        className='mt-5 bg-white flex flex-col items-end p-5 rounded-xl w-full'
      >
        <div className='w-full grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-3 '>
          <div className='add-form-group'>
            <input
              className='add-form-input'
              type='text'
              placeholder='اسم محصول را بنویسید'
              value={newProductTitle}
              onChange={e => setNewProductTitle(e.target.value)}
            />
          </div>
          <div className='add-form-group'>
            <input
              className='add-form-input'
              type='text'
              placeholder='   قیمت محصول را بنویسید '
              value={newProductPrice}
              onChange={e => setNewProductPrice(e.target.value)}
            />
          </div>
          <div className='add-form-group'>
            <input
              className='add-form-input'
              type='text'
              placeholder='موجودی محصول را بنویسید'
              value={newProductCount}
              onChange={e => setNewProductCount(e.target.value)}
            />
          </div>
          <div className='add-form-group'>
            <input
              className='add-form-input'
              type='text'
              placeholder='میزان محبوبیت محصول را بنویسید'
              value={newProductPopularity}
              onChange={e => setNewProductPopularity(e.target.value)}
            />
          </div>
          <div className='add-form-group'>
            <input
              className='add-form-input'
              type='text'
              placeholder='میزان فروش محصول را بنویسید'
              value={newProductSale}
              onChange={e => setNewProductSale(e.target.value)}
            />
          </div>
          <div className='add-form-group'>
            <input
              className='add-form-input'
              type='text'
              placeholder='تعداد رنگ بندی محصول را بنویسید'
              value={newProductColors}
              onChange={e => setNewProductColors(e.target.value)}
            />
          </div>
          <div className='w-full bg-inherit'>
            <input
              className='add-form-input'
              type='file'
              placeholder='آدرس عکس محصول را بنویسید'
              accept='image/*'
              onChange={e => {
                setNewProductImg(e.target.value)
              }}
            />
          </div>
        </div>
        <button
          className='bg-blue1 text-white text-xs md:text-sm mt-2 p-2 rounded-lg'
          onClick={e => addNewProducts(e)}
        >
          ثبت محصول
        </button>
      </form>
    </div>
  )
}

export default AddNewProduct
