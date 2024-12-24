import { AiOutlineBell } from "react-icons/ai";
import { CiBrightnessUp } from "react-icons/ci";

const Header = () => {
    return (
        <div className=" flex items-center justify-between  ">
            <div className="flex justify-center items-center">
                <img src="./vite.svg" alt="admin Profile" className="ml-5 w-12 h-12 rounded-50% object-cover" />
                <div>
                    <h1 className="text-xl"> علی محمدی </h1>
                    <h3 className="text-gray-500 text-sm"> ادمین سایت </h3>
                </div>
            </div>

            <div className="flex items-center justify-center gap-x-5 ">
                <div className="flex items-center justify-between bg-white1 w-96 h-12 rounded-xl pl-1 shadow-shadow1">
                    <input
                    type="text"
                    placeholder='جست و جو کنید...'
                    className="border-none outline-none pr-3 bg-inherit w-full  text-base"/>

                    <button
                    className="bg-blue1 rounded-xl w-24 h-9 text-white1 text-base flex items-center justify-center p-1"
                    >
                    جست و جو
                    </button>
                </div>

                <button
                className="bg-blue1 shadow-shadow1 w-10 h-10 rounded-50% text-white1 text-2xl flex items-center justify-center">
                    <AiOutlineBell />
                </button>

                <button
                className="bg-blue1 shadow-shadow1 w-10 h-10 rounded-50% text-white1 text-2xl flex items-center justify-center">
                    <CiBrightnessUp />
                </button>
            </div>
        </div>
    );
}

export default Header;
