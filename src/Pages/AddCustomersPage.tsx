import { useForm,  isEmail, hasLength } from '@mantine/form';
import { Button, Group, TextInput, Box , Input , PasswordInput  , Grid, FileInput } from '@mantine/core';
import { useId , useDisclosure } from '@mantine/hooks';
import { IMaskInput } from 'react-imask';
import { DatePickerInput } from '@mantine/dates';
import axios from 'axios';
import { API_ENDPOINTS } from '../api';

interface usertypeData {
  username: string;
  password: string;
  email: string;
  usertype: string;
}

interface loanData {
  user : usertypeData;
  surname: string;
  name: string;
  dateofbirth: string;
  telephone1: string;
  telephone2: string;
  nicnumber: string;
  address: string;
  profileimage: File;
}

export interface customerFormData {
  surname: string;
  name: string;
  email: string;
  dateofbirth: Date;
  telephone1: string;
  telephone2: string;
  nicnumber: string;
  username: string;
  password: string;
  address: string;
  profileimage?: File;
}


function AddCustomersPage() {
  const id = useId();
  const [visible, { toggle }] = useDisclosure(false);

  const isUsernameValid = (value : string) => {
    if (!/^[a-z]+$/.test(value)) {
      return 'Username must contain only lowercase letters without spaces or special characters';
    }
    
    if (value.length < 2 || value.length > 10) {
      return 'Username must be between 2 and 10 characters long';
    }
    
    return undefined;
  };

  function convertFormData(values: customerFormData): FormData {
    const formData = new FormData();
  
    // Append the properties of the "user" object separately
    formData.append('username', values.username);
    formData.append('password', values.password);
    formData.append('email', values.email);
    formData.append('usertype', 'customer');
  
    formData.append('surname', values.surname);
    formData.append('name', values.name);
    formData.append('dateofbirth', values.dateofbirth.toISOString().slice(0, 10));
    formData.append('telephone1', values.telephone1);
    formData.append('telephone2', values.telephone2);
    formData.append('nicnumber', values.nicnumber);
    formData.append('address', values.address);
  
    if (values.profileimage) {
      formData.append('profileimage', values.profileimage);
    }
  
    return formData;
  }
  

  function logFormData(formData : FormData) {
    for (const pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }
  }
  

  const form = useForm<customerFormData>({

    initialValues: {
      surname: '',
      name: '',
      email: '',
      dateofbirth: new Date(),
      telephone1: '555-5678',
      telephone2: '666-5678',
      nicnumber: '',
      username: '',
      password: '',
      address: '',
      profileimage: new File([], ''),
    },

    validate: {
      surname: hasLength({ min: 2, max: 10 }, 'Name must be 2-10 characters long'),
      name: hasLength({ min: 2, max: 50 }, 'Name must be 2-50 characters long'),
      email: isEmail('Invalid email'),
      // telephone1: hasLength(15, 'Phone number must be 10 characters long'),
      // telephone2: hasLength(15, 'Phone number must be 10 characters long'),
      nicnumber : (value) => {return value?.length === 10 && /^[0-9]{9}[vV]$/.test(value) || value?.length === 12 && /^[0-9]{12}$/.test(value) ? undefined : 'Invalid NIC number';},
      username: (value) => {return isUsernameValid(value)},
      password: (value) => (value ? undefined : 'Password is required'),
      address: hasLength({ min: 2, max: 100 }, 'Address must be 2-100 characters long'),
    },
  });

  const handleSubmit = (values : customerFormData) => {
    const data = convertFormData(values);
    logFormData(data);
    axios
      .post(API_ENDPOINTS.addCustomer, data , {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(res => {
          console.log(res.data);
          form.reset();
      });
  }

  return (
        <Box component="form"   onSubmit={form.onSubmit(() => {handleSubmit(form.values)})}>
    <Grid pos={'relative'} mx={'xl'}>
      <Grid.Col span={5} >
      <TextInput label="Surname" placeholder="Surname" mt="md" withAsterisk {...form.getInputProps('surname')} />
      <TextInput label="Name" placeholder="Name" withAsterisk {...form.getInputProps('name')} mt="md" />
      <TextInput label="Address" placeholder="Name" withAsterisk {...form.getInputProps('address')} mt="md" />
      <TextInput
        label="Your email"
        placeholder="Your email"
        withAsterisk
        mt="md"
        {...form.getInputProps('email')}
      />
      <Input.Wrapper id={id} label="Phone Number 1" required error = {form.errors.telephone1} mt="md">
      <Input
        component={IMaskInput}
        mask="+94 00-000-0000"
        id={id}
        placeholder="Phone Number 1"
        {...form.getInputProps('telephone1')}
      />
    </Input.Wrapper>
      <Input.Wrapper id={id} label="Phone Number 2" required error = {form.errors.telephone2} mt="md">
      <Input
        component={IMaskInput}
        mask="+94 00-000-0000"
        id={id}
        placeholder="Phone Number 2"
        
        {...form.getInputProps('telephone2')}
      />
    </Input.Wrapper>
    <DatePickerInput
      label="Date of Birth"
      placeholder="Pick date"
      withAsterisk
      mt="md"
      {...form.getInputProps('dateofbirth')}
    />

      <TextInput label="NIC number" placeholder="NIC number" withAsterisk {...form.getInputProps('nicnumber')} mt="md"/>
      <FileInput label="Customer's Image" placeholder="Upload files" accept="image/png,image/jpeg" mt="md" withAsterisk {...form.getInputProps('profileimage')}/>
        {/* <Demo/> */}
    

      </Grid.Col>
      <Grid.Col span={1} ></Grid.Col>
      <Grid.Col span={5} >
      <TextInput label="Username" placeholder="Username" withAsterisk {...form.getInputProps('username')} mt="md"/>
      <PasswordInput
        label="Password"
        withAsterisk
        defaultValue="secret"
        visible={visible}
        onVisibilityChange={toggle}
        mt="md"
        {...form.getInputProps('password')}
      />
      <Group position="right" mt="md">
        <Button type="submit" >Submit</Button>
      </Group>
      </Grid.Col>
    </Grid>
    </Box>
    
  );
}

export default AddCustomersPage;