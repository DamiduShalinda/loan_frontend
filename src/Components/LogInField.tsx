import {
    TextInput,
    PasswordInput,
    Checkbox,
    Anchor,
    Paper,
    Container,
    Group,
    Button,
    Image,
    Center,
    Box
  } from '@mantine/core';
  import logo from '../assets/images/logo.svg';
  import { useForm } from '@mantine/form';
  

  
  interface FormData {
    username: string;
    password: string;
  }
  
  interface Props {
    onSubmit: (data : FormData) => void;
  }
  
  export function LogInField( {onSubmit}: Props) {
    const form = useForm<FormData>({
      initialValues: {
        username: '',
        password: ''
      }
    });

  


    return (
      <Container size={400} my={40} >
        
  
        <Box component='form' onSubmit={form.onSubmit(() => {onSubmit(form.values)})}>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <Center>
          <Image src={logo} width="100" height="100" />
          </Center>
          <TextInput label="Username" placeholder="chamararanawaka" required {...form.getInputProps('username')} />
          <PasswordInput label="Password" placeholder="Your password" required mt="md" {...form.getInputProps('password')}/>
          <Group position="apart" mt="lg">
            <Checkbox label="Remember me" />
            <Anchor component="button" size="sm">
              Forgot password?
            </Anchor>
          </Group>
          <Button fullWidth mt="xl" type='submit'>
            Sign in
          </Button>
        </Paper>
        </Box>
      </Container>
    );
  }