import axios , {AxiosResponse}from "axios"
import { CustomerFormData } from "./AddNewCustomers"
import React from "react"
import { Navbar } from "../Components/Navbar"

function ViewAllCustomers() {

    const [customerData , setCustomerData] =React.useState<CustomerFormData[]>([])

    const getData = () => {
        axios.get<CustomerFormData[]>('http://localhost:8000/customers/getcustomers')
        .then((res: AxiosResponse<CustomerFormData[]>) => {
            setCustomerData(res.data)
            console.log(customerData.length)
        })
        .catch(err => {
            console.log(err)
        })
    }

    React.useEffect(() => {
        getData()
    }, [])

  return (
    <div>
        <Navbar/>
        <div className="flex flex-col gap-3 mx-28 mt-7 max-h-full grow ">
        <h1 className="text-white text-3xl font-bold">VIEW ALL CUSTOMERS ....</h1>
        <hr className="mb-5"/>
        {customerData.length > 0 && customerData.map((customer) => (
           <div className="flex flex-col gap-3 mx-60 mt-7 max-h-full grow">
           <table className="text-white">
             <tbody>
               <tr>
                 <td className="border border-white p-2 w-normla-width"><label className="font-bold">Surname</label></td>
                 <td className="border border-white p-2 w-normla-width">{customer.surname}</td>
               </tr>
               <tr>
                 <td className="border border-white p-2"><label className="font-bold">Customer Name</label></td>
                 <td className="border border-white p-2">{customer.name}</td>
               </tr>
               <tr>
                 <td className="border border-white p-2"><label className="font-bold">Address</label></td>
                 <td className="border border-white p-2">{customer.address}</td>
               </tr>
               <tr>
                 <td className="border border-white p-2"><label className="font-bold">Email</label></td>
                 <td className="border border-white p-2">{customer.email}</td>
               </tr>
               <tr>
                 <td className="border border-white p-2"><label className="font-bold">Telephone Number 1</label></td>
                 <td className="border border-white p-2">{customer.telephone1}</td>
               </tr>
               <tr>
                 <td className="border border-white p-2"><label className="font-bold">Telephone Number 2</label></td>
                 <td className="border border-white p-2">{customer.telephone2}</td>
               </tr>
             </tbody>
           </table>
         </div>
        ))
    }
    </div>

    </div>
  )
}

export default ViewAllCustomers