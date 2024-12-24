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
            <div className="p-7 bg-white text-lg">
          {children}
            </div>
        </div>
    );
}

export default DetailsModal;
