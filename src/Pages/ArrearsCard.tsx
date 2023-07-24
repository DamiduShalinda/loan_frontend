import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { API_ENDPOINTS } from "../api";
import { Center, Container, Loader  , Table, createStyles } from "@mantine/core";


type inputProps = {
    id: number;
    date : string
}

interface LoanData {
    id: number;
    loan_id: string;
    monthly_arrears: number;
    monthly_payment: number;
    arr_cal_date: string;
    customer_name: string;
    customer_address: string;
    customer_telephone: string;
  }

  interface StaffDetails {
    name: string;
    id: number;
    assigned_location: string;
    
  }

  const useStyles = createStyles((theme) => ({
    
    background : {
      backgroundColor : theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  
    }))

export default function ArrearsCard({id , date}: inputProps) {

    const [loanData, setLoanData] = useState<LoanData[]>([]);
    const [ loading , setLoading ] = useState<boolean>(true);
    const { classes } = useStyles();

    //datestr should be just  date part of date
    const datestr = date.split('00')[0];


    function getLoanData(id : number) {
        try {
            axios.get(API_ENDPOINTS.getStaffId(id))
            .then((response : AxiosResponse<StaffDetails>) => {
                const staff_name = response.data.name;
                axios.get(API_ENDPOINTS.getArrearsByStaff(staff_name))
                .then((response : AxiosResponse<LoanData[]>) => {
                    setLoanData(response.data);
                }
                )

            })

        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getLoanData(id);
    }, [])

    useEffect(() => {
      if (loanData.length > 0) {
            setLoading(false);
      }

    }, [loanData])
    
    const ths = (
            <tr>
                <th>Index</th>
                <th>Loan Number</th>
                <th>Customer Name</th>
                <th>Customer Address</th>
                <th>Customer Telephone</th>
                <th>Monthly Payment</th>
                <th>Monthly Arrears</th>
            </tr>
    )

    const rows = loanData.length > 0 ? (
        loanData.map((row , index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{row.loan_id}</td>
            <td>{row.customer_name}</td>
            <td>{row.customer_address}</td>
            <td>{row.customer_telephone}</td>
            <td>{row.monthly_payment}</td>
            <td>{row.monthly_arrears}</td>
          </tr>
        ))
      ) : null;
    

  return (
    <>
    {loading ? <Loader variant="dots"/> :
    <div>
        <Container size='xl'>
          <Center>
          <Table captionSide="top" withBorder withColumnBorders verticalSpacing='md' align="center">
              <caption>Arrears Card for {datestr}</caption>
              <thead>{ths}</thead>
              <tbody>{rows}</tbody>
          </Table>
          </Center>
        </Container>
    </div>

    }
    </>
  )
}
