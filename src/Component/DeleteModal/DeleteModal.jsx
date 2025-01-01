import ReactDOM from 'react-dom'

const DeleteModal = ({cancelAction ,submitAction, title}) => {

    return ReactDOM.createPortal(
        <div className="modal-parent active">
            <div className="bg-white1 p-7 text-center">
                <h1 className="text-sm md:text-xl"> {title}</h1>
                <div className="flex gap-x-5 mt-2">
                    <button className="delete-btn text-xs md:text-lg bg-blue1 text-white" onClick={() => submitAction()}>بله</button>
                    <button className="delete-btn text-xs md:text-lg bg-gray-400" onClick={() => cancelAction()}>خیر</button>
                </div>
            </div>
        </div>,document.getElementById('modal-parent')
    )
}

export default DeleteModal;
