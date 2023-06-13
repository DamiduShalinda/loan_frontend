import { useState  , useEffect} from "react"
import axios , { AxiosResponse, Method } from 'axios'


const useFetch = (apiEndPoints : string , method : Method , data?:any) => {
    const[respone , setResponse] = useState<AxiosResponse>()
    const[loading , setLoading] = useState<boolean>(false)
    const[error , setError] = useState('')


    useEffect(() => {
     
        const fetchData = async () => {
            try {
                setLoading(true)
                const config = {
                    method: method,
                    url: apiEndPoints,
                    ...(data && {data: data})
                }
                const response = await axios(config)
                setResponse(response)
                setLoading(false)
            } catch (err) {
                setError(err.message)
                setLoading(false)
            }
        };

        fetchData();
      
    }, [apiEndPoints , method , data])
    
    return {respone , loading , error}	
}


export default useFetch