import { useRoutes } from "react-router-dom"
import Header from "./Component/Header/Header"
import Sidebar from "./Component/Sidebar/sidebar"
import routes from "./routes"

// import './App.css'


function App() {

    const router = useRoutes(routes)


    return (
        <div className="flex flex-col sm:flex-col md:flex-col lg:flex-row xl:flex-row">
            <Sidebar />

            <div className="flex-5 m-8 ">
                <Header />
                {router}
            </div>


        </div>

    )
}

export default App
