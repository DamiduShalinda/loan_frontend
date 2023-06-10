import { useState  , useEffect} from "react"
import axios , { AxiosResponse } from 'axios'


const useFetch = (apiEndPoints : string) => {
    const[data , setData] = useState<AxiosResponse>()
    const[loading , setLoading] = useState<boolean>(false)
    const[error , setError] = useState('')

    useEffect(() => {
     
        const fetchData = async () => {
            try {
                setLoading(true)
                const response = await axios.get(apiEndPoints)
                setData(response)
                setLoading(false)
            } catch (err) {
                setError(err.message)
                setLoading(false)
            }
        };

        fetchData();
      
    }, [apiEndPoints])
    
    return {data , loading , error}	
}


export default useFetch