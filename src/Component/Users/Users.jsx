import { useState } from 'react'
import UseGetFetch from '../../Hooks/UseGetFetch'
import ErrorBox from '../ErrorBox/ErrorBox'
import DeleteModal from '../DeleteModal/DeleteModal'
import { toast, ToastContainer } from 'react-toastify'
import axios from 'axios'
import EditModal from '../EditModal/EditModal'
import { MdOutlineEditNote } from 'react-icons/md'
import DetailsModal from '../DetailsModal/DetailsModal'

const Users = () => {
  const { allData, fetchData } = UseGetFetch('http://localhost:8000/api/users/')
  const [userId, setUserId] = useState(null)
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false)
  const [isShowDetailsModal, setIsShowDetailsModal] = useState(false)
  const [isShowEditModal, setIsShowEditModal] = useState(false)
  const [userInfos, setUserInfos] = useState({})

  const [userNewFirstName, setUserNewFirstName] = useState('')
  const [userNewLastName, setUserNewLastName] = useState('')
  const [userNewUserName, setUserNewUserName] = useState('')
  const [userNewPassword, setUserNewPassword] = useState('')
  const [userNewPhone, setUserNewPhone] = useState('')
  const [userNewCity, setUserNewCity] = useState('')
  const [userNewEmail, setUserNewEmail] = useState('')
  const [userNewAddress, setUserNewAddress] = useState('')
  const [userNewScore, setUserNewScore] = useState('')
  const [userNewBuy, setUserNewBuy] = useState('')

  // deleteUser
  const cancelDeleteUser = () => {
    setIsShowDeleteModal(false)
  }
  const acceptDeleteUser = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/users/${userId}`)
      fetchData()
      setIsShowDeleteModal(false)
      toast.success('کاربر با موفقیت حذف شد')
    } catch (error) {
      console.error(error)
      setIsShowDeleteModal(false)
      toast.error('خطا در حذف کاربر')
    }
  }

  // EditUser

  const EditUserInfos = async e => {
    e.preventDefault()

    const userNewInfo = {
      firstname: userNewFirstName,
      lastname: userNewLastName,
      username: userNewUserName,
      password: userNewPassword,
      phone: userNewPhone,
      email: userNewEmail,
      city: userNewCity,
      address: userNewAddress,
      score: userNewScore,
      buy: userNewBuy
    }

    try {
      await axios.put(`http://localhost:8000/api/users/${userId}`, userNewInfo)
      fetchData()
      setIsShowEditModal(false)
      toast.success('اطلاعات کاربر با موفقیت تغییر کرد')
    } catch (error) {
      console.error(error)
      toast.error('خطا در ویرایش اطلاعات کاربر')
    }
  }

  return (
    <div className='mt-5 md:mt-10 p-5'>
      <h1 className='mb-5 text-sm md:text-2xl'> کاربران</h1>

      {allData.length ? (
        <div className='overflow-x-auto'>
          <table className='cms-table'>
            <thead>
              <tr>
                <th> نام و نام خانوادگی </th>
                <th> نام کاربری </th>
                <th> رمز عبور </th>
                <th> شماره تماس </th>
                <th> ایمیل </th>
              </tr>
            </thead>

            <tbody>
              {allData.map(user => (
                <tr key={user.id}>
                  <td> {`${user.firstname}  ${user.lastname}`} </td>
                  <td> {user.username} </td>
                  <td> {user.password} </td>
                  <td> {user.phone} </td>
                  <td> {user.email} </td>
                  <td>
                    <button
                      onClick={() => {
                        setIsShowDeleteModal(true)
                        setUserId(user.id)
                      }}
                    >
                      حذف
                    </button>

                    <button
                      onClick={() => {
                        setIsShowDetailsModal(true)
                        setUserInfos(user)
                      }}
                    >
                      جزئیات
                    </button>

                    <button
                      onClick={() => {
                        setIsShowEditModal(true)

                        setUserId(user.id)
                        setUserNewFirstName(user.firstname)
                        setUserNewLastName(user.lastname)
                        setUserNewUserName(user.username)
                        setUserNewPassword(user.password)
                        setUserNewPhone(user.phone)
                        setUserNewCity(user.city)
                        setUserNewEmail(user.email)
                        setUserNewAddress(user.address)
                        setUserNewScore(user.score)
                        setUserNewBuy(user.buy)
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
        setTimeout(() => {
          ;<ErrorBox msg='هیچ کاربری یافت نشد' />
        }, 1000)
      )}

      {/* DeleteUserModal  */}

      {isShowDeleteModal && (
        <DeleteModal
          submitAction={acceptDeleteUser}
          cancelAction={cancelDeleteUser}
          title='آیا از حذف کاربر مطمئن هستید'
        />
      )}

      {/* EditUserModal  */}

      {isShowEditModal && (
        <EditModal
          onClose={() => setIsShowEditModal(false)}
          onSubmit={EditUserInfos}
        >
          <div className='edit-container'>
            <MdOutlineEditNote className='add-form-icon' />
            <input
              value={userNewFirstName}
              onChange={e => setUserNewFirstName(e.target.value)}
              className='edit-input-group'
              type='text'
              placeholder=' نام کاربر را وارد کنید '
            />
          </div>

          <div className='edit-container'>
            <MdOutlineEditNote className='add-form-icon' />
            <input
              value={userNewLastName}
              onChange={e => setUserNewLastName(e.target.value)}
              className='edit-input-group'
              type='text'
              placeholder=' نام خانوادگی کاربر را وارد کنید '
            />
          </div>

          <div className='edit-container'>
            <MdOutlineEditNote className='add-form-icon' />
            <input
              value={userNewUserName}
              onChange={e => setUserNewUserName(e.target.value)}
              className='edit-input-group'
              type='text'
              placeholder=' نام کاربری کاربر را وارد کنید '
            />
          </div>

          <div className='edit-container'>
            <MdOutlineEditNote className='add-form-icon' />
            <input
              value={userNewPassword}
              onChange={e => setUserNewPassword(e.target.value)}
              className='edit-input-group'
              type='text'
              placeholder=' رمز عبور کاربر را وارد کنید '
            />
          </div>

          <div className='edit-container'>
            <MdOutlineEditNote className='add-form-icon' />
            <input
              value={userNewPhone}
              onChange={e => setUserNewPhone(e.target.value)}
              className='edit-input-group'
              type='text'
              placeholder=' شماره تماس کاربر را وارد کنید '
            />
          </div>

          <div className='edit-container'>
            <MdOutlineEditNote className='add-form-icon' />
            <input
              value={userNewCity}
              onChange={e => setUserNewCity(e.target.value)}
              className='edit-input-group'
              type='text'
              placeholder=' شهر کاربر را وارد کنید '
            />
          </div>

          <div className='edit-container'>
            <MdOutlineEditNote className='add-form-icon' />
            <input
              value={userNewEmail}
              onChange={e => setUserNewEmail(e.target.value)}
              className='edit-input-group'
              type='text'
              placeholder=' ایمیل کاربر را وارد کنید '
            />
          </div>

          <div className='edit-container'>
            <MdOutlineEditNote className='add-form-icon' />
            <input
              value={userNewAddress}
              onChange={e => setUserNewAddress(e.target.value)}
              className='edit-input-group'
              type='text'
              placeholder=' آدرس کاربر را وارد کنید '
            />
          </div>

          <div className='edit-container'>
            <MdOutlineEditNote className='add-form-icon' />
            <input
              value={userNewScore}
              onChange={e => setUserNewScore(e.target.value)}
              className='edit-input-group'
              type='text'
              placeholder=' نظر کاربر را وارد کنید '
            />
          </div>

          <div className='edit-container'>
            <MdOutlineEditNote className='add-form-icon' />
            <input
              value={userNewBuy}
              onChange={e => setUserNewBuy(e.target.value)}
              className='edit-input-group'
              type='text'
              placeholder=' مقدار خرید کاربر را وارد کنید '
            />
          </div>
        </EditModal>
      )}

      {/* DetailsModal  */}

      {isShowDetailsModal && (
        <DetailsModal onColse={() => setIsShowDetailsModal(false)}>
          <table className='cms-table'>
            <thead>
              <tr>
                <th> آدرس </th>
                <th> شهر </th>
                <th> امتیاز </th>
                <th> خرید </th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td> {userInfos.address} </td>
                <td> {userInfos.city} </td>
                <td> {userInfos.score} </td>
                <td> {userInfos.buy} </td>
              </tr>
            </tbody>
          </table>
        </DetailsModal>
      )}

      <ToastContainer />
    </div>
  )
}

export default Users
