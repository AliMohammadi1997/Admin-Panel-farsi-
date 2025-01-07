import { AiOutlineHome } from 'react-icons/ai'
import { BsCurrencyDollar } from 'react-icons/bs'
import { FiUsers } from 'react-icons/fi'
import { IoBagCheckOutline, IoClose } from 'react-icons/io5'
import {
  MdOutlineComment,
  MdOutlineProductionQuantityLimits
} from 'react-icons/md'
import { NavLink } from 'react-router-dom'

const Sidebar = ({ toggleBtn, isActive }) => {
  return (
    <div
      className={`fixed  lg:sticky bg-blue1 h-screen w-64    top-0 right-0 p-4 transform transition-transform ${
        isActive ? 'translate-x-0' : 'translate-x-full'
      } lg:translate-x-0`}
    >
      <button
        className='text-2xl text-white mb-6 fixed top-3 left-3 lg:hidden'
        onClick={toggleBtn}
      >
        <IoClose />
      </button>
      <h1 className='hidden lg:inline-block text-xl text-white  p-4  text-center border-b-2 border-solid  border-blue2 w-full'>
        به داشبورد خود خوش آمدید
      </h1>

      <ul className='sidebar-links mt-5 '>
        <NavLink className=' mb-4' to='/' onClick={() => toggleBtn()}>
          <AiOutlineHome className='ml-2' />
          صفحه اصلی
        </NavLink>

        <NavLink to='/products' onClick={() => toggleBtn()}>
          <MdOutlineProductionQuantityLimits className='ml-2  sidebar-icon' />
          محصولات
        </NavLink>

        <NavLink to='/comments' onClick={() => toggleBtn()}>
          <MdOutlineComment className='ml-2  sidebar-icon' />
          کامنت ها
        </NavLink>

        <NavLink to='/users' onClick={() => toggleBtn()}>
          <FiUsers className='ml-2 sidebar-icon' />
          کاربران
        </NavLink>

        <NavLink to='/orders' onClick={() => toggleBtn()}>
          <IoBagCheckOutline className='ml-2 sidebar-icon' />
          سفارشات
        </NavLink>

        <NavLink to='/offs' onClick={() => toggleBtn()}>
          <BsCurrencyDollar className='ml-2 sidebar-icon' />
          تخفیف ها
        </NavLink>
      </ul>
    </div>
  )
}

export default Sidebar
