import { Center , Title  , Text, Loader, Divider, Card, Grid, Box, Space, Container } from "@mantine/core"
import axios, { AxiosResponse } from "axios"
import { API_ENDPOINTS } from "../api"
import { useEffect, useState } from "react"
import Totalloanschart from "../Components/Charts/totalloanschart"
import Totalpaymentschart from "../Components/Charts/totalpaymentschart"
import Totalarrearschart from "../Components/Charts/totalarrearschart"
import Totalcustomerschart from "../Components/Charts/totalcustomerschart"


type AnalyticsData = {
  id : number;
  date_requested : string;
  calculated_date : number;
  loan_count : number;
  total_payments : number;
  total_loanArrears_accounts : number;
  lastmonth_customer_count : number;
}


type AnalyticsCardProps = {
  title? : string;
  value? : number;
  onclick : () => void;
}

function Analytics() {

  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>()
  const [ loading, setLoading ] = useState<boolean>(true)
  const [ chartType, setChartType ] = useState<string>()


  async function updateAnalyticsData(){
    await axios.post(API_ENDPOINTS.getAnalytics.basic, {})
    
    .catch((err) => {
      console.log(err)
    })
  }

  const getAnalyticsData = () => async () => {
    await axios.get(API_ENDPOINTS.getAnalytics.basic)
    .then((res : AxiosResponse<AnalyticsData>) => {
      setAnalyticsData(res.data)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  useEffect(() => {
    updateAnalyticsData()
    .then(getAnalyticsData())
    .then(() => {setLoading(false)})
  }, [])

 

  function handleSubmitLoans(): void {
    setChartType('loans')
  }

  function handleSubmitPayments(): void {
    setChartType('payments')
  }

  function handleSubmitArrears(): void {
    setChartType('arrears')
  }

  function handleSubmitCustomers(): void {
    setChartType('customers')
  }

  return (
    <Grid>
        <Grid.Col span={4}>
        <>
        {
          loading ? <Loader/> : <>
          <Text size="2rem" ta={"start"} lts="15" fw={"bolder"}>ANALYTICS </Text>
          <Divider size="md" w='25rem' mt='md'/>
          <Text size="1rem" ta={"start"} lts="1" fw={"bolder"} mb='3rem'>{analyticsData?.date_requested} Month Summary</Text>
          <Box w='25rem'>
            <Grid>
              <Grid.Col span={6}>
                <AnalyticsCard title="Total Loans" value={analyticsData?.loan_count} onclick={handleSubmitLoans}/>
            </Grid.Col>
            <Grid.Col span={6}>
                <AnalyticsCard title="Total Payments" value={analyticsData?.total_payments} onclick={handleSubmitPayments}/>
            </Grid.Col>
            <Grid.Col span={6}>
            <AnalyticsCard title="Total Arrears" value={analyticsData?.total_loanArrears_accounts} onclick={handleSubmitArrears}/>
            </Grid.Col>
            <Grid.Col span={6}>
            <AnalyticsCard title="Last Month Customer Count" value={analyticsData?.lastmonth_customer_count} onclick={handleSubmitCustomers}/>
            </Grid.Col>
            </Grid>
          </Box>
          </>
        }
    </>
         </Grid.Col>
          <Grid.Col span={8}>
          {  chartType === 'loans' ? <Totalloanschart/> :
                  chartType === 'payments' ? <Totalpaymentschart/> : 
                    chartType === 'arrears' ? <Totalarrearschart/> : 
                      chartType === 'customers' ? <Totalcustomerschart/> : <></> }
          </Grid.Col> 
    </Grid>
  )
}

export default Analytics



const AnalyticsCard = ({ title, value , onclick } : AnalyticsCardProps) => {
  return (
    <Card 
      shadow="sm" padding="md" radius="md" style={{ marginBottom: '15px' }} w='11rem' h='9rem'
      onClick={onclick}
      >
      <Text size="0.81rem" ta="start" lts="1" fw="bold">
        {title}
      </Text>
      <Space mt='sm'/>
      <Text size="2rem" ta="start" lts="1" fw="bolder">
        {value}
      </Text>
    </Card>
  );
};