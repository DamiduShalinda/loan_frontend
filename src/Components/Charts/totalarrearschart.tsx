import { useEffect, useState } from "react";
import { API_ENDPOINTS } from "../../api";
import axios, { AxiosResponse } from "axios";
import { Loader , Center } from "@mantine/core";

type chartData = {
  calculated_date : string;
  total_loanArrears_accounts : number;
}

function Totalarrearschart() {

  const [chartData, setChartData] = useState<chartData[]>([])
  const [ loading , setLoading ] = useState<boolean>(true)

  async function getChartData() {
    await axios.get(API_ENDPOINTS.getAnalytics.arrears)
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
      {loading ? <div><Center><Loader/></Center></div> : <div>l Arrears Loaded</div>}
    </div>
  )
}

export default Totalarrearschart