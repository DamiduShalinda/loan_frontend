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
    Center
  } from '@mantine/core';
  import logo from '../assets/images/logo.svg';
  
  export function LogInField() {
    return (
      <Container size={400} my={40}>
        
  
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <Center>
          <Image src={logo} width="100" height="100" />
          </Center>
          <TextInput label="Email" placeholder="you@mantine.dev" required />
          <PasswordInput label="Password" placeholder="Your password" required mt="md" />
          <Group position="apart" mt="lg">
            <Checkbox label="Remember me" />
            <Anchor component="button" size="sm">
              Forgot password?
            </Anchor>
          </Group>
          <Button fullWidth mt="xl">
            Sign in
          </Button>
        </Paper>
      </Container>
    );
  }