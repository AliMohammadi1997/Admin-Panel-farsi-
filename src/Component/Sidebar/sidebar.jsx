import { AiOutlineHome } from "react-icons/ai";
import { BsCurrencyDollar } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";
import { IoBagCheckOutline } from "react-icons/io5";
import { MdOutlineComment, MdOutlineProductionQuantityLimits } from "react-icons/md";
import { NavLink } from "react-router-dom";


const Sidebar = () => {
    return (
        <div className="sticky bg-blue1 h-screen top-0 p-4 flex-1">
            <h1 className="text-x text-white1 p-4  text-right border-solid border-b-2 border-blue2 ">به داشبورد خود خوش آمدید</h1>

            <ul className="sidebar-links mt-5 ">

                <NavLink className=' mb-4' to="/" >
                    <AiOutlineHome className="ml-2" />
                    صفحه اصلی
                </NavLink>

                <NavLink to="/products">
                    <MdOutlineProductionQuantityLimits className="ml-2" />
                    محصولات
                </NavLink>

                <NavLink to="/comments">
                    <MdOutlineComment className="ml-2 " />
                    کامنت ها
                </NavLink>

                <NavLink to="/users">
                    <FiUsers className="ml-2" />
                    کاربران
                </NavLink>

                <NavLink to="/orders">
                    <IoBagCheckOutline className="ml-2" />
                    سفارشات
                </NavLink>

                <NavLink to="/offs">
                    <BsCurrencyDollar className="ml-2" />
                    تخفیف ها
                </NavLink>
            </ul>
        </div>
    );
}

export default Sidebar;
