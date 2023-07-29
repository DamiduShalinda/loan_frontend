import axios, { AxiosResponse } from "axios"
import { useParams } from "react-router-dom"
import { API_ENDPOINTS } from "../api"
import { useEffect, useState } from "react"
import { Grid, List, Loader, Title , Image , Text } from '@mantine/core';

type customerData = {
  name: string,
  surname: string,
  address: string,
  telephone1: string,
  telephone2: string,
  dateofbirth: string,
  nicnumber : string,
  profileimage : string,
  email : string,

}
function ViewOneCustomer() {

    const { id } = useParams<{id : string}>()
    const [ loading, setLoading ] = useState<boolean>(false)
    const [ customerData , setCustomerData ] = useState<customerData>()

    function getCustomerData(id: number) {
      axios.get(API_ENDPOINTS.getOneCustomer(id))
      .then(
        (res : AxiosResponse<customerData>) => {
            setCustomerData(res.data);
      }
      )
    }

    useEffect(() => {
      id && getCustomerData(parseInt(id))
      setLoading(true)
    }, [])
    

  return (
    <div>{
      !id && !loading ? 
      <h1><Loader variant="bars"/></h1> : 
      <>
      <Grid>
        <Grid.Col span={6}>
          <Image src={customerData?.profileimage} width={500} height={500} alt="customer image" radius={"md"}/>
        </Grid.Col>
        <Grid.Col span={6}>
          <Title order={1} size='7vh'>{customerData?.name}</Title>
          <List m={"xl"}>
            <List.Item mb={"xs"}><b>Surname : </b>{customerData?.surname}</List.Item>
            <List.Item mb={"xs"}><b>Address : </b>{customerData?.address}</List.Item>
            <List.Item mb={"xs"}><b>Telephone 1 : </b>{customerData?.telephone1}</List.Item>
            <List.Item mb={"xs"}><b>Telephone 2 : </b>{customerData?.telephone2}</List.Item>
            <List.Item mb={"xs"}><b>Date of Birth : </b>{customerData?.dateofbirth}</List.Item>
            <List.Item mb={"xs"}><b>NIC Number : </b>{customerData?.nicnumber}</List.Item>
            <List.Item mb={"xs"}><b>Email : </b>{customerData?.email}</List.Item>
          </List>
        </Grid.Col>
      </Grid>
      </>
      }</div>
  )
}

export default ViewOneCustomer