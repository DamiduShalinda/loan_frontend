import { useEffect, useState  , PureComponent} from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import { API_ENDPOINTS } from "../../api";
import axios, { AxiosResponse } from "axios";
import { Loader , Center } from "@mantine/core";

type chartData = {
  calculated_date : string;
  total_customer_count : number;
}


function Totalcustomerschart() {

  const [chartData, setChartData] = useState<chartData[]>([])
  const [ loading , setLoading ] = useState<boolean>(true)

  const data = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
    },
  ];

  async function getChartData() {
    await axios.get(API_ENDPOINTS.getAnalytics.customers)
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
      <div>
        <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
          
        </LineChart>
      </ResponsiveContainer>
      </div>
      }
      Total Customers Chart Bla Bla Bla
    </div>
  )
}

export default Totalcustomerschart