import { Chip  , Group, Button , Divider, PasswordInput, TextInput, Container, Grid, NumberInput, Space} from '@mantine/core';
import { MonthPickerInput } from '@mantine/dates';
import { useState } from 'react';
import { useForm } from '@mantine/form';
import { IconCheck } from '@tabler/icons-react';
import axios from 'axios';
import { API_ENDPOINTS} from '../api';
import jwtDecode from 'jwt-decode';
import { Link } from 'react-router-dom';


type UserType ={
    username: string;
    user_id: number;
    is_collector: boolean;
}

export interface filtertypes {
    min: number;
    max: number;
    location: string;
}

interface inputProps{
    onDateSubmit: (value: Date) => void;
    onFilterSubmit: (value : filtertypes) => void;
}

function SearchComponents({ onDateSubmit, onFilterSubmit }: inputProps) {
    const [ disabled, setDisabled ] = useState<boolean>(true)
    const [user, setUser] = useState<UserType>()
    const [date, setDate] = useState<Date | null>(null);


    const form = useForm({
        initialValues: {
            username: '',
            password: '',
        },
    });

    const filterform = useForm<filtertypes>({
        initialValues: {
            min: 1000,
            max: 100000,
            location: '',
        },
    });


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
    <form onSubmit={filterform.onSubmit((value) => onFilterSubmit(value))}>
       <div>
    <Divider my="md" label="Locations" labelPosition='center'/>
    <Chip.Group multiple={false} {...filterform.getInputProps('location')}>
        <Group position="left" mt="md">
          <Chip value="polonnaruwa">Polonnaruwa</Chip>
          <Chip value="dehiattakandiya">Dehiattakandiya</Chip>
          <Chip value="diyasenpura">Diyasenpura</Chip>
          <Chip value="sewanapitiya">Sewanapitiya</Chip>
          <Chip value="mahiyanganya">Mahiyanganya</Chip> 
        </Group>
      </Chip.Group>
    </div>
    <Space h="md"/>
    <div>
        <Divider my="md" label="Select min-max arrears" labelPosition='center'/>
        <Grid>
            <Grid.Col span={6}>
            <NumberInput
                label="Price"
                defaultValue={0}
                step={1000}
                min={0}
                parser={(value) => value.replace(/LKR\s?|(,*)/g, '')}
                formatter={(value) =>
                    !Number.isNaN(parseFloat(value))
                    ? `LKR ${value}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
                    : 'LKR '
                }
                {...filterform.getInputProps('min')}
                />

            </Grid.Col>
            <Grid.Col span={6}>
            <NumberInput
                label="Max"
                defaultValue={100000}
                step={1000}
                min={0}
                parser={(value) => value.replace(/LKR\s?|(,*)/g, '')}
                formatter={(value) =>
                    !Number.isNaN(parseFloat(value))
                    ? `LKR ${value}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
                    : 'LKR '
                }
                {...filterform.getInputProps('max')}
                />
            </Grid.Col>
        </Grid>
        <Group position='right' mt='xl'>
        <Button type='submit' variant='outline' color='blue'>Submit</Button>
      </Group>
    </div> 
    </form>
    
    <div>
    <Divider my="md" label="Generate Arrears cards" labelPosition='center'/>
    <Container my={'md'}>
    <MonthPickerInput
      type="default"
      placeholder="Pick dates"
      value={date}
      onChange={setDate}
      mx="auto"
      required
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
        <Link to={`/viewarrearscard/${user?.user_id}/${date}`}>
        <Button type='submit' variant='outline' color='blue' onClick={() => {date && onDateSubmit(date)}} disabled={disabled}>Submit</Button>
        </Link>
    </Group>
    </Container>
    </div>
    </>
  )
}

export default SearchComponents