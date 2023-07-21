import { Chip  , Group, Button , Divider, PasswordInput, TextInput, Container, Grid, NumberInput, ScrollArea} from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useState } from 'react';
import { useForm } from '@mantine/form';
import { IconCheck } from '@tabler/icons-react';
import axios from 'axios';
import { API_ENDPOINTS} from '../api';
import jwtDecode from 'jwt-decode';


type UserType ={
    username: string;
    user_id: number;
    is_collector: boolean;
}

function SearchComponents() {
    const [value, setValue] = useState<[Date | null, Date | null]>([null, null]);
    const [ disabled, setDisabled ] = useState<boolean>(true)
    const [chipvalue, setChipvalue] = useState<string[]>([]);
    const [user, setUser] = useState<UserType>()


    const form = useForm({
        initialValues: {
            username: '',
            password: '',
        },
    });
    
    function handleSubmitDate(): void {
        throw new Error('Function not implemented.');
    }

    function handleSubmitValidation(): void {
       axios.post(API_ENDPOINTS.getUser, form.values)
        .then(res => {
            if (res.status == 200) {
                setUser(jwtDecode(res.data.access))
                if (user?.is_collector == true) {
                    setDisabled(false)
                }
            }else {
                console.log("error")
            }
        })
    }

  return (
    <>
    <div>
    <Divider my="md" label="Locations" labelPosition='center'/>
    <Chip.Group multiple onChange={setChipvalue} value={chipvalue}>
        <Group position="left" mt="md">
          <Chip value="polonnaruwa">Polonnaruwa</Chip>
          <Chip value="dehiattakandiya">Dehiattakandiya</Chip>
          <Chip value="diyasenpura">Diyasenpura</Chip>
          <Chip value="sewanapitiya">Sewanapitiya</Chip>
          <Chip value="mahiyanganya">Mahiyanganya</Chip> 
        </Group>
      </Chip.Group>
      <Group position='right' mt='xl'>
        <Button type='submit' variant='outline' color='blue'onClick={() => console.log(chipvalue)}>Submit</Button>
      </Group>
    </div>
    <div>
        <Divider my="md" label="Select min-max arrears" labelPosition='center'/>
        <Grid>
            <Grid.Col span={6}>
            <NumberInput
                label="Price"
                defaultValue={0}
                step={1000}
                parser={(value) => value.replace(/LKR\s?|(,*)/g, '')}
                formatter={(value) =>
                    !Number.isNaN(parseFloat(value))
                    ? `LKR ${value}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
                    : 'LKR '
                }
                />

            </Grid.Col>
            <Grid.Col span={6}>
            <NumberInput
                label="Max"
                defaultValue={100000}
                step={1000}
                parser={(value) => value.replace(/LKR\s?|(,*)/g, '')}
                formatter={(value) =>
                    !Number.isNaN(parseFloat(value))
                    ? `LKR ${value}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
                    : 'LKR '
                }
                />
            </Grid.Col>
        </Grid>
        <Group position='right' mt='xl'>
        <Button type='submit' variant='outline' color='blue'>Submit</Button>
      </Group>
    </div>
    <div>
    <Divider my="md" label="Generate Arrears cards" labelPosition='center'/>
    <Container my={'md'}>
    <DatePickerInput
      type="range"
      label="Pick dates range"
      placeholder="Pick dates range"
      value={value}
      onChange={setValue}
      mx="auto"
      mt='md'
      clearable
    />
    <form onSubmit={form.onSubmit(handleSubmitValidation)}>
    <Divider mt="xl" label="Enter password of a collector" labelPosition='left'/>
     <TextInput
        placeholder="username"
        label="Full name"
        withAsterisk
        mt={'md'}
        {...form.getInputProps('username')}
    />
    <PasswordInput
        placeholder="Password"
        label="Password"
        withAsterisk
        mt={'md'}
        {...form.getInputProps('password')}
    />
    <Group position='right' mt='xl'>
        <Button 
            type='submit' 
            variant='outline' 
            color='green' 
            leftIcon={!disabled && <IconCheck/>}
                >Submit User</Button>
    </Group>
    </form>
    <Group position='right' mt='xl'>
        <Button type='submit' variant='outline' color='blue' onClick={() => handleSubmitDate()} disabled={disabled}>Submit</Button>
    </Group>
    </Container>
    </div>
    </>
  )
}

export default SearchComponents