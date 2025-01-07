import { useEffect } from 'react'

const EditModal = ({ children, onClose, onSubmit }) => {
  useEffect(() => {
    const checkKey = event => {
      if (event.keyCode === 27) {
        onClose()
      }
    }

    window.addEventListener('keydown', checkKey)

    return () => window.removeEventListener('keydown', checkKey)
  })

  return (
    <div className='modal-parent active'>
      <form className='w-60  md:w-96 p-7 bg-white text-center'>
        <h1 className='text-sm md:text-xl'> اطلاعات جدید را وارد نمایید </h1>

        {children}

        <button
          className='text-sm mt-5 w-full p-2 bg-blue1 text-white'
          onClick={onSubmit}
        >
          ثبت اطلاعات جدید
        </button>
        <button
          onClick={() => onClose()}
          className='text-sm mt-5 w-full p-2 bg-blue1 text-white'
        >
          بستن
        </button>
      </form>
    </div>
  )
}

export default EditModal
