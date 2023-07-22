import { useForm } from '@mantine/form';
import { NumberInput, TextInput, Button, Box, Group, PasswordInput, Checkbox } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';

interface staffinterface {
  name: string;
  email: string;
  addess: string;
  telephone1: string;
  telephone2: string;
  dateofbirth: Date;
  nicnumber: string;
  is_collector: boolean;
  username: string;
  password: string;
  usertype: string;
}

function AddNewEmployee() {

  
  const form = useForm<staffinterface>({
    initialValues: { 
      name: '', 
      email: '', 
      addess: '',
      telephone1: '',
      telephone2: '',
      dateofbirth: new Date(),
      nicnumber: '',
      is_collector: false,
      username: '',
      password: '',
      usertype: 'staff',
    },

    // functions will be used to validate values at corresponding key
    validate: {
      name: (value) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  return (
    <>
      <Box maw='35%' mx="auto">
      <form onSubmit={form.onSubmit(console.log)}>
        <TextInput label="Name" placeholder="Name" {...form.getInputProps('name')} withAsterisk />
        <TextInput mt="md" label="Email" placeholder="Email" {...form.getInputProps('email')}  withAsterisk/>
        <TextInput mt="md" label="Address" placeholder="Address" {...form.getInputProps('address')}  withAsterisk/>
        <TextInput mt="md" label="Telephone 1" placeholder="Telephone 1" {...form.getInputProps('telephone1')} withAsterisk />
        <TextInput mt="md" label="Telephone 2" placeholder="Telephone 2" {...form.getInputProps('telephone2')}  withAsterisk/>
        <DatePickerInput
            label="Pick date"
            placeholder="Pick date"
            mx="auto"
            maw={400}
            mt="md"
            {...form.getInputProps('dateofbirth')}
            />
        <TextInput mt="md" label="NIC Number" placeholder="NIC Number" {...form.getInputProps('nicnumber')}  withAsterisk/>
        <TextInput mt="md" label="Username" placeholder="Username" {...form.getInputProps('username')}  withAsterisk/>
        <PasswordInput mt="md" label="Password" placeholder="Password" {...form.getInputProps('password')}  withAsterisk/>
        <Checkbox
            label="Employee is a collector"
            radius="xs"
            size="sm"
            mt="md"
          />
        <Group position='right'>
          <Button type="submit" mt="md">
            Submit
          </Button>
        </Group>
      </form>
    </Box>
    </>
  )
}

export default AddNewEmployee