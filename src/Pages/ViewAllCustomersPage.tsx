import { useState , useEffect} from 'react'
import { TableSort } from '../Components/TableSort'
import { customerFormData } from './AddCustomersPage'
import { API_ENDPOINTS } from '../api'
import axios, { AxiosResponse } from 'axios'
import { Modal  , Button , Group} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks';


type extendCustomerFormData = customerFormData & {
  id: number;
}

type newCustomerFormData = {
  id: string;
  name: string;	
  address: string;
  email: string;
}

const mockData: newCustomerFormData[] = [
  {
    "id": "14",
    "name": "damidu",
    "address": "damidu",
    "email": "damiu@dmaidu.com"
  },
  {
    "id": "15",
    "name": "putha",
    "address": "shanputha",
    "email": "shan@putha.com"
  },
  {
    id: "16",
    name: "John",
    address: "New York",
    email: "john@example.com"
  },
  {
    id: "17"	,
    name: "Jane",
    address: "London",
    email: "jane@example.com"
  },
  // Add more objects as needed
  {
    id: "18",
    name: "Alice",
    address: "Paris",
    email: "alice@example.com"
  },
  {
    id: "19",
    name: "Bob",
    address: "Sydney",
    email: "bob@example.com"
  },
  // Add more objects as needed
  {
    id: "20",
    name: "Emma",
    address: "Berlin",
    email: "emma@example.com"
  },
  {
    id: "21" ,
    name: "David",
    address: "Tokyo",
    email: "david@example.com"
  }
]

function ViewAllCustomersPage() {
  const [customerData, setCustomerData] = useState<customerFormData[]>([])
  const [newcustomerData, setNewCustomerData] = useState<newCustomerFormData[]>([])
  const [isLoading, setIsLoading] = useState(false);
  const [opened, { open, close }] = useDisclosure(false)
  const [ personsData , setPersonsData ] = useState<newCustomerFormData>()


  const getData = () => {
    axios.get<[extendCustomerFormData]>(API_ENDPOINTS.getCustomers)
    .then((res: AxiosResponse<extendCustomerFormData[]>) => {
        setCustomerData(res.data)
        setNewCustomerData(splitJson(res.data))
        console.log(newcustomerData)
        
    })
    .catch(err => {
        console.log(err)
    })
}

const splitJson = (json: newCustomerFormData[]) => {
  const new_json_array: newCustomerFormData[] = json.map(({ id, name, address, email }) => ({
    id,
    name,
    address,
    email
  }));
  return new_json_array
}	


useEffect(() => {
    //getData()
}, [])

const handleSubmit = (id: string) => {
  const id_number = parseInt(id)
  setPersonsData(extractDataById(id_number))
  open()
}

const extractDataById = (id: number): newCustomerFormData | undefined => {
  return mockData.find((data) => data.id === id);
};

  return (
    <div>
      <div >
        
        <TableSort data={mockData} onSubmit={handleSubmit}/>
        <Modal opened={opened} onClose={close} centered title={personsData?.name}>
          <ul>
            <li style={{textTransform : 'capitalize'}}>Name : {personsData?.name}</li>
            <li>Address : {personsData?.address}</li>
            <li>Email : {personsData?.email}</li>
          </ul>
          <Group position='right'>
          <Button onClick={close}>Close</Button>
          </Group>
        </Modal>

        
    </div>
    </div>
  )
}

export default ViewAllCustomersPage