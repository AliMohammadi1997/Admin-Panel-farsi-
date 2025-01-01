import { AiOutlineBell } from "react-icons/ai";
import { CiBrightnessUp } from "react-icons/ci";
import { IoMenuSharp } from "react-icons/io5";

const Header = ({ toggleBtn }) => {
    return (
        <div className="w-full px-6">

            <h1 className="lg:hidden text-xl text-blue1 p-4  text-center border-blue2 w-full">به داشبورد خود خوش آمدید</h1>
            <hr className="lg:hidden bg-black h-1" />
            <div className="w-full m-0 md:m-4 flex flex-col items-start md:flex-row md:justify-evenly md:items-center  ">

                <div className="w-full flex justify-start items-center ml-2 md:ml-4">
                    <button className="m-5 lg:hidden" onClick={toggleBtn}>
                        <IoMenuSharp />
                    </button>
                    <img src="./vite.svg" alt="admin Profile" className="ml-3 md:ml-5 w-8 md:w-12 h-8 md:h-12 rounded-50% object-cover" />
                    <div className="w-auto">
                        <h1 className="text-sm md:text-xl"> علی محمدی </h1>
                        <h3 className="text-gray-500 text-sm md:text-xl"> ادمین سایت </h3>
                    </div>
                </div>

                <div className="flex items-center justify-end mt-4 md:mt-0 gap-x-5 w-full ">
                    <div className="flex items-center justify-between bg-white1 w-80 md:w-96 h-8 md:h-10 lg:h-12 rounded-xl pl-1 shadow-shadow1">
                        <input
                            type="text"
                            placeholder='جست و جو کنید...'
                            className="font-nazanin border-none outline-none pr-3 bg-inherit w-full h-5 md:h-8 lg:h-10 text-xs md:text-base rounded-xl" />

                        <button
                            className="py-2 px-1 font-nazanin bg-blue1 rounded-xl w-20 md:w-24 h-6 md:h-8 lg:h-10 text-white1 text-xs md:text-base flex items-center justify-center"
                        >
                            جست و جو
                        </button>
                    </div>

                    <button
                        className="bg-blue1 shadow-shadow1 w-8 md:w-10 h-6 md:h-10 rounded-50% text-white1 text-sm md:text-2xl flex items-center justify-center">
                        <AiOutlineBell />
                    </button>

                    <button
                        className="bg-blue1 shadow-shadow1 w-8 md:w-10 h-6 md:h-10 rounded-50% text-white1 text-sm md:text-2xl flex items-center justify-center">
                        <CiBrightnessUp />
                    </button>
                </div>
            </div>
        </div>

    );
}

export default Header;
