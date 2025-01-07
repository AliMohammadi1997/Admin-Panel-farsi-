import { useState } from 'react'
import DeleteModal from '../DeleteModal/DeleteModal'
import DetailsModal from '../DetailsModal/DetailsModal'
import EditModal from '../EditModal/EditModal'
import ErrorBox from '../ErrorBox/ErrorBox'
import UseGetFetch from '../../Hooks/UseGetFetch'
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios'
import { MdOutlineEditNote } from 'react-icons/md'

const ProductsTable = () => {
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false)
  const [isShowDetailModal, setIsShowDetailModal] = useState(false)
  const [isShowEditModal, setIsShowEditModal] = useState(false)
  const { allData, fetchData } = UseGetFetch(
    'http://localhost:8000/api/products/'
  ) //get product
  const [productId, setProductId] = useState(null)
  const [productInfos, setProductInfos] = useState({})

  const [productNewTitle, setProductNewTitle] = useState('')
  const [productNewPrice, setProductNewPrice] = useState('')
  const [productNewCount, setProductNewCount] = useState('')
  const [productNewImg, setProductNewImg] = useState('')
  const [productNewPopularity, setProductNewPopularity] = useState('')
  const [productNewSale, setProductNewSale] = useState('')
  const [productNewColors, setProductNewColors] = useState('')

  const acceptDeleteProduct = () => {
    //delete product
    try {
      axios.delete(`http://localhost:8000/api/products/${productId}`)
      fetchData()
      setIsShowDeleteModal(false)
      toast.error('محصول با موفقیت حذف شد')
    } catch (error) {
      console.error(error)
      setIsShowDeleteModal(false)
      toast.error('خطا در حذف محصول')
    }
  }

  const cancelDeleteProduct = () => {
    setIsShowDeleteModal(false)
  }

  const closeDetailsModal = () => {
    setIsShowDetailModal(false)
  }

  const updateProductInfo = async event => {
    event.preventDefault()

    const producNewtInfos = {
      title: productNewTitle,
      price: productNewPrice,
      count: productNewCount,
      img: productNewImg,
      popularity: productNewPopularity,
      colors: productNewColors,
      sale: productNewSale
    }

    try {
      await axios.put(
        `http://localhost:8000/api/products/${productId}`,
        producNewtInfos
      )
      fetchData()
      setIsShowEditModal(false)
      toast.success('اطلاعات با موفقیت ویرایش شد')
    } catch (error) {
      console.error(error)
      toast.error('خطا در ویرایش اطلاعات محصول')
    }
  }

  return (
    <>
      <ToastContainer />

      <h2 className='text-xl mt-5'>لیست محصولات</h2>
      {allData.length ? (
        <div className='overflow-x-auto'>
          <table className='products-table bg-white w-full mt-7 rounded-lg '>
            <thead>
              <tr className='text-center flex justify-between pr-24 pl-80'>
                <th>عکس</th>
                <th>اسم</th>
                <th>قیمت</th>
                <th>موجودی</th>
              </tr>
            </thead>

            <tbody>
              {allData.reverse().map(product => (
                <tr
                  key={product.id}
                  className='text-center flex justify-between px-4 mt-5'
                >
                  <td>
                    <img
                      src={product.img}
                      alt={product.title}
                      className='w-28 object-cover '
                    />
                  </td>
                  <td> {product.title} </td>
                  <td> {product.price.toLocaleString('fa-IR')} </td>
                  <td> {product.count} </td>
                  <td>
                    <button
                      className='product-table-btn'
                      onClick={() => {
                        setIsShowDetailModal(true)
                        setProductInfos(product)
                      }}
                    >
                      جزئیات
                    </button>
                    <button
                      className='product-table-btn'
                      onClick={e => {
                        e.preventDefault()
                        setIsShowDeleteModal(true)
                        setProductId(product.id)
                      }}
                    >
                      حذف
                    </button>
                    <button
                      className='product-table-btn'
                      onClick={() => {
                        setIsShowEditModal(true)
                        setProductId(product.id)

                        setProductNewPrice(product.price)
                        setProductNewCount(product.count)
                        setProductNewImg(product.img)
                        setProductNewPopularity(product.popularity)
                        setProductNewSale(product.sale)
                        setProductNewColors(product.colors)
                        setProductNewTitle(product.title)
                      }}
                    >
                      ویرایش
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <ErrorBox msg='هیچ محصولی یافت نشد' />
      )}

      {/* delete modal */}

      {isShowDeleteModal && (
        <DeleteModal
          title='آیا از حذف مطمئن هستید؟'
          submitAction={acceptDeleteProduct}
          cancelAction={cancelDeleteProduct}
        />
      )}

      {/* DetailsModal */}

      {isShowDetailModal && (
        <DetailsModal onColse={closeDetailsModal}>
          <div className='overflow-x-auto'>
            <table className='cms-table '>
              <thead>
                <tr>
                  <th> اسم </th>
                  <th>قیمت</th>
                  <th>محبوبیت</th>
                  <th>رنگ بندی</th>
                  <th> میزان فروش</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>{productInfos.title}</td>
                  <td>{productInfos.price.toLocaleString('fa-IR')}</td>
                  <td>{productInfos.popularity}</td>
                  <td>{productInfos.colors}</td>
                  <td>{productInfos.sale.toLocaleString('fa-IR')}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </DetailsModal>
      )}

      {/* EditModal */}

      {isShowEditModal && (
        <EditModal
          onClose={() => setIsShowEditModal(false)}
          onSubmit={updateProductInfo}
        >
          <div className='edit-container'>
            <MdOutlineEditNote className='add-form-icon' />
            <input
              className='edit-input-group'
              value={productNewTitle}
              type='text'
              placeholder='عنوان جدید را وارد کنید'
              onChange={e => setProductNewTitle(e.target.value)}
            />
          </div>
          <div className='edit-container'>
            <MdOutlineEditNote className='add-form-icon' />
            <input
              className='edit-input-group'
              value={productNewPrice.toLocaleString('fa-IR')}
              type='text'
              placeholder='قیمت جدید را وارد کنید'
              onChange={e => setProductNewPrice(e.target.value)}
            />
          </div>
          <div className='edit-container'>
            <MdOutlineEditNote className='add-form-icon' />
            <input
              className='edit-input-group'
              value={productNewCount}
              type='text'
              placeholder='تعداد جدید را وارد کنید'
              onChange={e => setProductNewCount(e.target.value)}
            />
          </div>
          <div className='edit-container'>
            <MdOutlineEditNote className='add-form-icon' />
            <input
              className='edit-input-group'
              value={productNewImg}
              type='text'
              placeholder='عکس جدید را وارد کنید'
              onChange={e => setProductNewImg(e.target.value)}
            />
          </div>
          <div className='edit-container'>
            <MdOutlineEditNote className='add-form-icon' />
            <input
              className='edit-input-group'
              value={productNewPopularity}
              type='text'
              placeholder='میزان محبوبیت جدید را وارد کنید'
              onChange={e => setProductNewPopularity(e.target.value)}
            />
          </div>
          <div className='edit-container'>
            <MdOutlineEditNote className='add-form-icon' />
            <input
              className='edit-input-group'
              value={productNewColors}
              type='text'
              placeholder='رنگ بندی جدید را وارد کنید'
              onChange={e => setProductNewColors(e.target.value)}
            />
          </div>
          <div className='edit-container'>
            <MdOutlineEditNote className='add-form-icon' />
            <input
              className='edit-input-group'
              value={productNewSale.toLocaleString('fa-IR')}
              type='text'
              placeholder='فروش جدید را وارد کنید'
              onChange={e => setProductNewSale(e.target.value)}
            />
          </div>
        </EditModal>
      )}
    </>
  )
}

export default ProductsTable
