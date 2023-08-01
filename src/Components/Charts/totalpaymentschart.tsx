import { useEffect, useState } from "react";
import { API_ENDPOINTS } from "../../api";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import axios, { AxiosResponse } from "axios";
import { Loader , Center, Container  , Text} from "@mantine/core";

type chartData = {
  calculated_date : string;
  total_payments : number;
}


function Totalpaymentschart() {

  const [chartData, setChartData] = useState<chartData[]>([])
  const [ loading , setLoading ] = useState<boolean>(true)

  async function getChartData() {
    await axios.get(API_ENDPOINTS.getAnalytics.payments)
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
      {loading ? <div><Center><Loader/></Center></div> : 

      <Container m='auto' mt='7rem'>
      <Text align='center' mt='3rem' weight={700} size='lg' mb='1rem'>Got Total Payments over Years</Text>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          width={500}
          height={300}
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="calculated_date" />
          <YAxis />
          <Line type="monotone" dataKey="total_payments" stroke="#8884d8" activeDot={{ r: 5 }} />
        </LineChart>
      </ResponsiveContainer>
      </Container>
      }
    </div>
  )
}

export default Totalpaymentschart