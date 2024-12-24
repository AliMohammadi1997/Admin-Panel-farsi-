import axios from "axios";
import { useCallback, useEffect, useState } from "react";

const UseGetFetch = (url) => {

        const [allData, setAllData] = useState([])
        const [error, setError] = useState([])



        const fetchData = useCallback(
            async () => {
                try {
                    const response = await axios(url);
                    setAllData(response.data)

                } catch (error) {
                    setError(error)
                }
            },[url])

        useEffect(() => {
             fetchData();
        },[fetchData])

        return { allData, error , setAllData,fetchData}
    }


export default UseGetFetch;
