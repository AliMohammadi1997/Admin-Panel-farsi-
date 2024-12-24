import { useState } from 'react';
import UseGetFetch from '../../Hooks/UseGetFetch';
import ErrorBox from '../ErrorBox/ErrorBox'
import DeleteModal from '../DeleteModal/DeleteModal';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import DetailsModal from '../DetailsModal/DetailsModal';
import EditModal from '../EditModal/EditModal';
import { MdOutlineEditNote } from 'react-icons/md';

const Orders = () => {
    const { allData, fetchData } = UseGetFetch('http://localhost:8000/api/orders/');
    const [isShowDeleteModal, setIsShowDeleteModal] = useState(false)
    const [isShowDetailsModal, setIsShowDetailsModal] = useState(false)
    const [isShowAcceptModal, setIsShowAcceptModal] = useState(false)
    const [isShowRejectModal, setIsShowRejectModal] = useState(false)
    const [isShowEditModal, setIsShowEditModal] = useState(false)
    const [orderId, setOrderId] = useState(null)
    const [infosOrder, setInfosOrdre] = useState({})

    const [orderNewProductID, setOrderNewProductID] = useState('')
    const [orderNewName, setOrderNewName] = useState('')
    const [orderNewAddress, setOrderNewAddress] = useState('')
    const [orderNewPrice, setOrderNewPrice] = useState('')
    const [orderNewCount, setOrderNewCount] = useState('')
    const [orderNewOff, setOrderNewOff] = useState('')
    const [orderNewSale, setOrderNewSale] = useState('')



    // DeleteOrder
    const cancelDeleteOrder = () => { setIsShowDeleteModal(false) }
    const acceptDeleteOrder = () => {
        console.log(orderId);
        axios.delete(`http://localhost:8000/api/orders/${orderId}`)
            .then(res => {
                console.log(res);
                fetchData();
                setIsShowDeleteModal(false)
                toast.success('سفارش با موفقیت حذف شد')
            })
    }

    // accept order

    const cancelOrder = () => { setIsShowAcceptModal(false) }

    const acceptOrder = () => {

        axios.put(`http://localhost:8000/api/orders/active-order/${orderId}/1`)
            .then(res => {
                console.log(res);
                fetchData()
                setIsShowAcceptModal(false)
                toast.success('سفارش تایید شد')
            })
    }

    // reject order

    const cancelRejectOrder = () => { setIsShowRejectModal(false) }

    const acceptRejectOrder = () => {
        axios.put(`http://localhost:8000/api/orders/active-order/${orderId}/0`)
            .then(res => {
                console.log(res);
                fetchData()
                setIsShowRejectModal(false)
                toast.success('سفارش رد شد')
            })

    }

    // edit order

    const editOrder = (e) => {
        e.preventDefault()

        const orderNewInfo = {
            productID: orderNewProductID,
            name: orderNewName,
            address: orderNewAddress,
            price: orderNewPrice,
            count: orderNewCount,
            off: orderNewOff,
            sale: orderNewSale
        }

        axios.put(`http://localhost:8000/api/orders/${orderId}`, orderNewInfo)
            .then(res => {
                console.log(res);
                fetchData();
                setIsShowEditModal(false)
                toast.success('سفارش با موفقیت ویرایش شد')
            })

        console.log(orderNewInfo);

    }


    return (
        <div className='mt-10 p-5'>
            <h1 className='mb-5 text-3xl'>سفارش ها</h1>
            {allData.length ? (

                <table className="cms-table">
                    <thead>
                        <tr>
                            <th>آیدی سفارش</th>
                            <th>نام کاربر</th>
                            <th>هزینه سفارش</th>
                            <th>وضعیت سفارش</th>
                            <th>ساعت و تاریخ سفارش</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            allData.map(order => (
                                <tr key={order.id}>
                                    <td>{order.productID}</td>
                                    <td>{order.name}</td>
                                    <td>{order.sale.toLocaleString('fa-IR')}</td>
                                    <td>پرداخت نشده</td>
                                    <td>{order.hour} <br /> {order.date}</td>
                                    <td>
                                        {order.isActive === 0 ? (
                                            <button
                                                onClick={() => {
                                                    setIsShowAcceptModal(true)
                                                    setOrderId(order.id)
                                                }}
                                            > تایید
                                            </button>
                                        )
                                            : (
                                                <button
                                                    onClick={() => {
                                                        setIsShowRejectModal(true)
                                                        setOrderId(order.id)
                                                    }}
                                                > رد
                                                </button>
                                            )
                                        }

                                        <button
                                            onClick={() => {
                                                setIsShowDetailsModal(true);
                                                setInfosOrdre(order)
                                            }}
                                        > جزئیات
                                        </button>

                                        <button
                                            onClick={() => {
                                                setIsShowEditModal(true)
                                                setOrderId(order.id)

                                                setOrderNewProductID(order.productID)
                                                setOrderNewName(order.name)
                                                setOrderNewAddress(order.address)
                                                setOrderNewPrice(order.price)
                                                setOrderNewCount(order.count)
                                                setOrderNewOff(order.off)
                                                setOrderNewSale(order.sale)
                                            }}
                                        > ویرایش
                                        </button>

                                        <button
                                            onClick={() => {
                                                setIsShowDeleteModal(true);
                                                setOrderId(order.id)
                                            }}
                                        >  حذف
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>

            )
                :
                setTimeout(() => {
                    <ErrorBox msg="هیچ سفارشی یافت نشد" />
                }, 1000)
            }

            {/* deleteModal  */}

            {isShowDeleteModal &&
                <DeleteModal
                    cancelAction={cancelDeleteOrder}
                    submitAction={acceptDeleteOrder}
                    title='آیا از حذف سفارش مطمئن هستید؟'
                />
            }


            {/* detailModal */}

            {isShowDetailsModal &&
                <DetailsModal
                    onColse={() => setIsShowDetailsModal(false)}
                >
                    <table className="cms-table">
                        <thead>
                            <tr>
                                <th>   قیمت  </th>
                                <th>  تعداد سفارش  </th>
                                <th>   آدرس  </th>
                                <th>   رضایت   </th>
                                <th>  تخفیف   </th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr >
                                <td> {infosOrder.price} </td>
                                <td> {infosOrder.count} </td>
                                <td> {infosOrder.address} </td>
                                <td> {infosOrder.popularity} </td>
                                <td> {infosOrder.off} </td>

                            </tr>
                        </tbody>
                    </table>
                </DetailsModal>

            }

            {/* acceptOrder */}

            {isShowAcceptModal &&
                <DeleteModal
                    cancelAction={cancelOrder}
                    submitAction={acceptOrder}
                    title='آیا از تایید سفارش مطمئن هستید؟'
                />
            }

            {/* reject order */}

            {isShowRejectModal &&
                <DeleteModal
                    cancelAction={cancelRejectOrder}
                    submitAction={acceptRejectOrder}
                    title='آیا از رد کردن سفارش مطمئن هستید؟'
                />
            }

            {/* edit order  */}

            {isShowEditModal &&
                <EditModal
                    onClose={() => setIsShowEditModal(false)}
                    onSubmit={editOrder}
                >
                    <div className="edit-container">
                        <MdOutlineEditNote className='add-form-icon' />
                        <input
                            value={orderNewProductID}
                            onChange={(e) => setOrderNewProductID(e.target.value)}
                            className='edit-input-group'
                            type="text"
                            placeholder='  آیدی محصول را وارد کنید ' />
                    </div>
                    <div className="edit-container">
                        <MdOutlineEditNote className='add-form-icon' />
                        <input
                            value={orderNewName}
                            onChange={(e) => setOrderNewName(e.target.value)}
                            className='edit-input-group'
                            type="text"
                            placeholder=' نام کاربر  را وارد کنید ' />
                    </div>
                    <div className="edit-container">
                        <MdOutlineEditNote className='add-form-icon' />
                        <input
                            value={orderNewAddress}
                            onChange={(e) => setOrderNewAddress(e.target.value)}
                            className='edit-input-group'
                            type="text"
                            placeholder='  آدرس را وارد کنید ' />
                    </div>
                    <div className="edit-container">
                        <MdOutlineEditNote className='add-form-icon' />
                        <input
                            value={orderNewPrice}
                            onChange={(e) => setOrderNewPrice(e.target.value)}
                            className='edit-input-group'
                            type="text"
                            placeholder=' قیمت  را وارد کنید ' />
                    </div>
                    <div className="edit-container">
                        <MdOutlineEditNote className='add-form-icon' />
                        <input
                            value={orderNewCount}
                            onChange={(e) => setOrderNewCount(e.target.value)}
                            className='edit-input-group'
                            type="text"
                            placeholder=' تعداد  را وارد کنید ' />
                    </div>
                    <div className="edit-container">
                        <MdOutlineEditNote className='add-form-icon' />
                        <input
                            value={orderNewOff}
                            onChange={(e) => setOrderNewOff(e.target.value)}
                            className='edit-input-group'
                            type="text"
                            placeholder=' تخفیف جدید  را وارد کنید ' />
                    </div>
                    <div className="edit-container">
                        <MdOutlineEditNote className='add-form-icon' />
                        <input
                            value={orderNewSale}
                            onChange={(e) => setOrderNewSale(e.target.value)}
                            className='edit-input-group'
                            type="text"
                            placeholder=' هزینه سفارش  را وارد کنید ' />
                    </div>
                </EditModal>

            }
            <ToastContainer />
        </div>
    );
}

export default Orders;
