import { useEffect } from "react";

const DetailsModal = ({ onColse,children }) => {

    useEffect(() => {
        const checkKey = (event) => {
            if (event.keyCode === 27) {
                onColse();
            }
        };

        window.addEventListener('keydown', checkKey);

        return () => window.removeEventListener('keydown', checkKey)
    });


    return (
        <div className="modal-parent active">
            <div className="p-7 bg-white text-sm  md:text-lg m-4">
          {children}
          <button onClick={() => onColse()} className=' text-xs md:text-sm mt-5 w-full p-2 bg-blue1 text-white'> بستن </button>
            </div>
        </div>
    );
}

export default DetailsModal;
