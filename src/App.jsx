import { useRoutes } from 'react-router-dom'
import Header from './Component/Header/Header'
import Sidebar from './Component/Sidebar/sidebar'
import routes from './routes'
import { useState } from 'react'

// import './App.css'

function App () {
  const router = useRoutes(routes)
  const [isActive, setIsActive] = useState(false)
  const toggleBtn = () => {
    setIsActive(!isActive)
  }

  return (
    <>
      <div className=' hidden lg:flex w-full '>
        <Sidebar />
        <div className='flex-5 m-8 '>
          <Header />
          {router}
        </div>
      </div>

      <div className='flex flex-col lg:hidden w-full '>
        {isActive && <Sidebar toggleBtn={toggleBtn} isActive={isActive} />}

        <Header toggleBtn={toggleBtn} />
        {router}
      </div>
    </>
  )
}

export default App
