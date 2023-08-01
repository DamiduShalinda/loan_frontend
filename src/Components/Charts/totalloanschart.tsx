import { useEffect, useState } from "react";
import { API_ENDPOINTS } from "../../api";
import axios, { AxiosResponse } from "axios";
import { Loader , Center } from "@mantine/core";

type chartData = {
  calculated_date : string;
  loan_count : number;
}


function Totalloanschart() {
  const [chartData, setChartData] = useState<chartData[]>([])
  const [ loading , setLoading ] = useState<boolean>(true)

  async function getChartData() {
    await axios.get(API_ENDPOINTS.getAnalytics.loans)
    .then((res : AxiosResponse<chartData[]>) => {
      setChartData(res.data)
    })
    }
    
    useEffect(() => {
      getChartData().then(() => setLoading(false))
    }, [])

    useEffect(() => {
      console.log(chartData)
    }, [chartData])


  return (
    <div>
      {loading ? <div><Center><Loader/></Center></div> : <div> Loans Loaded</div>}
    </div>
  )
}

export default Totalloanschart